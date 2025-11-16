// Public API
export type StripesOptions = {
  gridSize?: number;
  stepsPerFrame?: number;
  dt?: number;
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
};

export type StripesAPI = {
  cleanup: () => void;
  setParams: (opts: Partial<StripesOptions>) => void;
  reseed: () => void;
};

export { createTuringStripes } from "./runtime";

