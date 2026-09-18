// Preset manager for saving/loading/sharing RD parameters
export type RDParams = {
  // Simulation
  stepsPerFrame: number;
  dt: number;
  gridSize: number;
  f: number;
  k: number;
  Du: number;
  Dv: number;
  touchGain: number;
  touchRadius: number;
  
  // Height processing
  blurRadius: number;
  
  // Bands
  freq: number;  // bandsFrequency
  bandThickness: number;
  relief: number;
  exposure: number;
  
  // Domain warp
  warpAmp: number;  // warpAmplitude
  warpScale: number;
  warpSpeed: number;
  
  // Lighting
  ambient: number;
  diffuse: number;
  specular: number;
  shininess: number;
  rim: number;
  
  // Optional params (if they exist)
  persistence?: number;
  dither?: number;
  showHeight?: boolean;
  showBandsOnly?: boolean;
};

const LS_KEY = "rd-presets-v1";

export type PresetMap = Record<string, RDParams>;

function loadAll(): PresetMap {
  try {
    const stored = localStorage.getItem(LS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveAll(m: PresetMap) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(m));
  } catch (e) {
    console.warn('[PresetManager] Failed to save to localStorage:', e);
  }
}

export function listPresets(): string[] {
  return Object.keys(loadAll()).sort();
}

export function getPreset(name: string): RDParams | null {
  const m = loadAll();
  return m[name] || null;
}

export function savePreset(name: string, params: RDParams) {
  const m = loadAll();
  m[name] = params;
  saveAll(m);
}

export function deletePreset(name: string) {
  const m = loadAll();
  delete m[name];
  saveAll(m);
}

export function exportPresets(): string {
  return JSON.stringify(loadAll(), null, 2);
}

export function importPresets(json: string) {
  try {
    const incoming: PresetMap = JSON.parse(json);
    const merged = { ...loadAll(), ...incoming };
    saveAll(merged);
    return true;
  } catch (e) {
    console.error('[PresetManager] Failed to import presets:', e);
    return false;
  }
}

// --- URL share helpers (base64) ---
export function encodeParamsToURL(p: RDParams): string {
  const raw = JSON.stringify(p);
  return btoa(unescape(encodeURIComponent(raw))); // base64
}

export function decodeParamsFromURL(s: string): RDParams | null {
  try {
    const raw = decodeURIComponent(escape(atob(s)));
    return JSON.parse(raw);
  } catch (e) {
    console.warn('[PresetManager] Failed to decode URL params:', e);
    return null;
  }
}

