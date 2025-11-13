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

  float UVV = U * V * V;
  float dU = uDu * L.r - UVV + uFeed * (1.0 - U);
  float dV = uDv * L.g + UVV - (uFeed + uKill) * V;

  U += dU * uDt;
  V += dV * uDt;

  if (uMouse.x >= 0.0) {
    float d = distance(vUv, uMouse);
    float touch = exp(-pow(d / uTouchRadius, 2.0));
    V += uTouchGain * touch;
  }

  outUV = clamp(vec2(U, V), 0.0, 1.0);
}
