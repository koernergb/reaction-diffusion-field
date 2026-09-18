// src/components/AnimatedBackdrop.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useUiStore, useEffectiveLightDir } from "@/lib/uiStore";
import { useFeedbackCircuitAudio } from "@/audio/useFeedbackCircuitAudio";
import { useRDAudioWavetable } from "@/audio/useRDAudioWavetable";
import { useRDAudioFFT } from "@/audio/useRDAudioFFT";
import { useCursorTickClicksAudio } from "@/audio/useCursorTickClicksAudio";
import { Metrics } from "./audio/MetricsDebug";
import dynamic from "next/dynamic";

const NeuralFieldFlow = dynamic(() => import("./neural/NeuralFieldFlow"), {
  ssr: false,
});

const Lenia25DBackdrop = dynamic(() => import("./lenia/Lenia25DBackdrop"), {
  ssr: false,
});

const TuringStripesBackdrop = dynamic(
  () => import("@koerner/turing-stripes-rd/react").then((m) => m.default),
  { ssr: false }
);

// Feature detection for WebGL2 float textures
function supportsWebGL2Float(): boolean {
  if (typeof window === "undefined") return false;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    console.log("[AnimatedBackdrop] WebGL2 not available");
    return false;
  }
  
  const ext = gl.getExtension("EXT_color_buffer_float");
  const result = ext !== null;
  console.log("[AnimatedBackdrop] Float texture support check:", {
    extension: !!ext,
    result,
    renderer: gl.getParameter(gl.RENDERER),
  });
  return result;
}

interface CAConfig {
  feed: number;
  kill: number;
  Du: number;
  Dv: number;
}

