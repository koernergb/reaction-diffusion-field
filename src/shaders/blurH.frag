precision highp float;

uniform sampler2D uSrc;
uniform vec2 uTexel;  // 1.0 / resolution
uniform float uRadius; // blur radius

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec4 sum = vec4(0.0);
  float totalWeight = 0.0;
  
  // 5-tap Gaussian kernel: weights for -2,-1,0,1,2
  float weights[5];
  weights[0] = 0.0545;  // -2
  weights[1] = 0.2442;  // -1
  weights[2] = 0.4026;  //  0
  weights[3] = 0.2442;  //  1
  weights[4] = 0.0545;  //  2
  
  float step = uRadius * uTexel.x;
  
  for (int i = -2; i <= 2; i++) {
    float weight = weights[i + 2];
    vec2 offset = vec2(float(i) * step, 0.0);
    sum += texture(uSrc, vUv + offset) * weight;
    totalWeight += weight;
  }
  
  fragColor = sum / totalWeight;
}

