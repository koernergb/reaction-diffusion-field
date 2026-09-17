precision highp float;

in vec2 vUv;
out vec2 outUV;

uniform sampler2D uPrev;
uniform vec2      uTexel;
uniform float     uDt;
uniform float     uFeed;
uniform float     uKill;
uniform float     uDu;
uniform float     uDv;
uniform vec2      uMouse;
uniform float     uTouchGain;
uniform float     uTouchRadius;

// flow controls
uniform float     uFlowAmp;   // 0..0.5 (scaled)
uniform float     uFlowFreq;  // 0..8
uniform float     uTime;      // seconds

// hash-style noise
float n2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=n2(i), b=n2(i+vec2(1,0)), c=n2(i+vec2(0,1)), d=n2(i+vec2(1,1));
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

// pseudo curl from scalar noise
vec2 curl(vec2 p){
  float e = 0.5;
  float a = noise(p + vec2(0.0, e));
  float b = noise(p - vec2(0.0, e));
  float c = noise(p + vec2(e, 0.0));
  float d = noise(p - vec2(e, 0.0));
  float dx = (a - b);
  float dy = (c - d);
  return vec2(dy, -dx); // rotate 90°
}

// sample with tiny advected offset
vec2 uvSample(vec2 st){
  float t = uTime * 0.15;
  vec2 flow = curl(st * uFlowFreq + t) * (uFlowAmp * 6.0); // ~pixels worth
  return texture(uPrev, st + flow * uTexel).rg;
}

vec2 laplacian() {
  vec2 t = vec2(0.0);
  vec2 U  = uvSample(vUv);
  t += uvSample(vUv + vec2( uTexel.x, 0.0));
  t += uvSample(vUv + vec2(-uTexel.x, 0.0));
  t += uvSample(vUv + vec2(0.0,  uTexel.y));
  t += uvSample(vUv + vec2(0.0, -uTexel.y));
  t += uvSample(vUv + vec2( uTexel.x,  uTexel.y));
  t += uvSample(vUv + vec2(-uTexel.x,  uTexel.y));
  t += uvSample(vUv + vec2( uTexel.x, -uTexel.y));
  t += uvSample(vUv + vec2(-uTexel.x, -uTexel.y));
  return (t - 8.0 * U);
}

void main() {
  vec2 UV = uvSample(vUv);
  float U = UV.r;
  float V = UV.g;

  vec2 L  = laplacian();

  // Use dt from uniform (manual control via slider)
  float localDt = uDt;

  // Cursor-reactive f and k with sine oscillation
  float localFeed = uFeed;
  float localKill = uKill;

  if (uMouse.x >= 0.0) {
    float d = distance(vUv, uMouse);
    // Use a wider falloff for f/k modulation to have more visible effect
    float touchRadiusWide = uTouchRadius * 2.0; // Wider radius for f/k effect
    float touch = exp(-pow(d / touchRadiusWide, 2.0));
    
    // Sine wave oscillating over 3.5 seconds: -1 to 1
    float period = 3.5; // seconds
    float sine = sin(uTime * 2.0 * 3.14159265 / period);
    
    // Map sine (-1 to 1) to f/k variation (relative to base values)
    // When sine = 1: high f, low k (growth)
    // When sine = -1: low f, high k (suppression/killing)
    float fVariationRatio = 0.9; // 90% variation relative to base f (more extreme)
    float kVariationRatio = 0.9; // 90% variation relative to base k (more extreme)
    
    // Apply variation with Gaussian falloff from cursor
    float fMod = sine * uFeed * fVariationRatio * touch;
    float kMod = -sine * uKill * kVariationRatio * touch; // inverse relationship
    
    localFeed = uFeed + fMod;
    localKill = uKill + kMod;
    
    // Cursor-reactive dt: always increase dt near cursor to speed up reaction
    // Use wider radius for dt to make it more visible
    float dtTouchRadius = uTouchRadius * 3.0; // Even wider radius for dt effect
    float dtTouch = exp(-pow(d / dtTouchRadius, 2.0));
    // Increase dt by up to 3x near cursor (always speed up, no oscillation)
    float dtModulation = 1.0 + dtTouch * 2.0; // Range: 1.0 to 3.0x base value
    localDt = uDt * dtModulation;
    
    // Modulate V injection based on sine wave - more V when suppressing (sine = -1)
    float touchV = exp(-pow(d / uTouchRadius, 2.0));
    // When sine = -1 (suppression), inject more V; when sine = 1 (growth), inject less
    float vModulation = 1.0 - sine * 0.5; // 1.5x V when sine = -1, 0.5x when sine = 1
    V += uTouchGain * touchV * vModulation;
    
    // Also inject U to maintain balance and prevent black center
    // Inject U proportional to V injection to keep reaction balanced
    float touchU = exp(-pow(d / uTouchRadius, 2.0));
    U += uTouchGain * touchU * 0.5; // Inject U at 50% of V injection rate
  }

  float UVV = U * V * V;
  float dU = uDu * L.r - UVV + localFeed * (1.0 - U);
  float dV = uDv * L.g + UVV - (localFeed + localKill) * V;

  U += dU * localDt;
  V += dV * localDt;

  outUV = clamp(vec2(U, V), 0.0, 1.0);
}
