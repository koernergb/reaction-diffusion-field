"use client";

import React, { useEffect, useRef } from "react";

interface SpiralSamplingVisualizationProps {
  width: number;
  height: number;
  sampleCount?: number;
  turns?: number;
  className?: string;
}

export default function SpiralSamplingVisualization({
  width,
  height,
  sampleCount = 256,
  turns = 3,
  className = "",
}: SpiralSamplingVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw spiral path
    const cx = width / 2;
    const cy = height / 2;
    // Match the exact calculation from sampleSpiralWaveform
    // Use the same maxR as the audio sampling for consistency
    const maxR = 0.98 * Math.min(width, height) * 0.5;
    
    // Also draw a complete spiral to the edge for visualization
    const fullMaxR = Math.min(width, height) * 0.5;

    ctx.strokeStyle = "rgba(120, 255, 200, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < sampleCount; i++) {
      const t = sampleCount > 1 ? i / (sampleCount - 1) : 0; // 0..1
      const r = maxR * t;
      const theta = turns * 2 * Math.PI * t;

      const x = cx + r * Math.cos(theta);
      const y = cy + r * Math.sin(theta);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
    
    // Draw a continuation to show where the spiral would go if extended
    ctx.strokeStyle = "rgba(120, 255, 200, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]); // Dashed line for the extension
    ctx.beginPath();
    
    // Continue the spiral from the last point to the edge
    const lastT = 1.0;
    const lastR = maxR;
    const lastTheta = turns * 2 * Math.PI * lastT;
    const lastX = cx + lastR * Math.cos(lastTheta);
    const lastY = cy + lastR * Math.sin(lastTheta);
    
    ctx.moveTo(lastX, lastY);
    
    // Extend to full radius
    const extendedR = fullMaxR;
    const extendedTheta = turns * 2 * Math.PI * 1.0;
    const extendedX = cx + extendedR * Math.cos(extendedTheta);
    const extendedY = cy + extendedR * Math.sin(extendedTheta);
    
    ctx.lineTo(extendedX, extendedY);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Draw sample points
    ctx.fillStyle = "rgba(120, 255, 200, 0.8)";
    for (let i = 0; i < sampleCount; i += 4) {
      // Draw every 4th point to avoid clutter
      const t = sampleCount > 1 ? i / (sampleCount - 1) : 0;
      const r = maxR * t;
      const theta = turns * 2 * Math.PI * t;

      const x = cx + r * Math.cos(theta);
      const y = cy + r * Math.sin(theta);

      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw center point
    ctx.fillStyle = "rgba(120, 255, 200, 1.0)";
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, 2 * Math.PI);
    ctx.fill();
  }, [width, height, sampleCount, turns]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        mixBlendMode: "screen",
        opacity: 0.85,
      }}
    />
  );
}

