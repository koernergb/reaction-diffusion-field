// src/components/lenia/shaders/update.frag
// Lenia 3D update shader (compute step)
// Ping-pongs between two atlas textures

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uPrev;
uniform float uN;              // Grid size (N)
uniform float uTiles;           // Tiles per row (ceil(sqrt(N)))
uniform float uTileSize;       // Tile size (N)
uniform float uAtlasSize;       // Total atlas size
uniform vec3 uMouse3D;          // Mouse in world space (-10 if absent)
uniform float uTouchGain;
uniform float uTouchRadius;
uniform float uFlowGain;
uniform float uTime;
uniform vec2 uRes;              // Atlas resolution

varying vec2 vUv;

// Include common functions
float hash(vec3 p);
float noise3D(vec3 p);
float fbm(vec3 p);
vec3 curlNoise(vec3 p, float flowGain);
float leniaKernel(float r);
vec2 atlasUV(vec2 uv2D, float z, float tilesPerRow, float tileSize, float atlasSize);

void main() {
  // Map fragment coord to voxel (x, y, z)
  vec2 atlasCoord = vUv;
  
  // Find which tile we're in
  vec2 tileCoord = floor(atlasCoord * (uAtlasSize / uTileSize));
  float tileIndex = tileCoord.y * uTiles + tileCoord.x;
  
  // Extract (x,y) within tile
  vec2 localUV = fract(atlasCoord * (uAtlasSize / uTileSize));
  
  // Map to 0-1 space, then to -1..1 world space
  vec3 worldPos = vec3(localUV.x, localUV.y, tileIndex / uN) * 2.0 - 1.0;
  
  // Apply curl flow advection (small offset before sampling)
  vec3 curl = curlNoise(worldPos * 3.0 + vec3(uTime * 0.1), uFlowGain);
  vec3 samplePos = worldPos + curl * 0.02;
  
  // Sample neighborhood (13-tap spherical kernel)
  float accum = 0.0;
  float weightSum = 0.0;
  
  // Central sample
  vec3 centerPos = clamp(samplePos, -1.0, 1.0);
  vec2 centerUV = atlasUV((centerPos.xy + 1.0) * 0.5, (centerPos.z + 1.0) * 0.5 * uN, uTiles, uTileSize, uAtlasSize);
  float centerValue = texture2D(uPrev, centerUV).r;
  
  // Sample 12 neighbors on sphere (icosahedron-like)
  vec3 offsets[12];
  offsets[0] = vec3(0.5257, 0.0, 0.8507);
  offsets[1] = vec3(-0.5257, 0.0, 0.8507);
  offsets[2] = vec3(0.5257, 0.0, -0.8507);
  offsets[3] = vec3(-0.5257, 0.0, -0.8507);
  offsets[4] = vec3(0.0, 0.8507, 0.5257);
  offsets[5] = vec3(0.0, -0.8507, 0.5257);
  offsets[6] = vec3(0.0, 0.8507, -0.5257);
  offsets[7] = vec3(0.0, -0.8507, -0.5257);
  offsets[8] = vec3(0.8507, 0.5257, 0.0);
  offsets[9] = vec3(-0.8507, 0.5257, 0.0);
  offsets[10] = vec3(0.8507, -0.5257, 0.0);
  offsets[11] = vec3(-0.8507, -0.5257, 0.0);
  
  float kernelRadius = 0.15; // World space radius
  
  for (int i = 0; i < 12; i++) {
    vec3 neighborPos = samplePos + offsets[i] * kernelRadius;
    neighborPos = clamp(neighborPos, -1.0, 1.0);
    
    float dist = length(offsets[i] * kernelRadius) / kernelRadius;
    float k = leniaKernel(dist);
    
    vec2 neighborUV = atlasUV(
      (neighborPos.xy + 1.0) * 0.5,
      (neighborPos.z + 1.0) * 0.5 * uN,
      uTiles,
      uTileSize,
      uAtlasSize
    );
    
    float neighborValue = texture2D(uPrev, neighborUV).r;
    accum += neighborValue * k;
    weightSum += k;
  }
  
  // Normalize and compute growth
  float neighborhood = weightSum > 0.0 ? accum / weightSum : 0.0;
  
  // Lenia growth: g = kappa * sum(K(r) * value) - lambda * value
  float kappa = 0.15;  // Growth rate
  float lambda = 0.02; // Decay rate
  float growth = kappa * neighborhood - lambda * centerValue;
  
  // Add cursor bloom
  float value = centerValue;
  if (uMouse3D.x > -9.0) {
    float dist = distance(worldPos, uMouse3D);
    float touch = exp(-pow(dist / uTouchRadius, 2.0));
    value += uTouchGain * touch;
  }
  
  // Apply growth
  value += growth * 0.05;
  
  // Small jitter to avoid symmetry lock
  float jitter = hash(worldPos + uTime * 0.001) * 0.003;
  value += jitter;
  
  // Clamp and add small decay
  value = clamp(value * 0.995, 0.0, 1.0);
  
  gl_FragColor = vec4(value, 0.0, 0.0, 1.0);
}
