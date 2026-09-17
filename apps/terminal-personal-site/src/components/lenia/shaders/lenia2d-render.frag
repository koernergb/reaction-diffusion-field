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

vec3 bioColor(float u) {
  // tone-map & slight hue shift
  float e = smoothstep(0.15, 1.0, u);
  return mix(vec3(0.18, 0.35, 0.55), vec3(0.58, 0.45, 0.95), e);
}

uniform sampler2D uTex;
uniform vec2 uRes;       // sim res (for texel if needed)
uniform float uExposure; // overall gain 0.5..2.0
uniform vec2 uParallax;  // small offset per-layer
varying vec2 vUV;

void main() {
  // Parallax: small UV offset (wrap)
  vec2 uv = fract(vUV + uParallax);
  float u = texture2D(uTex, uv).r;

  // Soft threshold to avoid haze
  float d = smoothstep(0.25, 0.95, u);

  vec3 c = bioColor(u) * d * uExposure;
  float a = d * 0.25;  // translucent layer

  gl_FragColor = vec4(c, a);
}

