export type RDPreset = {
  name: string;
  f: number;   // feed
  k: number;   // kill
  Du: number;
  Dv: number;
  dt?: number;
  stripeFreq?: number;
  stripeMix?: number;
};

export const PRESETS: RDPreset[] = [
  { name: 'Labyrinth',       f: 0.022, k: 0.051, Du: 0.16, Dv: 0.08 },  // Labyrinth preset for banded look
  { name: 'Maze (classic)',  f: 0.037, k: 0.065, Du: 0.16, Dv: 0.08, stripeFreq: 48, stripeMix: 0.6 },
  { name: 'Spots (islands)', f: 0.030, k: 0.058, Du: 0.18, Dv: 0.09, stripeFreq: 56, stripeMix: 0.5 },
  { name: 'Waves (striated)',f: 0.042, k: 0.065, Du: 0.14, Dv: 0.07, stripeFreq: 64, stripeMix: 0.7 },
  { name: 'Pulse (active)',  f: 0.046, k: 0.059, Du: 0.16, Dv: 0.08, stripeFreq: 40, stripeMix: 0.55 },
];

