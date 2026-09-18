// Public API
export type RDFieldSnapshot = {
  width: number;
  height: number;
  // grayscale or luminance values, row-major, 0..1
  // This is the V channel from the RD simulation (U,V)
  data: Float32Array;
  /** Instantaneous RD timestep (includes dt sine modulation). */
  dt?: number;
  /** Simulation time in seconds. */
  simTime?: number;
  /** Period of the dt sine (seconds). */
  dtModPeriod?: number;
  /** Key RD params (slow knobs that shape the pattern). */
  f?: number;
  k?: number;
  /** Cursor UV in [0,1], or -1 if off-canvas. */
  mouseU?: number;
  mouseV?: number;
  touchGain?: number;
};

export type StripesOptions = {
  gridSize?: number;
  stepsPerFrame?: number;
  dt?: number;
  dtModPeriod?: number; // Period (in seconds) of sine wave modulating dt
  f?: number;  // feed
  k?: number;  // kill
  Du?: number;
  Dv?: number;
  touchGain?: number;
  touchRadius?: number;
  blurRadius?: number;
  freq?: number;
  bandThickness?: number;
  relief?: number;
  exposure?: number;
  warpAmp?: number;
  warpScale?: number;
  warpSpeed?: number;
  ambient?: number;
  diffuse?: number;
  specular?: number;
  shininess?: number;
  rim?: number;
  lightDir?: [number, number, number];
  showHeight?: boolean;
  showBandsOnly?: boolean;
  enableColor?: boolean;
  colorHueOffset?: number;
  colorSpeed?: number;
  colorSaturation?: number;
  colorIntensity?: number;
  // Hover displacement
  hoverCenter?: [number, number]; // Normalized in [-1, 1] x [-1, 1]
  hoverStrength?: number;         // 0 to 1
  // Callback for field updates (throttled to ~30fps)
  onFieldUpdate?: (snapshot: RDFieldSnapshot) => void;
};

export type StripesAPI = {
  cleanup: () => void;
  setParams: (opts: Partial<StripesOptions>) => void;
  reseed: () => void;
};

export { createTuringStripes } from "./runtime";
