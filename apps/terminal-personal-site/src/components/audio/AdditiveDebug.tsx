"use client";

import React, { useEffect, useState } from "react";
import { useRDAudioAdditive } from "@/audio/useRDAudioAdditive";

type AdditiveDebugProps = {
  // Optional: if provided, use this shared instance instead of creating a new one
  sharedInstance?: ReturnType<typeof useRDAudioAdditive>;
};

export default function AdditiveDebug({ sharedInstance }: AdditiveDebugProps = {}) {
  const [mounted, setMounted] = useState(false);
  const localInstance = useRDAudioAdditive();
  // Use shared instance if provided, otherwise use local instance
  // NOTE: If you want the debug component to control the SAME instance as your RD system,
  // pass the sharedInstance prop. Otherwise, it creates its own separate instance.
  const { start, stop, setMetrics } = sharedInstance || localInstance;
  const [metrics, setMetricsState] = useState({
    energy: 0.5,
    turbulence: 0.3,
    peak: 0.2,
    coherence: 0.7,
    bloom: 0.5,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => {
    start();
    // Set initial metrics
    setMetrics(metrics);
  };

  const handleStop = () => {
    stop();
  };

  const handleMetricChange = (key: keyof typeof metrics, value: number) => {
    const newMetrics = { ...metrics, [key]: value };
    setMetricsState(newMetrics);
    setMetrics(newMetrics);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 rounded-lg border border-emerald-400/30 bg-black/90 p-4 text-xs font-mono text-emerald-100">
      <div className="mb-2 font-semibold text-emerald-300">Additive Debug</div>
      <div className="mb-3 space-x-2">
        <button
          onClick={handleStart}
          className="rounded bg-emerald-600 px-3 py-1 text-white hover:bg-emerald-700"
        >
          Start Audio
        </button>
        <button
          onClick={handleStop}
          className="rounded bg-slate-700 px-3 py-1 text-white hover:bg-slate-600"
        >
          Stop
        </button>
      </div>
      <div className="space-y-2">
        <div>
          <div className="mb-1 flex justify-between">
            <span>Energy: {metrics.energy.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={metrics.energy}
            onChange={(e) => handleMetricChange("energy", Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between">
            <span>Turbulence: {metrics.turbulence.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={metrics.turbulence}
            onChange={(e) => handleMetricChange("turbulence", Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between">
            <span>Peak: {metrics.peak.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={metrics.peak}
            onChange={(e) => handleMetricChange("peak", Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between">
            <span>Coherence: {metrics.coherence.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={metrics.coherence}
            onChange={(e) => handleMetricChange("coherence", Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between">
            <span>Bloom: {metrics.bloom.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={metrics.bloom}
            onChange={(e) => handleMetricChange("bloom", Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

