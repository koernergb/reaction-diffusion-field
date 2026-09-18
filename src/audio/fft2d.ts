// 2D FFT utilities for RD field analysis
import * as mlFft from "ml-fft";

export type Complex2D = {
  re: Float32Array; // Real part, row-major
  im: Float32Array; // Imaginary part, row-major
  width: number;
  height: number;
};

export type FFTFeatures = {
  radialBins: Float32Array; // Magnitude per radial distance bin
  dominantFreq: { fx: number; fy: number; magnitude: number }; // Peak location
  spectralCentroid: number; // Weighted average frequency (brightness)
  bandEnergies: { low: number; mid: number; high: number }; // Energy in frequency bands
  totalEnergy: number;
};

/**
 * Perform 2D FFT on row-major Float32Array data
 * @param data Row-major array (height rows × width columns)
 * @param width Width of the field
 * @param height Height of the field
 * @returns Complex 2D FFT result
 */
export function fft2d(
  data: Float32Array,
  width: number,
  height: number
): Complex2D {
  // Use FFTUtils.fft2DArray which handles real 2D arrays
  // It expects: data (flat array), nRows, nCols
  // Returns: flat array with (nRows * 2, nCols / 2 + 1) format
  
  // Convert to regular array
  const flatData = Array.from(data);
  
  // Ensure dimensions are powers of 2 (required by FFT)
  const pow2Width = Math.pow(2, Math.ceil(Math.log2(Math.max(width, 2))));
  const pow2Height = Math.pow(2, Math.ceil(Math.log2(Math.max(height, 2))));
  
  // Pad data to power-of-2 dimensions
  const paddedData = new Array(pow2Height * pow2Width).fill(0);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = y * width + x;
      const dstIdx = y * pow2Width + x;
      paddedData[dstIdx] = data[srcIdx];
    }
  }
  
  try {
    // Verify FFTUtils is available
    if (!mlFft.FFTUtils) {
      console.error("[fft2d] mlFft.FFTUtils is not available. mlFft keys:", Object.keys(mlFft));
      throw new Error("FFTUtils not available");
    }
    
    if (typeof mlFft.FFTUtils.fft2DArray !== 'function') {
      console.error("[fft2d] fft2DArray is not a function. FFTUtils keys:", Object.keys(mlFft.FFTUtils));
      throw new Error("fft2DArray is not a function");
    }
    
    console.log(`[fft2d] Calling fft2DArray with paddedData length: ${paddedData.length}, pow2Height: ${pow2Height}, pow2Width: ${pow2Width}`);
    
    // Call FFTUtils.fft2DArray
    const fftResult = mlFft.FFTUtils.fft2DArray(paddedData, pow2Height, pow2Width);
    
    console.log(`[fft2d] FFT result length: ${fftResult.length}, expected: ${pow2Height * 2 * (Math.floor(pow2Width / 2) + 1)}`);
    
    // Output dimensions: (pow2Height * 2, pow2Width / 2 + 1)
    // fft2DArray returns: even rows (0,2,4...) = real, odd rows (1,3,5...) = imag
    // Each "row" has ftCols = (pow2Width / 2 + 1) elements (DC to Nyquist)
    const ftCols = Math.floor(pow2Width / 2) + 1;
    
    // Convert FFT output to our Complex2D format
    // The FFT output is in frequency domain with DC at (0,0) in the output array
    // We need to map it to spatial frequency coordinates with DC at center
    const re = new Float32Array(width * height);
    const im = new Float32Array(width * height);
    
    for (let y = 0; y < height; y++) {
      // Map output y to FFT row (clamp to valid range)
      const fftY = Math.min(y, pow2Height - 1);
      const evenRowIdx = fftY * 2;
      const oddRowIdx = fftY * 2 + 1;
      
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        
        // FFT output format: DC at x=0, positive frequencies up to Nyquist at x=ftCols-1
        // For real input, we only get half the spectrum (DC to Nyquist)
        // We need to map our spatial coordinate to the FFT output coordinate
        
        // Convert spatial x to frequency domain x
        // DC is at center of our output, but at x=0 in FFT output
        const centerX = Math.floor(width / 2);
        let freqX = x;
        
        // Shift coordinate system: center -> 0
        if (freqX >= centerX) {
          // Right half: positive frequencies
          freqX = freqX - centerX;
        } else {
          // Left half: negative frequencies (use symmetry)
          freqX = pow2Width - (centerX - freqX);
        }
        
        // Clamp to valid FFT output range (0 to ftCols-1)
        freqX = Math.min(Math.max(0, freqX), ftCols - 1);
        
        // Extract real and imaginary parts
        const fftRealIdx = evenRowIdx * ftCols + freqX;
        const fftImagIdx = oddRowIdx * ftCols + freqX;
        
        let realVal = fftResult[fftRealIdx] || 0;
        let imagVal = fftResult[fftImagIdx] || 0;
        
        // For negative frequencies (if we mapped to them), use conjugate symmetry
        if (x < centerX && freqX > 0 && freqX < ftCols - 1) {
          // This is a negative frequency, use conjugate
          imagVal = -imagVal;
        }
        
        re[idx] = realVal;
        im[idx] = imagVal;
      }
    }
    
    return { re, im, width, height };
  } catch (error) {
    console.error("[fft2d] Error computing FFT:", error);
    // Return zero-filled result on error
    return {
      re: new Float32Array(width * height),
      im: new Float32Array(width * height),
      width,
      height,
    };
  }
}