const CellularAutomataBloom: React.FC<{ config: CAConfig }> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const reducedMotion = useUiStore((s) => s.reducedMotion);
  const reactiveTouch = useUiStore((s) => s.reactiveTouch);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Simulate at half resolution
    const simW = Math.floor(canvas.width / 2);
    const simH = Math.floor(canvas.height / 2);

    let U = new Float32Array(simW * simH);
    let V = new Float32Array(simW * simH);
    let Utmp = new Float32Array(simW * simH);
    let Vtmp = new Float32Array(simW * simH);

    // Seed
    const cx = Math.floor(simW / 2);
    const cy = Math.floor(simH / 2);
    const r = 15;
    for (let y = cy - r; y < cy + r; y++) {
      for (let x = cx - r; x < cx + r; x++) {
        if (x >= 0 && x < simW && y >= 0 && y < simH && Math.hypot(x - cx, y - cy) < r) {
          const i = y * simW + x;
          U[i] = 1;
          V[i] = 0.5;
        }
      }
    }
    for (let i = 0; i < simW * simH; i++) {
      if (U[i] === 0) U[i] = 1;
    }

    console.log("[CA] Initialized:", simW, "x", simH);

    // Cursor tracking state
    let cursorX = -1; // normalized 0–1, -1 = no cursor
    let cursorY = -1;
    let lastInjectionFrame = -10;

    // Pointer move listener
    const handlePointerMove = (e: PointerEvent) => {
      if (!reactiveTouch) return;
      
      const rect = canvas.getBoundingClientRect();
      cursorX = (e.clientX - rect.left) / rect.width;
      cursorY = (e.clientY - rect.top) / rect.height;
    };

    const handlePointerLeave = () => {
      cursorX = -1;
      cursorY = -1;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    // Terminal neon green palette: deep teal base → neon green highlights
    const paletteMap = (v: number): [number, number, number] => {
      const a = Math.pow(Math.min(1, Math.max(0, v)), 1.8); // gamma compression
      // Base: #081018 (8, 16, 24) - dark teal
      // Highlight: #9bf5d7 (155, 245, 215) - neon green
      // Transition through cursor green #8affc1 (138, 255, 193)
      const r = 8 + Math.floor((155 - 8) * a);
      const g = 16 + Math.floor((245 - 16) * a);
      const b = 24 + Math.floor((215 - 24) * a);
      return [r, g, b];
    };

    const laplacian = (field: Float32Array, i: number): number => {
      const x = i % simW;
      const y = Math.floor(i / simW);
      const n = ((y - 1) % simH + simH) % simH;
      const s = (y + 1) % simH;
      const e = (x + 1) % simW;
      const w = ((x - 1) % simW + simW) % simW;
      return field[n * simW + x] + field[s * simW + x] + field[y * simW + e] + field[y * simW + w] - 4 * field[i];
    };

    // Cursor injection with Gaussian bloom
    const injectBloom = (frameCount: number) => {
      if (!reactiveTouch || cursorX < 0 || cursorY < 0) return;
      
      // Throttle: inject every 3 frames
      if (frameCount - lastInjectionFrame < 3) return;
      lastInjectionFrame = frameCount;

      // Convert normalized cursor to sim coords
      const mx = Math.floor(cursorX * simW);
      const my = Math.floor(cursorY * simH);

      // Gaussian parameters
      const radius = 18; // px in sim space
      const sigma = radius * 0.6;
      const sigmaSq2 = 2 * sigma * sigma;

      let injected = false;

      // Apply Gaussian perturbation in a square region
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const x = mx + dx;
          const y = my + dy;
          
          // Bounds check
          if (x < 0 || x >= simW || y < 0 || y >= simH) continue;

          const distSq = dx * dx + dy * dy;
          if (distSq > radius * radius) continue;

          // Gaussian weight
          const w = Math.exp(-distSq / sigmaSq2);
          
          const i = y * simW + x;
          
          // Inject: increase U, decrease V (creates bloom)
          U[i] = Math.min(1, U[i] + 0.40 * w);
          V[i] = Math.max(0, V[i] - 0.25 * w);

          injected = true;
        }
      }

      if (injected && frameCount === lastInjectionFrame) {
        console.log(`[CA] Injected bloom at ${mx},${my}`);
      }
    };

    const STEPS_PER_FRAME = 3;
    let frameCount = 0;

    const animate = () => {
      const { feed, kill, Du, Dv } = config;

      // Inject cursor bloom before simulation step
      injectBloom(frameCount);

      for (let step = 0; step < STEPS_PER_FRAME; step++) {
        for (let i = 0; i < simW * simH; i++) {
          const uvv = U[i] * V[i] * V[i];
          const lapu = laplacian(U, i);
          const lapv = laplacian(V, i);

          Utmp[i] = U[i] + Du * lapu - uvv + feed * (1 - U[i]);
          Vtmp[i] = V[i] + Dv * lapv + uvv - (kill + feed) * V[i];
        }

        const tmp = U;
        U = Utmp;
        Utmp = tmp;

        const tmp2 = V;
        V = Vtmp;
        Vtmp = tmp2;
      }

      const offCanvas = document.createElement("canvas");
      offCanvas.width = simW;
      offCanvas.height = simH;
      const offCtx = offCanvas.getContext("2d")!;

      const imageData = offCtx.createImageData(simW, simH);
      const data = imageData.data;

      for (let i = 0; i < simW * simH; i++) {
        const [r, g, b] = paletteMap(V[i]);
        const idx = i * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }

      offCtx.putImageData(imageData, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(offCanvas, 0, 0, simW, simH, 0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;

      frameCount++;
      if (frameCount % 60 === 0) {
        console.log("[CA] Frame", frameCount);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [config, reducedMotion, reactiveTouch]);

  if (reducedMotion) {
    // When reduced motion is enabled, let the Phosphor Drift background show through
    return null;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas 
        ref={canvasRef} 
        style={{ 
          display: "block", 
          width: "100%", 
          height: "100%",
          filter: "blur(4px) saturate(1.2) brightness(0.85)"
        }} 
      />
    </div>
  );
};

// Count active pixels in RD field (pixels that changed since last frame)
// A pixel is "active" if its absolute change exceeds a threshold
export function countActivePixels(
  currentData: Float32Array,
  previousData: Float32Array | null,
  changeThreshold?: number // Minimum absolute change to be considered "active"
): { count: number; percentage: number; mean: number; stdDev: number; adaptiveThreshold: number } {
  const len = currentData.length;
  if (len === 0) {
    return { count: 0, percentage: 0, mean: 0, stdDev: 0, adaptiveThreshold: 0 };
  }
  
  // If no previous frame, no pixels have changed
  if (!previousData || previousData.length !== len) {
    return { count: 0, percentage: 0, mean: 0, stdDev: 0, adaptiveThreshold: 0 };
  }
  
  // Compute absolute differences
  const differences = new Float32Array(len);
  for (let i = 0; i < len; i++) {
    differences[i] = Math.abs(currentData[i] - previousData[i]);
  }
  
  // Compute mean and standard deviation of differences
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += differences[i];
  }
  const mean = sum / len;
  
  let variance = 0;
  for (let i = 0; i < len; i++) {
    const diff = differences[i] - mean;
    variance += diff * diff;
  }
  variance /= len;
  const stdDev = Math.sqrt(variance);
  
  // Use adaptive threshold: mean + 1 std dev (captures pixels that changed significantly)
  // Or use provided threshold if given
  const adaptiveThreshold = changeThreshold !== undefined ? changeThreshold : mean + stdDev;
  
  let activeCount = 0;
  for (let i = 0; i < len; i++) {
    if (differences[i] > adaptiveThreshold) {
      activeCount++;
    }
  }
  
  return {
    count: activeCount,
    percentage: activeCount / len,
    mean,
    stdDev,
    adaptiveThreshold,
  };
}

// Compute metrics from RD field data
function computeMetrics(data: Float32Array, width: number, height: number): Metrics {
  const len = data.length;
  if (len === 0) {
    return { energy: 0, turbulence: 0, peak: 0, coherence: 0 };
  }

  // Energy: RMS of the field
  let sumSq = 0;
  let sum = 0;
  let max = -Infinity;
  let min = Infinity;
  for (let i = 0; i < len; i++) {
    const v = data[i];
    sumSq += v * v;
    sum += v;
    if (v > max) max = v;
    if (v < min) min = v;
  }
  const rms = Math.sqrt(sumSq / len);
  const energy = Math.min(1, rms * 2); // Scale to 0-1 range

  // Peak: normalized peak value
  const range = max - min || 1;
  const peak = Math.min(1, (max - min) / range * 2); // Scale to 0-1

  // Turbulence: variance/spread of values
  const mean = sum / len;
  let variance = 0;
  for (let i = 0; i < len; i++) {
    const diff = data[i] - mean;
    variance += diff * diff;
  }
  variance /= len;
  const stdDev = Math.sqrt(variance);
  const turbulence = Math.min(1, stdDev * 3); // Scale to 0-1

  // Coherence: spatial correlation (simplified - check local gradients)
  let gradientSum = 0;
  let gradientCount = 0;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const center = data[idx];
      const right = data[idx + 1];
      const down = data[(y + 1) * width + x];
      
      const gradX = Math.abs(center - right);
      const gradY = Math.abs(center - down);
      
      gradientSum += gradX + gradY;
      gradientCount += 2;
    }
  }
  const avgGradient = gradientCount > 0 ? gradientSum / gradientCount : 0;
  // Low gradient = high coherence, high gradient = low coherence
  const coherence = Math.max(0, Math.min(1, 1 - avgGradient * 10)); // Invert and scale

  return {
    energy: Math.max(0, Math.min(1, energy)),
    turbulence: Math.max(0, Math.min(1, turbulence)),
    peak: Math.max(0, Math.min(1, peak)),
    coherence: Math.max(0, Math.min(1, coherence)),
  };
}

