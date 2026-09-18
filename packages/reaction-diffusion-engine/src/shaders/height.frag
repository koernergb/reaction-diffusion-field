precision highp float;

uniform sampler2D uRD;  // RD texture (RG = U,V)
uniform float heightMode; // 0=V, 1=V-U normalized

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 uv = texture(uRD, vUv).rg;
  float u = uv.r;
  float v = uv.g;
  
  float h;
  if (heightMode < 0.5) {
    // V only
    h = clamp(v, 0.0, 1.0);
  } else {
    // V-U normalized to [0,1]
    h = clamp((v - u) * 0.5 + 0.5, 0.0, 1.0);
  }
  
  fragColor = vec4(h, 0.0, 0.0, 1.0); // R channel for height (rest unused)
}

