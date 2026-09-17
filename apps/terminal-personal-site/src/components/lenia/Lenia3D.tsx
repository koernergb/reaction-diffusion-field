// src/components/lenia/Lenia3D.tsx
// WebGL2-based 3D Lenia volumetric organism renderer
// Uses slice-atlas approach: pack z-slices into 2D texture atlas
//
// ATLAS LAYOUT:
// - Grid size N×N×N (default 64³)
// - Pack z-slices into a 2D atlas: tilesPerRow = ceil(sqrt(N)), tileSize = N
// - Total atlas size: tilesPerRow * N
// - UV mapping: atlasUV(uv2D, z, tilesPerRow, tileSize, atlasSize) maps 3D (x,y,z) to atlas coordinates
// - Two RGBA32F textures ping-pong each simulation step (prev → next)
// - Update shader samples 3D neighborhood via spherical kernel (12 taps) indexed through atlas
// - Render shader ray-marches volume (64 steps) with bioluminescent blue→violet palette
//
// PERFORMANCE TUNING:
// - Grid: 32 (fast), 64 (balanced), 96 (heavy) - higher = more detail but slower
// - Steps/frame: 1-3 (more = smoother but slower)
// - Exposure: 0.8-2.2 (higher = brighter organism)
// - Flow gain: 0.04-0.08 (higher = more organic motion, curl advection)
// - Touch gain/radius: cursor proximity increases brightness and growth

"use client";

import React, { useEffect, useRef } from "react";
import { useUiStore, LeniaParams } from "@/lib/uiStore";

// Shader code embedded as strings
const commonGlsl = `
// Common utility functions
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise3D(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  
  float n00 = hash(i + vec3(0.0, 0.0, 0.0));
  float n10 = hash(i + vec3(1.0, 0.0, 0.0));
  float n01 = hash(i + vec3(0.0, 0.0, 1.0));
  float n11 = hash(i + vec3(1.0, 0.0, 1.0));
  
  float n0001 = mix(n00, n01, f.z);
  float n1001 = mix(n10, n11, f.z);
  float nx = mix(n0001, n1001, f.x);
  
  float n010 = hash(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash(i + vec3(1.0, 1.0, 0.0));
  float n011 = hash(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash(i + vec3(1.0, 1.0, 1.0));
  
  float n0101 = mix(n010, n011, f.z);
  float n1101 = mix(n110, n111, f.z);
  float ny = mix(n0101, n1101, f.x);
  
  return mix(nx, ny, f.y);
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 1.0;
  float frequency = 1.0;
  float maxValue = 0.0;
  
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise3D(p * frequency);
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  
  return value / maxValue;
}

vec3 curlNoise(vec3 p, float flowGain) {
  float eps = 0.01;
  
  float nx = noise3D(p + vec3(eps, 0.0, 0.0)) - noise3D(p - vec3(eps, 0.0, 0.0));
  float ny = noise3D(p + vec3(0.0, eps, 0.0)) - noise3D(p - vec3(0.0, eps, 0.0));
  float nz = noise3D(p + vec3(0.0, 0.0, eps)) - noise3D(p - vec3(0.0, 0.0, eps));
  
  vec3 curl = vec3(
    (nz - ny) / (2.0 * eps),
    (nx - nz) / (2.0 * eps),
    (ny - nx) / (2.0 * eps)
  );
  
  return curl * flowGain;
}

float leniaKernel(float r) {
  float alpha = 4.0;
  float beta = 8.0;
  return exp(-alpha * pow(r, beta));
}

vec2 atlasUV(vec2 uv2D, float z, float tilesPerRow, float tileSize, float atlasSize) {
  float fx = mod(z, tilesPerRow);
  float fy = floor(z / tilesPerRow);
  vec2 tile = vec2(fx, fy);
  vec2 offset = (tile * tileSize + uv2D * tileSize) / atlasSize;
  return offset;
}
`;

