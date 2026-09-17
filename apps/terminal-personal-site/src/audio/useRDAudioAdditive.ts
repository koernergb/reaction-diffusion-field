"use client";

import { useEffect, useRef, useCallback } from "react";

type FieldMetrics = {
  energy: number;     // 0..1
  turbulence: number; // 0..1
  peak: number;       // 0..1
  coherence: number;  // 0..1
  bloom: number;      // 0..1 (maps from dt)
};

const N_PARTIALS = 16;
const BASE_FREQ = 110; // base pitch in Hz, can tweak later

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function makeSoftClipCurve(
  drive: number,
  samples = 1024
): Float32Array {
  const curve = new Float32Array(samples);
  const k = 1 + drive * 10; // more drive => harder curve
  const inv = 1 / (1 + k);
  for (let i = 0; i < samples; i++) {
    const x = (i / (samples - 1)) * 2 - 1; // -1..1
    curve[i] = ((1 + k) * x) / (1 + k * Math.abs(x)); // simple soft clip
  }
  return curve;
}

function buildPeriodicWaveFromMetrics(
  ctx: AudioContext,
  metrics: FieldMetrics
): PeriodicWave {
  const { energy, turbulence, peak, coherence } = metrics;

  const nHarm = N_PARTIALS;

  // real[0] ignored, imag[0] must be 0
  const real = new Float32Array(nHarm + 1);
  const imag = new Float32Array(nHarm + 1);

  // Coherence → how quickly partials decay
  // high coherence => slow decay (more harmonic, chord-like)
  // low coherence  => faster decay (noisier spectrum)
  const decaySlow = 0.08;
  const decayFast = 0.30;
  const decay = lerp(decayFast, decaySlow, coherence); // coherence=1 => slow decay

  // Peak → edge / harshness
  const oddBoost = 1 + 0.6 * peak; // boost odd partials
  const highBoost = 0.3 * peak;    // subtle high shelf

  // Energy scales overall amp
  const energyScale = 0.4 + 0.6 * energy;

  let maxAmp = 0;

  for (let k = 1; k <= nHarm; k++) {
    const idx = k;

    // Base exponential decay over harmonics
    const base = Math.exp(-decay * (k - 1));

    // Odd/even emphasis from peak
    const oddEven = k % 2 === 1 ? oddBoost : 1.0;

    // High shelf from peak
    const highFactor = 1 + highBoost * (k / nHarm);

    let amp = base * oddEven * highFactor;

    // Apply overall energy scaling
    amp *= energyScale;

    imag[idx] = amp; // sine components
    real[idx] = 0;

    if (amp > maxAmp) maxAmp = amp;
  }

  // Normalize so we don't blow up
  if (maxAmp > 0) {
    const norm = 1 / maxAmp;
    for (let k = 1; k <= nHarm; k++) {
      imag[k] *= norm;
    }
  }

  return ctx.createPeriodicWave(real, imag, { disableNormalization: true });
}

