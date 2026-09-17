"use client";

import React, { useEffect, useRef } from "react";
import { useUiStore, LeniaParams } from "@/lib/uiStore";
import { createProgram, createFBO } from "@/utils/glutils";
const simFragShader = `#version 300 es
precision highp float;

float gauss(float x, float m, float s) {
  float a = (x - m) / s;
  return exp(-0.5 * a * a);
}

float leniaKernel(float r) {
  float k1 = gauss(r, 0.15, 0.06);
  float k2 = gauss(r, 0.60, 0.18);
  return (k1 - 0.5 * k2);
}

uniform sampler2D uPrev;
uniform vec2 uRes;
uniform float uDt;
uniform float uMu;
uniform float uSigma;
uniform float uAlpha;
uniform vec2 uTouchUV;
uniform float uTouchGain;
uniform float uTouchRadius;
uniform float uJitter;
in vec2 vUV;
out vec4 fragColor;

void main() {
  vec2 texel = 1.0 / uRes;
  float acc = 0.0;
  float wsum = 0.0;
  const int RINGS = 5;
  const int SAMP = 8;
  for (int r = 1; r <= RINGS; r++) {
    float rr = float(r) / float(RINGS);
    float w = leniaKernel(rr);
    for (int i = 0; i < SAMP; i++) {
      float a = 6.2831853 * (float(i) / float(SAMP));
      vec2 d = rr * vec2(cos(a), sin(a));
      vec2 uv = fract(vUV + d * texel);
      acc += w * texture(uPrev, uv).r;
    }
    wsum += w * float(SAMP);
  }
  float A = acc / max(wsum, 1e-6);
  float G = 2.0 * exp(-0.5 * pow((A - uMu) / uSigma, 2.0)) - 1.0;
  float U = texture(uPrev, vUV).r;
  if (uTouchGain > 0.0 && uTouchUV.x >= 0.0) {
    float d = distance(vUV, uTouchUV);
    float inject = exp(-pow(d / max(uTouchRadius, 1e-3), 2.0));
    U += uTouchGain * inject;
  }
  U += (fract(sin(dot(vUV, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * uJitter;
  U = clamp(U + uDt * uAlpha * G, 0.0, 1.0);
  fragColor = vec4(U, 0.0, 0.0, 1.0);
}
`;

const renderFragShader = `#version 300 es
precision highp float;

vec3 bioColor(float u) {
  float e = smoothstep(0.15, 1.0, u);
  return mix(vec3(0.18, 0.35, 0.55), vec3(0.58, 0.45, 0.95), e);
}

uniform sampler2D uTex;
uniform vec2 uRes;
uniform float uExposure;
uniform vec2 uParallax;
in vec2 vUV;
out vec4 fragColor;

void main() {
  vec2 uv = fract(vUV + uParallax);
  float u = texture(uTex, uv).r;
  float d = smoothstep(0.25, 0.95, u);
  vec3 c = bioColor(u) * d * uExposure;
  float a = d * 0.25;
  fragColor = vec4(c, a);
}
`;

