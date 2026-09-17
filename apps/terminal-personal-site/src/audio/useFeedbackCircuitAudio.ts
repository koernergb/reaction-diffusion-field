"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FEEDBACK = 0.99;      // feedback gain in the loop
const DELAY_TIME = 0.012;   // 12 ms delay
const DRIVE = 0.25;         // 0–1, waveshaper intensity
const MASTER_GAIN = 0.35;   // safe output level (increased for louder Voice A)
const IMPULSE_INTERVAL_MS = 500; // periodic tick every 500ms
const TICK_SAMPLES = 256;   // longer impulse buffer
const TICK_LEVEL = 0.03;    // impulse amplitude (increased)
const DEFAULT_GATE_THRESHOLD = 0.005; // envelope gate threshold (very permissive)

export type GateMode = 'breathing' | 'metallic' | 'glitch';

function makeSoftClipCurve(drive: number, samples = 1024): Float32Array {
  const curve = new Float32Array(samples);
  const preGain = 1.5 + 6 * drive * drive; // reduced to prevent overdriving

  for (let i = 0; i < samples; i++) {
    // Map index to input range [-1, 1]
    const x = (i / (samples - 1)) * 2 - 1;
    
    // Pre-gain
    let y = x * preGain;
    
    // Soft clip: tanh
    y = Math.tanh(y);
    
    // tanh already outputs in [-1, 1], so we're good
    curve[i] = y;
  }

  return curve;
}

