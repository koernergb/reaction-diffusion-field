"use client";

import { create } from "zustand";

export type ThemeMode = "dark" | "light";
export type TuringParams = {
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
  lightDir?: [number, number, number]; // This now maps to baseLightDir internally
  showHeight?: boolean;
  showBandsOnly?: boolean;
  enableColor?: boolean;
  colorHueOffset?: number;
  colorSpeed?: number;
  colorSaturation?: number;
  colorIntensity?: number;
};

type Vec3 = [number, number, number];

// Helper to normalize a Vec3
function normalizeVec3([x, y, z]: Vec3): Vec3 {
  const len = Math.hypot(x, y, z) || 1;
  return [x / len, y / len, z / len];
}

interface UIState {
  // Theme
  glitchActive: boolean;
  setGlitchActive: (active: boolean) => void;
  theme: ThemeMode;
  toggleTheme: () => void;

  // Accessibility
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;

  // Backdrop
  showBackdrop: boolean;
  setShowBackdrop: (show: boolean) => void;

  // Backdrop parameters
  turing: TuringParams;
  setTuringConfig: (config: Partial<TuringParams>) => void;

  // Light direction interactivity
  baseLightDir: Vec3;      // What the slider sets
  cursorLightDir: Vec3;     // Derived from mouse position
  setBaseLightDir: (v: Vec3) => void;
  setCursorLightDir: (v: Vec3) => void;

  // Hover state for heightfield displacement
  hoverCenter: [number, number]; // Normalized in [-1, 1] x [-1, 1]
  hoverStrength: number;         // 0 to 1
  setHover: (center: [number, number] | null) => void;

  // Sonification
  sonificationEnabled: boolean;
  setSonificationEnabled: (enabled: boolean) => void;

}

// Detect prefers-reduced-motion
const getPrefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const useUiStore = create<UIState>((set, get) => {
  // Listen for system preference changes
  if (typeof window !== "undefined") {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", (e) => {
      set({ reducedMotion: e.matches });
    });
  }

  return {
    // Theme
    glitchActive: true,
    setGlitchActive: (active) => set({ glitchActive: active }),
    theme: "dark",
    toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),

    // Accessibility
    reducedMotion: getPrefersReducedMotion(),
    setReducedMotion: (value) => set({ reducedMotion: value }),

    // Backdrop
    showBackdrop: true,
    setShowBackdrop: (show) => set({ showBackdrop: show }),
    
    // Sonification
    sonificationEnabled: false,
    setSonificationEnabled: (enabled) => set({ sonificationEnabled: enabled }),

    // Backdrop parameters
    turing: {
      gridSize: 512,
      stepsPerFrame: 10,
      dt: 1.0,
      dtModPeriod: 5.0,
      f: 0.037,
      k: 0.065,
      Du: 0.16,
      Dv: 0.08,
      touchGain: 0.65,
      touchRadius: 0.03,
      blurRadius: 1.0,
      freq: 8.0,
      bandThickness: 0.65,
      relief: 0.8,
      exposure: 1.15,
      warpAmp: 0.04,
      warpScale: 3.0,
      warpSpeed: 0.06,
      ambient: 0.25,
      diffuse: 0.85,
      specular: 0.25,
      shininess: 24.0,
      rim: 0.25,
      lightDir: [0.2, 0.5, 1.0],
      showHeight: false,
      showBandsOnly: false,
      enableColor: false,
      colorHueOffset: 0.0,
      colorSpeed: 1.0,
      colorSaturation: 0.9,
      colorIntensity: 0.8,
    },
    // Light direction interactivity
    baseLightDir: [0.2, 0.5, 1.0] as Vec3,
    cursorLightDir: [0.0, 0.0, 1.0] as Vec3,
    setBaseLightDir: (v) => set({ baseLightDir: v }),
    setCursorLightDir: (v) => set({ cursorLightDir: v }),

    // Hover state
    hoverCenter: [0.0, 0.0] as [number, number],
    hoverStrength: 0.0,
    setHover: (center) =>
      set((state) => ({
        hoverCenter: center ?? state.hoverCenter,
        hoverStrength: center ? 0.3 : 0.0,
      })),

    setTuringConfig: (config) => {
      set((state) => {
        const newTuring = { ...state.turing, ...config };
        // If lightDir is being set, also update baseLightDir
        if (config.lightDir !== undefined) {
          return {
            turing: newTuring,
            baseLightDir: config.lightDir,
          };
        }
        return { turing: newTuring };
      });
    },
  };
});

export function applyThemeClass(theme: ThemeMode): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

// Selector for effective light direction (90% base, 10% cursor)
export function useEffectiveLightDir(): Vec3 {
  return useUiStore((state) => {
    const base = normalizeVec3(state.baseLightDir);
    const cursor = normalizeVec3(state.cursorLightDir);
    // 90% base, 10% cursor
    const blended: Vec3 = [
      base[0] * 0.9 + cursor[0] * 0.1,
      base[1] * 0.9 + cursor[1] * 0.1,
      base[2] * 0.9 + cursor[2] * 0.1,
    ];
    return normalizeVec3(blended);
  });
}
