"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type FieldStats = {
  energy: number;     // 0..1 - overall activity / bloom
  turbulence: number; // 0..1 - how chaotic / noisy the field is
  peak: number;       // 0..1 - how strong / high-contrast the pattern is
  coherence: number;  // 0..1 - how ordered vs chaotic (1 = very ordered)
};

type ModalDescriptor = {
  f: number;
  q: number;
  gainDb: number;
};

type ModalFilter = {
  bp: BiquadFilterNode;
  gain: GainNode;
};

type ModalBank = {
  input: GainNode;
  output: GainNode;
  filters: ModalFilter[];
  modes: ModalDescriptor[];
  update: (opts: { detune: number[]; qMod: number[] }) => void;
};

type BowedKSString = {
  bowGain: GainNode;
  feedback: GainNode;
  toneFilter: BiquadFilterNode;
  output: GainNode;
};

type CombFilter = {
  input: GainNode;
  output: GainNode;
  delay: DelayNode;
  feedback: GainNode;
  damp: BiquadFilterNode;
};

export type UseModalGlitchBusReturn = {
  ready: boolean;
  setFromFieldStats: (stats: FieldStats) => void;
  setBedLevel: (amount01: number) => void; // interpreted as bow pressure
  triggerClick: (intensity?: number, spectralPos01?: number) => void;
};

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

function dbToLinear(db: number): number {
  return Math.pow(10, db / 20);
}

function createModalBank(
  ctx: AudioContext,
  modes: ModalDescriptor[],
  masterGain: GainNode
): ModalBank {
  const input = ctx.createGain();
  const output = ctx.createGain();

  // body bus -> master
  input.connect(output);
  output.connect(masterGain);

  // Add subtle feedback from output back to input for natural ringing
  const feedbackGain = ctx.createGain();
  feedbackGain.gain.value = 0.15; // Subtle feedback to help sustain
  output.connect(feedbackGain);
  feedbackGain.connect(input);

  const filters: ModalFilter[] = modes.map(({ f, q, gainDb }) => {
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = f;
    bp.Q.value = q;

    const g = ctx.createGain();
    g.gain.value = dbToLinear(gainDb);

    input.connect(bp);
    bp.connect(g);
    g.connect(output);

    return { bp, gain: g };
  });

  return {
    input,
    output,
    filters,
    modes,
    update({ detune, qMod }) {
      filters.forEach((m, i) => {
        const base = modes[i];
        const d = detune[i] ?? 0;
        const qFactor = qMod[i] ?? 1;
        m.bp.frequency.value = Math.max(40, base.f + d);
        m.bp.Q.value = Math.max(1, base.q * qFactor);
      });
    },
  };
}

function createLoopingNoiseSource(ctx: AudioContext): AudioBufferSourceNode {
  const duration = 2.0;
  const length = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  return src;
}

/**
 * Simple bowed Karplus–Strong–style string:
 * - delay line tuned to baseFreq
 * - lowpass in the loop for damping/brightness
 * - feedback gain controls decay / "tightness"
 * - continuous noise into delay via bowGain acts as bow pressure
 * - includes limiter to prevent feedback runaway
 */
function createBowedKSString(
  ctx: AudioContext,
  destination: AudioNode,
  baseFreq: number
): BowedKSString {
  const delay = ctx.createDelay(1.0); // max 1 sec, we use a few ms
  const toneFilter = ctx.createBiquadFilter();
  const feedback = ctx.createGain();
  const output = ctx.createGain();
  const bowGain = ctx.createGain();

  const period = 1 / baseFreq; // seconds per cycle
  delay.delayTime.value = Math.min(0.05, period); // a short delay, ~string length

  toneFilter.type = "lowpass";
  toneFilter.frequency.value = 3500;
  toneFilter.Q.value = 0.7;

  // Much lower feedback to prevent runaway - more aggressive damping
  feedback.gain.value = 0.92; // Well below 1.0 to ensure decay
  output.gain.value = 0.6; // Lower output to prevent buildup
  bowGain.gain.value = 0.0; // bow pressure, we modulate this

  // Add a limiter/waveshaper to prevent runaway feedback
  const limiter = ctx.createWaveShaper();
  const curve = new Float32Array(65536);
  for (let i = 0; i < 65536; i++) {
    const x = (i - 32768) / 32768;
    // Soft clipping: tanh-like curve
    curve[i] = Math.tanh(x * 0.7) * 0.8;
  }
  limiter.curve = curve;
  limiter.oversample = '2x';

  // Add highpass to remove DC buildup
  const dcBlock = ctx.createBiquadFilter();
  dcBlock.type = "highpass";
  dcBlock.frequency.value = 20;
  dcBlock.Q.value = 0.7;

  // continuous noise = bow energy
  const noiseSrc = createLoopingNoiseSource(ctx);

  // graph:
  // noise -> bowGain -> delay -> dcBlock -> limiter -> toneFilter -> feedback -> delay (loop)
  // toneFilter -> output -> destination
  noiseSrc.connect(bowGain).connect(delay);
  delay.connect(dcBlock);
  dcBlock.connect(limiter);
  limiter.connect(toneFilter);
  toneFilter.connect(feedback).connect(delay);
  toneFilter.connect(output).connect(destination);

  noiseSrc.start();

  return { bowGain, feedback, toneFilter, output };
}