const updateFrag = `
#ifdef GL_ES
precision highp float;
#endif
` + commonGlsl + `

uniform sampler2D uPrev;
uniform float uN;
uniform float uTiles;
uniform float uTileSize;
uniform float uAtlasSize;
uniform vec3 uMouse3D;
uniform float uTouchGain;
uniform float uTouchRadius;
uniform float uFlowGain;
uniform float uTime;
uniform vec2 uRes;

varying vec2 vUv;

void main() {
  vec2 atlasCoord = vUv;
  vec2 tileCoord = floor(atlasCoord * (uAtlasSize / uTileSize));
  float tileIndex = tileCoord.y * uTiles + tileCoord.x;
  vec2 localUV = fract(atlasCoord * (uAtlasSize / uTileSize));
  vec3 worldPos = vec3(localUV.x, localUV.y, tileIndex / uN) * 2.0 - 1.0;
  
  vec3 curl = curlNoise(worldPos * 3.0 + vec3(uTime * 0.1), uFlowGain);
  vec3 samplePos = worldPos + curl * 0.02;
  
  float accum = 0.0;
  float weightSum = 0.0;
  
  vec3 centerPos = clamp(samplePos, -1.0, 1.0);
  vec2 centerUV = atlasUV((centerPos.xy + 1.0) * 0.5, (centerPos.z + 1.0) * 0.5 * uN, uTiles, uTileSize, uAtlasSize);
  float centerValue = texture2D(uPrev, centerUV).r;
  
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
  
  float kernelRadius = 0.15;
  
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
  
  float neighborhood = weightSum > 0.0 ? accum / weightSum : 0.0;
  float kappa = 0.15;
  float lambda = 0.02;
  float growth = kappa * neighborhood - lambda * centerValue;
  
  float value = centerValue;
  if (uMouse3D.x > -9.0) {
    float dist = distance(worldPos, uMouse3D);
    float touch = exp(-pow(dist / uTouchRadius, 2.0));
    value += uTouchGain * touch;
  }
  
  value += growth * 0.05;
  
  // Continuous seeding: tiny random germs
  float seedRand = fract(sin(dot(worldPos * 437.58 + uTime * 0.001, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
  float seed = step(0.998, seedRand) * 0.35; // 0.2% chance per voxel per frame
  value = max(value, seed);
  
  // Center blob seed on first frames
  float centerDist = dot(worldPos, worldPos);
  float centerSeed = exp(-centerDist * 6.0) * 0.25;
  value = max(value, centerSeed * step(uTime, 2.0)); // Only in first 2 seconds
  
  float jitter = hash(worldPos + uTime * 0.001) * 0.003;
  value += jitter;
  
  value = clamp(value * 0.995, 0.0, 1.0);
  
  gl_FragColor = vec4(value, 0.0, 0.0, 1.0);
}
`;

