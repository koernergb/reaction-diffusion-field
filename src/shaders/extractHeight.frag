precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform sampler2D uState;  // RG = U,V from RD
uniform float heightMode;  // 0 = U, 1 = V, 2 = U-V

void main() {
  vec2 UV = texture(uState, vUv).rg;
  float U = UV.r;
  float V = UV.g;
  
  // Define height field (expose mode as uniform)
  float height;
  if (heightMode < 0.5) {
    height = U;  // Mode 0: U channel
  } else if (heightMode < 1.5) {
    height = V;  // Mode 1: V channel
  } else {
    height = U - V;  // Mode 2: U-V difference
  }
  
  // Don't clamp here - let EMA normalization handle it
  outColor = vec4(height, height, height, 1.0);
}

