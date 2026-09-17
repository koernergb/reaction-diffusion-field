"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type RaveConnectionStatus = "idle" | "connecting" | "connected" | "error";

export type FieldSnapshot = {
  width: number;
  height: number;
  data: Float32Array;
  dt?: number;
  lfoSin?: number;
  simTime?: number;
  dtModPeriod?: number;
  f?: number;
  k?: number;
  mouseU?: number;
  mouseV?: number;
  touchGain?: number;
};

/** Extra browser-side cursor motion (velocity) not available inside the RD package. */
export type RaveCursorExtras = {
  vel?: number;
};

const DEFAULT_DIM = 8;
/** Fast enough to track the bloom LFO + cursor; field→z stays heavily smoothed. */
const SEND_HZ = 24;
const MIN_INTERVAL_MS = 1000 / SEND_HZ;
/** Slow mix — field only gently nudges timbre on regen, not live rate/amp. */
const Z_MIX = 0.04;

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/**
 * Stable field → z mapper (mild timbre nudge only).
 * Rate/amp lock comes from lfoSin + cursor on the sidecar.
 */
function fieldToTargetZ(
  data: Float32Array,
  width: number,
  height: number,
  dim: number
): Float32Array {
  const z = new Float32Array(dim);
  if (width < 2 || height < 2 || data.length === 0) return z;

  const stepX = Math.max(1, Math.floor(width / 64));
  const stepY = Math.max(1, Math.floor(height / 64));

  let n = 0;
  let sum = 0;
  let sumSq = 0;
  let min = Infinity;
  let max = -Infinity;
  let grad = 0;
  let gradN = 0;

  const q = [0, 0, 0, 0];
  const qn = [0, 0, 0, 0];
  const midX = width / 2;
  const midY = height / 2;

  for (let y = 0; y < height; y += stepY) {
    for (let x = 0; x < width; x += stepX) {
      const v = data[y * width + x];
      sum += v;
      sumSq += v * v;
      if (v < min) min = v;
      if (v > max) max = v;
      n++;

      const qi = (y < midY ? 0 : 2) + (x < midX ? 0 : 1);
      q[qi] += v;
      qn[qi]++;

      if (x + stepX < width) {
        grad += Math.abs(v - data[y * width + (x + stepX)]);
        gradN++;
      }
      if (y + stepY < height) {
        grad += Math.abs(v - data[(y + stepY) * width + x]);
        gradN++;
      }
    }
  }

  if (n === 0) return z;

  const mean = sum / n;
  const energy = Math.sqrt(sumSq / n);
  const variance = Math.max(0, sumSq / n - mean * mean);
  const turbulence = Math.sqrt(variance);
  const contrast = max - min;
  const coherence = 1 - clamp((gradN > 0 ? grad / gradN : 0) * 4, 0, 1);
  const qMeans = q.map((s, i) => (qn[i] > 0 ? s / qn[i] : 0));

  const vals = [
    clamp(mean * 2 - 1, -1, 1),
    clamp(energy * 2 - 1, -1, 1),
    clamp(turbulence * 3 - 0.5, -1, 1),
    clamp(contrast * 2 - 1, -1, 1),
    clamp(coherence * 2 - 1, -1, 1),
    clamp(qMeans[0] - qMeans[3], -1, 1),
    clamp(qMeans[1] - qMeans[2], -1, 1),
    clamp((qMeans[0] + qMeans[1] - qMeans[2] - qMeans[3]) * 0.5, -1, 1),
  ];

  for (let i = 0; i < dim; i++) {
    z[i] = vals[i % vals.length];
  }
  return z;
}

function smoothZ(target: Float32Array, prev: Float32Array, mix: number): Float32Array {
  const out = new Float32Array(target.length);
  for (let i = 0; i < target.length; i++) {
    out[i] = prev[i] + mix * (target[i] - prev[i]);
  }
  return out;
}

type Options = {
  enabled: boolean;
  url: string;
  latentDim?: number;
};

