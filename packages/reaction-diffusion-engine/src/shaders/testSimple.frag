precision highp float;

in vec2 vUv;
out vec4 outColor;

void main() {
  // Simple test: red-green gradient to verify rendering works
  outColor = vec4(vUv.x, vUv.y, 0.5, 1.0);
}

