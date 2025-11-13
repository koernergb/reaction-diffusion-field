precision highp float;

uniform sampler2D uTexUV;      // RG texture (.r = U, .g = V)
uniform vec2 uTexel;            // 1/width, 1/height
uniform float uBlurRadius;      // blur radius in texels (0.0..2.5)

in vec2 vUv;
out vec4 fragColor;             // R channel = height

float gaussian(float x, float sigma) {
  return exp(-0.5 * x * x / (sigma * sigma));
}

// Blur helper that reads .r channel (U)
float blur1DR(sampler2D s, vec2 uv, vec2 dir, float radius, float sigma) {
  float sum = 0.0;
  float wsum = 0.0;
  int r = int(ceil(radius));
  for (int i = -32; i <= 32; i++) {
    if (i < -r || i > r) continue;
    float w = gaussian(float(i), sigma);
    sum += texture(s, uv + dir * float(i)).r * w;
    wsum += w;
  }
  return sum / max(wsum, 1e-6);
}

// Blur helper that reads .g channel (V)
float blur1DG(sampler2D s, vec2 uv, vec2 dir, float radius, float sigma) {
  float sum = 0.0;
  float wsum = 0.0;
  int r = int(ceil(radius));
  for (int i = -32; i <= 32; i++) {
    if (i < -r || i > r) continue;
    float w = gaussian(float(i), sigma);
    sum += texture(s, uv + dir * float(i)).g * w;
    wsum += w;
  }
  return sum / max(wsum, 1e-6);
}

void main() {
  // Read U and V from RG texture
  vec2 uv = texture(uTexUV, vUv).rg;
  float u = uv.r;
  float v = uv.g;
  
  // Centered "chemical potential" height
  float h = u - v;
  
  // Simple separable blur for stability & smooth normals
  float sigma = max(uBlurRadius, 0.0);
  if (sigma > 0.0) {
    // Blur U and V separately
    float uH = blur1DR(uTexUV, vUv, vec2(uTexel.x, 0.0), uBlurRadius, sigma);
    float vH = blur1DG(uTexUV, vUv, vec2(uTexel.x, 0.0), uBlurRadius, sigma);
    float uV = blur1DR(uTexUV, vUv, vec2(0.0, uTexel.y), uBlurRadius, sigma);
    float vV = blur1DG(uTexUV, vUv, vec2(0.0, uTexel.y), uBlurRadius, sigma);
    
    // Combine horizontal and vertical blurs
    float hH = uH - vH;
    float hV = uV - vV;
    h = 0.5 * (hH + hV);
  }
  
  // Normalize to ~[0,1] robustly (cheap "soft normalize")
  // Assumes h in approx [-1,1]; tweak gain as needed
  h = 0.5 + 0.5 * tanh(h * 3.0);
  
  // Output height in R channel (R16F format)
  fragColor = vec4(clamp(h, 0.0, 1.0), 0.0, 0.0, 1.0);
}