const vertexShader = `#version 300 es
in vec2 aPos;
in vec2 aUV;
out vec2 vUV;
void main() {
  vUV = aUV;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

type Layer = {
  simProg: WebGLProgram;
  drawProg: WebGLProgram;
  fboA: WebGLFramebuffer;
  fboB: WebGLFramebuffer;
  texA: WebGLTexture;
  texB: WebGLTexture;
  res: [number, number];
  mu: number;
  sigma: number;
  dt: number;
  alpha: number;
  parallaxScale: number;
};

const LAYERS_DEF = [
  { res: 256, mu: 0.28, sigma: 0.035, dt: 0.18, alpha: 1.0, parallaxScale: 0.01 }, // far
  { res: 192, mu: 0.22, sigma: 0.028, dt: 0.22, alpha: 1.0, parallaxScale: 0.018 }, // mid
  { res: 160, mu: 0.33, sigma: 0.040, dt: 0.16, alpha: 1.0, parallaxScale: 0.03 }, // near
];

interface Lenia25DBackdropProps {
  config: LeniaParams;
}

export default function Lenia25DBackdrop({ config }: Lenia25DBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const rafRef = useRef<number | undefined>(undefined);
  const reducedMotion = useUiStore((s) => s.reducedMotion);
  const reactiveTouch = useUiStore((s) => s.reactiveTouch);

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") {
      console.log("[Lenia25D] Skipping due to reducedMotion or SSR");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("[Lenia25D] Canvas ref is null");
      return;
    }

    console.log("[Lenia25D] Initializing...");

    const gl = canvas.getContext("webgl2", {
      premultipliedAlpha: false,
      alpha: true,
    });
    if (!gl) {
      console.error("[Lenia25D] WebGL2 not supported");
      return;
    }

    console.log("[Lenia25D] WebGL2 context created");

    // Resize
    const fit = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    // Compile shaders
    let simProgBase: WebGLProgram;
    let drawProgBase: WebGLProgram;
    try {
      console.log("[Lenia25D] Compiling shaders...");
      simProgBase = createProgram(gl, vertexShader, simFragShader);
      drawProgBase = createProgram(gl, vertexShader, renderFragShader);
      console.log("[Lenia25D] Shaders compiled successfully");
    } catch (e) {
      console.error("[Lenia25D] Shader compilation failed:", e);
      return;
    }

    // Fullscreen quad
    const quad = gl.createBuffer();
    if (!quad) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    function makeLayer(def: typeof LAYERS_DEF[0]): Layer {
      const N = def.res;

      const simProg = simProgBase; // Share programs for efficiency
      const drawProg = drawProgBase;

      // Create textures with R32F format
      const ext = gl.getExtension("EXT_color_buffer_float");
      if (!ext) {
        console.warn("[Lenia25D] EXT_color_buffer_float not available, trying R32F anyway");
      }

      const texA = gl.createTexture();
      if (!texA) throw new Error("Failed to create texture");
      gl.bindTexture(gl.TEXTURE_2D, texA);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      
      try {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.R32F,
          N,
          N,
          0,
          gl.RED,
          gl.FLOAT,
          null
        );
        const error = gl.getError();
        if (error !== gl.NO_ERROR) {
          console.error(`[Lenia25D] GL error creating R32F texture: ${error}`);
          // Fallback to RGBA8
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            N,
            N,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null
          );
        }
      } catch (e) {
        console.error("[Lenia25D] Error creating R32F texture:", e);
        // Fallback to RGBA8
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          N,
          N,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          null
        );
      }

      const texB = gl.createTexture();
      if (!texB) throw new Error("Failed to create texture");
      gl.bindTexture(gl.TEXTURE_2D, texB);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      try {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.R32F,
          N,
          N,
          0,
          gl.RED,
          gl.FLOAT,
          null
        );
        const error = gl.getError();
        if (error !== gl.NO_ERROR) {
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            N,
            N,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null
          );
        }
      } catch (e) {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          N,
          N,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          null
        );
      }

      // Seed with random blobs
      try {
        gl.bindTexture(gl.TEXTURE_2D, texA);
        const seed = new Float32Array(N * N);
        for (let i = 0; i < seed.length; i++) {
          seed[i] = Math.random() * 0.15;
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, N, N, 0, gl.RED, gl.FLOAT, seed);
        const error = gl.getError();
        if (error !== gl.NO_ERROR) {
          console.warn(`[Lenia25D] R32F seed failed (error ${error}), using RGBA8 fallback`);
          // Fallback: use RGBA8 - store density in red channel
          const seedRGBA = new Uint8Array(N * N * 4);
          for (let i = 0; i < N * N; i++) {
            const v = Math.floor(Math.random() * 0.15 * 255);
            seedRGBA[i * 4] = v;
            seedRGBA[i * 4 + 1] = 0;
            seedRGBA[i * 4 + 2] = 0;
            seedRGBA[i * 4 + 3] = 255;
          }
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, N, N, 0, gl.RGBA, gl.UNSIGNED_BYTE, seedRGBA);
        } else {
          console.log(`[Lenia25D] Layer ${N}x${N} seeded with R32F format`);
        }
      } catch (e) {
        console.error("[Lenia25D] Error seeding texture:", e);
      }

      let fboA: WebGLFramebuffer;
      let fboB: WebGLFramebuffer;
      try {
        fboA = createFBO(gl, texA);
        fboB = createFBO(gl, texB);
      } catch (e) {
        console.error(`[Lenia25D] Failed to create FBOs for layer ${def.res}:`, e);
        throw e;
      }

      return {
        simProg,
        drawProg,
        fboA,
        fboB,
        texA,
        texB,
        res: [N, N],
        mu: def.mu,
        sigma: def.sigma,
        dt: def.dt,
        alpha: def.alpha,
        parallaxScale: def.parallaxScale,
      };
    }

    let layers: Layer[];
    try {
      console.log("[Lenia25D] Creating layers...");
      layers = LAYERS_DEF.map(makeLayer);
      console.log(`[Lenia25D] Created ${layers.length} layers`);
    } catch (e) {
      console.error("[Lenia25D] Failed to create layers:", e);
      return;
    }

    // Set up vertex attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    const stride = 16;

    for (const prog of [simProgBase, drawProgBase]) {
      gl.useProgram(prog);
      const locPos = gl.getAttribLocation(prog, "aPos");
      const locUV = gl.getAttribLocation(prog, "aUV");
      if (locPos >= 0) {
        gl.enableVertexAttribArray(locPos);
        gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, stride, 0);
      }
      if (locUV >= 0) {
        gl.enableVertexAttribArray(locUV);
        gl.vertexAttribPointer(locUV, 2, gl.FLOAT, false, stride, 8);
      }
    }

    // Main loop
    let frameCount = 0;
    function step() {
      if (reducedMotion) return;
      
      frameCount++;
      if (frameCount === 1) {
        console.log("[Lenia25D] First frame rendered");
      }

      const cw = canvas.width;
      const ch = canvas.height;

      // SIMULATE each layer
      for (const L of layers) {
        const [W, H] = L.res;
        gl.viewport(0, 0, W, H);
        gl.useProgram(L.simProg);

        // Set uniforms
        gl.uniform2f(gl.getUniformLocation(L.simProg, "uRes"), W, H);
        gl.uniform1f(gl.getUniformLocation(L.simProg, "uDt"), L.dt);
        gl.uniform1f(gl.getUniformLocation(L.simProg, "uMu"), L.mu);
        gl.uniform1f(gl.getUniformLocation(L.simProg, "uSigma"), L.sigma);
        gl.uniform1f(gl.getUniformLocation(L.simProg, "uAlpha"), L.alpha);

        const uvx =
          mouseRef.current.x < 0 ? -1 : mouseRef.current.x / cw;
        const uvy =
          mouseRef.current.y < 0 ? -1 : 1.0 - mouseRef.current.y / ch;
        gl.uniform2f(
          gl.getUniformLocation(L.simProg, "uTouchUV"),
          uvx,
          uvy
        );
        gl.uniform1f(
          gl.getUniformLocation(L.simProg, "uTouchGain"),
          reactiveTouch ? config.touchGain : 0.0
        );
        gl.uniform1f(
          gl.getUniformLocation(L.simProg, "uTouchRadius"),
          config.touchRadius
        );
        gl.uniform1f(gl.getUniformLocation(L.simProg, "uJitter"), 0.01);

        // Ping-pong: read from A, write to B
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, L.texA);
        gl.uniform1i(gl.getUniformLocation(L.simProg, "uPrev"), 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, L.fboB);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Swap
        [L.texA, L.texB] = [L.texB, L.texA];
        [L.fboA, L.fboB] = [L.fboB, L.fboA];
      }

      // RENDER composite with additive blending
      gl.viewport(0, 0, cw, ch);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      for (const L of layers) {
        gl.useProgram(L.drawProg);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, L.texA);
        gl.uniform1i(gl.getUniformLocation(L.drawProg, "uTex"), 0);
        gl.uniform2f(gl.getUniformLocation(L.drawProg, "uRes"), L.res[0], L.res[1]);

        // Parallax from mouse around center
        const cx =
          (mouseRef.current.x < 0 ? 0.5 : mouseRef.current.x / cw) - 0.5;
        const cy =
          (mouseRef.current.y < 0 ? 0.5 : 1.0 - mouseRef.current.y / ch) - 0.5;
        gl.uniform2f(
          gl.getUniformLocation(L.drawProg, "uParallax"),
          -cx * L.parallaxScale,
          -cy * L.parallaxScale
        );

        gl.uniform1f(
          gl.getUniformLocation(L.drawProg, "uExposure"),
          config.exposure
        );
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }

      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);

    // Mouse handlers
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onLeave = () => {
      mouseRef.current.x = -1;
      mouseRef.current.y = -1;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
    };
  }, [config, reducedMotion, reactiveTouch]);

  if (reducedMotion) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #0a0e27 0%, #1a0a3a 25%, #0f0a2a 50%, #1a0a3a 75%, #0a0e27 100%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 w-full h-full"
      style={{ filter: "saturate(1.05) blur(0.6px)" }}
    />
  );
}