const AnimatedBackdrop: React.FC = () => {
  const { showBackdrop, backdropVariant, reducedMotion, ca: caConfig, lenia3d: leniaConfig, turing: turingConfig, setCursorLightDir, hoverCenter, hoverStrength, sonificationEnabled } = useUiStore();
  const effectiveLightDir = useEffectiveLightDir();
  const { ready: audioReady, start: startAudio, stop: stopAudio, setMetrics: setFeedbackMetrics } = useFeedbackCircuitAudio();
  const { ready: rdAudioReady, start: startRDAudio, stop: stopRDAudio, updateFromField: updateRDAudio } = useRDAudioWavetable();
  const { ready: fftAudioReady, start: startFFTAudio, stop: stopFFTAudio, updateFromField: updateFFTAudio } = useRDAudioFFT();
  const { start: startCursorTicks, stop: stopCursorTicks, setCursorVelocity01 } = useCursorTickClicksAudio();
  const [metrics, setMetrics] = useState<Metrics>({ energy: 0, turbulence: 0, peak: 0, coherence: 0 });
  const [activePixels, setActivePixels] = useState<{ count: number; percentage: number; mean: number; stdDev: number; adaptiveThreshold: number }>({ 
    count: 0, 
    percentage: 0, 
    mean: 0, 
    stdDev: 0, 
    adaptiveThreshold: 0 
  });

  // Use a ref to always read the current sonificationEnabled value
  const sonificationEnabledRef = useRef(sonificationEnabled);
  useEffect(() => {
    sonificationEnabledRef.current = sonificationEnabled;
  }, [sonificationEnabled]);

  // Store previous frame's data to detect changes
  const previousFrameDataRef = useRef<Float32Array | null>(null);

  const handleFieldUpdate = useCallback((snapshot: {
    width: number;
    height: number;
    data: Float32Array;
    dt?: number;
    simTime?: number;
    dtModPeriod?: number;
    f?: number;
    k?: number;
    mouseU?: number;
    mouseV?: number;
    touchGain?: number;
  }) => {
    // Compute metrics from field data
    const computedMetrics = computeMetrics(snapshot.data, snapshot.width, snapshot.height);
    setMetrics(computedMetrics);
    
    // Count active pixels (pixels that changed since last frame)
    // This captures pixels that changed significantly between frames
    const active = countActivePixels(snapshot.data, previousFrameDataRef.current);
    setActivePixels(active);
    
    // Store current frame as previous for next update (make a copy)
    previousFrameDataRef.current = new Float32Array(snapshot.data);
    
    // Debug: log data stats periodically
    if (Math.random() < 0.05) {
      console.log('[AnimatedBackdrop] Active pixels stats (changed pixels):', {
        count: active.count,
        percentage: (active.percentage * 100).toFixed(1) + '%',
        meanChange: active.mean.toFixed(3),
        stdDevChange: active.stdDev.toFixed(3),
        changeThreshold: active.adaptiveThreshold.toFixed(3),
      });
    }
    
    // Update feedback circuit audio with metrics
    if (setFeedbackMetrics) {
      setFeedbackMetrics(computedMetrics);
    }

    // Only update audio if sonification is enabled
    if (!sonificationEnabledRef.current) return;
    
    // Update wavetable audio
    updateRDAudio(snapshot);
    
    // Update FFT audio
    updateFFTAudio(snapshot);
  }, [updateRDAudio, updateFFTAudio, setFeedbackMetrics]);
  
  // Debug: log metrics and active pixels updates
  useEffect(() => {
    console.log('[AnimatedBackdrop] Metrics updated:', metrics, 'Active pixels:', activePixels);
  }, [metrics, activePixels]);

  // Control audio synths based on sonification toggle
  useEffect(() => {
    if (sonificationEnabled) {
      // Start wavetable synth immediately when enabled
      if (!rdAudioReady) {
        startRDAudio();
      }
      // Start FFT audio synth
      if (!fftAudioReady) {
        startFFTAudio();
      }
      // Also start feedback circuit audio (silent, used for metrics only)
      if (!audioReady) {
        startAudio();
      }
      // Start cursor tick clicks immediately when sonification is enabled
      startCursorTicks();
    } else {
      stopRDAudio();
      stopFFTAudio();
      stopCursorTicks(); // Stop cursor ticks when sonification is disabled
    }
  }, [sonificationEnabled, rdAudioReady, startRDAudio, fftAudioReady, startFFTAudio, audioReady, startAudio, stopRDAudio, stopFFTAudio, stopCursorTicks, startCursorTicks]);

  // Update cursor light direction based on mouse position (10% influence)
  useEffect(() => {
    if (typeof window === "undefined" || backdropVariant !== "turing") return;

    function handleMove(e: MouseEvent) {
      const { innerWidth, innerHeight } = window;
      if (!innerWidth || !innerHeight) return;

      // Disable on mobile
      if (innerWidth < 768) {
        setCursorLightDir([0.0, 0.0, 1.0]);
        return;
      }

      const mx = (e.clientX / innerWidth) * 2 - 1;
      const my = (e.clientY / innerHeight) * 2 - 1;

      // Small influence; z fixed to keep light above surface
      const cursor: [number, number, number] = [mx * 0.3, -my * 0.2, 1.0];
      setCursorLightDir(cursor);
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [backdropVariant, setCursorLightDir]);

  // Start cursor tick clicks on user interaction (only if sonification is enabled)
  useEffect(() => {
    const onClick = () => {
      // Only start cursor ticks if sonification is enabled
      if (sonificationEnabled) {
        startCursorTicks();
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [startCursorTicks, sonificationEnabled]);

  // Track mouse movement velocity for cursor tick clicks
  useEffect(() => {
    const lastRef = { x: 0, y: 0, t: 0, init: false };
    let decayTimer: number | null = null;

    const handleMove = (e: MouseEvent) => {
      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;

      // Check if mouse is outside window bounds - if so, reset velocity immediately
      const { innerWidth, innerHeight } = window;
      if (x < 0 || x > innerWidth || y < 0 || y > innerHeight) {
        setCursorVelocity01(0);
        lastRef.init = false; // Reset tracking
        if (decayTimer !== null) {
          clearTimeout(decayTimer);
          decayTimer = null;
        }
        return;
      }

      // Clear any existing decay timer
      if (decayTimer !== null) {
        clearTimeout(decayTimer);
        decayTimer = null;
      }

      if (!lastRef.init) {
        lastRef.x = x;
        lastRef.y = y;
        lastRef.t = now;
        lastRef.init = true;
        return;
      }

      const dt = (now - lastRef.t) / 1000;
      const dx = x - lastRef.x;
      const dy = y - lastRef.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = dist / Math.max(dt, 0.001); // px/sec

      // Cap speed to prevent runaway from large coordinate jumps
      const maxSpeed = 1500; // tune this
      let v01 = Math.min(1, speed / maxSpeed);
      
      // If movement is very slow, immediately set velocity to 0
      // This makes ticks stop immediately when movement stops
      if (v01 < 0.05) {
        v01 = 0;
      }
      
      setCursorVelocity01(v01);

      lastRef.x = x;
      lastRef.y = y;
      lastRef.t = now;
    };

    const handleLeave = () => {
      // Reset velocity immediately when mouse leaves window
      setCursorVelocity01(0);
      lastRef.init = false;
      if (decayTimer !== null) {
        clearTimeout(decayTimer);
        decayTimer = null;
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      if (decayTimer !== null) {
        clearTimeout(decayTimer);
      }
    };
  }, [setCursorVelocity01]);

  if (!showBackdrop) {
    // When backdrop is disabled, let the Phosphor Drift background show through
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      {backdropVariant === "ca" && <CellularAutomataBloom config={caConfig} />}
      {backdropVariant === "field" && <NeuralFieldFlow />}
      {backdropVariant === "lenia3d" && (() => {
        console.log("[AnimatedBackdrop] Rendering Lenia25DBackdrop");
        return <Lenia25DBackdrop config={leniaConfig} />;
      })()}
      {backdropVariant === "turing" && (() => {
        const props = reducedMotion ? {
          ...turingConfig,
          dt: (turingConfig.dt ?? 1.0) * 0.3,
          stepsPerFrame: Math.max(1, Math.floor((turingConfig.stepsPerFrame ?? 10) * 0.3)),
          warpSpeed: (turingConfig.warpSpeed ?? 0.06) * 0.3,
          lightDir: effectiveLightDir,
          hoverCenter: hoverCenter,
          hoverStrength: hoverStrength,
          onFieldUpdate: handleFieldUpdate,
        } : {
          ...turingConfig,
          lightDir: effectiveLightDir,
          hoverCenter: hoverCenter,
          hoverStrength: hoverStrength,
          onFieldUpdate: handleFieldUpdate,
        };
        console.log('[AnimatedBackdrop] Rendering TuringStripesBackdrop with enableColor:', props.enableColor, 'full turingConfig:', turingConfig);
        return <TuringStripesBackdrop {...props} />;
      })()}
      {backdropVariant === "none" && (
        null
      )}
      
      {backdropVariant !== "none" && (
        <div className="fixed inset-0 z-[1] pointer-events-none bg-[#0B0F10]/5" />
      )}
    </div>
  );
};

export default AnimatedBackdrop;