function createComb(
  ctx: AudioContext,
  destination: AudioNode,
  delayMs: number,
  feedbackAmount: number
): CombFilter {
  const input = ctx.createGain();
  const delay = ctx.createDelay(0.1); // max 100ms, we use single-digit ms
  const feedback = ctx.createGain();
  const damp = ctx.createBiquadFilter();
  const output = ctx.createGain();

  delay.delayTime.value = delayMs / 1000;
  feedback.gain.value = feedbackAmount;

  damp.type = "lowpass";
  damp.frequency.value = 5500;
  damp.Q.value = 0.7;

  output.gain.value = 0.9;

  // Comb loop: input -> delay -> damp -> feedback -> delay
  // and damp -> output -> destination
  input.connect(delay);
  delay.connect(damp);
  damp.connect(feedback).connect(delay);
  damp.connect(output).connect(destination);

  return { input, output, delay, feedback, damp };
}

function triggerKSPluckOnce(
  ctx: AudioContext,
  noiseBuffer: AudioBuffer,
  destination: AudioNode,
  stats: FieldStats,
  spectralPos01: number,
  intensity: number
) {
  const now = ctx.currentTime;

  // --- 1. Noise burst as excitation ---
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer;

  const burstGain = ctx.createGain();

  const energy = clamp01(stats.energy);
  const turbulence = clamp01(stats.turbulence);
  const peak = clamp01(stats.peak);
  const coherence = clamp01(stats.coherence);

  // Make amplitude modest so this feels like a micro-event, not a UI SFX
  const baseAmp = 0.05;
  const dynAmp = 0.18 * energy + 0.12 * turbulence + 0.1 * peak;
  const amp = (baseAmp + dynAmp) * clamp01(intensity);

  burstGain.gain.setValueAtTime(0.0, now);
  burstGain.gain.linearRampToValueAtTime(amp, now + 0.003);
  burstGain.gain.exponentialRampToValueAtTime(0.0003, now + 0.03);

  // --- 2. KS loop: delay + lowpass + feedback ---
  const delay = ctx.createDelay(0.1);
  const loopFilter = ctx.createBiquadFilter();
  const fb = ctx.createGain();
  const out = ctx.createGain();

  // Map spectralPos into a delay range (higher pos -> shorter delay / higher "pitch")
  const minDelay = 0.0025; // 2.5 ms
  const maxDelay = 0.018;  // 18 ms
  const pos = clamp01(spectralPos01);
  const delayTime =
    maxDelay -
    (maxDelay - minDelay) * (0.2 + 0.8 * pos); // bias away from super-low "booms"

  delay.delayTime.value = delayTime;

  // Feedback: more energy/peak -> slightly longer ring (but keep under runaway)
  const fbBase = 0.70;
  const fbDyn = 0.22 * energy + 0.12 * peak;
  fb.gain.value = Math.min(0.94, fbBase + fbDyn);

  // Damping / brightness: turbulence -> brighter/nastier, coherence -> smoother
  const bright = 2000 + 4500 * turbulence;
  const smooth = 1500 + 2500 * coherence;
  const cutoff = 0.5 * bright + 0.5 * smooth;

  loopFilter.type = "lowpass";
  loopFilter.frequency.value = cutoff;
  loopFilter.Q.value = 0.7;

  out.gain.value = 0.85;

  // KS loop wiring:
  // burst -> delay -> loopFilter -> fb -> delay
  // loopFilter -> out -> destination
  src.connect(burstGain).connect(delay);
  delay.connect(loopFilter);
  loopFilter.connect(fb).connect(delay);
  loopFilter.connect(out).connect(destination);

  src.start(now);
  src.stop(now + 0.06);

  // Cleanup: disconnect nodes after a safety window
  const cleanupTime = now + 0.4;
  const cleanup = () => {
    try {
      src.disconnect();
      burstGain.disconnect();
      delay.disconnect();
      loopFilter.disconnect();
      fb.disconnect();
      out.disconnect();
    } catch {
      // ignore
    }
  };

  // Use window.setTimeout to avoid relying on Node timers
  window.setTimeout(cleanup, Math.max(50, (cleanupTime - ctx.currentTime) * 1000));
}