const renderFrag = `
#ifdef GL_ES
precision highp float;
#endif
` + commonGlsl + `

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

void main() {
  vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
  
  vec3 forward = normalize(uCameraTarget - uCameraPos);
  vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
  vec3 up = cross(right, forward);
  
  vec3 rayDir = normalize(forward + uv.x * right + uv.y * up);
  vec3 rayPos = uCameraPos;
  
  // Ray-box intersection to find entry/exit points for volume [-1, 1] in all axes
  vec3 invDir = vec3(
    abs(rayDir.x) > 0.0001 ? 1.0 / rayDir.x : 0.0,
    abs(rayDir.y) > 0.0001 ? 1.0 / rayDir.y : 0.0,
    abs(rayDir.z) > 0.0001 ? 1.0 / rayDir.z : 0.0
  );
  vec3 boxMin = vec3(-1.0);
  vec3 boxMax = vec3(1.0);
  
  vec3 t1 = (boxMin - rayPos) * invDir;
  vec3 t2 = (boxMax - rayPos) * invDir;
  vec3 tMin = min(t1, t2);
  vec3 tMax = max(t1, t2);
  
  float near = max(max(tMin.x, tMin.y), tMin.z);
  float far = min(min(tMax.x, tMax.y), tMax.z);
  
  // Only render if ray intersects volume
  if (far < near || far < 0.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    return;
  }
  
  // Clamp near to 0 (start from camera if inside volume)
  near = max(near, 0.0);
  
  // Start ray from intersection point
  rayPos = uCameraPos + rayDir * near;
  
  float stepSize = (far - near) / 64.0;
  vec4 accum = vec4(0.0);
  
  for (int i = 0; i < 64; i++) {
    // Clamp to volume bounds
    vec3 cubePos = clamp(rayPos, -1.0, 1.0);
    
    // Map to [0, 1] then to atlas
    vec2 xy01 = (cubePos.xy + 1.0) * 0.5;
    float zSlice = (cubePos.z + 1.0) * 0.5 * uN;
    
    vec2 atlasUVCoord = atlasUV(xy01, zSlice, uTiles, uTileSize, uAtlasSize);
    
    float density = texture2D(uAtlas, atlasUVCoord).r;
    float a = clamp(density * uExposure, 0.0, 1.0);
    
    vec3 col = mix(
      vec3(0.15, 0.35, 0.7),
      vec3(0.60, 0.45, 1.0),
      a
    );
    
    // Additive accumulation with proper alpha
    float contribution = a * stepSize * 2.0; // Scale by step size for proper density
    accum.rgb += col * contribution;
    accum.a = clamp(accum.a + contribution * 0.5, 0.0, 1.0);
    
    if (accum.a >= 0.99) break;
    
    rayPos += rayDir * stepSize;
    
    // Exit if we've left the volume
    if (any(greaterThan(abs(rayPos), vec3(1.0)))) break;
  }
  
  float dist = length(vUv - 0.5) * 2.0;
  float vignette = 1.0 - smoothstep(0.4, 1.2, dist);
  accum.rgb *= vignette;
  
  // Output with alpha for additive blending
  gl_FragColor = vec4(accum.rgb, accum.a);
}
`;

// Feature detection
function supportsWebGL2Float(): boolean {
  if (typeof window === "undefined") return false;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    console.log("[Lenia3D] supportsWebGL2Float: WebGL2 not available");
    return false;
  }
  
  const ext = gl.getExtension("EXT_color_buffer_float");
  const result = ext !== null;
  console.log("[Lenia3D] supportsWebGL2Float:", result, {
    extension: !!ext,
    renderer: gl.getParameter(gl.RENDERER),
  });
  return result;
}

const vertexShaderSource = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

interface Lenia3DProps {
  config: LeniaParams;
}

