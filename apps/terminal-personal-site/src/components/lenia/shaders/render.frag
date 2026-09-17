// src/components/lenia/shaders/render.frag
// Lenia 3D volume ray-march render shader

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uAtlas;
uniform float uN;
uniform float uTiles;
uniform float uTileSize;
uniform float uAtlasSize;
uniform float uExposure;
uniform vec3 uCameraPos;
uniform vec3 uCameraTarget;
uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

// Include common functions
vec2 atlasUV(vec2 uv2D, float z, float tilesPerRow, float tileSize, float atlasSize);

void main() {
  vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
  
  // Camera setup
  vec3 forward = normalize(uCameraTarget - uCameraPos);
  vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(right, forward);
  
  vec3 rayDir = normalize(forward + uv.x * right + uv.y * up);
  vec3 rayPos = uCameraPos;
  
  // Ray-march
  float stepSize = 0.03;
  int steps = 64;
  vec4 accum = vec4(0.0);
  
  for (int i = 0; i < 64; i++) {
    // Map ray position to -1..1 cube
    vec3 cubePos = rayPos;
    cubePos = clamp(cubePos, -1.0, 1.0);
    
    // Sample atlas
    vec2 atlasUVCoord = atlasUV(
      (cubePos.xy + 1.0) * 0.5,
      (cubePos.z + 1.0) * 0.5 * uN,
      uTiles,
      uTileSize,
      uAtlasSize
    );
    
    float density = texture2D(uAtlas, atlasUVCoord).r;
    
    // Bioluminescent color mapping
    float a = clamp(density * uExposure, 0.0, 1.0);
    
    // Blue → violet gradient
    vec3 col = mix(
      vec3(0.15, 0.35, 0.7),   // Deep blue
      vec3(0.60, 0.45, 1.0),    // Violet
      a
    );
    
    // Additive accumulation
    accum.rgb += col * a * 0.06;
    accum.a = clamp(accum.a + a * 0.04, 0.0, 1.0);
    
    // Early exit if fully opaque
    if (accum.a >= 0.99) break;
    
    rayPos += rayDir * stepSize;
    
    // Exit if outside cube
    if (any(greaterThan(abs(rayPos), vec3(1.0)))) break;
  }
  
  // Apply vignette
  float dist = length(vUv - 0.5) * 2.0;
  float vignette = 1.0 - smoothstep(0.4, 1.2, dist);
  accum.rgb *= vignette;
  
  // Soft chromatic aberration
  float aberration = 0.002;
  vec2 rUV = vUv + vec2(aberration, 0.0);
  vec2 bUV = vUv - vec2(aberration, 0.0);
  
  float r = texture2D(uAtlas, atlasUV(
    (rayPos.xy + 1.0) * 0.5,
    (rayPos.z + 1.0) * 0.5 * uN,
    uTiles,
    uTileSize,
    uAtlasSize
  )).r;
  
  accum.r *= 1.0 + r * 0.1;
  accum.b *= 1.0 + r * 0.1;
  
  gl_FragColor = vec4(accum.rgb, 1.0);
}
