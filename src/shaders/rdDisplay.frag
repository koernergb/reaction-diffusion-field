precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uState;     // RG = U,V
uniform float     uExposure;
uniform float     uStripeFreq;
uniform float     uStripeMix;

// palette controls
uniform vec3      uColBase;   // background tint
uniform vec3      uColA;      // low emission
uniform vec3      uColB;      // high emission
uniform float     uInvert;    // 0 or 1

void main() {
  vec2 UV = texture(uState, vUv).rg;
  float V  = UV.g;

  float base = pow(clamp(V, 0.0, 1.0), 1.1) * uExposure;

  float phase = V * uStripeFreq * 6.2831853;
  float w = fwidth(phase);
  float stripe = 1.0 - smoothstep(0.0, w * 0.75, abs(sin(phase)));

  float mixV = mix(base, stripe, uStripeMix);
  mixV = clamp(mixV, 0.0, 1.0);

  vec3 emit = mix(uColA, uColB, mixV);
  vec3 col  = uColBase + emit * (0.85 + 0.15 * smoothstep(0.1, 0.9, mixV));

  if (uInvert > 0.5) col = vec3(1.0) - col;

  // subtle vignette
  vec2 p = vUv - 0.5;
  col *= smoothstep(0.95, 0.25, length(p));

  fragColor = vec4(col, 1.0);
}