/**
 * Compute magnitude spectrum from complex 2D FFT
 */
export function magnitudeSpectrum(fft: Complex2D): Float32Array {
  const mag = new Float32Array(fft.width * fft.height);
  for (let i = 0; i < mag.length; i++) {
    const re = fft.re[i];
    const im = fft.im[i];
    mag[i] = Math.sqrt(re * re + im * im);
  }
  return mag;
}

/**
 * Extract radial frequency bins from 2D FFT
 * Groups frequencies by distance from DC (center)
 */
export function extractRadialBins(
  fft: Complex2D,
  numBins: number = 32
): Float32Array {
  const mag = magnitudeSpectrum(fft);
  const bins = new Float32Array(numBins);
  const binCounts = new Float32Array(numBins);

  const cx = fft.width / 2;
  const cy = fft.height / 2;
  const maxR = Math.min(cx, cy);

  for (let y = 0; y < fft.height; y++) {
    for (let x = 0; x < fft.width; x++) {
      const idx = y * fft.width + x;
      
      // Convert to frequency coordinates (DC at center)
      const fx = (x - cx) / fft.width;
      const fy = (y - cy) / fft.height;
      const r = Math.sqrt(fx * fx + fy * fy);
      
      // Map to bin (0 = DC, numBins-1 = highest frequency)
      const binIdx = Math.min(
        Math.floor((r / maxR) * numBins),
        numBins - 1
      );
      
      bins[binIdx] += mag[idx];
      binCounts[binIdx]++;
    }
  }

  // Average each bin
  for (let i = 0; i < numBins; i++) {
    if (binCounts[i] > 0) {
      bins[i] /= binCounts[i];
    }
  }

  return bins;
}

/**
 * Find dominant frequency (peak magnitude location)
 */
export function findDominantFrequency(fft: Complex2D): {
  fx: number;
  fy: number;
  magnitude: number;
} {
  const mag = magnitudeSpectrum(fft);
  let maxMag = 0;
  let maxIdx = 0;

  // Skip DC component (center)
  const cx = fft.width / 2;
  const cy = fft.height / 2;

  for (let i = 0; i < mag.length; i++) {
    const y = Math.floor(i / fft.width);
    const x = i % fft.width;
    
    // Skip center (DC)
    if (x === Math.floor(cx) && y === Math.floor(cy)) continue;
    
    if (mag[i] > maxMag) {
      maxMag = mag[i];
      maxIdx = i;
    }
  }

  const y = Math.floor(maxIdx / fft.width);
  const x = maxIdx % fft.width;
  
  // Convert to normalized frequency coordinates
  const fx = (x - cx) / fft.width;
  const fy = (y - cy) / fft.height;

  return { fx, fy, magnitude: maxMag };
}

/**
 * Compute spectral centroid (weighted average frequency)
 * Higher centroid = brighter/more high-frequency content
 */
export function computeSpectralCentroid(fft: Complex2D): number {
  const mag = magnitudeSpectrum(fft);
  let weightedSum = 0;
  let totalMag = 0;

  const cx = fft.width / 2;
  const cy = fft.height / 2;

  for (let i = 0; i < mag.length; i++) {
    const y = Math.floor(i / fft.width);
    const x = i % fft.width;
    
    // Distance from DC (normalized)
    const fx = (x - cx) / fft.width;
    const fy = (y - cy) / fft.height;
    const r = Math.sqrt(fx * fx + fy * fy);
    
    weightedSum += r * mag[i];
    totalMag += mag[i];
  }

  return totalMag > 0 ? weightedSum / totalMag : 0;
}

/**
 * Compute energy in frequency bands (low, mid, high)
 */
export function computeBandEnergies(fft: Complex2D): {
  low: number;
  mid: number;
  high: number;
} {
  const mag = magnitudeSpectrum(fft);
  let low = 0;
  let mid = 0;
  let high = 0;

  const cx = fft.width / 2;
  const cy = fft.height / 2;
  const maxR = Math.min(cx, cy);

  for (let i = 0; i < mag.length; i++) {
    const y = Math.floor(i / fft.width);
    const x = i % fft.width;
    
    const fx = (x - cx) / fft.width;
    const fy = (y - cy) / fft.height;
    const r = Math.sqrt(fx * fx + fy * fy);
    const normalizedR = r / maxR;

    const m = mag[i];
    
    if (normalizedR < 0.33) {
      low += m;
    } else if (normalizedR < 0.66) {
      mid += m;
    } else {
      high += m;
    }
  }

  return { low, mid, high };
}

/**
 * Extract all features from 2D FFT
 */
export function extractFFTFeatures(
  fft: Complex2D,
  numRadialBins: number = 32
): FFTFeatures {
  const radialBins = extractRadialBins(fft, numRadialBins);
  const dominantFreq = findDominantFrequency(fft);
  const spectralCentroid = computeSpectralCentroid(fft);
  const bandEnergies = computeBandEnergies(fft);
  
  const totalEnergy = bandEnergies.low + bandEnergies.mid + bandEnergies.high;

  return {
    radialBins,
    dominantFreq,
    spectralCentroid,
    bandEnergies,
    totalEnergy,
  };
}

