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

// Color gradient controls
uniform float enableColor;       // 0 or 1
uniform float colorHueOffset;   // Base hue rotation (0..1)
uniform float colorSpeed;       // Hue rotation speed multiplier
uniform float colorSaturation;  // Saturation (0..1)
uniform float colorIntensity;   // Overall color intensity (0..1)

// Hover displacement
uniform vec2 uHoverCenter;      // Normalized center in [-1, 1] x [-1, 1]
uniform float uHoverStrength;   // 0 to 1

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

// Cosine bands with derivative AA (improved)
float bandsAA(float x, float freq, float thickness) {
  float w = fwidth(x * freq);                    // derivative for AA
  float y = cos(2.0 * 3.14159265 * freq * x);   // -1..1
  // map cosine to [0,1]; thickness controls how much near the peaks we keep
  float b = smoothstep(1.0 - thickness, 1.0, (y * 0.5 + 0.5));
  // Improved AA: use wider smoothstep for better edge smoothing
  float aaWidth = max(w * 2.0, 0.01); // Ensure minimum AA width
  return smoothstep(0.0, aaWidth, b) * smoothstep(1.0, 1.0 - aaWidth, b);
}

// simple tonemap
vec3 tonemap(vec3 c, float e) {
  return 1.0 - exp(-c * e);
}

// HSV to RGB conversion
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// RGB to HSV conversion
vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
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
  
  // Apply hover displacement - subtle bulge under hovered cards
  if (uHoverStrength > 0.001) {
    // Convert UV to normalized space [-1, 1] for distance calculation
    vec2 uvNorm = vUv * 2.0 - 1.0;
    float d = distance(uvNorm, uHoverCenter);
    
    // Soft falloff: 0.4 away -> 0, center -> 1
    float hoverFalloff = smoothstep(0.4, 0.0, d);
    
    // Max offset scale is small; keep it subtle (0.02-0.03 of height scale)
    float hoverOffset = hoverFalloff * uHoverStrength * 0.025;
    
    H += hoverOffset;
  }
  
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
  
  // Apply color gradient if enabled
  if (enableColor > 0.5) {
    // PRIMARY: Use the actual band phase from the cosine calculation
    // This ensures each band cycle gets a completely different color
    float bandPhase = freq * H; // This is the phase input to the cosine
    // Map each full band cycle to a different hue
    // Each time bandPhase increases by 1, we want a different color
    // Use a multiplier that ensures adjacent bands are very different
    float bandHue = fract(bandPhase * 2.0); // Each band cycle = different hue
    
    // Add subtle noise for organic variation within each band (not too much)
    float noiseHue = noise(vUv * 25.0 + time * colorSpeed * 0.1) * 0.1;
    
    // Add time-based rotation for animation
    float timeHue = fract(colorHueOffset + time * colorSpeed * 0.03);
    
    // Combine - band phase is dominant (each band gets different color)
    // Noise adds subtle variation within bands, time adds animation
    float hue = fract(bandHue + noiseHue + timeHue * 0.05);
    
    // Use band value and lighting for brightness/value
    // Restore vibrant colors for bright areas, but keep dark areas grey
    float brightness = max(lit.r, 0.4); // Higher minimum for vibrant colors in bands
    
    // Boost brightness significantly for neon psychedelic effect
    float colorBrightness = min(brightness * 1.8, 1.0);
    
    // Create HSV color with high saturation and brightness
    vec3 hsv = vec3(hue, colorSaturation, colorBrightness);
    vec3 color = hsv2rgb(hsv);
    
    // Mix colored version with grayscale based on intensity
    // But only apply color where there's actual content (bands), not in dark background
    // Use the original lit brightness to determine if we're in a dark area
    float darkAreaThreshold = 0.15; // Below this, stay grey
    float brightnessFactor = smoothstep(darkAreaThreshold, darkAreaThreshold + 0.1, lit.r); // Fade out color in very dark areas
    float mixFactor = max(colorIntensity, 0.7) * brightnessFactor; // Full color in bright areas, fade in dark areas
    vec3 finalColor = mix(lit, color, mixFactor);
    
    fragColor = vec4(tonemap(finalColor, exposure), 1.0);
  } else {
    // Original black/white rendering
  fragColor = vec4(tonemap(lit, exposure), 1.0);
  }
}

