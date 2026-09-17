"use client";

import React, { useEffect, useRef } from "react";
import { useUiStore } from "@/lib/uiStore";

const HISTORY = 180;

function formatHz(hz: number): string {
  if (!Number.isFinite(hz) || hz <= 0) return "—";
  if (hz >= 1000) return `${(hz / 1000).toFixed(1)}k`;
  return `${Math.round(hz)}`;
}

/** Proof panel: sent lfoSin vs applied cutoff. They must crest together. */
export default function FilterLfoDebug() {
  const enabled = useUiStore((s) => s.filterLfoDebug);
  const lfoSent = useUiStore((s) => s.raveLfoSent);
  const lfoApplied = useUiStore((s) => s.raveLfo);
  const lpfHz = useUiStore((s) => s.raveLpfHz);
  const lpfMin = useUiStore((s) => s.raveLpfMin);
  const lpfMax = useUiStore((s) => s.raveLpfMax);
  const status = useUiStore((s) => s.raveStatus);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sentHist = useRef(new Float32Array(HISTORY));
  const appliedHist = useRef(new Float32Array(HISTORY));
  const writeRef = useRef(0);
  const filledRef = useRef(0);
  const latestRef = useRef({
    sent: 0,
    applied: 0,
    hz: 0,
    min: 600,
    max: 20000,
  });

  useEffect(() => {
    latestRef.current = {
      sent: lfoSent,
      applied: lfoApplied,
      hz: lpfHz,
      min: lpfMin || 600,
      max: lpfMax || 20000,
    };
    const i = writeRef.current % HISTORY;
    sentHist.current[i] = lfoSent;
    appliedHist.current[i] = lfoApplied;
    writeRef.current = i + 1;
    filledRef.current = Math.min(HISTORY, filledRef.current + 1);
  }, [lfoSent, lfoApplied, lpfHz, lpfMin, lpfMax]);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;

    const drawWave = (
      buf: Float32Array,
      color: string,
      n: number,
      write: number,
      pad: number,
      w: number,
      waveH: number,
      dpr: number
    ) => {
      if (n < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5 * dpr;
      for (let k = 0; k < n; k++) {
        const idx = (write - n + k + HISTORY * 8) % HISTORY;
        const v = buf[idx];
        const x = pad + (k / (n - 1)) * (w - pad * 2);
        const y = waveH * 0.5 - v * (waveH * 0.42);
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const draw = () => {
      if (!running) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const cssW = canvas.clientWidth || 300;
      const cssH = canvas.clientHeight || 150;
      const w = Math.floor(cssW * dpr);
      const h = Math.floor(cssH * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      const { sent, applied, hz, min, max } = latestRef.current;
      const waveH = Math.floor(h * 0.55);
      const barY = waveH + Math.floor(8 * dpr);
      const barH = Math.floor(16 * dpr);
      const pad = Math.floor(10 * dpr);

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(0,0,0,0.75)";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(52, 211, 153, 0.2)";
      ctx.lineWidth = dpr;
      ctx.beginPath();
      ctx.moveTo(pad, waveH * 0.5);
      ctx.lineTo(w - pad, waveH * 0.5);
      ctx.stroke();

      const n = filledRef.current;
      const write = writeRef.current;
      // sent (browser lfoSin) = bright; applied (sidecar) = dimmer
      drawWave(sentHist.current, "rgba(110, 231, 183, 0.95)", n, write, pad, w, waveH, dpr);
      drawWave(appliedHist.current, "rgba(52, 211, 153, 0.45)", n, write, pad, w, waveH, dpr);

      ctx.fillStyle = "rgba(209, 250, 229, 0.9)";
      ctx.font = `${10 * dpr}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "left";
      ctx.fillText(
        `sent ${sent >= 0 ? "+" : ""}${sent.toFixed(2)}  applied ${applied >= 0 ? "+" : ""}${applied.toFixed(2)}`,
        pad,
        pad + 9 * dpr
      );

      const lo = Math.max(20, min);
      const hi = Math.max(lo * 1.01, max);
      const t =
        hz > 0 ? (Math.log(hz) - Math.log(lo)) / (Math.log(hi) - Math.log(lo)) : 0;
      const tClamped = Math.max(0, Math.min(1, t));

      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.fillRect(pad, barY, w - pad * 2, barH);
      ctx.fillStyle = "rgba(52, 211, 153, 0.95)";
      ctx.fillRect(pad, barY, (w - pad * 2) * tClamped, barH);

      ctx.fillStyle = "rgba(209, 250, 229, 0.95)";
      ctx.font = `${10 * dpr}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.fillText(
        `fc ${formatHz(hz)}Hz   ${formatHz(lo)}→${formatHz(hi)}   Q0.5 wet90%`,
        pad,
        barY + barH + 12 * dpr
      );
      ctx.fillStyle = "rgba(167, 243, 208, 0.5)";
      ctx.fillText("proof: wave peak ⇒ fc high", pad, barY + barH + 24 * dpr);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed left-4 top-4 z-40 w-[min(92vw,320px)] pointer-events-none select-none">
      <div className="rounded-lg border border-emerald-400/30 bg-black/80 p-2 shadow-lg shadow-black/40">
        <div className="mb-1 flex items-center justify-between px-0.5 font-mono text-[10px] text-emerald-200/80">
          <span>lfoSin → cutoff (strip-down)</span>
          <span className="text-emerald-300/50">{status}</span>
        </div>
        <canvas ref={canvasRef} className="h-[152px] w-full rounded" />
      </div>
    </div>
  );
}