export default function Lenia3D({ config }: Lenia3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);
  const mouse3DRef = useRef<[number, number, number]>([-10, -10, -10]);
  
  const reducedMotion = useUiStore((s) => s.reducedMotion);
  const reactiveTouch = useUiStore((s) => s.reactiveTouch);
  
  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.warn("[Lenia3D] WebGL2 not supported");
      return;
    }
    
    console.log("[Lenia3D] WebGL2 context created");
    console.log("[Lenia3D] Renderer:", gl.getParameter(gl.RENDERER));
    console.log("[Lenia3D] Vendor:", gl.getParameter(gl.VENDOR));
    console.log("[Lenia3D] Version:", gl.getParameter(gl.VERSION));
    
    // Check extensions
    const floatExt = gl.getExtension("EXT_color_buffer_float");
    const halfFloatExt = gl.getExtension("EXT_color_buffer_half_float");
    const textureFloatExt = gl.getExtension("OES_texture_float");
    const textureHalfFloatExt = gl.getExtension("OES_texture_half_float");
    
    console.log("[Lenia3D] EXT_color_buffer_float:", !!floatExt);
    console.log("[Lenia3D] EXT_color_buffer_half_float:", !!halfFloatExt);
    console.log("[Lenia3D] OES_texture_float:", !!textureFloatExt);
    console.log("[Lenia3D] OES_texture_half_float:", !!textureHalfFloatExt);
    
    if (!floatExt) {
      console.warn("[Lenia3D] EXT_color_buffer_float not available, should fallback");
      return;
    }
    
    console.log("[Lenia3D] Float extension available:", !!floatExt);
    if (floatExt) {
      console.log("[Lenia3D] Extension object:", floatExt);
    }
    
    const { grid, stepsPerFrame, touchGain, touchRadius, flowGain, exposure, orbit } = config;
    
    // Atlas layout
    const tilesPerRow = Math.ceil(Math.sqrt(grid));
    const tileSize = grid;
    const atlasSize = tilesPerRow * tileSize;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    // Compile shaders
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("[Lenia3D] Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      
      return shader;
    };
    
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const updateShader = compileShader(updateFrag, gl.FRAGMENT_SHADER);
    const renderShader = compileShader(renderFrag, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !updateShader || !renderShader) {
      console.error("[Lenia3D] Shader compilation failed");
      return;
    }
    
    // Update program
    const updateProgram = gl.createProgram();
    if (!updateProgram) return;
    gl.attachShader(updateProgram, vertexShader);
    gl.attachShader(updateProgram, updateShader);
    gl.linkProgram(updateProgram);
    
    // Render program
    const renderProgram = gl.createProgram();
    if (!renderProgram) return;
    gl.attachShader(renderProgram, vertexShader);
    gl.attachShader(renderProgram, renderShader);
    gl.linkProgram(renderProgram);
    
    // Quad vertices for full-screen
    const quadVertices = new Float32Array([
      -1, -1,  1, -1,  1, 1,
      -1, -1,  1, 1,  -1, 1
    ]);
    
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);
    
    // Create ping-pong atlas textures
    const createAtlas = (name: string): WebGLTexture | null => {
      const texture = gl.createTexture();
      if (!texture) {
        console.error(`[Lenia3D] Failed to create texture for ${name}`);
        return null;
      }
      
      gl.bindTexture(gl.TEXTURE_2D, texture);
      
      console.log(`[Lenia3D] Creating ${name} texture:`, {
        size: `${atlasSize}x${atlasSize}`,
        internalFormat: "RGBA32F",
        format: "RGBA",
        type: "FLOAT",
      });
      
      try {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA32F,
          atlasSize,
          atlasSize,
          0,
          gl.RGBA,
          gl.FLOAT,
          null
        );
        console.log(`[Lenia3D] ${name} texture created successfully`);
      } catch (e) {
        console.error(`[Lenia3D] Error creating ${name} texture:`, e);
        return null;
      }
      
      // Use nearest filtering for atlas to preserve exact values
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      
      // Check for GL errors
      const error = gl.getError();
      if (error !== gl.NO_ERROR) {
        const errorNames: Record<number, string> = {
          [gl.NO_ERROR]: "NO_ERROR",
          [gl.INVALID_ENUM]: "INVALID_ENUM",
          [gl.INVALID_VALUE]: "INVALID_VALUE",
          [gl.INVALID_OPERATION]: "INVALID_OPERATION",
          [gl.INVALID_FRAMEBUFFER_OPERATION]: "INVALID_FRAMEBUFFER_OPERATION",
          [gl.OUT_OF_MEMORY]: "OUT_OF_MEMORY",
        };
        if (gl.CONTEXT_LOST_WEBGL) {
          errorNames[gl.CONTEXT_LOST_WEBGL] = "CONTEXT_LOST_WEBGL";
        }
        console.error(`[Lenia3D] GL error after creating ${name}:`, error, errorNames[error] || "UNKNOWN");
      }
      
      return texture;
    };
    
    let atlasPrev = createAtlas("atlasPrev");
    let atlasNext = createAtlas("atlasNext");
    
    if (!atlasPrev || !atlasNext) {
      console.error("[Lenia3D] Failed to create atlas textures");
      return;
    }
    
    console.log("[Lenia3D] Both atlas textures created successfully");
    
    // Create framebuffers for ping-pong
    const fboPrev = gl.createFramebuffer();
    const fboNext = gl.createFramebuffer();
    
    // Helper to swap atlas references
    const swapAtlases = () => {
      const temp = atlasPrev;
      atlasPrev = atlasNext;
      atlasNext = temp!;
    };
    
    // FBO status code mapping
    const getFBOStatusName = (status: number): string => {
      const map: Record<number, string> = {
        [gl.FRAMEBUFFER_COMPLETE]: "FRAMEBUFFER_COMPLETE",
        [gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT]: "FRAMEBUFFER_INCOMPLETE_ATTACHMENT",
        [gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT]: "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",
        [gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS]: "FRAMEBUFFER_INCOMPLETE_DIMENSIONS",
        [gl.FRAMEBUFFER_UNSUPPORTED]: "FRAMEBUFFER_UNSUPPORTED",
      };
      if (gl.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE !== undefined) {
        map[gl.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE] = "FRAMEBUFFER_INCOMPLETE_MULTISAMPLE";
      }
      return map[status] || `UNKNOWN(${status})`;
    };
    
    // Check FBO completeness
    const checkFBO = (fbo: WebGLFramebuffer, name: string, texture: WebGLTexture | null): boolean => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      
      if (!texture) {
        console.error(`[Lenia3D] FBO ${name}: texture is null`);
        return false;
      }
      
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      const statusName = getFBOStatusName(status);
      
      console.log(`[Lenia3D] FBO ${name} status:`, status, statusName);
      
      if (status !== gl.FRAMEBUFFER_COMPLETE) {
        // Additional diagnostics
        const attachment = gl.getFramebufferAttachmentParameter(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE
        );
        console.error(`[Lenia3D] FBO ${name} diagnostics:`, {
          status: `${status} (${statusName})`,
          attachmentType: attachment,
          textureBound: gl.isTexture(texture),
          textureSize: atlasSize,
        });
        
        // Check GL error
        const error = gl.getError();
        if (error !== gl.NO_ERROR) {
          console.error(`[Lenia3D] GL error after FBO check:`, error);
        }
        
        return false;
      }
      console.log(`[Lenia3D] FBO ${name} is complete`);
      return true;
    };
    
    // Initialize atlas with seed
    console.log("[Lenia3D] Setting up framebuffers...");
    
    if (!checkFBO(fboPrev, "fboPrev", atlasPrev)) {
      console.error("[Lenia3D] FBO fboPrev initialization failed");
      
      // Try alternative formats
      console.log("[Lenia3D] Attempting fallback formats...");
      const fallbackTexture = gl.createTexture();
      if (fallbackTexture) {
        gl.bindTexture(gl.TEXTURE_2D, fallbackTexture);
        try {
          // Try RGBA16F with HALF_FLOAT
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA16F,
            atlasSize,
            atlasSize,
            0,
            gl.RGBA,
            gl.HALF_FLOAT,
            null
          );
          console.log("[Lenia3D] RGBA16F format works, but switching to Lenia25D fallback");
        } catch (e) {
          console.error("[Lenia3D] RGBA16F also failed:", e);
        }
        gl.deleteTexture(fallbackTexture);
      }
      
      return;
    }
    
    if (!checkFBO(fboNext, "fboNext", atlasNext)) {
      console.error("[Lenia3D] FBO fboNext initialization failed");
      return;
    }
    
    console.log("[Lenia3D] Both FBOs initialized successfully");
    
    // Seed initial density
    gl.useProgram(updateProgram);
    const seedData = new Float32Array(atlasSize * atlasSize * 4);
    for (let i = 0; i < grid * grid * grid; i++) {
      const x = i % grid;
      const y = Math.floor(i / grid) % grid;
      const z = Math.floor(i / (grid * grid));
      
      const cx = grid / 2;
      const cy = grid / 2;
      const cz = grid / 2;
      
      const dist = Math.sqrt(
        (x - cx) ** 2 + (y - cy) ** 2 + (z - cz) ** 2
      ) / (grid * 0.5);
      
      // Stronger center seed
      if (dist < 0.4) {
        const tileX = z % tilesPerRow;
        const tileY = Math.floor(z / tilesPerRow);
        const px = tileX * tileSize + x;
        const py = tileY * tileSize + y;
        const idx = (py * atlasSize + px) * 4;
        seedData[idx] = Math.max(seedData[idx] || 0, (1.0 - dist * 1.5) * 0.6);
      }
      
      // Add random micro-germs throughout the volume
      if (Math.random() < 0.001) {
        const tileX = z % tilesPerRow;
        const tileY = Math.floor(z / tilesPerRow);
        const px = tileX * tileSize + x;
        const py = tileY * tileSize + y;
        const idx = (py * atlasSize + px) * 4;
        seedData[idx] = Math.max(seedData[idx] || 0, 0.2 + Math.random() * 0.2);
      }
    }
    
    console.log("[Lenia3D] Seeded atlas with", seedData.filter((v, i) => i % 4 === 0 && v > 0).length, "non-zero voxels");
    
    gl.bindTexture(gl.TEXTURE_2D, atlasPrev);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA32F,
      atlasSize,
      atlasSize,
      0,
      gl.RGBA,
      gl.FLOAT,
      seedData
    );
    
    // Mouse tracking
    const handlePointerMove = (e: PointerEvent) => {
      if (!reactiveTouch) return;
      
      // Convert screen to normalized device coordinates
      const x = (e.clientX / canvas.width) * 2.0 - 1.0;
      const y = 1.0 - (e.clientY / canvas.height) * 2.0;
      
      // Simple projection: map to -1..1 cube at z=0.5
      mouse3DRef.current = [x * 0.8, y * 0.8, 0.0];
    };
    
    const handlePointerLeave = () => {
      mouse3DRef.current = [-10, -10, -10];
    };
    
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    
    // Orbit camera
    let orbitAngle = 0;
    
    const animate = (now: number) => {
      if (reducedMotion) return;
      
      timeRef.current = now * 0.001;
      
      // Orbit camera
      if (orbit) {
        orbitAngle = 0.08 * Math.sin(now * 0.00005);
      }
      
      const cameraDist = 2.5;
      const cameraPos: [number, number, number] = [
        Math.sin(orbitAngle) * cameraDist,
        0.2,
        Math.cos(orbitAngle) * cameraDist
      ];
      
      // Update step (compute) - ping-pong between textures
      for (let step = 0; step < stepsPerFrame; step++) {
        // Bind next FBO for writing
        gl.bindFramebuffer(gl.FRAMEBUFFER, fboNext);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          atlasNext,
          0
        );
        
        gl.viewport(0, 0, atlasSize, atlasSize);
        gl.useProgram(updateProgram);
        
        // Set uniforms
        gl.uniform1f(gl.getUniformLocation(updateProgram, "uN"), grid);
        gl.uniform1f(gl.getUniformLocation(updateProgram, "uTiles"), tilesPerRow);
        gl.uniform1f(gl.getUniformLocation(updateProgram, "uTileSize"), tileSize);
        gl.uniform1f(gl.getUniformLocation(updateProgram, "uAtlasSize"), atlasSize);
        gl.uniform3f(
          gl.getUniformLocation(updateProgram, "uMouse3D"),
          mouse3DRef.current[0],
          mouse3DRef.current[1],
          mouse3DRef.current[2]
        );
        gl.uniform1f(gl.getUniformLocation(updateProgram, "uTouchGain"), touchGain);
        gl.uniform1f(gl.getUniformLocation(updateProgram, "uTouchRadius"), touchRadius);
        gl.uniform1f(gl.getUniformLocation(updateProgram, "uFlowGain"), flowGain);
        gl.uniform1f(gl.getUniformLocation(updateProgram, "uTime"), timeRef.current);
        gl.uniform2f(gl.getUniformLocation(updateProgram, "uRes"), atlasSize, atlasSize);
        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, atlasPrev);
        gl.uniform1i(gl.getUniformLocation(updateProgram, "uPrev"), 0);
        
        // Draw compute quad
        const posLoc = gl.getAttribLocation(updateProgram, "aPosition");
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        
        // Swap for next iteration
        swapAtlases();
      }
      
      // Render step
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(renderProgram);
      
      // Clear with dark background (hex 0x060b11 = rgb(6, 11, 17))
      gl.clearColor(6 / 255, 11 / 255, 17 / 255, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Enable additive blending for volume rendering
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.blendEquation(gl.FUNC_ADD);
      
      // Debug: log render info occasionally
      if (Math.floor(timeRef.current) % 5 === 0 && Math.floor(timeRef.current * 60) % 300 === 0) {
        console.log("[Lenia3D] Render pass:", {
          canvasSize: `${canvas.width}x${canvas.height}`,
          viewport: `${canvas.width}x${canvas.height}`,
          exposure,
          cameraPos,
          atlasBound: gl.isTexture(atlasPrev),
        });
      }
      
      // Set render uniforms
      gl.uniform1f(gl.getUniformLocation(renderProgram, "uN"), grid);
      gl.uniform1f(gl.getUniformLocation(renderProgram, "uTiles"), tilesPerRow);
      gl.uniform1f(gl.getUniformLocation(renderProgram, "uTileSize"), tileSize);
      gl.uniform1f(gl.getUniformLocation(renderProgram, "uAtlasSize"), atlasSize);
      gl.uniform1f(gl.getUniformLocation(renderProgram, "uExposure"), exposure);
      gl.uniform3f(
        gl.getUniformLocation(renderProgram, "uCameraPos"),
        cameraPos[0],
        cameraPos[1],
        cameraPos[2]
      );
      gl.uniform3f(gl.getUniformLocation(renderProgram, "uCameraTarget"), 0, 0, 0);
      gl.uniform2f(
        gl.getUniformLocation(renderProgram, "uResolution"),
        canvas.width,
        canvas.height
      );
      gl.uniform1f(gl.getUniformLocation(renderProgram, "uTime"), timeRef.current);
      
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, atlasPrev);
      gl.uniform1i(gl.getUniformLocation(renderProgram, "uAtlas"), 0);
      
      // Draw render quad
      const posLoc2 = gl.getAttribLocation(renderProgram, "aPosition");
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(posLoc2);
      gl.vertexAttribPointer(posLoc2, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      // Debug: sample rendered output pixel to verify something is being drawn
      const frameCount = Math.floor(timeRef.current * 60);
      if (frameCount > 0 && frameCount % 60 === 0) {
        // Sample atlas
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, fboPrev);
        const atlasPixels = new Float32Array(4);
        gl.readPixels(Math.floor(atlasSize / 2), Math.floor(atlasSize / 2), 1, 1, gl.RGBA, gl.FLOAT, atlasPixels);
        
        // Sample render output (screen)
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, null);
        const renderPixels = new Uint8Array(4);
        gl.readPixels(
          Math.floor(canvas.width / 2),
          Math.floor(canvas.height / 2),
          1,
          1,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          renderPixels
        );
        
        console.log("[Lenia3D] Sample at", Math.floor(timeRef.current), "s:", {
          atlasValue: atlasPixels[0].toFixed(3),
          renderOutput: `rgba(${renderPixels[0]}, ${renderPixels[1]}, ${renderPixels[2]}, ${renderPixels[3]})`,
          renderBrightness: ((renderPixels[0] + renderPixels[1] + renderPixels[2]) / 3).toFixed(0),
        });
      }
      
      // Disable blending for next frame
      gl.disable(gl.BLEND);
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      
      // Cleanup
      gl.deleteTexture(atlasPrev);
      gl.deleteTexture(atlasNext);
      gl.deleteFramebuffer(fboPrev);
      gl.deleteFramebuffer(fboNext);
      gl.deleteProgram(updateProgram);
      gl.deleteProgram(renderProgram);
      gl.deleteShader(vertexShader);
      gl.deleteShader(updateShader);
      gl.deleteShader(renderShader);
    };
  }, [config, reducedMotion, reactiveTouch]);
  
  if (reducedMotion) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(60, 45, 255, 0.1), rgba(15, 35, 70, 0.3))",
        }}
      />
    );
  }
  
  useEffect(() => {
    // Debug: check canvas visibility
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const style = window.getComputedStyle(canvas);
      console.log("[Lenia3D] Canvas visibility check:", {
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        zIndex: style.zIndex,
        position: style.position,
        width: canvas.width,
        height: canvas.height,
        clientWidth: canvas.clientWidth,
        clientHeight: canvas.clientHeight,
        offsetWidth: canvas.offsetWidth,
        offsetHeight: canvas.offsetHeight,
      });
    }
  }, []);
  
  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block", opacity: 1 }}
      />
    </div>
  );
}
