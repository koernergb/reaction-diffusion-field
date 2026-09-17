"use client";
import { useCallback, useEffect, useRef } from "react";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function useCursorTickClicksAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const combDelayRef = useRef<DelayNode | null>(null);
  const combFeedbackRef = useRef<GainNode | null>(null);
  const combDampRef = useRef<BiquadFilterNode | null>(null);
  const combOutGainRef = useRef<GainNode | null>(null);
  const preCombLowpassRef = useRef<BiquadFilterNode | null>(null);

  const cursorVelRef = useRef(0); // 0..1
  const runningRef = useRef(false);
  const schedulerRafRef = useRef<number | null>(null);
  const nextTickTimeRef = useRef(0);
  const currentFeedbackRef = useRef(0.3); // Current feedback value (with decay)
  const lastUpdateTimeRef = useRef(0); // For decay calculation

  // Initialize audio graph
  const initGraph = useCallback(() => {
    if (audioCtxRef.current) return;

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.12; // safe default
    master.connect(ctx.destination);

    masterGainRef.current = master;

    // Create pre-comb lowpass filter (filters ticks before entering comb)
    const preCombLowpass = ctx.createBiquadFilter();
    preCombLowpass.type = "lowpass";
    preCombLowpass.frequency.value = 3000; // 3 kHz cutoff
    preCombLowpass.Q.value = 1.9; // Higher Q for sharper cutoff
    preCombLowpassRef.current = preCombLowpass;

    // Create comb resonator
    const combDelay = ctx.createDelay(0.1); // max ~100 ms
    const combFeedback = ctx.createGain();
    const combDamp = ctx.createBiquadFilter();
    const combOutGain = ctx.createGain();

    // Configure comb
    combDamp.type = "lowpass";
    combDamp.frequency.value = 1200; // lower cutoff for buzzy low sound
    combDamp.Q.value = 0.2;

    combFeedback.gain.value = 0.3;   // initial feedback (will be updated by cursor velocity)

    combOutGain.gain.value = 0.7;    // wet level, can tweak

    // Wire the feedback loop: delay → damp → feedback → delay
    combDelay.connect(combDamp);
    combDamp.connect(combFeedback);
    combFeedback.connect(combDelay);

    // Tap the output into master
    combDelay.connect(combOutGain);
    combOutGain.connect(master);

    // Base comb delay time matching Voice A (~83 Hz fundamental)
    combDelay.delayTime.value = 0.012; // ≈ 12 ms ≈ 83 Hz fundamental

    // Connect pre-comb lowpass to comb delay
    preCombLowpass.connect(combDelay);

    // Save to refs
    combDelayRef.current = combDelay;
    combFeedbackRef.current = combFeedback;
    combDampRef.current = combDamp;
    combOutGainRef.current = combOutGain;
    preCombLowpassRef.current = preCombLowpass;
  }, []);

  // Create a single tick burst
  function createTickBurst(ctx: AudioContext, velocity01: number, master: GainNode) {
    // Duration: 5–40 ms
    const minMs = 5;
    const maxMs = 40;
    const durMs = minMs + (maxMs - minMs) * Math.random();
    const length = Math.max(1, Math.floor((ctx.sampleRate * durMs) / 1000));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Clicky, decaying noise burst
    const baseAmp = 0.1 + 0.4 * velocity01; // louder when moving fast
    const decay = Math.exp(-5 / length);    // exponential-ish envelope
    let amp = baseAmp;
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * amp;
      amp *= decay;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;

    // Route ticks through pre-comb lowpass filter (200 Hz) before entering comb
    const preCombLowpass = preCombLowpassRef.current;
    if (preCombLowpass) {
      src.connect(preCombLowpass);
    } else {
      // fallback: direct to master if not initialized
      src.connect(master);
    }

    return src;
  }

  // Start function with velocity → Poisson-ish rate
  const start = useCallback(() => {
    if (runningRef.current) return;
    initGraph();

    const ctx = audioCtxRef.current!;
    if (ctx.state === "suspended") ctx.resume();

    runningRef.current = true;

    // Initialize time reference for decay
    lastUpdateTimeRef.current = ctx.currentTime;

    // start scheduling
    nextTickTimeRef.current = ctx.currentTime + 0.05;

    const scheduler = () => {
      if (!runningRef.current) {
        schedulerRafRef.current = requestAnimationFrame(scheduler);
        return;
      }

      const audioCtx = audioCtxRef.current;
      const master = masterGainRef.current;
      if (!audioCtx || !master) {
        schedulerRafRef.current = requestAnimationFrame(scheduler);
        return;
      }

      const now = audioCtx.currentTime;
      const vel = cursorVelRef.current;

      // Update comb feedback with decay mechanism
      const combFeedback = combFeedbackRef.current;
      if (combFeedback) {
        // Map velocity (0..1) to target feedback range (0.3..0.9)
        const minFeedback = 0.3;
        const maxFeedback = 0.9;
        const targetFeedback = minFeedback + (maxFeedback - minFeedback) * vel;
        
        // Calculate time delta (use ~16ms as fallback for first frame)
        const dt = lastUpdateTimeRef.current > 0 
          ? (now - lastUpdateTimeRef.current) 
          : 0.016;
        lastUpdateTimeRef.current = now;
        
        // Exponential decay toward target
        // If target is higher, rise quickly (fast attack)
        // If target is lower, decay slowly (slow release)
        const currentFeedback = currentFeedbackRef.current;
        let newFeedback: number;
        
        if (targetFeedback > currentFeedback) {
          // Rising: fast attack (tau ~50ms)
          const attackTau = 0.05;
          const alpha = 1 - Math.exp(-dt / attackTau);
          newFeedback = currentFeedback + (targetFeedback - currentFeedback) * alpha;
        } else {
          // Falling: slow decay (tau ~500ms)
          const decayTau = 0.5;
          const alpha = 1 - Math.exp(-dt / decayTau);
          newFeedback = currentFeedback + (targetFeedback - currentFeedback) * alpha;
        }
        
        // Limiter: prevent self-oscillation by capping feedback gain
        // Feedback above ~0.95 can cause runaway self-oscillation
        const MAX_SAFE_FEEDBACK = 0.92;
        newFeedback = Math.min(newFeedback, MAX_SAFE_FEEDBACK);
        
        currentFeedbackRef.current = newFeedback;
        combFeedback.gain.value = newFeedback;
      }

      // Only schedule ticks if velocity is above threshold
      // Stop ticks immediately when movement stops
      if (vel < 0.05) {
        // Reset next tick time when stopped to prevent stale scheduling
        // Set it far enough in the future to avoid immediate rescheduling
        nextTickTimeRef.current = now + 0.3;
        schedulerRafRef.current = requestAnimationFrame(scheduler);
        return;
      }

      // If we were stopped and now moving, reset nextTickTime to start immediately
      if (nextTickTimeRef.current > now + 0.1) {
        // We were stopped (nextTickTime was set far in future), reset to start now
        nextTickTimeRef.current = now + 0.01; // Start very soon (10ms)
      }

      // Map cursor velocity -> tick rate (events/sec)
      // Velocity directly drives rate: 0 velocity = 0 rate
      // High speed => up to ~60 ticks/sec (denser clicks)
      const maxRate = 60.0;
      // Use a power curve to make clicks denser at higher velocities
      const rate = maxRate * Math.pow(vel, 0.7); // Slight curve for denser response
      const meanInterval = 1 / rate;

      // Minimal jitter - only slight variation to avoid phase locking
      const jitterFactor = 0.15; // 15% variation (much less randomness)
      const intervalBase =
        meanInterval *
        (1 + jitterFactor * (Math.random() * 2 - 1));

      // Schedule ticks up to a small lookahead
      const lookahead = 0.05;
      while (nextTickTimeRef.current < now + lookahead) {
        const src = createTickBurst(audioCtx, vel, master);
        // Minimal random offset
        const startTime =
          nextTickTimeRef.current + (Math.random() * 0.002 - 0.001);
        src.start(startTime);
        // advance to next tick time
        nextTickTimeRef.current += intervalBase;
      }

      schedulerRafRef.current = requestAnimationFrame(scheduler);
    };

    if (schedulerRafRef.current !== null) {
      cancelAnimationFrame(schedulerRafRef.current);
    }
    schedulerRafRef.current = requestAnimationFrame(scheduler);
  }, [initGraph]);

  // Stop + cleanup
  const stop = useCallback(() => {
    runningRef.current = false;
    if (schedulerRafRef.current !== null) {
      cancelAnimationFrame(schedulerRafRef.current);
      schedulerRafRef.current = null;
    }
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state !== "closed") {
      ctx.suspend();
    }
  }, []);

  const setCursorVelocity01 = useCallback((v: number) => {
    cursorVelRef.current = clamp(v, 0, 1);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      runningRef.current = false;
      if (schedulerRafRef.current !== null) {
        cancelAnimationFrame(schedulerRafRef.current);
      }
      const ctx = audioCtxRef.current;
      if (ctx) {
        ctx.close();
      }
      audioCtxRef.current = null;
      masterGainRef.current = null;
      combDelayRef.current = null;
      combFeedbackRef.current = null;
      combDampRef.current = null;
      combOutGainRef.current = null;
      preCombLowpassRef.current = null;
    };
  }, []);

  return {
    start,
    stop,
    setCursorVelocity01,
  };
}

