"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type RDFieldSnapshot = {
  width: number;
  height: number;
  // grayscale or luminance values, row-major, 0..1
  data: Float32Array;
  dt?: number; // optional: RD timestep used for bloom
};

function sampleSpiralWaveform(
  width: number,
  height: number,
  data: Float32Array,
  sampleCount: number = 256,
  turns: number = 3
): Float32Array {
  const out = new Float32Array(sampleCount);

  const cx = width / 2;
  const cy = height / 2;

  // radius limit: go nearly to the edges (98% to avoid edge artifacts)
  const maxR = 0.98 * Math.min(width, height) * 0.5;

  for (let i = 0; i < sampleCount; i++) {
    const t = sampleCount > 1 ? i / (sampleCount - 1) : 0; // 0..1
    const r = maxR * t;

    const theta = turns * 2 * Math.PI * t;

    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);

    // nearest neighbor sampling (fine for now)
    const xi = Math.max(0, Math.min(width - 1, Math.round(x)));
    const yi = Math.max(0, Math.min(height - 1, Math.round(y)));

    const idx = yi * width + xi;
    const v = data[idx] ?? 0; // expect 0..1

    // center around 0 and scale
    let s = v - 0.5;  // [-0.5, 0.5]
    s *= 1.4;         // adjust "drive" into [-0.7, 0.7]

    // clamp to [-1, 1]
    if (s > 1) s = 1;
    if (s < -1) s = -1;

    out[i] = s;
  }

  return out;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function makeSoftClipCurve(amount: number, n = 1024): Float32Array {
  const data = new Array<number>(n);
  const k = amount;
  const deg = Math.PI / 180;
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1; // -1..1
    // simple arctan soft clip
    data[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return new Float32Array(data);
}

type ComplexArray = {
  re: Float32Array;
  im: Float32Array;
};

/**
 * Naive DFT for small N (e.g. 256). O(N^2) but fine for our use case.
 */
function dftReal(input: Float32Array): ComplexArray {
  const N = input.length;
  const re = new Float32Array(N);
  const im = new Float32Array(N);
  const twoPiOverN = (2 * Math.PI) / N;

  for (let k = 0; k < N; k++) {
    let sumRe = 0;
    let sumIm = 0;
    const angleBase = twoPiOverN * k;
    for (let n = 0; n < N; n++) {
      const x = input[n];
      const angle = angleBase * n;
      sumRe += x * Math.cos(angle);
      sumIm -= x * Math.sin(angle);
    }
    re[k] = sumRe;
    im[k] = sumIm;
  }

  return { re, im };
}

/**
 * Naive inverse DFT back to real time-domain signal.
 */
function idftReal(freq: ComplexArray): Float32Array {
  const { re, im } = freq;
  const N = re.length;
  const out = new Float32Array(N);
  const twoPiOverN = (2 * Math.PI) / N;

  for (let n = 0; n < N; n++) {
    let sum = 0;
    const angleBase = twoPiOverN * n;
    for (let k = 0; k < N; k++) {
      const angle = angleBase * k;
      sum += re[k] * Math.cos(angle) - im[k] * Math.sin(angle);
    }
    // Scale by 1/N for inverse
    out[n] = sum / N;
  }

  return out;
}

/**
 * Smooths a waveform by lowpassing its spectrum.
 * cutoffRatio in (0,1): e.g. 0.4 keeps lower 40% of bins, softly rolls off above.
 */
function smoothWaveformSpectrum(
  timeDomain: Float32Array,
  cutoffRatio: number = 0.4
): Float32Array {
  const N = timeDomain.length;
  if (N === 0) return timeDomain;

  const freq = dftReal(timeDomain);
  const { re, im } = freq;

  const cutoffBin = Math.floor(cutoffRatio * N);

  // Soft rolloff instead of hard zeroing: apply a simple cosine window
  for (let k = 0; k < N; k++) {
    let scale = 1;

    if (k > cutoffBin) {
      const t = Math.min(1, (k - cutoffBin) / (N - cutoffBin));
      // t = 0 at cutoffBin, 1 at Nyquist
      // cosine from 1 → 0 across the high band
      scale = 0.5 * (1 + Math.cos(Math.PI * t)); // goes from 1 to 0
    }

    re[k] *= scale;
    im[k] *= scale;
  }

  const smoothed = idftReal({ re, im });

  // Normalize to keep max amplitude <= 0.95
  let maxAbs = 0;
  for (let i = 0; i < N; i++) {
    const v = Math.abs(smoothed[i]);
    if (v > maxAbs) maxAbs = v;
  }

  if (maxAbs > 0.0001) {
    const norm = 0.95 / maxAbs;
    for (let i = 0; i < N; i++) {
      smoothed[i] *= norm;
    }
  }

  return smoothed;
}

/**
 * Build an additive wavetable from the RD spiral.
 *
 * Concept:
 * - Take the spiral waveform (rawWave).
 * - Map it into a bank of N_PARTIALS partial amplitudes via binning + smoothing.
 * - Use dt to create a "bloom" of higher partials when dt > 1.0.
 * - Reconstruct a harmonic wavetable as a sum of many sinusoids.
 */
function buildAdditiveWavetableFromSpiral(
  rawWave: Float32Array,
  dt: number = 1.0
): Float32Array {
  const L = rawWave.length;
  if (L === 0) return rawWave;

  const N_PARTIALS = 16;
  const ampsBase = new Float32Array(N_PARTIALS);

  // 1. Normalize rawWave to [0,1] based on min/max
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < L; i++) {
    const v = rawWave[i];
    if (v < min) min = v;
    if (v > max) max = v;
  }

  const range = max - min || 1;
  const normalized = new Float32Array(L);
  for (let i = 0; i < L; i++) {
    normalized[i] = (rawWave[i] - min) / range;
  }

  // 2. Bin spiral into N_PARTIALS averages
  const binSize = L / N_PARTIALS;
  for (let k = 0; k < N_PARTIALS; k++) {
    const start = Math.floor(k * binSize);
    const end = Math.floor((k + 1) * binSize);
    let sum = 0;
    let count = 0;
    for (let i = start; i < end && i < L; i++) {
      sum += Math.abs(normalized[i]);
      count++;
    }
    ampsBase[k] = count > 0 ? sum / count : 0;
  }

  // 3. Smooth along partial index (simple 1D blur)
  const ampsSmooth = new Float32Array(N_PARTIALS);
  for (let k = 0; k < N_PARTIALS; k++) {
    const prev = k > 0 ? ampsBase[k - 1] : ampsBase[k];
    const curr = ampsBase[k];
    const next = k < N_PARTIALS - 1 ? ampsBase[k + 1] : ampsBase[k];
    ampsSmooth[k] = 0.25 * prev + 0.5 * curr + 0.25 * next;
  }

  // 4. Apply power curve + spectral tilt
  const ampsTilted = new Float32Array(N_PARTIALS);
  const gamma = 2.2;
  for (let k = 0; k < N_PARTIALS; k++) {
    const x = ampsSmooth[k];
    const shaped = x <= 0 ? 0 : Math.pow(x, gamma);
    const kNorm = k / (N_PARTIALS - 1); // 0..1
    const tilt = 1 / (1 + 2.0 * kNorm); // high partials naturally softer
    ampsTilted[k] = shaped * tilt;
  }

  // 5. dt -> bloom factor
  const bloom = clamp((dt - 1.0) / 0.3, 0, 1);
  const ampsFinal = new Float32Array(N_PARTIALS);

  // low partials always present; high partials mostly appear with bloom
  const lowSplit = 12; // partial indices <= 12 are "low"

  for (let k = 0; k < N_PARTIALS; k++) {
    const base = ampsTilted[k];

    if (k <= lowSplit) {
      // low partials: always there, slightly enhanced by bloom
      const lowScale = 0.4 + 0.4 * bloom; // 0.4–0.8
      ampsFinal[k] = base * lowScale;
    } else {
      // high partials: mostly controlled by bloom
      const highScale = 0.1 + 0.9 * bloom; // 0.1–1.0
      ampsFinal[k] = base * highScale;
    }
  }

  // 6. Reconstruct additive wavetable: sum of many sinusoids
  const out = new Float32Array(L);
  for (let n = 0; n < L; n++) {
    const phaseBase = (2 * Math.PI * n) / L;
    let sample = 0;

    for (let k = 0; k < N_PARTIALS; k++) {
      const amp = ampsFinal[k];
      if (amp === 0) continue;

      // partial index = k+1 to avoid DC
      const partialIndex = k + 1;
      const phase = partialIndex * phaseBase; // all phases 0 for now
      sample += amp * Math.sin(phase);
    }

    out[n] = sample;
  }

  // 7. Normalize final wavetable to max |amp| <= 0.95
  let maxAbs = 0;
  for (let i = 0; i < L; i++) {
    const v = Math.abs(out[i]);
    if (v > maxAbs) maxAbs = v;
  }

  if (maxAbs > 0.0001) {
    const norm = 0.95 / maxAbs;
    for (let i = 0; i < L; i++) {
      out[i] *= norm;
    }
  }

  return out;
}

