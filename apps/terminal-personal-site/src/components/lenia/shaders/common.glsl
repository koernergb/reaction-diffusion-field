// src/components/lenia/shaders/common.glsl
// Common utility functions for Lenia 3D shaders

// Hash function for pseudo-random
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

// 3D noise (simplex-like approximation)
float noise3D(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  
  float n00 = hash(i + vec3(0.0, 0.0, 0.0));
  float n10 = hash(i + vec3(1.0, 0.0, 0.0));
  float n01 = hash(i + vec3(0.0, 0.0, 1.0));
  float n11 = hash(i + vec3(1.0, 0.0, 1.0));
  
  float n0001 = mix(n00, n01, f.z);
  float n1001 = mix(n10, n11, f.z);
  float nx = mix(n0001, n1001, f.x);
  
  float n010 = hash(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash(i + vec3(1.0, 1.0, 0.0));
  float n011 = hash(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash(i + vec3(1.0, 1.0, 1.0));
  
  float n0101 = mix(n010, n011, f.z);
  float n1101 = mix(n110, n111, f.z);
  float ny = mix(n0101, n1101, f.x);
  
  return mix(nx, ny, f.y);
}

// Fractional Brownian Motion (3-4 octaves)
float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 1.0;
  float frequency = 1.0;
  float maxValue = 0.0;
  
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise3D(p * frequency);
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  
  return value / maxValue;
}

// Curl noise (for flow advection)
vec3 curlNoise(vec3 p, float flowGain) {
  float eps = 0.01;
  
  float nx = noise3D(p + vec3(eps, 0.0, 0.0)) - noise3D(p - vec3(eps, 0.0, 0.0));
  float ny = noise3D(p + vec3(0.0, eps, 0.0)) - noise3D(p - vec3(0.0, eps, 0.0));
  float nz = noise3D(p + vec3(0.0, 0.0, eps)) - noise3D(p - vec3(0.0, 0.0, eps));
  
  vec3 curl = vec3(
    (nz - ny) / (2.0 * eps),
    (nx - nz) / (2.0 * eps),
    (ny - nx) / (2.0 * eps)
  );
  
  return curl * flowGain;
}

// Lenia smooth kernel K(r) = exp(-alpha * r^beta)
// r: distance from center (0-1)
// alpha: decay rate (~4.0)
// beta: power (~8.0)
float leniaKernel(float r) {
  float alpha = 4.0;
  float beta = 8.0;
  return exp(-alpha * pow(r, beta));
}

// Atlas UV mapping: map 3D (x,y,z) to 2D atlas texture
// uv2D: 2D UV within a slice (0-1)
// z: slice index (0 to N-1)
// tilesPerRow: sqrt(N) rounded up
// tileSize: N (grid size)
// atlasSize: total atlas width
vec2 atlasUV(vec2 uv2D, float z, float tilesPerRow, float tileSize, float atlasSize) {
  float fx = mod(z, tilesPerRow);
  float fy = floor(z / tilesPerRow);
  vec2 tile = vec2(fx, fy);
  vec2 offset = (tile * tileSize + uv2D * tileSize) / atlasSize;
  return offset;
}
