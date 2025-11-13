precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uHeight;      // heightTex (R16F, LINEAR)
uniform vec2 uTexel;            // 1/size
uniform float freq;              // band frequency (e.g., 6..14)
uniform float bandThickness;    // 0.4..0.8
uniform float relief;            // band slope to height (e.g., 0.8)
uniform float exposure;          // 0.9..1.6

// Lighting
uniform vec3 lightDir;           // normalized
uniform float ambient;
uniform float diffuse;
uniform float specular;
uniform float shininess;
uniform float rim;

// Domain warp
uniform float warpAmp;           // ~0.02..0.08 (in UV space)
uniform float warpScale;         // 1.0..6.0
uniform float warpSpeed;         // 0.02..0.2
uniform float time;

// Debug toggles
uniform float showHeight;        // 0 or 1
uniform float showBandsOnly;     // 0 or 1

// ---- fbm / curl helpers ----
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

vec2 curl(vec2 p) {
  float e = 0.5;
  float a = fbm(p + vec2(0.0, e));
  float b = fbm(p - vec2(0.0, e));
  float c = fbm(p + vec2(e, 0.0));
  float d = fbm(p - vec2(e, 0.0));
  return vec2(a - b, d - c); // ∂N/∂y , -∂N/∂x
}

// Sobel on height (for normals). Use UNWARPED sample for stable normals.
vec3 normalFromHeight(vec2 uv) {
  float hC = texture(uHeight, uv).r;
  float hL = texture(uHeight, uv - vec2(uTexel.x, 0.0)).r;
  float hR = texture(uHeight, uv + vec2(uTexel.x, 0.0)).r;
  float hD = texture(uHeight, uv - vec2(0.0, uTexel.y)).r;
  float hU = texture(uHeight, uv + vec2(0.0, uTexel.y)).r;
  vec2 g = vec2(hR - hL, hU - hD); // gradient
  // scale relief for steeper/lower slopes
  vec3 n = normalize(vec3(-g.x * relief, -g.y * relief, 1.0));
  return n;
}

// Cosine bands with derivative AA
float bandsAA(float x, float freq, float thickness) {
  float w = fwidth(x * freq);                    // derivative for AA
  float y = cos(2.0 * 3.14159265 * freq * x);   // -1..1
  // map cosine to [0,1]; thickness controls how much near the peaks we keep
  float b = smoothstep(1.0 - thickness, 1.0, (y * 0.5 + 0.5));
  // optional aa via sharpening around edges using w
  return smoothstep(0.0, w, b) * smoothstep(1.0, 1.0 - w, b);
}

// simple tonemap
vec3 tonemap(vec3 c, float e) {
  return 1.0 - exp(-c * e);
}

void main() {
  // Domain-warp the *render* UVs (not the sim state)
  // Gentle sine LFO modulation on warp amplitude, scale, and speed
  float lfoFreq = 0.30;  // Slow oscillation (~0.30 Hz)
  float lfoAmount = 0.5; // 50% modulation
  float modulatedAmp = warpAmp * (1.0 + lfoAmount * sin(time * 6.28318530718 * lfoFreq));
  float scaleLfoFreq = 0.15;  // Half as fast (~0.15 Hz)
  float scaleLfoAmount = 0.4; // 40% modulation (20% less intense)
  float modulatedScale = warpScale * (1.0 + scaleLfoAmount * sin(time * 6.28318530718 * scaleLfoFreq));
  float speedLfoFreq = 0.12;  // Slower oscillation (~0.12 Hz)
  float speedLfoAmount = 0.15; // 15% modulation (a little less intense)
  float modulatedSpeed = warpSpeed * (1.0 + speedLfoAmount * sin(time * 6.28318530718 * speedLfoFreq));
  
  vec2 p = vUv * modulatedScale + vec2(0.0, time * modulatedSpeed);
  vec2 w = curl(p) * modulatedAmp;
  vec2 uvWarped = vUv + w;
  
  // Height sample for band coordinate; center around 0 with relief
  float H = texture(uHeight, uvWarped).r;
  
  // Debug: show height as grayscale
  if (showHeight > 0.5) {
    fragColor = vec4(vec3(H), 1.0);
    return;
  }
  
  // Large, smooth bands
  float B = bandsAA(H, freq, bandThickness);
  
  // Debug: show bands only
  if (showBandsOnly > 0.5) {
    fragColor = vec4(vec3(B), 1.0);
    return;
  }
  
  // Normals from UNWARPED space for lighting stability
  vec3 N = normalFromHeight(vUv);
  vec3 L = normalize(lightDir);
  float diff = max(dot(N, L), 0.0);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 Hn = normalize(L + V);
  float spec = pow(max(dot(N, Hn), 0.0), shininess);
  float rimVal = pow(1.0 - max(dot(N, V), 0.0), 2.0);
  
  // Black/white bands lit like relief
  vec3 base = mix(vec3(0.0), vec3(1.0), B);
  vec3 lit = ambient * base + diffuse * diff * base + specular * spec * vec3(1.0) + rim * rimVal * base;
  
  fragColor = vec4(tonemap(lit, exposure), 1.0);
}

