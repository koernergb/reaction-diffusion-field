// src/components/AnimatedBackdrop.tsx
"use client";

import { useCallback, useEffect } from "react";
import { useUiStore, useEffectiveLightDir } from "@/lib/uiStore";
import { useFeedbackCircuitAudio } from "@/audio/useFeedbackCircuitAudio";
import { useRDAudioWavetable } from "@/audio/useRDAudioWavetable";
import { useRDAudioFFT } from "@/audio/useRDAudioFFT";
import { useCursorTickClicksAudio } from "@/audio/useCursorTickClicksAudio";
import dynamic from "next/dynamic";

type Metrics = {
  energy: number;
  turbulence: number;
  peak: number;
  coherence: number;
};

const TuringStripesBackdrop = dynamic(
  () => import("@koerner/reaction-diffusion-engine/react").then((m) => m.default),
  { ssr: false }
);

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

const AnimatedBackdrop = () => {
  const { showBackdrop, reducedMotion, turing: turingConfig, setCursorLightDir, hoverCenter, hoverStrength, sonificationEnabled } = useUiStore();
  const effectiveLightDir = useEffectiveLightDir();
  const { ready: audioReady, start: startAudio, setMetrics: setFeedbackMetrics } = useFeedbackCircuitAudio();
  const { ready: rdAudioReady, start: startRDAudio, stop: stopRDAudio, updateFromField: updateRDAudio } = useRDAudioWavetable();
  const { ready: fftAudioReady, start: startFFTAudio, stop: stopFFTAudio, updateFromField: updateFFTAudio } = useRDAudioFFT();
  const { start: startCursorTicks, stop: stopCursorTicks, setCursorVelocity01 } = useCursorTickClicksAudio();
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
    
    // Update feedback circuit audio with metrics
    if (setFeedbackMetrics) {
      setFeedbackMetrics(computedMetrics);
    }

    // Update wavetable audio
    updateRDAudio(snapshot);
    
    // Update FFT audio
    updateFFTAudio(snapshot);
  }, [updateRDAudio, updateFFTAudio, setFeedbackMetrics]);
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
    if (typeof window === "undefined") return;

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
  }, [setCursorLightDir]);

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
      {(() => {
        const props = reducedMotion ? {
          ...turingConfig,
          dt: (turingConfig.dt ?? 1.0) * 0.3,
          stepsPerFrame: Math.max(1, Math.floor((turingConfig.stepsPerFrame ?? 10) * 0.3)),
          warpSpeed: (turingConfig.warpSpeed ?? 0.06) * 0.3,
          lightDir: effectiveLightDir,
          hoverCenter: hoverCenter,
          hoverStrength: hoverStrength,
          onFieldUpdate: sonificationEnabled ? handleFieldUpdate : undefined,
        } : {
          ...turingConfig,
          lightDir: effectiveLightDir,
          hoverCenter: hoverCenter,
          hoverStrength: hoverStrength,
          onFieldUpdate: sonificationEnabled ? handleFieldUpdate : undefined,
        };
        return <TuringStripesBackdrop {...props} />;
      })()}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[#0B0F10]/5" />
    </div>
  );
};

export default AnimatedBackdrop;
