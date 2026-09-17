#ifdef GL_ES
precision highp float;
#endif

// Common functions
float gauss(float x, float m, float s) {
  float a = (x - m) / s;
  return exp(-0.5 * a * a);
}

float leniaKernel(float r) {
  float k1 = gauss(r, 0.15, 0.06);
  float k2 = gauss(r, 0.60, 0.18);
  return (k1 - 0.5 * k2);
}

uniform sampler2D uPrev;
uniform vec2 uRes;              // sim resolution
uniform float uDt;
uniform float uMu;
uniform float uSigma;
uniform float uAlpha;
uniform vec2 uTouchUV;          // 0..1 (−1 if disabled)
uniform float uTouchGain;       // 0..1
uniform float uTouchRadius;     // in UV (0..0.5)
uniform float uJitter;          // tiny noise

varying vec2 vUV;

void main() {
  vec2 texel = 1.0 / uRes;

  // Radial convolution via rings (cheap, good-looking)
  // 5 rings × 8 samples per ring (fixed)
  float acc = 0.0;
  float wsum = 0.0;
  const int RINGS = 5;
  const int SAMP = 8;
  for (int r = 1; r <= RINGS; r++) {
    float rr = float(r) / float(RINGS);        // 0..1
    float w = leniaKernel(rr);
    for (int i = 0; i < SAMP; i++) {
      float a = 6.2831853 * (float(i) / float(SAMP));
      vec2 d = rr * vec2(cos(a), sin(a));
      vec2 uv = fract(vUV + d * texel);     // periodic wrap
      acc += w * texture2D(uPrev, uv).r;
    }
    wsum += w * float(SAMP);
  }
  float A = acc / max(wsum, 1e-6);

  // Growth
  float G = 2.0 * exp(-0.5 * pow((A - uMu) / uSigma, 2.0)) - 1.0;

  // Base state
  float U = texture2D(uPrev, vUV).r;

  // Cursor bloom (Gaussian in UV)
  if (uTouchGain > 0.0 && uTouchUV.x >= 0.0) {
    float d = distance(vUV, uTouchUV);
    float inject = exp(-pow(d / max(uTouchRadius, 1e-3), 2.0));
    U += uTouchGain * inject;
  }

  // Jitter (prevents dead states)
  U += (fract(sin(dot(vUV, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * uJitter;

  // Update
  U = clamp(U + uDt * uAlpha * G, 0.0, 1.0);

  gl_FragColor = vec4(U, 0.0, 0.0, 1.0);
}

