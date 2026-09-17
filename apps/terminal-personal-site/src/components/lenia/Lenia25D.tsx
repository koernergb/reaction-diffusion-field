// src/components/lenia/Lenia25D.tsx
// 2.5D fallback: layered 2D Lenia simulations for volumetric effect
// Much cheaper than true 3D, but still creates depth illusion

"use client";

import React, { useEffect, useRef } from "react";
import { useUiStore, LeniaParams } from "@/lib/uiStore";

interface Lenia25DProps {
  config: LeniaParams;
}

export default function Lenia25D({ config }: Lenia25DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1, y: -1 });
  
  const reducedMotion = useUiStore((s) => s.reducedMotion);
  const reactiveTouch = useUiStore((s) => s.reactiveTouch);
  
  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const { grid, stepsPerFrame, touchGain, touchRadius, flowGain, exposure } = config;
    
    // Use smaller grid for performance (2.5D is fallback anyway)
    const simSize = Math.min(grid, 128);
    const numLayers = 5; // Depth layers
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create layers
    const layers: Float32Array[] = [];
    const layerBuffers: ImageData[] = [];
    
    for (let i = 0; i < numLayers; i++) {
      layers.push(new Float32Array(simSize * simSize));
      layerBuffers.push(ctx.createImageData(simSize, simSize));
      
      // Seed initial density
      const cx = simSize / 2;
      const cy = simSize / 2;
      for (let y = 0; y < simSize; y++) {
        for (let x = 0; x < simSize; x++) {
          const dist = Math.hypot(x - cx, y - cy) / (simSize * 0.4);
          if (dist < 1.0) {
            layers[i][y * simSize + x] = (1.0 - dist) * (0.5 + Math.random() * 0.3);
          }
        }
      }
    }
    
    // Mouse tracking
    const handlePointerMove = (e: PointerEvent) => {
      if (!reactiveTouch) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      };
    };
    
    const handlePointerLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };
    
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    
    // Lenia kernel (2D)
    const leniaKernel = (r: number): number => {
      const alpha = 4.0;
      const beta = 8.0;
      return Math.exp(-alpha * Math.pow(r, beta));
    };
    
    // Laplacian (2D)
    const laplacian = (field: Float32Array, x: number, y: number): number => {
      const w = simSize;
      const n = field[((y - 1 + simSize) % simSize) * w + x];
      const s = field[((y + 1) % simSize) * w + x];
      const e = field[y * w + ((x + 1) % w)];
      const wVal = field[y * w + ((x - 1 + w) % w)];
      const c = field[y * w + x];
      return (n + s + e + wVal) / 4.0 - c;
    };
    
    // Update layer
    const updateLayer = (layer: Float32Array, layerIndex: number, frameCount: number) => {
      const next = new Float32Array(layer.length);
      const kernelRadius = 0.15 * (1.0 + layerIndex * 0.1); // Vary by depth
      const phase = layerIndex * 0.3; // Phase offset per layer
      
      for (let y = 0; y < simSize; y++) {
        for (let x = 0; x < simSize; x++) {
          const idx = y * simSize + x;
          let accum = 0.0;
          let weightSum = 0.0;
          
          // Sample neighbors
          const numSamples = 12;
          for (let i = 0; i < numSamples; i++) {
            const angle = (i / numSamples) * Math.PI * 2 + phase;
            const nx = x + Math.cos(angle) * kernelRadius * simSize;
            const ny = y + Math.sin(angle) * kernelRadius * simSize;
            
            const nxI = Math.floor(nx);
            const nyI = Math.floor(ny);
            
            if (nxI >= 0 && nxI < simSize && nyI >= 0 && nyI < simSize) {
              const dist = kernelRadius;
              const k = leniaKernel(dist);
              accum += layer[nyI * simSize + nxI] * k;
              weightSum += k;
            }
          }
          
          const neighborhood = weightSum > 0 ? accum / weightSum : 0;
          const center = layer[idx];
          
          // Growth
          const kappa = 0.15;
          const lambda = 0.02;
          let value = center + (kappa * neighborhood - lambda * center) * 0.05;
          
          // Cursor bloom
          if (mouseRef.current.x >= 0 && layerIndex < 2) {
            const mx = mouseRef.current.x * simSize;
            const my = mouseRef.current.y * simSize;
            const dist = Math.hypot(x - mx, y - my) / (simSize * touchRadius);
            const touch = Math.exp(-dist * dist);
            value += touchGain * touch;
          }
          
          // Small jitter
          value += (Math.random() - 0.5) * 0.003;
          value = Math.max(0, Math.min(1, value * 0.995));
          
          next[idx] = value;
        }
      }
      
      return next;
    };
    
    // Render layer to ImageData
    const renderLayer = (layer: Float32Array, imageData: ImageData, layerIndex: number) => {
      const data = imageData.data;
      const opacity = 0.4 / numLayers; // Additive blending
      const parallax = (layerIndex - numLayers / 2) * 0.02;
      
      for (let i = 0; i < layer.length; i++) {
        const x = i % simSize;
        const y = Math.floor(i / simSize);
        const value = layer[i];
        
        const a = Math.min(1, value * exposure);
        const r = Math.floor((0.15 + a * 0.45) * 255);
        const g = Math.floor((0.35 + a * 0.10) * 255);
        const b = Math.floor((0.7 + a * 0.3) * 255);
        
        const idx = (y * simSize + x) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = Math.floor(a * opacity * 255);
      }
    };
    
    let frameCount = 0;
    
    const animate = (now: number) => {
      if (reducedMotion) return;
      
      timeRef.current = now * 0.001;
      
      // Update layers
      for (let i = 0; i < numLayers; i++) {
        for (let step = 0; step < stepsPerFrame; step++) {
          layers[i] = updateLayer(layers[i], i, frameCount);
        }
      }
      
      // Clear canvas
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Render layers with parallax
      ctx.globalCompositeOperation = "screen";
      
      for (let i = 0; i < numLayers; i++) {
        renderLayer(layers[i], layerBuffers[i], i);
        
        const parallax = (i - numLayers / 2) * 0.02;
        const scale = 1.0 + parallax * 0.1;
        const offsetX = parallax * canvas.width * 0.1;
        const offsetY = parallax * canvas.height * 0.1;
        
        ctx.save();
        ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
        ctx.scale(scale, scale);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        
        // Create temporary canvas for this layer
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.putImageData(layerBuffers[i], 0, 0);
          ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        }
        ctx.restore();
      }
      
      ctx.globalCompositeOperation = "source-over";
      
      frameCount++;
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [config, reducedMotion, reactiveTouch]);
  
  if (reducedMotion) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(60, 45, 255, 0.1), rgba(15, 35, 70, 0.3))",
        }}
      />
    );
  }
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