/**
 * Build a harmonic wavetable by projecting the RD-derived waveform
 * onto a fixed set of harmonic partials and reconstructing a sum of sinusoids.
 *
 * - rawWave: time-domain RD spiral waveform (optionally already smoothed)
 * - dt: RD timestep, used for "bloom" of upper partials when dt > 1.0
 */
function buildHarmonicWavetableFromRD(
  rawWave: Float32Array,
  dt: number = 1.0
): Float32Array {
  const N = rawWave.length;
  if (N === 0) return rawWave;

  // Compute DFT to get complex spectrum of the raw wave
  const { re, im } = dftReal(rawWave);

  // Choose a small set of harmonic indices in the DFT.
  // These correspond to harmonics of a single cycle over the table.
  // Using more partials and making them more prominent
  const lowPartials = [1, 2, 3, 4];     // fundamental + lower harmonics
  const highPartials = [5, 7, 9, 11];   // upper harmonics that bloom
  const allPartials = [...lowPartials, ...highPartials];

  // Compute magnitudes for chosen partials
  const mags: number[] = [];
  for (const k of allPartials) {
    if (k >= N) {
      mags.push(0);
      continue;
    }
    const rk = re[k];
    const ik = im[k];
    mags.push(Math.sqrt(rk * rk + ik * ik));
  }

  // Normalize magnitudes to [0, 1] (avoid division by zero)
  let maxMag = 0;
  for (const m of mags) {
    if (m > maxMag) maxMag = m;
  }
  const normMags = mags.map((m) => (maxMag > 0 ? m / maxMag : 0));

  // Compute bloom factor from dt: dt <= 0.9 → 0, dt >= 1.1 → 1
  // This makes it more responsive to the actual dt oscillation range (0.8-1.2)
  const bloomFactor = Math.min(1, Math.max(0, (dt - 0.9) / 0.2));

  // Map normalized magnitudes → final amplitudes per partial
  // Low partials: always active, slightly enhanced by bloom
  // High partials: mostly controlled by bloom
  const amps: number[] = [];
  for (let i = 0; i < allPartials.length; i++) {
    const k = allPartials[i];
    const norm = normMags[i];

    const isLow = lowPartials.includes(k);

    if (isLow) {
      // Low partials: stronger base, less dependent on RD magnitude
      const base = 0.4 + 0.4 * norm;       // 0.4–0.8 (stronger base)
      const bloomBoost = 0.1 * bloomFactor;
      amps.push(base + bloomBoost);
    } else {
      // high partials - make them much more audible and responsive to bloom
      const base = 0.15 + 0.4 * norm;      // 0.15–0.55 (higher base)
      const bloomGain = 0.4 + 0.6 * bloomFactor; // 0.4–1.0 (much higher minimum)
      amps.push(base * bloomGain);
    }
  }

  // Optional: grab phases from the original DFT to keep some continuity
  const phases: number[] = [];
  for (const k of allPartials) {
    if (k >= N) {
      phases.push(0);
      continue;
    }
    phases.push(Math.atan2(im[k], re[k]));
  }

  // Reconstruct a pure harmonic wavetable: sum of sinusoids
  const out = new Float32Array(N);
  for (let n = 0; n < N; n++) {
    const phaseBase = (2 * Math.PI * n) / N;
    let sample = 0;

    for (let i = 0; i < allPartials.length; i++) {
      const k = allPartials[i];
      const amp = amps[i];
      if (amp === 0) continue;

      const phase = k * phaseBase + phases[i];
      sample += amp * Math.sin(phase);
    }

    out[n] = sample;
  }

  // Normalize final wavetable to keep max amplitude <= 0.95
  let maxAbs = 0;
  for (let i = 0; i < N; i++) {
    const v = Math.abs(out[i]);
    if (v > maxAbs) maxAbs = v;
  }

  if (maxAbs > 0.0001) {
    const norm = 0.95 / maxAbs;
    for (let i = 0; i < N; i++) {
      out[i] *= norm;
    }
  }

  return out;
}