export function useRDAudioAdditive() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const lpRef = useRef<BiquadFilterNode | null>(null);
  const shaperRef = useRef<WaveShaperNode | null>(null);
  const combDelayRef = useRef<DelayNode | null>(null);
  const combFeedbackRef = useRef<GainNode | null>(null);
  const combDampRef = useRef<BiquadFilterNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const metricsRef = useRef<FieldMetrics>({
    energy: 0,
    turbulence: 0,
    peak: 0,
    coherence: 0.5,
    bloom: 0,
  });

  const startedRef = useRef(false);
  const controlRafRef = useRef<number | null>(null);

  // throttle periodic-wave rebuild
  const waveDirtyRef = useRef(false);
  
  // White noise LFO for comb filter delay modulation
  const combNoiseLfoRef = useRef(0.0); // Current smoothed noise value (-1 to 1)

  const start = useCallback(() => {
    if (startedRef.current) return;

    const ctx =
      audioContextRef.current ??
      new (window.AudioContext || (window as any).webkitAudioContext)();

    audioContextRef.current = ctx;

    const osc = ctx.createOscillator();
    osc.type = "sine"; // will be replaced by periodic wave

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 4000;
    lp.Q.value = 0.7;

    const shaper = ctx.createWaveShaper();
    shaper.curve = makeSoftClipCurve(0.2);

    // Comb filter: delay + feedback + damping
    const combDelay = ctx.createDelay(0.1); // max 100ms delay
    combDelay.delayTime.value = 0.025; // 25ms delay (resonant frequency ~40Hz, more noticeable)
    
    const combDamp = ctx.createBiquadFilter();
    combDamp.type = "lowpass";
    combDamp.frequency.value = 5000; // Damping filter to prevent harsh resonances
    combDamp.Q.value = 0.7;
    
    const combFeedback = ctx.createGain();
    combFeedback.gain.value = 0.65; // Higher initial feedback for more audible effect

    const master = ctx.createGain();
    master.gain.value = 0.08; // safe default

    // Connect graph: osc -> lp -> shaper -> combDelay -> master -> destination
    // Comb feedback loop: combDelay -> combDamp -> combFeedback -> combDelay
    osc.connect(lp);
    lp.connect(shaper);
    shaper.connect(combDelay);
    combDelay.connect(combDamp);
    combDamp.connect(combFeedback);
    combFeedback.connect(combDelay); // feedback loop
    combDelay.connect(master); // Output from delay (before damping for more character)
    master.connect(ctx.destination);

    // Initial periodic wave based on default metrics
    const wave = buildPeriodicWaveFromMetrics(ctx, metricsRef.current);
    osc.setPeriodicWave(wave);

    // Start oscillator
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    osc.frequency.value = BASE_FREQ;
    osc.start();

    oscRef.current = osc;
    lpRef.current = lp;
    shaperRef.current = shaper;
    combDelayRef.current = combDelay;
    combDampRef.current = combDamp;
    combFeedbackRef.current = combFeedback;
    masterGainRef.current = master;

    startedRef.current = true;
    waveDirtyRef.current = false;

    // --- Control loop: map metrics -> params ---
    const tick = () => {
      const audioContext = audioContextRef.current;
      const oscillator = oscRef.current;
      const lpFilter = lpRef.current;
      const shaperNode = shaperRef.current;
      const combDelayNode = combDelayRef.current;
      const combDampNode = combDampRef.current;
      const combFeedbackNode = combFeedbackRef.current;
      const masterNode = masterGainRef.current;

      if (!audioContext || !oscillator || !lpFilter || !shaperNode || !combDelayNode || !combDampNode || !combFeedbackNode || !masterNode) {
        controlRafRef.current = requestAnimationFrame(tick);
        return;
      }

      const t = audioContext.currentTime;
      const m = metricsRef.current;
      const { energy, turbulence, peak, coherence, bloom } = m;

      // 1) Master gain: energy + bloom
      const loudFactor = clamp(0.5 * energy + 0.5 * bloom, 0, 1);
      const minGain = 0.03;
      const maxGain = 0.22;
      const targetGain = lerp(minGain, maxGain, loudFactor);
      masterNode.gain.setTargetAtTime(targetGain, t, 0.08);

      // 2) LPF cutoff: energy + peak
      const brightness = clamp(0.4 * energy + 0.6 * peak, 0, 1);
      const minLp = 800;
      const maxLp = 9000;
      const targetLp = lerp(minLp, maxLp, brightness);
      lpFilter.frequency.setTargetAtTime(targetLp, t, 0.12);

      // 3) Distortion drive: peak
      const drive = lerp(0.05, 0.75, peak);
      shaperNode.curve = makeSoftClipCurve(drive) as any;

      // 4) Comb filter feedback: energy controls amount, turbulence adds variation
      // More energy = more resonant feedback
      // More turbulence = less stable, more chaotic feedback
      const baseFeedback = 0.5; // Higher base for more audible effect
      const energyBoost = 0.25 * energy; // More energy = more feedback
      const turbulenceMod = -0.1 * turbulence; // turbulence slightly reduces feedback
      const targetFeedback = clamp(baseFeedback + energyBoost + turbulenceMod, 0.35, 0.85);
      combFeedbackNode.gain.setTargetAtTime(targetFeedback, t, 0.08);
      
      // Also modulate damping filter with peak for more character
      const dampFreq = lerp(3000, 8000, peak); // More peak = brighter comb
      combDampNode.frequency.setTargetAtTime(dampFreq, t, 0.1);
      
      // White noise LFO for comb delay modulation (turbulence controls amplitude)
      // Update LFO: smooth random walk
      const noiseTarget = (Math.random() * 2 - 1); // -1 to 1
      const noiseSmoothing = 0.15; // How fast the noise LFO updates
      combNoiseLfoRef.current = combNoiseLfoRef.current + noiseSmoothing * (noiseTarget - combNoiseLfoRef.current);
      
      // Apply noise LFO to delay time, scaled by turbulence
      const baseDelay = 0.025;
      const noiseDepth = 0.008 * turbulence; // Max ±8ms modulation, scaled by turbulence
      const noiseMod = combNoiseLfoRef.current * noiseDepth;
      const targetDelay = clamp(baseDelay + noiseMod, 0.015, 0.050);
      combDelayNode.delayTime.setTargetAtTime(targetDelay, t, 0.05); // Faster response for LFO

      // 5) Pitch base: slight dependence on coherence (more coherent → lower, more grounded)
      const basePitch = lerp(130, 65, coherence); // Hz
      // Turbulence → tiny jitter (don't overdo)
      const jitterDepth = 0.02; // ±2%
      const motion = turbulence * (1 - coherence);
      const jitter = (Math.random() * 2 - 1) * jitterDepth * motion;
      const freq = basePitch * (1 + jitter);
      oscillator.frequency.setTargetAtTime(freq, t, 0.12);

      // 6) If waveDirtyRef is set, rebuild periodic wave gently
      if (waveDirtyRef.current) {
        const newWave = buildPeriodicWaveFromMetrics(audioContext, m);
        oscillator.setPeriodicWave(newWave);
        waveDirtyRef.current = false;
      }

      controlRafRef.current = requestAnimationFrame(tick);
    };

    if (controlRafRef.current !== null) {
      cancelAnimationFrame(controlRafRef.current);
    }
    controlRafRef.current = requestAnimationFrame(tick);
  }, []);

  const stop = useCallback(() => {
    const ctx = audioContextRef.current;
    if (controlRafRef.current !== null) {
      cancelAnimationFrame(controlRafRef.current);
      controlRafRef.current = null;
    }
    if (ctx) {
      ctx.suspend();
    }
  }, []);

  const setMetrics = useCallback((next: Partial<FieldMetrics>) => {
    const current = metricsRef.current;
    const merged: FieldMetrics = {
      energy: clamp(next.energy ?? current.energy, 0, 1),
      turbulence: clamp(next.turbulence ?? current.turbulence, 0, 1),
      peak: clamp(next.peak ?? current.peak, 0, 1),
      coherence: clamp(next.coherence ?? current.coherence, 0, 1),
      bloom: clamp(next.bloom ?? current.bloom, 0, 1),
    };

    // Smooth merge to avoid jumps
    const mix = 0.25;
    metricsRef.current = {
      energy: current.energy + mix * (merged.energy - current.energy),
      turbulence:
        current.turbulence + mix * (merged.turbulence - current.turbulence),
      peak: current.peak + mix * (merged.peak - current.peak),
      coherence:
        current.coherence + mix * (merged.coherence - current.coherence),
      bloom: current.bloom + mix * (merged.bloom - current.bloom),
    };

    // Mark spectrum dirty so control loop rebuilds periodic wave
    // (especially important for energy/peak/coherence changes)
    waveDirtyRef.current = true;
  }, []);

  useEffect(() => {
    return () => {
      if (controlRafRef.current !== null) {
        cancelAnimationFrame(controlRafRef.current);
      }
      const ctx = audioContextRef.current;
      if (ctx) {
        ctx.close();
      }
      audioContextRef.current = null;
      oscRef.current = null;
      lpRef.current = null;
      shaperRef.current = null;
      combDelayRef.current = null;
      combDampRef.current = null;
      combFeedbackRef.current = null;
      masterGainRef.current = null;
      startedRef.current = false;
    };
  }, []);

  return {
    start,
    stop,
    setMetrics,
  };
}