export function useRaveLatentControl({ enabled, url, latentDim = DEFAULT_DIM }: Options) {
  const [status, setStatus] = useState<RaveConnectionStatus>("idle");
  const [zNorm, setZNorm] = useState(0);
  const [mode, setMode] = useState<string>("—");
  const [serverDim, setServerDim] = useState(latentDim);
  const [lfo, setLfo] = useState(0);
  const [lfoSent, setLfoSent] = useState(0);
  const [lpfHz, setLpfHz] = useState(0);
  const [lpfMin, setLpfMin] = useState(600);
  const [lpfMax, setLpfMax] = useState(20000);
  const [lpfWet, setLpfWet] = useState(0.9);
  const [lpfQ, setLpfQ] = useState(0.5);

  const wsRef = useRef<WebSocket | null>(null);
  const prevZRef = useRef(new Float32Array(latentDim));
  const lastSendRef = useRef(0);
  const enabledRef = useRef(enabled);
  const dimRef = useRef(latentDim);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    const dim = serverDim || latentDim;
    dimRef.current = dim;
    prevZRef.current = new Float32Array(dim);
  }, [latentDim, serverDim]);

  useEffect(() => {
    if (!enabled) {
      wsRef.current?.close();
      wsRef.current = null;
      setStatus("idle");
      setMode("—");
      setLfo(0);
      setLpfHz(0);
      return;
    }

    let cancelled = false;
    setStatus("connecting");

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (cancelled) return;
        setStatus("connected");
      };

      ws.onmessage = (ev) => {
        try {
          const msg = JSON.parse(String(ev.data));
          if (msg.type === "hello") {
            setMode(msg.mode ?? "unknown");
            if (typeof msg.latentDim === "number" && msg.latentDim > 0) {
              setServerDim(msg.latentDim);
            }
            if (typeof msg.lpfMin === "number") setLpfMin(msg.lpfMin);
            if (typeof msg.lpfMax === "number") setLpfMax(msg.lpfMax);
            if (typeof msg.lpfWet === "number") setLpfWet(msg.lpfWet);
            if (typeof msg.lpfQ === "number") setLpfQ(msg.lpfQ);
          } else if (msg.type === "status") {
            setZNorm(msg.zNorm ?? 0);
            if (msg.mode) setMode(msg.mode);
            if (typeof msg.lfo === "number") setLfo(msg.lfo);
            if (typeof msg.lpfHz === "number") setLpfHz(msg.lpfHz);
            if (typeof msg.lpfMin === "number") setLpfMin(msg.lpfMin);
            if (typeof msg.lpfMax === "number") setLpfMax(msg.lpfMax);
            if (typeof msg.lpfWet === "number") setLpfWet(msg.lpfWet);
            if (typeof msg.lpfQ === "number") setLpfQ(msg.lpfQ);
          }
        } catch {
          // ignore
        }
      };

      ws.onerror = () => {
        if (!cancelled) setStatus("error");
      };

      ws.onclose = () => {
        if (!cancelled) {
          setStatus((s) => (s === "connecting" ? "error" : "idle"));
          wsRef.current = null;
        }
      };
    } catch {
      setStatus("error");
    }

    return () => {
      cancelled = true;
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [enabled, url]);

  const pushField = useCallback((snapshot: FieldSnapshot, extras?: RaveCursorExtras) => {
    if (!enabledRef.current) return;
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    const now = performance.now();
    if (now - lastSendRef.current < MIN_INTERVAL_MS) return;
    lastSendRef.current = now;

    const dim = dimRef.current;
    const target = fieldToTargetZ(snapshot.data, snapshot.width, snapshot.height, dim);
    const z = smoothZ(target, prevZRef.current, Z_MIX);
    prevZRef.current = z;

    const mouseU = snapshot.mouseU ?? -1;
    const mouseV = snapshot.mouseV ?? -1;
    const cursorOn = mouseU >= 0 && mouseV >= 0 && mouseU <= 1 && mouseV <= 1 ? 1 : 0;

    // Prefer explicit lfoSin; fall back to recovering from dt ∈ [0.8, 1.2]
    let nextLfo = typeof snapshot.lfoSin === "number" ? snapshot.lfoSin : 0;
    if (typeof snapshot.lfoSin !== "number" && typeof snapshot.dt === "number") {
      nextLfo = clamp((snapshot.dt - 1.0) / 0.2, -1, 1);
    }

    const sent = clamp(nextLfo, -1, 1);
    setLfoSent(sent);

    ws.send(
      JSON.stringify({
        type: "ctrl",
        z: Array.from(z),
        lfo: sent,
        dt: snapshot.dt ?? 1.0,
        dtModPeriod: snapshot.dtModPeriod ?? 5.0,
        f: snapshot.f ?? 0,
        k: snapshot.k ?? 0,
        cursor: {
          x: cursorOn ? mouseU : 0.5,
          y: cursorOn ? mouseV : 0.5,
          vel: clamp(extras?.vel ?? 0, 0, 1),
          on: cursorOn,
        },
        t: now,
      })
    );
  }, []);

  return { status, zNorm, mode, lfo, lfoSent, lpfHz, lpfMin, lpfMax, lpfWet, lpfQ, pushField };
}
