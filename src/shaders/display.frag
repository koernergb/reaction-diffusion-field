#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

void main() {
  // Neutral, slightly bluish gray so we can verify gamma/precision.
  vec3 col = vec3(0.12, 0.16, 0.20) + vUv.xyx * 0.0;
  fragColor = vec4(col, 1.0);
}