export function useModalGlitchBus(): UseModalGlitchBusReturn {
  const [ready, setReady] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const modalBankRef = useRef<ModalBank | null>(null);

  const bowedGainRef = useRef<GainNode | null>(null);
  const bowedFeedbackRef = useRef<GainNode | null>(null);
  const bowedFilterRef = useRef<BiquadFilterNode | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);

  const combDelayRef = useRef<DelayNode | null>(null);
  const combFeedbackRef = useRef<GainNode | null>(null);
  const combDampRef = useRef<BiquadFilterNode | null>(null);
  const combInputRef = useRef<GainNode | null>(null);

  // stats: target + smoothed, shape body + bowed params
  const targetStatsRef = useRef<FieldStats>({
    energy: 0,
    turbulence: 0,
    peak: 0,
    coherence: 0,
  });
  const smoothedStatsRef = useRef<FieldStats>({
    energy: 0,
    turbulence: 0,
    peak: 0,
    coherence: 0,
  });

  // desired bed level 0..1 from UI (we interpret as bow pressure)
  const bedLevelTargetRef = useRef(0);

  // lazy init on first gesture to satisfy autoplay policies
  useEffect(() => {
    const handler = async () => {
      if (ctxRef.current) return;

      const ctx = new AudioContext({ latencyHint: "interactive" });
      const master = ctx.createGain();
      master.gain.value = 0.4;
      master.connect(ctx.destination);

      // resonant chassis / CRT body - dense, inharmonic plate modes
      // Higher Q for more pronounced ringing
      const base = 210; // base of the plate-ish spectrum
      const modes: ModalDescriptor[] = [
        { f: base * 1.00, q: 28, gainDb: -8 },
        { f: base * 1.58, q: 26, gainDb: -9 },
        { f: base * 2.14, q: 30, gainDb: -10 },
        { f: base * 2.30, q: 28, gainDb: -11 },
        { f: base * 2.92, q: 32, gainDb: -12 },
        { f: base * 3.60, q: 30, gainDb: -13 },
        { f: base * 4.10, q: 28, gainDb: -14 },
        { f: base * 4.65, q: 26, gainDb: -15 },
        { f: base * 5.20, q: 28, gainDb: -16 },
        { f: base * 5.80, q: 26, gainDb: -17 },
      ];

      const modalBank = createModalBank(ctx, modes, master);

      // build a white-noise buffer to use for per-click impulses
      const impulseDuration = 0.08;
      const impulseLength = Math.floor(ctx.sampleRate * impulseDuration);
      const impulseBuffer = ctx.createBuffer(1, impulseLength, ctx.sampleRate);
      const impulseData = impulseBuffer.getChannelData(0);
      for (let i = 0; i < impulseLength; i++) {
        const t = i / impulseLength;
        const env = Math.exp(-4 * t);
        impulseData[i] = (Math.random() * 2 - 1) * env;
      }
      noiseBufferRef.current = impulseBuffer;

      // comb filter in front of the modal bank: "digital wire" feeding the plate
      const comb = createComb(ctx, modalBank.input, 9, 0.78); // ~9ms, moderate feedback
      combDelayRef.current = comb.delay;
      combFeedbackRef.current = comb.feedback;
      combDampRef.current = comb.damp;
      combInputRef.current = comb.input;

      // bowed KS string now feeds the comb input (not directly the modal bank)
      const bowed = createBowedKSString(ctx, comb.input, 130); // ~B2-ish
      bowedGainRef.current = bowed.bowGain;
      bowedFeedbackRef.current = bowed.feedback;
      bowedFilterRef.current = bowed.toneFilter;

      ctxRef.current = ctx;
      masterRef.current = master;
      modalBankRef.current = modalBank;

      setReady(true);
    };

    window.addEventListener("pointerdown", handler);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
    };
  }, []);

  // main control loop: smooth stats, update modal bank, master + bowed params
  useEffect(() => {
    let frameId: number;

    const tick = () => {
      const ctx = ctxRef.current;
      const modalBank = modalBankRef.current;
      const master = masterRef.current;
      const bowGain = bowedGainRef.current;
      const bowFeedback = bowedFeedbackRef.current;
      const bowFilter = bowedFilterRef.current;

      if (ctx && modalBank && master && bowGain && bowFeedback && bowFilter) {
        // smooth stats
        const t = targetStatsRef.current;
        const s = smoothedStatsRef.current;
        const alpha = 0.06;
        const next: FieldStats = {
          energy: s.energy + alpha * (t.energy - s.energy),
          turbulence: s.turbulence + alpha * (t.turbulence - s.turbulence),
          peak: s.peak + alpha * (t.peak - s.peak),
          coherence: s.coherence + alpha * (t.coherence - s.coherence),
        };
        smoothedStatsRef.current = next;

        const energy = clamp01(next.energy);
        const turbulence = clamp01(next.turbulence);
        const peak = clamp01(next.peak);
        const coherence = clamp01(next.coherence);

        // modal param offsets
        const detune: number[] = [];
        const qMod: number[] = [];
        const time = performance.now() * 0.001;
        const filters = modalBank.filters;
        const modes = modalBank.modes;

        for (let i = 0; i < filters.length; i++) {
          const base = modes[i];
          const phase = time * 0.25 + i * 1.17;

          // wider spread when turbulent + incoherent
          const spread =
            base.f * 0.012 *
            (0.25 + 0.75 * turbulence) *
            (1.0 - 0.5 * coherence);
          const d = Math.sin(phase) * spread;
          detune.push(d);

          const qBase = 1 + energy * 0.7;
          const qChaos = 1 + turbulence * 0.4 * (i % 2 === 0 ? 1 : -1);
          qMod.push(qBase * qChaos);
        }

        modalBank.update({ detune, qMod });

        // Modulate comb parameters from RD stats
        const combDelay = combDelayRef.current;
        const combFeedback = combFeedbackRef.current;
        const combDamp = combDampRef.current;

        if (ctx && combDelay && combFeedback && combDamp) {
          const time = performance.now() * 0.001;

          // Base delay around 9ms (~ string/wire), with small jitter from turbulence
          const baseDelay = 0.009; // 9ms
          const jitterAmt = 0.003 * turbulence; // up to ±3ms
          const jitter = jitterAmt * Math.sin(time * 1.3 + energy * 2.0);
          const delayTarget = Math.max(0.003, Math.min(0.018, baseDelay + jitter));

          combDelay.delayTime.setTargetAtTime(delayTarget, ctx.currentTime, 0.02);

          // Feedback: more energy -> longer/louder wire hum (but keep under runaway)
          const fbTarget = 0.72 + 0.22 * energy; // 0.72–0.94
          const currentFb = combFeedback.gain.value;
          combFeedback.gain.value =
            currentFb + 0.04 * (fbTarget - currentFb);

          // Damping / brightness: more peak -> brighter comb
          const dampTargetHz = 1800 + 5200 * peak; // ~1.8–7kHz
          combDamp.frequency.setTargetAtTime(
            dampTargetHz,
            ctx.currentTime,
            0.08
          );
        }

        // master gain reacts to energy/peak but stays restrained
        const targetMasterGain = 0.25 + 0.25 * energy + 0.2 * peak;
        const currentMasterGain = master.gain.value;
        master.gain.value =
          currentMasterGain +
          0.04 * (targetMasterGain - currentMasterGain);

        // bow pressure from bedLevelTarget
        const targetBed = clamp01(bedLevelTargetRef.current);
        const bowPressure = targetBed;

        // Lower bow gain to prevent feedback buildup
        const desiredBowGain = 0.005 + 0.15 * bowPressure;
        bowGain.gain.value =
          bowGain.gain.value +
          0.05 * (desiredBowGain - bowGain.gain.value);

        // bowed brightness / rasp: more turbulent -> brighter string
        const baseCutoff = 1500 + 3000 * turbulence;
        bowFilter.frequency.setTargetAtTime(
          baseCutoff,
          ctx.currentTime,
          0.06
        );

        // feedback / sustain: keep it much lower to prevent runaway
        // More energy = slightly longer ring, but stay well below 1.0
        const fbTarget = 0.90 + 0.02 * energy;
        bowFeedback.gain.value = Math.min(0.95, fbTarget);
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const setFromFieldStats = useCallback((stats: FieldStats) => {
    targetStatsRef.current = {
      energy: clamp01(stats.energy),
      turbulence: clamp01(stats.turbulence),
      peak: clamp01(stats.peak),
      coherence: clamp01(stats.coherence),
    };
  }, []);

  const setBedLevel = useCallback((amount01: number) => {
    bedLevelTargetRef.current = clamp01(amount01);
  }, []);

  const triggerClick = useCallback(
    (intensity: number = 1, spectralPos01?: number) => {
      const ctx = ctxRef.current;
      const noiseBuffer = noiseBufferRef.current;
      const combInput = combInputRef.current;
      if (!ctx || !noiseBuffer || !combInput) return;

      const stats = smoothedStatsRef.current;
      const pos = spectralPos01 ?? Math.random();

      triggerKSPluckOnce(
        ctx,
        noiseBuffer,
        combInput,   // KS pluck feeds comb -> modal bank
        stats,
        pos,
        intensity
      );
    },
    []
  );

  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        ctxRef.current.close();
        ctxRef.current = null;
      }
    };
  }, []);

  return { ready, setFromFieldStats, setBedLevel, triggerClick };
}
