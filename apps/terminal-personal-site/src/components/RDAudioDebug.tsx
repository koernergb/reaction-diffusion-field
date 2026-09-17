"use client";

import React, { useEffect, useState } from "react";
import { useRDAudioWavetable, RDFieldSnapshot } from "@/audio/useRDAudioWavetable";

export default function RDAudioDebug() {
  const [mounted, setMounted] = useState(false);
  const { ready, start, stop, updateFromField } = useRDAudioWavetable();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFakeUpdate = () => {
    // Create a dummy synthetic snapshot (gradient + noise)
    const width = 256;
    const height = 256;
    const data = new Float32Array(width * height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        // Radial gradient from center
        const cx = width / 2;
        const cy = height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.sqrt(cx * cx + cy * cy);
        const gradient = 1 - dist / maxDist;
        
        // Add some noise
        const noise = (Math.random() - 0.5) * 0.3;
        
        // Combine and clamp
        let value = gradient + noise;
        value = Math.max(0, Math.min(1, value));
        data[idx] = value;
      }
    }

    const snapshot: RDFieldSnapshot = {
      width,
      height,
      data,
    };

    updateFromField(snapshot);
  };

  const handleNoiseUpdate = () => {
    // Create a pure noise snapshot
    const width = 256;
    const height = 256;
    const data = new Float32Array(width * height);

    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random();
    }

    const snapshot: RDFieldSnapshot = {
      width,
      height,
      data,
    };

    updateFromField(snapshot);
  };

  if (!mounted || process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50 rounded-lg border border-emerald-400/30 bg-black/90 p-4 text-xs font-mono text-emerald-100">
      <div className="mb-2 font-semibold text-emerald-300">RD Audio Wavetable</div>
      <div className="mb-2 space-y-2">
        <div className="flex items-center gap-2">
          <span>Status:</span>
          <span className={ready ? "text-emerald-400" : "text-slate-400"}>
            {ready ? "Ready" : "Not Ready"}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={start}
            className="rounded bg-emerald-600 px-3 py-1 text-white hover:bg-emerald-700"
          >
            Start Audio
          </button>
          <button
            onClick={stop}
            className="rounded bg-slate-700 px-3 py-1 text-white hover:bg-slate-600"
          >
            Stop
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleFakeUpdate}
            className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
          >
            Fake Update (Gradient)
          </button>
          <button
            onClick={handleNoiseUpdate}
            className="rounded bg-purple-600 px-3 py-1 text-white hover:bg-purple-700"
          >
            Fake Update (Noise)
          </button>
        </div>
      </div>
    </div>
  );
}

