// Radial kernel helper
float gauss(float x, float m, float s) {
  float a = (x - m) / s;
  return exp(-0.5 * a * a);
}

// Two-lobe Lenia kernel in radius r ∈ [0,1]
float leniaKernel(float r) {
  float k1 = gauss(r, 0.15, 0.06);
  float k2 = gauss(r, 0.60, 0.18);
  return (k1 - 0.5 * k2);
}

// Blue-violet emission map
vec3 bioColor(float u) {
  // tone-map & slight hue shift
  float e = smoothstep(0.15, 1.0, u);
  return mix(vec3(0.18, 0.35, 0.55), vec3(0.58, 0.45, 0.95), e);
}

