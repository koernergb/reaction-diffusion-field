"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { fft2d, extractFFTFeatures, FFTFeatures, magnitudeSpectrum } from "./fft2d";
import type { RDFieldSnapshot } from "./useRDAudioWavetable";

const N_PARTIALS = 32; // More partials to capture FFT spectrum detail
const BASE_FREQ = 110; // Base pitch in Hz
const FFT_UPDATE_THROTTLE_MS = 33; // Update FFT every ~33ms (30 FPS) - more reactive
const MAX_FFT_SIZE = 256; // Downsample if field is larger

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function makeSoftClipCurve(drive: number, samples = 1024): Float32Array {
  const curve = new Float32Array(samples);
  const k = 1 + drive * 10;
  for (let i = 0; i < samples; i++) {
    const x = (i / (samples - 1)) * 2 - 1;
    curve[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
  }
  return curve;
}

/**
 * Build PeriodicWave directly from 2D FFT magnitude spectrum
 * Maps spatial frequencies directly to audio partials:
 * - Low spatial frequencies → low harmonics
 * - High spatial frequencies → high harmonics
 * - Energy distribution in spatial domain → energy distribution in audio domain
 */
function buildPeriodicWaveFromFFT(
  ctx: AudioContext,
  magnitude: Float32Array,
  width: number,
  height: number,
  numPartials: number = N_PARTIALS
): PeriodicWave {
  const real = new Float32Array(numPartials + 1);
  const imag = new Float32Array(numPartials + 1);

  // Find center of frequency domain (DC is at center after fftshift)
  const cx = width / 2;
  const cy = height / 2;
  
  // Maximum radial distance from center (Nyquist)
  const maxR = Math.min(cx, cy);
  
  // Find max magnitude for normalization
  // Use a softer normalization to preserve dynamic range
  let maxMag = 0;
  let sumMag = 0;
  for (let i = 0; i < magnitude.length; i++) {
    if (magnitude[i] > maxMag) maxMag = magnitude[i];
    sumMag += magnitude[i];
  }
  const avgMag = sumMag / magnitude.length;
  // Use 80% of max or 3x average, whichever is larger - preserves more dynamics
  const normBase = Math.max(maxMag * 0.8, avgMag * 3);
  const magNorm = normBase > 0 ? 1 / normBase : 1;

  // Map each harmonic partial to a spatial frequency band
  // Use tighter bands and more direct mapping for better reactivity
  for (let k = 1; k <= numPartials; k++) {
    // Map harmonic index to spatial frequency radius
    // k=1 → low spatial freq (near DC), k=numPartials → high spatial freq (near Nyquist)
    const spatialFreqNorm = (k - 1) / (numPartials - 1); // 0..1
    const targetRadius = spatialFreqNorm * maxR;
    
    // Use tighter bands for better frequency resolution
    const bandWidth = (maxR / numPartials) * 0.5; // Narrower bands
    const minR = Math.max(0, targetRadius - bandWidth);
    const maxR_band = Math.min(maxR, targetRadius + bandWidth);
    
    let sumMag = 0;
    let count = 0;
    let maxMagInBand = 0;
    
    // Sample the magnitude spectrum in the radial band
    // Use max instead of average to preserve sharp features
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        
        // Convert to frequency coordinates (DC at center)
        const fx = x - cx;
        const fy = y - cy;
        const r = Math.sqrt(fx * fx + fy * fy);
        
        // Check if this point is in our target radial band
        if (r >= minR && r < maxR_band) {
          const mag = magnitude[idx];
          sumMag += mag;
          if (mag > maxMagInBand) maxMagInBand = mag;
          count++;
        }
      }
    }
    
    // Use weighted combination of average and max to preserve both structure and peaks
    const avgMag = count > 0 ? (sumMag / count) * magNorm : 0;
    const peakMag = maxMagInBand * magNorm;
    let amp = avgMag * 0.6 + peakMag * 0.4; // Weighted combination
    
    // Less aggressive power curve to preserve dynamics
    amp = Math.pow(amp, 0.85); // Less compression
    
    // Minimal rolloff - we want to hear the high frequencies
    const rolloff = Math.exp(-0.01 * (k - 1)); // Very minimal rolloff
    amp *= rolloff;
    
    imag[k] = amp;
    real[k] = 0;
  }

  // Normalize
  let maxAmp = 0;
  for (let k = 1; k <= numPartials; k++) {
    if (imag[k] > maxAmp) maxAmp = imag[k];
  }
  
  // Ensure we always have some amplitude
  if (maxAmp < 0.001) {
    // If all amplitudes are too small, create a minimal harmonic series
    for (let k = 1; k <= numPartials; k++) {
      const fallbackAmp = 0.3 / k; // Simple 1/k harmonic series
      imag[k] = fallbackAmp;
      real[k] = 0;
    }
    maxAmp = 0.3;
  }
  
  if (maxAmp > 0) {
    const norm = 0.95 / maxAmp;
    for (let k = 1; k <= numPartials; k++) {
      imag[k] *= norm;
    }
  }

  return ctx.createPeriodicWave(real, imag, { disableNormalization: true });
}