export function useFeedbackCircuitAudio() {
  const [ready, setReady] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const shaperRef = useRef<WaveShaperNode | null>(null);
  const delayRef = useRef<DelayNode | null>(null);
  const feedbackGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gateGainRef = useRef<GainNode | null>(null);
  // Modulation output: tap Voice A's signal for phase modulation
  const modulationOutputRef = useRef<GainNode | null>(null);
  const impulseTimeoutRef = useRef<number | null>(null);
  const impulseBufferRef = useRef<AudioBuffer | null>(null);
  const envelopeLoopRef = useRef<number | null>(null);
  const gateThresholdRef = useRef(DEFAULT_GATE_THRESHOLD);
  const gateModeRef = useRef<GateMode>('glitch');
  const impulsesRunningRef = useRef(false);
  const lfoPhaseRef = useRef(0); // LFO phase accumulator
  const lfoValueRef = useRef(0.5); // Current smoothed LFO value (0-1)
  const combsRef = useRef<Array<{ delay: DelayNode; fb: GainNode; damp: BiquadFilterNode }>>([]);
  const combSumRef = useRef<GainNode | null>(null);
  const noiseBurstTimeoutRef = useRef<number | null>(null);
  const noiseBurstsRunningRef = useRef(false);
  const noiseLfoPhaseRef = useRef(0); // LFO phase accumulator for noise bursts (rate)
  const noiseLfoValueRef = useRef(0.5); // Current smoothed LFO value (0-1) for rate
  const noiseDurationLfoPhaseRef = useRef(0); // LFO phase accumulator for burst duration
  const noiseDurationLfoValueRef = useRef(0.5); // Current smoothed LFO value (0-1) for duration
  
  // RD metrics for Voice A modulation
  const metricsRef = useRef<{
    energy: number;
    peak: number;
    coherence: number;
    turbulence: number;
  }>({
    energy: 0.5,
    peak: 0.25,
    coherence: 0.5,
    turbulence: 0.3,
  });

  const start = useCallback(() => {
    // If context already exists and is running, do nothing
    if (ctxRef.current && ctxRef.current.state === "running") {
      return;
    }

    // If context exists but is suspended, just resume and restart impulses
    if (ctxRef.current && ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
      // Restart Poisson process if not already running
      if (!impulsesRunningRef.current) {
        impulsesRunningRef.current = true;
        const baseRateHz = 2.0;
        const lfoFreqHz = 0.15;
        let lastScheduleTime = performance.now();

        const updateLFO = (dt: number) => {
          lfoPhaseRef.current += dt * lfoFreqHz * 2 * Math.PI;
          const noise = (Math.random() - 0.5) * 0.1;
          const target = 0.5 + 0.5 * Math.sin(lfoPhaseRef.current) + noise;
          const alpha = 0.05;
          lfoValueRef.current = lfoValueRef.current + alpha * (target - lfoValueRef.current);
          lfoValueRef.current = Math.max(0, Math.min(1, lfoValueRef.current));
        };

        const scheduleNextImpulse = () => {
          if (!ctxRef.current || !impulsesRunningRef.current) return;
          
          const now = performance.now();
          const dt = (now - lastScheduleTime) / 1000;
          lastScheduleTime = now;
          updateLFO(dt);

          const rateMod = 0.5 + lfoValueRef.current * 1.5;
          // Energy and turbulence increase the rate: more energy/turbulence = faster, more active
          const energyMod = 0.7 + 0.8 * metricsRef.current.energy; // 0.7x to 1.5x
          const turbulenceMod = 0.7 + 0.8 * metricsRef.current.turbulence; // 0.7x to 1.5x
          const modulatedRateHz = baseRateHz * rateMod * energyMod * turbulenceMod;

          const u = Math.random();
          const intervalSec = -Math.log(1 - u) / modulatedRateHz;
          const intervalMs = intervalSec * 1000;
          
          impulseTimeoutRef.current = window.setTimeout(() => {
            if (!ctxRef.current || !impulsesRunningRef.current) return;
            const audioCtx = ctxRef.current;
            const shaper = shaperRef.current;
            const buffer = impulseBufferRef.current;
            if (audioCtx && shaper && buffer && audioCtx.state === "running") {
              try {
                const src = audioCtx.createBufferSource();
                src.buffer = buffer;
                src.connect(shaper);
                src.start();
              } catch (e) {
                console.warn("[useFeedbackCircuitAudio] Error creating impulse:", e);
              }
            }
            scheduleNextImpulse();
          }, intervalMs);
        };
        scheduleNextImpulse();
      }

      // Restart noise burst Poisson process if not already running
      if (!noiseBurstsRunningRef.current) {
        noiseBurstsRunningRef.current = true;
        const noiseBaseRateHz = 1.0;
        const noiseLfoFreqHz = 0.12;
        let lastNoiseScheduleTime = performance.now();

        const updateNoiseLFO = (dt: number) => {
          noiseLfoPhaseRef.current += dt * 0.12 * 2 * Math.PI; // 0.12 Hz
          const noise = (Math.random() - 0.5) * 0.1;
          const target = 0.5 + 0.5 * Math.sin(noiseLfoPhaseRef.current) + noise;
          const alpha = 0.05;
          noiseLfoValueRef.current = noiseLfoValueRef.current + alpha * (target - noiseLfoValueRef.current);
          noiseLfoValueRef.current = Math.max(0, Math.min(1, noiseLfoValueRef.current));
        };

        const updateDurationLFO = (dt: number) => {
          noiseDurationLfoPhaseRef.current += dt * 0.08 * 2 * Math.PI; // 0.08 Hz
          const noise = (Math.random() - 0.5) * 0.1;
          const target = 0.5 + 0.5 * Math.sin(noiseDurationLfoPhaseRef.current) + noise;
          const alpha = 0.05;
          noiseDurationLfoValueRef.current = noiseDurationLfoValueRef.current + alpha * (target - noiseDurationLfoValueRef.current);
          noiseDurationLfoValueRef.current = Math.max(0, Math.min(1, noiseDurationLfoValueRef.current));
        };

        const createNoiseBurst = (durationMs: number): AudioBuffer => {
          const audioCtx = ctxRef.current;
          if (!audioCtx) throw new Error("No audio context");
          const durationSec = durationMs / 1000;
          const sampleCount = Math.floor(audioCtx.sampleRate * durationSec);
          const buffer = audioCtx.createBuffer(1, sampleCount, audioCtx.sampleRate);
          const data = buffer.getChannelData(0);

          for (let i = 0; i < sampleCount; i++) {
            data[i] = Math.random() * 2 - 1;
          }

          return buffer;
        };

        const triggerNoiseBurst = () => {
          const audioCtx = ctxRef.current;
          const combSum = combSumRef.current;
          const combs = combsRef.current;

          if (!audioCtx || !combSum || audioCtx.state !== "running") {
            return;
          }

          try {
            // Base duration range: 80-180 ms
            // Modulate slightly with duration LFO: ±20ms variation
            const baseDuration = 130; // center of range
            const durationRange = 50; // ±50ms from center
            const durationMod = (noiseDurationLfoValueRef.current - 0.5) * 2; // Map [0,1] to [-1,1]
            const durationMs = baseDuration + durationRange * durationMod + (Math.random() - 0.5) * 20; // Add small random jitter
            const buffer = createNoiseBurst(Math.max(60, Math.min(200, durationMs))); // Clamp to 60-200ms
            const src = audioCtx.createBufferSource();
            const env = audioCtx.createGain();

            src.buffer = buffer;

            const now = audioCtx.currentTime;
            env.gain.setValueAtTime(0, now);
            env.gain.linearRampToValueAtTime(1, now + 0.003); // 3ms attack
            env.gain.linearRampToValueAtTime(0, now + 0.025); // 25ms total duration

            src.connect(env);

            // Highpass filter to remove low frequencies
            const hp = audioCtx.createBiquadFilter();
            hp.type = "highpass";
            hp.frequency.value = 1500; // 1.5 kHz
            hp.Q.value = 1.0;

            // Bandpass filter to shape burst into metal plate character
            const bp = audioCtx.createBiquadFilter();
            bp.type = "bandpass";
            bp.frequency.value = 3500; // 3.5 kHz - more trebly
            bp.Q.value = 3.0; // moderately narrow

            env.connect(hp);
            hp.connect(bp);

            if (combs && combs.length > 0) {
              for (const comb of combs) {
                bp.connect(comb.delay);
              }
            }
            // Removed direct env → combSum fallback to ensure plate character is clear

            src.start();
            src.stop(now + buffer.duration);
          } catch (e) {
            console.warn("[useFeedbackCircuitAudio] Error creating noise burst:", e);
          }
        };

        const scheduleNextNoiseBurst = () => {
          if (!ctxRef.current || !noiseBurstsRunningRef.current) return;

          const now = performance.now();
          const dt = (now - lastNoiseScheduleTime) / 1000;
          lastNoiseScheduleTime = now;
          updateNoiseLFO(dt);
          updateDurationLFO(dt);

          const rateMod = 0.5 + noiseLfoValueRef.current * 1.5;
          const modulatedRateHz = noiseBaseRateHz * rateMod;

          const u = Math.random();
          const intervalSec = -Math.log(1 - u) / modulatedRateHz;
          const intervalMs = intervalSec * 1000;

          noiseBurstTimeoutRef.current = window.setTimeout(() => {
            if (!ctxRef.current || !noiseBurstsRunningRef.current) return;
            triggerNoiseBurst();
            scheduleNextNoiseBurst();
          }, intervalMs);
        };
        scheduleNextNoiseBurst();
      }

      return;
    }

    // Create new AudioContext
    const ctx = new AudioContext({ latencyHint: "interactive" });
    ctxRef.current = ctx;

    // Create nodes
    const masterGain = ctx.createGain();
    const shaper = ctx.createWaveShaper();
    const delay = ctx.createDelay(0.1); // max 100ms, we use 12ms
    const feedbackGain = ctx.createGain();
    const analyser = ctx.createAnalyser();
    const gateGain = ctx.createGain();

    // Configure analyser
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;

    // Set values
    feedbackGain.gain.value = FEEDBACK;
    delay.delayTime.value = DELAY_TIME;
    masterGain.gain.value = MASTER_GAIN;
    gateGain.gain.value = 0.7; // Start at higher level, will be controlled by envelope follower

    // Configure waveshaper (only shapes input impulses, not in feedback loop)
    shaper.curve = makeSoftClipCurve(DRIVE);
    shaper.oversample = "4x";

    // Modulation output: tap Voice A's signal before masterGain for phase modulation
    const modulationOutput = ctx.createGain();
    modulationOutput.gain.value = 1.0; // Full signal for modulation
    modulationOutputRef.current = modulationOutput;
    
    // Wire the graph:
    // Impulse: src → shaper → delay
    // Feedback loop: delay → feedbackGain → delay (linear, no shaper)
    // Output: delay → analyser → gateGain → masterGain → destination (muted)
    // Modulation tap: gateGain → modulationOutput (parallel to masterGain, this is the active output)
    shaper.connect(delay);
    delay.connect(feedbackGain);
    feedbackGain.connect(delay); // feedback loop (linear)
    delay.connect(analyser);
    analyser.connect(gateGain);
    gateGain.connect(modulationOutput); // Tap signal for modulation (this is the active path)
    gateGain.connect(masterGain);
    // Mute Voice A's audible output but keep it running for modulation
    masterGain.gain.value = 0.0; // Muted - Voice A is only used as modulation source
    // Don't connect masterGain to destination - Voice A should be silent
    // masterGain.connect(ctx.destination); // Commented out - Voice A is muted

    // Store refs
    masterGainRef.current = masterGain;
    shaperRef.current = shaper;
    delayRef.current = delay;
    feedbackGainRef.current = feedbackGain;
    analyserRef.current = analyser;
    gateGainRef.current = gateGain;

    // ================================
    // PHASE B0 — COMB BANK RESONATORS
    // ================================
    const combSum = ctx.createGain();
    combSum.gain.value = 0.0; // Muted: Voice B is disabled
    combSumRef.current = combSum;

    const ratios = [1.0, 1.33, 1.92, 2.54, 3.1];
    const baseDelay = 0.010; // 10 ms
    const feedbackValues = [0.65, 0.63, 0.61, 0.59, 0.57]; // More feedback for shorter delays (higher pitches) - reduced to prevent self-oscillation

    const combs: Array<{ delay: DelayNode; fb: GainNode; damp: BiquadFilterNode }> = [];

    for (let i = 0; i < ratios.length; i++) {
      const ratio = ratios[i];
      const delay = ctx.createDelay(0.1); // max 100ms
      const damp = ctx.createBiquadFilter();
      const fb = ctx.createGain();

      delay.delayTime.value = baseDelay * ratio;
      fb.gain.value = feedbackValues[i]; // Vary feedback: shorter delays (higher pitches) get more feedback
      damp.type = "lowpass";
      damp.frequency.value = 3000; // 3 kHz
      damp.Q.value = 0.1;

      // Wire feedback loop: delay → damp → fb → delay
      delay.connect(damp);
      damp.connect(fb);
      fb.connect(delay);

      // Wet output from delay goes to combSum
      delay.connect(combSum);

      combs.push({ delay, fb, damp });
    }

    combsRef.current = combs;

    // Highpass filter after combSum to clear out low "chunk" (80-200 Hz region)
    const combHP = ctx.createBiquadFilter();
    combHP.type = "highpass";
    combHP.frequency.value = 250; // Clear out reverby/heavy low frequencies
    combHP.Q.value = 0.7;

    // Connect combSum → combHP → masterGain (Voice B output)
    combSum.connect(combHP);
    combHP.connect(masterGain);

    // Create impulse buffer (reusable) - longer with exponential decay
    const buffer = ctx.createBuffer(1, TICK_SAMPLES, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < TICK_SAMPLES; i++) {
      const env = Math.exp(-i / 40); // quick exponential decay
      data[i] = TICK_LEVEL * env;
    }
    impulseBufferRef.current = buffer;

    // Poisson process for impulse generation with slow noise LFO modulation
    const baseRateHz = 2.0; // approx 2 events per second, same mean as 500 ms
    const lfoFreqHz = 0.15; // Slow LFO frequency (~0.15 Hz = ~6.7 second period)
    const lfoDepth = 0.6; // How much the LFO modulates the rate (0-1)

    // Slow noise LFO: smoothed random walk
    const updateLFO = (dt: number) => {
      // Accumulate phase
      lfoPhaseRef.current += dt * lfoFreqHz * 2 * Math.PI;
      
      // Add small random increments for noise
      const noise = (Math.random() - 0.5) * 0.1; // ±0.05
      const target = 0.5 + 0.5 * Math.sin(lfoPhaseRef.current) + noise;
      
      // Smooth toward target
      const alpha = 0.05; // Smoothing factor
      lfoValueRef.current = lfoValueRef.current + alpha * (target - lfoValueRef.current);
      lfoValueRef.current = Math.max(0, Math.min(1, lfoValueRef.current)); // Clamp to [0, 1]
    };

    const playImpulse = () => {
      const audioCtx = ctxRef.current;
      const shaper = shaperRef.current;
      const buffer = impulseBufferRef.current;

      if (!audioCtx || !shaper || !buffer || audioCtx.state !== "running") {
        return;
      }

      try {
        const src = audioCtx.createBufferSource();
        src.buffer = buffer;
        // Connect through shaper to shape the impulse before it enters the delay
        src.connect(shaper);
        src.start();
        // Buffer is 256 samples, so it will stop on its own after ~5.8ms at 44.1kHz
      } catch (e) {
        // Ignore errors (e.g., if context is closed)
        console.warn("[useFeedbackCircuitAudio] Error creating impulse:", e);
      }
    };

    let lastScheduleTime = performance.now();

    const scheduleNextImpulse = () => {
      if (!ctxRef.current || !impulsesRunningRef.current) return;

      // Update LFO based on time since last schedule
      const now = performance.now();
      const dt = (now - lastScheduleTime) / 1000; // Convert to seconds
      lastScheduleTime = now;
      updateLFO(dt);

      // Modulate rate with LFO: map LFO value [0,1] to rate range
      // LFO at 0 → slower rate, LFO at 1 → faster rate
      const rateMod = 0.5 + lfoValueRef.current * 1.5; // Range: 0.5x to 2.0x base rate
      // Energy and turbulence increase the rate: more energy/turbulence = faster, more active
      const energyMod = 0.7 + 0.8 * metricsRef.current.energy; // 0.7x to 1.5x
      const turbulenceMod = 0.7 + 0.8 * metricsRef.current.turbulence; // 0.7x to 1.5x
      const modulatedRateHz = baseRateHz * rateMod * energyMod * turbulenceMod;

      // Sample exponential inter-arrival time with modulated rate
      const u = Math.random();
      const intervalSec = -Math.log(1 - u) / modulatedRateHz; // exponential with mean 1/modulatedRateHz
      const intervalMs = intervalSec * 1000;

      impulseTimeoutRef.current = window.setTimeout(() => {
        if (!ctxRef.current || !impulsesRunningRef.current) return;
        playImpulse();
        scheduleNextImpulse(); // schedule the next one
      }, intervalMs);
    };

    // ================================
    // PHASE B1 — NOISE BURST EXCITER
    // ================================
    function createNoiseBurst(durationMs: number): AudioBuffer {
      const durationSec = durationMs / 1000;
      const sampleCount = Math.floor(ctx.sampleRate * durationSec);
      const buffer = ctx.createBuffer(1, sampleCount, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < sampleCount; i++) {
        data[i] = Math.random() * 2 - 1; // White noise: [-1, 1]
      }

      return buffer;
    }

    function triggerNoiseBurst() {
      const audioCtx = ctxRef.current;
      const combSum = combSumRef.current;
      const combs = combsRef.current;

      if (!audioCtx || !combSum || audioCtx.state !== "running") {
        return;
      }

          try {
            // Base duration range: 80-180 ms
            // Modulate slightly with duration LFO: ±20ms variation
            const baseDuration = 130; // center of range
            const durationRange = 50; // ±50ms from center
            const durationMod = (noiseDurationLfoValueRef.current - 0.5) * 2; // Map [0,1] to [-1,1]
            const durationMs = baseDuration + durationRange * durationMod + (Math.random() - 0.5) * 20; // Add small random jitter
            const buffer = createNoiseBurst(Math.max(60, Math.min(200, durationMs))); // Clamp to 60-200ms
        const src = audioCtx.createBufferSource();
        const env = audioCtx.createGain();

        src.buffer = buffer;

        const now = audioCtx.currentTime;
        env.gain.setValueAtTime(0, now);
        env.gain.linearRampToValueAtTime(1, now + 0.01);
        env.gain.linearRampToValueAtTime(0, now + 0.12);

        src.connect(env);

        // Bandpass filter to shape burst into metal plate character
        const bp = audioCtx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.value = 1500; // 1.5 kHz
        bp.Q.value = 3.0; // moderately narrow

        env.connect(bp);

        // Burst excites each comb delay through bandpass (not combSum directly)
        if (combs && combs.length > 0) {
          for (const comb of combs) {
            bp.connect(comb.delay);
          }
        }
        // Removed direct env → combSum fallback to ensure plate character is clear

        src.start();
        src.stop(now + buffer.duration);
      } catch (e) {
        console.warn("[useFeedbackCircuitAudio] Error creating noise burst:", e);
      }
    }

    // ================================
    // PHASE B1.5 — POISSON PROCESS FOR NOISE BURSTS
    // ================================
    const noiseBaseRateHz = 1.0; // approx 1 event per second
    const noiseLfoFreqHz = 0.12; // Slow LFO frequency (~0.12 Hz = ~8.3 second period)
    const noiseDurationLfoFreqHz = 0.08; // Even slower LFO for duration modulation (~0.08 Hz = ~12.5 second period)

    // Slow noise LFO: smoothed random walk (for rate)
    const updateNoiseLFO = (dt: number) => {
      // Accumulate phase
      noiseLfoPhaseRef.current += dt * noiseLfoFreqHz * 2 * Math.PI;
      
      // Add small random increments for noise
      const noise = (Math.random() - 0.5) * 0.1; // ±0.05
      const target = 0.5 + 0.5 * Math.sin(noiseLfoPhaseRef.current) + noise;
      
      // Smooth toward target
      const alpha = 0.05; // Smoothing factor
      noiseLfoValueRef.current = noiseLfoValueRef.current + alpha * (target - noiseLfoValueRef.current);
      noiseLfoValueRef.current = Math.max(0, Math.min(1, noiseLfoValueRef.current)); // Clamp to [0, 1]
    };

    // Slow noise LFO: smoothed random walk (for duration)
    const updateDurationLFO = (dt: number) => {
      // Accumulate phase
      noiseDurationLfoPhaseRef.current += dt * noiseDurationLfoFreqHz * 2 * Math.PI;
      
      // Add small random increments for noise
      const noise = (Math.random() - 0.5) * 0.1; // ±0.05
      const target = 0.5 + 0.5 * Math.sin(noiseDurationLfoPhaseRef.current) + noise;
      
      // Smooth toward target
      const alpha = 0.05; // Smoothing factor
      noiseDurationLfoValueRef.current = noiseDurationLfoValueRef.current + alpha * (target - noiseDurationLfoValueRef.current);
      noiseDurationLfoValueRef.current = Math.max(0, Math.min(1, noiseDurationLfoValueRef.current)); // Clamp to [0, 1]
    };

    let lastNoiseScheduleTime = performance.now();

    const scheduleNextNoiseBurst = () => {
      if (!ctxRef.current || !noiseBurstsRunningRef.current) return;

      // Update LFOs based on time since last schedule
      const now = performance.now();
      const dt = (now - lastNoiseScheduleTime) / 1000; // Convert to seconds
      lastNoiseScheduleTime = now;
      updateNoiseLFO(dt);
      updateDurationLFO(dt);

      // Modulate rate with LFO: map LFO value [0,1] to rate range
      // LFO at 0 → slower rate, LFO at 1 → faster rate
      const rateMod = 0.5 + noiseLfoValueRef.current * 1.5; // Range: 0.5x to 2.0x base rate
      const modulatedRateHz = noiseBaseRateHz * rateMod;

      // Sample exponential inter-arrival time with modulated rate
      const u = Math.random();
      const intervalSec = -Math.log(1 - u) / modulatedRateHz; // exponential with mean 1/modulatedRateHz
      const intervalMs = intervalSec * 1000;

      noiseBurstTimeoutRef.current = window.setTimeout(() => {
        if (!ctxRef.current || !noiseBurstsRunningRef.current) return;
        triggerNoiseBurst();
        scheduleNextNoiseBurst(); // schedule the next one
      }, intervalMs);
    };

    // Start the Poisson process for noise bursts
    noiseBurstsRunningRef.current = true;
    scheduleNextNoiseBurst();

    // Start the Poisson process
    impulsesRunningRef.current = true;
    scheduleNextImpulse();

    // Start envelope follower loop
    startEnvelopeLoop(ctx, analyser, gateGain);

    // Resume context (in case it was suspended)
    ctx.resume().then(() => {
      setReady(true);
    }).catch((e) => {
      console.warn("[useFeedbackCircuitAudio] Failed to resume context:", e);
    });
  }, []);

  // Envelope follower loop
  const startEnvelopeLoop = useCallback((ctx: AudioContext, analyser: AnalyserNode, gateGain: GainNode) => {
    const timeData = new Float32Array(analyser.fftSize);
    let env = 0; // smoothed envelope (0–something small)
    let gateLevel = 0.7; // 0–1, smoothed gain (initialized higher for more volume)
    let frameCounter = 0; // for debug logging

    const attack = 0.3; // 0–1, higher = faster attack
    const release = 0.05; // 0–1, higher = faster release
    const gateSlew = 0.2; // 0–1 per frame

    const loop = () => {
      if (ctx.state !== "running") {
        envelopeLoopRef.current = null;
        return;
      }

      // Get time domain data
      analyser.getFloatTimeDomainData(timeData);

      // Compute RMS level
      let sum = 0;
      for (let i = 0; i < timeData.length; i++) {
        const x = timeData[i];
        sum += x * x;
      }
      const rms = Math.sqrt(sum / timeData.length);

      // Smooth envelope with attack/release
      const target = rms;
      if (target > env) {
        env = env + attack * (target - env);
      } else {
        env = env + release * (target - env);
      }

      // Make sure env is in a sane range
      const e = Math.max(0, Math.min(env, 1));

      // Gate mapping: env → targetGate (mode-dependent)
      const gateThreshold = gateThresholdRef.current;
      let targetGate = 0;

      switch (gateModeRef.current) {
        case 'breathing': {
          const low = gateThreshold * 0.4;
          const high = gateThreshold * 1.5;
          const width = Math.max(1e-6, high - low);

          let x = (e - low) / width;
          x = Math.max(0, Math.min(1, x));

          // slightly soft, breathing-ish
          let g = Math.pow(x, 1.5);
          const floor = 0.35; // Increased from 0.05
          targetGate = floor + (1 - floor) * g;
          break;
        }

        case 'metallic': {
          // Bell-shaped sensitivity around threshold
          const thr = gateThreshold;
          const sigma = Math.max(1e-6, thr * 0.6);
          const t = (e - thr) / sigma;

          let bump = Math.exp(-t * t);   // Gaussian bump
          bump = Math.pow(bump, 1.2);    // slightly sharpen

          const floor = 0.30; // Increased from 0.03
          targetGate = floor + (1 - floor) * bump;
          break;
        }

        case 'glitch': {
          const thr = gateThreshold;
          const width = Math.max(1e-6, thr * 0.4); // Increased from 0.2 for wider window
          const low = thr - 0.5 * width;
          const high = thr + 0.5 * width;

          let x = (e - low) / (high - low);
          x = Math.max(0, Math.min(1, x));

          let g = x > 0 ? Math.pow(x, 3.0) : 0; // Reduced from 5.0 for less aggressive curve

          const noise = (Math.random() - 0.5) * 0.1; // ±0.05 jitter
          g = Math.max(0, Math.min(1, g + noise));

          const floor = 0.25; // Increased from 0.0
          targetGate = floor + (1 - floor) * g;
          break;
        }
      }

      // Smooth gateLevel toward targetGate (mode-dependent slew rate)
      const gateSlew =
        gateModeRef.current === 'glitch'
          ? 0.5   // fast for glitch
          : gateModeRef.current === 'metallic'
          ? 0.25  // medium
          : 0.15; // slower for breathing

      gateLevel = gateLevel + gateSlew * (targetGate - gateLevel);

      // Apply to the gain node
      gateGain.gain.value = gateLevel;

      // Apply RD metrics to Voice A parameters
      const m = metricsRef.current;
      const t = ctx.currentTime;
      const masterGainNode = masterGainRef.current;
      const shaperNode = shaperRef.current;
      const feedbackGainNode = feedbackGainRef.current;
      const delayNode = delayRef.current;

      if (masterGainNode && shaperNode && feedbackGainNode && delayNode) {
        // 1) Master gain: energy controls overall loudness
        const minMasterGain = 0.20;
        const maxMasterGain = 0.50;
        const targetMasterGain = minMasterGain + (maxMasterGain - minMasterGain) * m.energy;
        masterGainNode.gain.setTargetAtTime(targetMasterGain, t, 0.08);

        // 2) Gate threshold: lower threshold when energy is high (easier to trigger)
        const minThreshold = 0.001; // Lowered from 0.002
        const maxThreshold = 0.005; // Lowered from 0.010
        const targetThreshold = minThreshold + (maxThreshold - minThreshold) * (1 - m.energy);
        gateThresholdRef.current = targetThreshold;

        // 3) Waveshaper drive: peak controls distortion
        const minDrive = 0.1;
        const maxDrive = 0.5;
        const targetDrive = minDrive + (maxDrive - minDrive) * m.peak;
        shaperNode.curve = makeSoftClipCurve(targetDrive);

        // 4) Feedback gain: peak adds edge, coherence stabilizes, energy and turbulence increase feedback
        const minFeedback = 0.85;
        const maxFeedback = 0.99;
        const peakBoost = 0.14 * m.peak;
        const coherenceStabilize = 0.1 * m.coherence;
        const energyBoost = 0.08 * m.energy; // Energy increases feedback
        const turbulenceBoost = 0.06 * m.turbulence; // Turbulence increases feedback
        const targetFeedback = Math.min(maxFeedback, minFeedback + peakBoost + coherenceStabilize + energyBoost + turbulenceBoost);
        feedbackGainNode.gain.setTargetAtTime(targetFeedback, t, 0.1);

        // 5) Delay time: coherence controls stability (more coherent = longer, more stable)
        const minDelay = 0.008;
        const maxDelay = 0.016;
        const baseDelay = minDelay + (maxDelay - minDelay) * m.coherence;
        // Add turbulence jitter
        const jitter = (Math.random() * 2 - 1) * 0.002 * m.turbulence * (1 - m.coherence);
        const targetDelay = Math.max(0.005, Math.min(0.020, baseDelay + jitter));
        delayNode.delayTime.setTargetAtTime(targetDelay, t, 0.12);

        // 6) Gate mode: coherence selects mode
        if (m.coherence < 0.33) {
          gateModeRef.current = 'glitch';
        } else if (m.coherence < 0.66) {
          gateModeRef.current = 'metallic';
        } else {
          gateModeRef.current = 'breathing';
        }
      }

      // Debug logging every ~30 frames
      frameCounter++;
      if (frameCounter % 30 === 0) {
        console.log('env', env.toFixed(4), 'gateLevel', gateLevel.toFixed(2));
      }

      envelopeLoopRef.current = requestAnimationFrame(loop);
    };

    envelopeLoopRef.current = requestAnimationFrame(loop);
  }, []);

  const stop = useCallback(() => {
    if (ctxRef.current) {
      ctxRef.current.suspend();
    }

    impulsesRunningRef.current = false;
    noiseBurstsRunningRef.current = false;

    if (impulseTimeoutRef.current !== null) {
      clearTimeout(impulseTimeoutRef.current);
      impulseTimeoutRef.current = null;
    }

    if (noiseBurstTimeoutRef.current !== null) {
      clearTimeout(noiseBurstTimeoutRef.current);
      noiseBurstTimeoutRef.current = null;
    }


    if (envelopeLoopRef.current !== null) {
      cancelAnimationFrame(envelopeLoopRef.current);
      envelopeLoopRef.current = null;
    }
  }, []);

  const setGateThreshold = useCallback((threshold: number) => {
    gateThresholdRef.current = Math.max(0, Math.min(1, threshold));
  }, []);

  const setGateMode = useCallback((mode: GateMode) => {
    gateModeRef.current = mode;
  }, []);

  const setMetrics = useCallback((next: {
    energy?: number;
    peak?: number;
    coherence?: number;
    turbulence?: number;
  }) => {
    const current = metricsRef.current;
    const mix = 0.2; // Smoothing factor
    
    if (next.energy !== undefined) {
      metricsRef.current.energy = current.energy + mix * (Math.max(0, Math.min(1, next.energy)) - current.energy);
    }
    if (next.peak !== undefined) {
      metricsRef.current.peak = current.peak + mix * (Math.max(0, Math.min(1, next.peak)) - current.peak);
    }
    if (next.coherence !== undefined) {
      metricsRef.current.coherence = current.coherence + mix * (Math.max(0, Math.min(1, next.coherence)) - current.coherence);
    }
    if (next.turbulence !== undefined) {
      metricsRef.current.turbulence = current.turbulence + mix * (Math.max(0, Math.min(1, next.turbulence)) - current.turbulence);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      impulsesRunningRef.current = false;
      noiseBurstsRunningRef.current = false;

      if (impulseTimeoutRef.current !== null) {
        clearTimeout(impulseTimeoutRef.current);
        impulseTimeoutRef.current = null;
      }

      if (noiseBurstTimeoutRef.current !== null) {
        clearTimeout(noiseBurstTimeoutRef.current);
        noiseBurstTimeoutRef.current = null;
      }


      if (envelopeLoopRef.current !== null) {
        cancelAnimationFrame(envelopeLoopRef.current);
      }

      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {
          // Ignore errors on close
        });
        ctxRef.current = null;
      }
    };
  }, []);

  return {
    ready,
    start,
    stop,
    setGateThreshold,
    setGateMode,
    setMetrics,
    getModulationOutput: () => modulationOutputRef.current, // Export modulation signal
  };
}

