precision highp float;

uniform sampler2D uHeight;      // blurred, normalized height [0,1]
uniform vec2 uHeightRes;         // resolution of heightTex
uniform float freq;              // band frequency (4..20, default 10)
uniform float bandThickness;     // 0.3..0.9 (default 0.6)
uniform float relief;            // 0.5..1.2 (default 0.8)
uniform float exposure;          // 0.9..1.6 (default 1.15)
uniform vec3 lightDir;           // normalized light direction
uniform float ambient;
uniform float diffuse;
uniform float specular;
uniform float shininess;
uniform float rim;

in vec2 vUv;
out vec4 fragColor;

vec2 texelSize() {
  return 1.0 / uHeightRes;
}

float height(vec2 uv) {
  // Use mip filtering for stability
  return textureLod(uHeight, uv, 0.0).r;
}

vec3 normalFromHeight(vec2 uv) {
  vec2 t = texelSize();
  // Sobel on blurred height
  float hL = height(uv - vec2(t.x, 0.0));
  float hR = height(uv + vec2(t.x, 0.0));
  float hD = height(uv - vec2(0.0, t.y));
  float hU = height(uv + vec2(0.0, t.y));
  vec2 grad = vec2(hR - hL, hU - hD);
  vec3 n = normalize(vec3(-grad * relief, 1.0));
  return n;
}

float bands(float h) {
  // Cosine stripes with AA
  float phase = freq * h;
  float bw = fwidth(phase);
  float c = 0.5 + 0.5 * cos(6.2831853 * phase);
  // Thickness: remap c around 0.5
  float th = mix(0.35, 0.95, bandThickness);
  float band = smoothstep(0.5 - th * 0.5 - bw, 0.5 - th * 0.5, c) *
               (1.0 - smoothstep(0.5 + th * 0.5, 0.5 + th * 0.5 + bw, c));
  return band; // 0..1
}

void main() {
  float h = clamp(height(vUv), 0.0, 1.0);
  float b = bands(h);

  vec3 n = normalFromHeight(vUv);
  vec3 ld = normalize(lightDir);
  float ndl = max(dot(n, ld), 0.0);
  float rimVal = pow(1.0 - max(dot(n, vec3(0,0,1)), 0.0), 2.0);

  // Sculpt band with light
  float diff = diffuse * ndl;
  vec3 V = vec3(0, 0, 1);
  vec3 H = normalize(ld + V);
  float specVal = specular * pow(max(dot(H, n), 0.0), shininess);
  float shade = ambient + diff + specVal + rim * rimVal;

  float v = b * shade;
  // Gentle tone map
  v = 1.0 - exp(-v * exposure);

  fragColor = vec4(vec3(v), 1.0);
}
