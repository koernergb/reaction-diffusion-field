"use client";

import React, { useEffect, useState, useRef } from "react";

export type Metrics = {
  energy: number;
  turbulence: number;
  peak: number;
  coherence: number;
};

interface MetricsDebugProps {
  metrics: Metrics;
  activePixels?: { count: number; percentage: number; mean: number; stdDev: number; adaptiveThreshold: number };
}

export default function MetricsDebug({ metrics, activePixels }: MetricsDebugProps) {
  const [displayMetrics, setDisplayMetrics] = useState<Metrics>(metrics);
  const metricsRef = useRef<Metrics>(metrics);
  const [displayActivePixels, setDisplayActivePixels] = useState<{ count: number; percentage: number; mean: number; stdDev: number; adaptiveThreshold: number }>(
    activePixels || { count: 0, percentage: 0, mean: 0, stdDev: 0, adaptiveThreshold: 0 }
  );
  const activePixelsRef = useRef<{ count: number; percentage: number; mean: number; stdDev: number; adaptiveThreshold: number }>(
    activePixels || { count: 0, percentage: 0, mean: 0, stdDev: 0, adaptiveThreshold: 0 }
  );

  // Keep refs in sync with props
  useEffect(() => {
    metricsRef.current = metrics;
  }, [metrics]);
  
  useEffect(() => {
    if (activePixels) {
      activePixelsRef.current = activePixels;
    }
  }, [activePixels]);

  useEffect(() => {
    // Smooth updates for display using requestAnimationFrame for better performance
    let rafId: number;
    let running = true;
    
    const update = () => {
      if (!running) return;
      
      const target = metricsRef.current;
      setDisplayMetrics((prev) => {
        const alpha = 0.7; // Much faster smoothing for near-real-time updates
        return {
          energy: prev.energy + alpha * (target.energy - prev.energy),
          turbulence: prev.turbulence + alpha * (target.turbulence - prev.turbulence),
          peak: prev.peak + alpha * (target.peak - prev.peak),
          coherence: prev.coherence + alpha * (target.coherence - prev.coherence),
        };
      });
      
      // Update active pixels with smoothing
      const targetPixels = activePixelsRef.current;
      setDisplayActivePixels((prev) => {
        const alpha = 0.8; // Fast smoothing for active pixels
        return {
          count: Math.round(prev.count + alpha * (targetPixels.count - prev.count)),
          percentage: prev.percentage + alpha * (targetPixels.percentage - prev.percentage),
          mean: prev.mean + alpha * (targetPixels.mean - prev.mean),
          stdDev: prev.stdDev + alpha * (targetPixels.stdDev - prev.stdDev),
          adaptiveThreshold: prev.adaptiveThreshold + alpha * (targetPixels.adaptiveThreshold - prev.adaptiveThreshold),
        };
      });
      
      rafId = requestAnimationFrame(update);
    };
    
    rafId = requestAnimationFrame(update);
    
    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const formatValue = (value: number) => {
    return value.toFixed(3);
  };

  const getBarWidth = (value: number) => {
    return `${Math.max(0, Math.min(100, value * 100))}%`;
  };

  const getBarColor = (value: number) => {
    const hue = value * 120; // 0 (red) to 120 (green)
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div
      className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-xs text-white min-w-[200px]"
      style={{ fontFamily: "monospace" }}
    >
      <div className="mb-2 text-sm font-bold text-white/90 border-b border-white/20 pb-1">
        RD Metrics
      </div>
      
      <div className="space-y-2">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-white/70">Energy</span>
            <span className="text-white">{formatValue(displayMetrics.energy)}</span>
          </div>
          <div className="h-2 bg-white/10 rounded overflow-hidden">
            <div
              className="h-full transition-all duration-75"
              style={{
                width: getBarWidth(displayMetrics.energy),
                backgroundColor: getBarColor(displayMetrics.energy),
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-white/70">Turbulence</span>
            <span className="text-white">{formatValue(displayMetrics.turbulence)}</span>
          </div>
          <div className="h-2 bg-white/10 rounded overflow-hidden">
            <div
              className="h-full transition-all duration-75"
              style={{
                width: getBarWidth(displayMetrics.turbulence),
                backgroundColor: getBarColor(displayMetrics.turbulence),
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-white/70">Peak</span>
            <span className="text-white">{formatValue(displayMetrics.peak)}</span>
          </div>
          <div className="h-2 bg-white/10 rounded overflow-hidden">
            <div
              className="h-full transition-all duration-75"
              style={{
                width: getBarWidth(displayMetrics.peak),
                backgroundColor: getBarColor(displayMetrics.peak),
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-white/70">Coherence</span>
            <span className="text-white">{formatValue(displayMetrics.coherence)}</span>
          </div>
          <div className="h-2 bg-white/10 rounded overflow-hidden">
            <div
              className="h-full transition-all duration-75"
              style={{
                width: getBarWidth(displayMetrics.coherence),
                backgroundColor: getBarColor(displayMetrics.coherence),
              }}
            />
          </div>
        </div>
        
        {activePixels && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="flex justify-between mb-1">
              <span className="text-white/70">Active Pixels</span>
              <span className="text-white">
                {displayActivePixels.count.toLocaleString()} ({(displayActivePixels.percentage * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded overflow-hidden">
              <div
                className="h-full transition-all duration-75"
                style={{
                  width: getBarWidth(displayActivePixels.percentage),
                  backgroundColor: getBarColor(displayActivePixels.percentage),
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