/**
 * Downsample field data for FFT performance
 */
function downsampleField(
  data: Float32Array,
  width: number,
  height: number,
  maxSize: number
): { data: Float32Array; width: number; height: number } {
  if (width <= maxSize && height <= maxSize) {
    return { data, width, height };
  }

  const scale = Math.min(maxSize / width, maxSize / height);
  const newWidth = Math.floor(width * scale);
  const newHeight = Math.floor(height * scale);
  const newData = new Float32Array(newWidth * newHeight);

  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const srcX = Math.floor((x / newWidth) * width);
      const srcY = Math.floor((y / newHeight) * height);
      const srcIdx = srcY * width + srcX;
      const dstIdx = y * newWidth + x;
      newData[dstIdx] = data[srcIdx];
    }
  }

  return { data: newData, width: newWidth, height: newHeight };
}

export function useRDAudioFFT() {
  const [ready, setReady] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const lpRef = useRef<BiquadFilterNode | null>(null);
  const shaperRef = useRef<WaveShaperNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);
  const controlRafRef = useRef<number | null>(null);
  const featuresRef = useRef<FFTFeatures | null>(null);
  const prevFeaturesRef = useRef<FFTFeatures | null>(null);
  const magnitudeRef = useRef<{ mag: Float32Array; width: number; height: number } | null>(null);
  const prevMagnitudeRef = useRef<{ mag: Float32Array; width: number; height: number } | null>(null);
  const interpolationAlphaRef = useRef(0); // 0 = use prev, 1 = use current
  const waveDirtyRef = useRef(false);
  const lastFFTUpdateRef = useRef(0);

  const start = useCallback(() => {
    if (startedRef.current) {
      console.log("[RDAudioFFT] Already started, skipping");
      return;
    }

    console.log("[RDAudioFFT] Starting audio...");
    const ctx =
      audioContextRef.current ??
      new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = ctx;

    const osc = ctx.createOscillator();
    osc.type = "sine";

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 4000;
    lp.Q.value = 0.7;

    const shaper = ctx.createWaveShaper();
    shaper.curve = makeSoftClipCurve(0.2);

    const master = ctx.createGain();
    master.gain.value = 0.0; // MUTED - using wavetable synth instead

    osc.connect(lp);
    lp.connect(shaper);
    shaper.connect(master);
    master.connect(ctx.destination);

    // Initial wave (will be updated when FFT features arrive)
    // Create a simple default wave with some amplitude so we can hear it
    const defaultMag = new Float32Array(256 * 256);
    // Create a simple pattern: more energy at low frequencies
    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        const cx = 128;
        const cy = 128;
        const fx = x - cx;
        const fy = y - cy;
        const r = Math.sqrt(fx * fx + fy * fy);
        const idx = y * 256 + x;
        // More energy at low frequencies
        defaultMag[idx] = Math.exp(-r / 20) * 100;
      }
    }
    const wave = buildPeriodicWaveFromFFT(ctx, defaultMag, 256, 256);
    osc.setPeriodicWave(wave);
    console.log("[RDAudioFFT] Default wave created with initial amplitude");

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    osc.frequency.value = BASE_FREQ;
    osc.start();

    oscRef.current = osc;
    lpRef.current = lp;
    shaperRef.current = shaper;
    masterGainRef.current = master;
    startedRef.current = true;
    waveDirtyRef.current = false;
    setReady(true);
    
    console.log("[RDAudioFFT] Audio started, master gain:", master.gain.value, "osc frequency:", osc.frequency.value);

    // Control loop
    const tick = () => {
      const audioContext = audioContextRef.current;
      const oscillator = oscRef.current;
      const lpFilter = lpRef.current;
      const shaperNode = shaperRef.current;
      const masterNode = masterGainRef.current;

      if (
        !audioContext ||
        !oscillator ||
        !lpFilter ||
        !shaperNode ||
        !masterNode
      ) {
        controlRafRef.current = requestAnimationFrame(tick);
        return;
      }

      const t = audioContext.currentTime;
      const features = featuresRef.current;

      if (features) {
        // Master gain: MUTED - using wavetable synth instead
        const targetGain = 0.0;
        masterNode.gain.setTargetAtTime(targetGain, t, 0.05);
        
        // Debug: log gain updates occasionally (muted)
        if (Math.random() < 0.01) {
          console.log("[RDAudioFFT] Control loop - gain:", targetGain.toFixed(3), "(MUTED)");
        }

        // LPF cutoff: use magnitude spectrum directly to detect high-frequency content
        // Calculate how much energy is in high spatial frequencies
        const magData = magnitudeRef.current;
        let highFreqEnergy = 0;
        let totalMagEnergy = 0;
        if (magData) {
          const cx = magData.width / 2;
          const cy = magData.height / 2;
          const maxR = Math.min(cx, cy);
          
          for (let y = 0; y < magData.height; y++) {
            for (let x = 0; x < magData.width; x++) {
              const fx = x - cx;
              const fy = y - cy;
              const r = Math.sqrt(fx * fx + fy * fy);
              const idx = y * magData.width + x;
              const mag = magData.mag[idx];
              totalMagEnergy += mag;
              
              // High spatial frequencies are far from center
              if (r > maxR * 0.6) {
                highFreqEnergy += mag;
              }
            }
          }
        }
        const highFreqRatio = totalMagEnergy > 0 ? highFreqEnergy / totalMagEnergy : 0;
        const brightness = clamp(features.spectralCentroid * 0.7 + highFreqRatio * 0.3, 0, 1);
        const targetLp = lerp(600, 12000, brightness); // Wider range
        lpFilter.frequency.setTargetAtTime(targetLp, t, 0.08); // Faster response

        // Distortion: high band energy + total energy variation
        const highEnergyNorm = features.bandEnergies.high / Math.max(1, features.totalEnergy);
        const energyVariation = Math.min(1, features.totalEnergy / 1000000); // How much energy there is
        const drive = lerp(0.1, 0.9, highEnergyNorm * 0.7 + energyVariation * 0.3); // More reactive
        shaperNode.curve = makeSoftClipCurve(drive) as any;

        // Pitch: use spectral centroid + high frequency content
        // Higher centroid or more high-frequency content = higher pitch
        const pitchFactor = features.spectralCentroid * 0.7 + highFreqRatio * 0.3;
        const pitchMultiplier = lerp(0.6, 1.8, pitchFactor); // Wider range: 0.6x to 1.8x
        const targetFreq = BASE_FREQ * pitchMultiplier;
        oscillator.frequency.setTargetAtTime(targetFreq, t, 0.08); // Faster response

        // Continuously update PeriodicWave with smooth interpolation
        // This runs every frame to create smooth, reactive sound
        // Use magnitude spectrum directly for reactive sound
        const currentMag = magnitudeRef.current;
        const prevMag = prevMagnitudeRef.current;
        
        if (currentMag) {
          // Use current magnitude directly for maximum reactivity
          // No interpolation - directly map current FFT state to sound
          const newWave = buildPeriodicWaveFromFFT(
            audioContext,
            currentMag.mag,
            currentMag.width,
            currentMag.height
          );
          
          // Verify wave has amplitude before applying
          const waveAmps = Array.from({length: N_PARTIALS + 1}, (_, i) => {
            const real = (newWave as any).real?.[i] || 0;
            const imag = (newWave as any).imag?.[i] || 0;
            return Math.sqrt(real * real + imag * imag);
          });
          const maxAmp = Math.max(...waveAmps);
          
          if (maxAmp > 0.001) {
            oscillator.setPeriodicWave(newWave);
            
            // Debug: log wave stats occasionally
            if (Math.random() < 0.05) {
              const nonZeroPartials = waveAmps.filter(a => a > 0.001).length;
              console.log("[RDAudioFFT] PeriodicWave updated:", {
                maxAmp: maxAmp.toFixed(4),
                nonZeroPartials,
                firstFewAmps: waveAmps.slice(1, 6).map(a => a.toFixed(3)),
              });
            }
          }
        }
      } else {
        // No features yet - use default gain
        if (Math.random() < 0.01) {
          console.log("[RDAudioFFT] Control loop - no features yet, using default gain");
        }
        masterNode.gain.setTargetAtTime(0.08, t, 0.08);
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
    startedRef.current = false;
    setReady(false);
  }, []);

  const updateFromField = useCallback(
    (snapshot: RDFieldSnapshot) => {
      const audioContext = audioContextRef.current;
      if (!audioContext || audioContext.state === "closed") {
        return;
      }

      // Throttle FFT updates
      const now = performance.now();
      if (now - lastFFTUpdateRef.current < FFT_UPDATE_THROTTLE_MS) {
        return;
      }
      lastFFTUpdateRef.current = now;

      // Downsample for performance
      const { data, width, height } = downsampleField(
        snapshot.data,
        snapshot.width,
        snapshot.height,
        MAX_FFT_SIZE
      );

      try {
        console.log("[RDAudioFFT] Computing FFT for field:", width, "x", height, "data length:", data.length);
        // Compute 2D FFT
        const fft = fft2d(data, width, height);
        console.log("[RDAudioFFT] FFT computed successfully");

        // Extract features
        const features = extractFFTFeatures(fft, 32);
        
        // Debug: check radial bins
        let maxRadialBin = 0;
        let nonZeroBins = 0;
        for (let i = 0; i < features.radialBins.length; i++) {
          if (features.radialBins[i] > maxRadialBin) maxRadialBin = features.radialBins[i];
          if (features.radialBins[i] > 0.001) nonZeroBins++;
        }
        
        console.log("[RDAudioFFT] Features extracted:", {
          centroid: features.spectralCentroid.toFixed(3),
          dominantFreq: `(${features.dominantFreq.fx.toFixed(3)}, ${features.dominantFreq.fy.toFixed(3)})`,
          totalEnergy: features.totalEnergy.toFixed(1),
          maxRadialBin: maxRadialBin.toFixed(3),
          nonZeroBins: nonZeroBins,
          bands: {
            low: features.bandEnergies.low.toFixed(1),
            mid: features.bandEnergies.mid.toFixed(1),
            high: features.bandEnergies.high.toFixed(1),
          },
        });

        // Compute magnitude spectrum from FFT
        const magnitude = magnitudeSpectrum(fft);
        
        // Store previous magnitude before updating (for smooth interpolation)
        if (magnitudeRef.current) {
          prevMagnitudeRef.current = magnitudeRef.current;
        }
        
        // Store current magnitude spectrum
        magnitudeRef.current = {
          mag: magnitude,
          width: fft.width,
          height: fft.height,
        };
        
        // Reset interpolation alpha when new data arrives
        // Start at 0.3 instead of 0 for faster response
        interpolationAlphaRef.current = 0.3;
        
        // Store previous features before updating (for change detection)
        if (featuresRef.current) {
          prevFeaturesRef.current = featuresRef.current;
        }
        
        // Store features (still used for other modulation)
        featuresRef.current = features;
        // Always mark as dirty to ensure wave rebuilds and stays reactive
        waveDirtyRef.current = true;
      } catch (error) {
        console.error("[RDAudioFFT] FFT computation error:", error);
        // Set default features on error so audio still works
        featuresRef.current = {
          radialBins: new Float32Array(32),
          dominantFreq: { fx: 0, fy: 0, magnitude: 0 },
          spectralCentroid: 0.5,
          bandEnergies: { low: 1, mid: 0, high: 0 },
          totalEnergy: 100, // Set to a reasonable default so gain isn't too low
        };
        waveDirtyRef.current = true;
      }
    },
    []
  );

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
      masterGainRef.current = null;
      startedRef.current = false;
    };
  }, []);

  return {
    ready,
    start,
    stop,
    updateFromField,
  };
}