export function useRDAudioWavetable() {
  const [ready, setReady] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const shaperRef = useRef<WaveShaperNode | null>(null);
  const hpRef = useRef<BiquadFilterNode | null>(null);
  const lowpassRef = useRef<BiquadFilterNode | null>(null);
  const oscRef = useRef<AudioBufferSourceNode | null>(null);
  const oscGainRef = useRef<GainNode | null>(null);
  const nextOscRef = useRef<AudioBufferSourceNode | null>(null);
  const nextOscGainRef = useRef<GainNode | null>(null);
  const currentBufferRef = useRef<AudioBuffer | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const isCrossfadingRef = useRef<boolean>(false);
  const bloomRef = useRef(0);
  const UPDATE_THROTTLE_MS = 100; // Throttle updates to avoid too frequent restarts
  const CROSSFADE_TIME = 0.05; // 50ms crossfade time
  
  // Phase modulation from Voice A
  const modulationInputRef = useRef<GainNode | null>(null);
  const modulationAnalyserRef = useRef<AnalyserNode | null>(null);
  const modulationControlLoopRef = useRef<number | null>(null);
  const basePlaybackRateRef = useRef<number>(1.0);

  function createOrUpdateWavetableBuffer(
    audioContext: AudioContext,
    waveform: Float32Array
  ): AudioBuffer {
    const length = waveform.length;
    let buffer = currentBufferRef.current;

    if (!buffer || buffer.length !== length) {
      buffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
      currentBufferRef.current = buffer;
    }

    const channel = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      channel[i] = waveform[i];
    }

    return buffer;
  }

  function createAndStartOscillator(buffer?: AudioBuffer, useCrossfade: boolean = false) {
    const audioContext = audioContextRef.current;
    const master = masterGainRef.current;
    const shaper = shaperRef.current;
    if (!audioContext || !master || !shaper) return;

    const targetBuffer = buffer || currentBufferRef.current;

    if (!targetBuffer) {
      // fallback: simple sine cycle if no field yet
      const length = 256;
      const buf = audioContext.createBuffer(1, length, audioContext.sampleRate);
      const ch = buf.getChannelData(0);
      for (let i = 0; i < length; i++) {
        const phase = (2 * Math.PI * i) / length;
        ch[i] = Math.sin(phase);
      }
      currentBufferRef.current = buf;
      return createAndStartOscillator(buf, useCrossfade);
    }

    const osc = audioContext.createBufferSource();
    osc.loop = true;
    osc.buffer = targetBuffer;

    // base playback rate sets the pitch
    const baseFreq = 90; // Hz
    const sampleRate = audioContext.sampleRate;
    const bufferLength = osc.buffer.length;
    const baseRate = (baseFreq * bufferLength) / sampleRate;
    basePlaybackRateRef.current = baseRate;
    osc.playbackRate.value = baseRate;

    if (useCrossfade && oscRef.current && oscGainRef.current && !isCrossfadingRef.current) {
      // Crossfade: fade out old, fade in new
      isCrossfadingRef.current = true;
      const now = audioContext.currentTime;
      const oldOsc = oscRef.current; // Capture old oscillator reference
      const oldGain = oscGainRef.current; // Capture old gain reference
      const newGain = audioContext.createGain();
      
      // Fade out old oscillator
      oldGain.gain.setValueAtTime(1.0, now);
      oldGain.gain.linearRampToValueAtTime(0.0, now + CROSSFADE_TIME);
      
      // Fade in new oscillator
      newGain.gain.setValueAtTime(0.0, now);
      newGain.gain.linearRampToValueAtTime(1.0, now + CROSSFADE_TIME);
      
      // Connect new oscillator through gain to shaper
      osc.connect(newGain);
      newGain.connect(shaper);
      
      // Immediately update refs to new oscillator
      oscRef.current = osc;
      oscGainRef.current = newGain;
      
      // Stop old oscillator after crossfade completes
      setTimeout(() => {
        try {
          oldOsc.stop();
        } catch (e) {
          // Already stopped
        }
        try {
          oldGain.disconnect();
        } catch (e) {
          // Already disconnected
        }
        isCrossfadingRef.current = false;
      }, CROSSFADE_TIME * 1000 + 10);
    } else if (useCrossfade && isCrossfadingRef.current) {
      // Crossfade in progress, just update buffer for next crossfade
      currentBufferRef.current = buffer;
      return;
    } else {
      // First oscillator or no crossfade needed
      const gain = audioContext.createGain();
      gain.gain.value = 1.0;
      
      osc.connect(gain);
      gain.connect(shaper);
      
      oscRef.current = osc;
      oscGainRef.current = gain;
    }
    
    osc.start();
  }

  const start = useCallback(() => {
    // If context already exists and is running, do nothing
    if (audioContextRef.current && audioContextRef.current.state === "running") {
      return;
    }

    // If context exists but is suspended, just resume
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
      // Restart oscillator if needed
      if (!oscRef.current) {
        createAndStartOscillator();
      }
      return;
    }

    // Create new AudioContext
    const audioContext = new AudioContext({ latencyHint: "interactive" });
    audioContextRef.current = audioContext;

    // master
    const master = audioContext.createGain();
    master.gain.value = 0.02; // Initial min gain (will be modulated by bloom)
    master.connect(audioContext.destination);
    masterGainRef.current = master;

    // waveshaper
    const shaper = audioContext.createWaveShaper();
    shaper.curve = makeSoftClipCurve(6) as any;
    shaper.oversample = "2x";
    shaperRef.current = shaper;

    // highpass
    const hp = audioContext.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 180;
    hp.Q.value = 0.7;
    hpRef.current = hp;

    // lowpass
    const lp = audioContext.createBiquadFilter();
    lp.type = "lowpass";
    // Initialize to min cutoff (will be modulated by bloom)
    lp.frequency.value = 800;
    lp.Q.value = 0.7;
    lowpassRef.current = lp;

    // chain: osc → shaper → hp → lp → master
    shaper.connect(hp);
    hp.connect(lp);
    lp.connect(master);

    // Phase modulation setup: analyser to read modulation signal
    const modulationAnalyser = audioContext.createAnalyser();
    modulationAnalyser.fftSize = 256;
    modulationAnalyser.smoothingTimeConstant = 0.3;
    modulationAnalyserRef.current = modulationAnalyser;

    setReady(true);

    // Resume context (in case it was suspended)
    audioContext.resume().then(() => {
      // Start oscillator after context is resumed
      createAndStartOscillator();
      
      // Initialize bloom control immediately
      const t = audioContext.currentTime;
      const initialBloom = bloomRef.current;
      const minGain = 0.02;
      const maxGain = 0.25;
      const targetGain = minGain + (maxGain - minGain) * initialBloom;
      master.gain.setValueAtTime(targetGain, t);
      
      const minLp = 800;
      const maxLp = 12000;
      const targetLp = minLp + (maxLp - minLp) * (0.2 + 0.8 * initialBloom);
      lp.frequency.setValueAtTime(targetLp, t);
      
      // Start phase modulation control loop
      startPhaseModulationControl();
    });
  }, []);
  
  // Phase modulation control loop: reads Voice A signal and modulates playbackRate
  const startPhaseModulationControl = useCallback(() => {
    if (modulationControlLoopRef.current !== null) return;
    
    const controlLoop = () => {
      const audioContext = audioContextRef.current;
      const analyser = modulationAnalyserRef.current;
      const osc = oscRef.current;
      
      if (!audioContext || !analyser || !osc || audioContext.state !== "running") {
        modulationControlLoopRef.current = requestAnimationFrame(controlLoop);
        return;
      }
      
      // Read modulation signal amplitude
      const timeData = new Float32Array(analyser.fftSize);
      analyser.getFloatTimeDomainData(timeData);
      
      // Compute RMS of modulation signal
      let sumSq = 0;
      for (let i = 0; i < timeData.length; i++) {
        sumSq += timeData[i] * timeData[i];
      }
      const rms = Math.sqrt(sumSq / timeData.length);
      
      // Map RMS to playback rate modulation
      // RMS range: typically 0-0.1 for Voice A, scale to ±20% playback rate change for more audible effect
      const modulationAmount = Math.min(1, rms * 10); // Scale to 0-1
      const modulationDepth = 0.20; // ±20% modulation (increased from 5% for more audible effect)
      const rateOffset = (modulationAmount - 0.5) * 2 * modulationDepth; // -0.20 to +0.20
      
      const baseRate = basePlaybackRateRef.current;
      const targetRate = baseRate * (1 + rateOffset);
      
      // Smoothly modulate playback rate
      const t = audioContext.currentTime;
      osc.playbackRate.setTargetAtTime(targetRate, t, 0.02); // Fast response
      
      modulationControlLoopRef.current = requestAnimationFrame(controlLoop);
    };
    
    modulationControlLoopRef.current = requestAnimationFrame(controlLoop);
  }, []);
  
  // Function to connect modulation input from Voice A
  const setModulationInput = useCallback((modulationSource: GainNode | null) => {
    const audioContext = audioContextRef.current;
    const analyser = modulationAnalyserRef.current;
    
    if (!audioContext || !analyser) return;
    
    // Disconnect previous source if any
    if (modulationInputRef.current) {
      try {
        modulationInputRef.current.disconnect();
      } catch (e) {
        // Already disconnected
      }
    }
    
    if (modulationSource) {
      // Connect modulation source to analyser
      modulationSource.connect(analyser);
      modulationInputRef.current = modulationSource;
      
      // Start control loop if not already running
      if (modulationControlLoopRef.current === null) {
        startPhaseModulationControl();
      }
    } else {
      modulationInputRef.current = null;
      // Reset playback rate to base when modulation is disconnected
      const osc = oscRef.current;
      if (osc) {
        const t = audioContext.currentTime;
        osc.playbackRate.setTargetAtTime(basePlaybackRateRef.current, t, 0.1);
      }
    }
  }, [startPhaseModulationControl]);

  const stop = useCallback(() => {
    // Stop phase modulation control loop
    if (modulationControlLoopRef.current !== null) {
      cancelAnimationFrame(modulationControlLoopRef.current);
      modulationControlLoopRef.current = null;
    }
    
    // Disconnect modulation input
    if (modulationInputRef.current) {
      try {
        modulationInputRef.current.disconnect();
      } catch (e) {
        // Already disconnected
      }
      modulationInputRef.current = null;
    }
    
    if (oscRef.current) {
      try {
        oscRef.current.stop();
      } catch (e) {
        // Already stopped, ignore
      }
      oscRef.current = null;
    }
    if (nextOscRef.current) {
      try {
        nextOscRef.current.stop();
      } catch (e) {
        // Already stopped, ignore
      }
      nextOscRef.current = null;
    }
    if (oscGainRef.current) {
      oscGainRef.current.disconnect();
      oscGainRef.current = null;
    }
    if (nextOscGainRef.current) {
      nextOscGainRef.current.disconnect();
      nextOscGainRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.suspend();
    }
  }, []);

  const updateFromField = useCallback((snapshot: RDFieldSnapshot) => {
    const audioContext = audioContextRef.current;
    if (!audioContext || audioContext.state === "closed") {
      // If no context yet, create one (will be started on user interaction)
      if (!audioContext) {
        console.log("[RDAudioWavetable] updateFromField called but no audio context yet");
      }
      return;
    }

    // Throttle updates to avoid too frequent restarts
    const now = performance.now();
    if (now - lastUpdateTimeRef.current < UPDATE_THROTTLE_MS) {
      return;
    }
    lastUpdateTimeRef.current = now;

    console.log("[RDAudioWavetable] Updating wavetable from field snapshot", {
      width: snapshot.width,
      height: snapshot.height,
      dataLength: snapshot.data.length,
      oscRunning: !!oscRef.current,
      contextState: audioContext.state,
    });

    // Ensure audio context is running
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const { width, height, data } = snapshot;
    const dt = snapshot.dt ?? 1.0;

    // Compute bloom and store it
    const bloom = clamp((dt - 1.0) / 0.3, 0, 1);
    bloomRef.current = bloom;
    
    // Debug: log bloom updates
    if (Math.random() < 0.1) {
      console.log("[RDAudioWavetable] Bloom updated:", {
        dt: dt.toFixed(3),
        bloom: bloom.toFixed(3),
      });
    }

    // 1. Sample the RD field along the spiral
    const rawWave = sampleSpiralWaveform(
      width,
      height,
      data,
      256, // samples
      3    // spiral turns
    );

    // 2. Build additive wavetable from spiral + dt
    const wavetable = buildAdditiveWavetableFromSpiral(rawWave, dt);

    // Debug: log additive wavetable stats periodically
    if (Math.random() < 0.1) {
      let wMin = Infinity, wMax = -Infinity, wMean = 0;
      for (let i = 0; i < wavetable.length; i++) {
        const v = wavetable[i];
        if (v < wMin) wMin = v;
        if (v > wMax) wMax = v;
        wMean += v;
      }
      wMean /= wavetable.length;
      
      console.log("[RDAudioWavetable] Additive wavetable stats:", {
        dt: dt.toFixed(3),
        bloom: bloom.toFixed(3),
        range: [wMin.toFixed(3), wMax.toFixed(3)],
        mean: wMean.toFixed(3),
        usingAdditive: true,
      });
    }

    // 3. Create or update the wavetable AudioBuffer
    const buffer = createOrUpdateWavetableBuffer(audioContext, wavetable);

    // Always update the buffer reference
    currentBufferRef.current = buffer;

    // if an oscillator is running, crossfade to new buffer:
    const osc = oscRef.current;
    if (osc) {
      // Use crossfade to smoothly transition to new buffer
      createAndStartOscillator(buffer, true);
    } else {
      // No oscillator yet, but we have a buffer - start one if context is ready
      if (audioContext.state === "running") {
        createAndStartOscillator(buffer, false);
      }
    }
  }, []);

  // Control loop to apply bloom to masterGain and lowpass
  useEffect(() => {
    if (!ready) return;

    let rafId: number;
    let frameCount = 0;
    let lastBloom = -1;

    const updateControls = () => {
      const ctx = audioContextRef.current;
      const master = masterGainRef.current;
      const lp = lowpassRef.current;

      if (ctx && ctx.state === "running" && master && lp) {
        const t = ctx.currentTime;
        const bloom = bloomRef.current;

        // Only update if bloom changed significantly (avoid constant setTargetAtTime calls)
        if (Math.abs(bloom - lastBloom) > 0.01 || frameCount % 10 === 0) {
          // Master gain: quiet at low bloom, louder at high bloom
          const minGain = 0.02;
          const maxGain = 0.25;
          const targetGain = minGain + (maxGain - minGain) * bloom;
          master.gain.setTargetAtTime(targetGain, t, 0.03); // Even faster time constant

          // Lowpass cutoff: darker at low bloom, brighter at high bloom (MORE EXTREME)
          const minLp = 800;   // Even darker at low bloom
          const maxLp = 12000; // Brighter at high bloom
          const targetLp = minLp + (maxLp - minLp) * (0.1 + 0.9 * bloom); // Less offset
          lp.frequency.setTargetAtTime(targetLp, t, 0.05); // Faster time constant

          lastBloom = bloom;

          // Debug logging every ~60 frames (~1 second at 60fps)
          if (frameCount % 60 === 0) {
            console.log("[RDAudioWavetable] Bloom control:", {
              bloom: bloom.toFixed(3),
              targetGain: targetGain.toFixed(3),
              targetLp: targetLp.toFixed(0),
              actualGain: master.gain.value.toFixed(3),
              actualLp: lp.frequency.value.toFixed(0),
            });
          }
        }
        frameCount++;
      }

      rafId = requestAnimationFrame(updateControls);
    };

    rafId = requestAnimationFrame(updateControls);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ready]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [stop]);

  return {
    ready,
    start,
    stop,
    updateFromField,
    setModulationInput,
  };
}
