// Lightweight, framework-agnostic runtime that owns GL init + RAF.
import * as THREE from 'three';
import type { StripesOptions, StripesAPI } from "./index";

// Import shaders - these work with vite-plugin-glsl in dev, and will be handled by consumer bundlers
import vert from './shaders/quad.vert';
import stepFrag from './shaders/rdStep.frag';
import heightFrag from './shaders/height.glsl';
import bandsFrag from './shaders/bands.glsl';

// Default parameters matching main.ts defaults
const DEFAULT_OPTS: Required<StripesOptions> = {
  gridSize: 1024,
  stepsPerFrame: 10,
  dt: 1.0,
  f: 0.037,  // Slightly higher feed for more active patterns
  k: 0.065,  // Slightly higher kill for more dynamic behavior
  Du: 0.16,
  Dv: 0.08,
  touchGain: 0.65,
  touchRadius: 0.03,
  blurRadius: 1.0,
  freq: 8.0,
  bandThickness: 0.65,
  relief: 0.8,
  exposure: 1.15,
  warpAmp: 0.04,
  warpScale: 3.0,
  warpSpeed: 0.06,
  ambient: 0.25,
  diffuse: 0.85,
  specular: 0.25,
  shininess: 24.0,
  rim: 0.25,
  lightDir: [0.2, 0.5, 1.0],
  showHeight: false,
  showBandsOnly: false,
};

export function createTuringStripes(
  canvas: HTMLCanvasElement,
  opts: StripesOptions = {}
): StripesAPI {
  const options = { ...DEFAULT_OPTS, ...opts };

  // Create Three.js renderer
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: false, 
    alpha: true, 
    powerPreference: 'high-performance' 
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0.0);

  const gl = renderer.getContext();
  if (!(gl instanceof WebGL2RenderingContext)) {
    throw new Error('WebGL2 required');
  }

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
    -1, -1,  1, -1,  1,  1,
    -1, -1,  1,  1, -1,  1,
  ]), 2));

  const boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), Math.sqrt(3));
  geom.boundingSphere = boundingSphere;

  // Sim state
  const sim = {
    grid: options.gridSize,
    stepsPerFrame: options.stepsPerFrame,
    dt: options.dt,
    f: options.f,
    k: options.k,
    Du: options.Du,
    Dv: options.Dv,
    blurRadius: options.blurRadius,
    freq: options.freq,
    bandThickness: options.bandThickness,
    relief: options.relief,
    exposure: options.exposure,
    lightDir: new THREE.Vector3(...options.lightDir),
    ambient: options.ambient,
    diffuse: options.diffuse,
    specular: options.specular,
    shininess: options.shininess,
    rim: options.rim,
    warpAmp: options.warpAmp,
    warpScale: options.warpScale,
    warpSpeed: options.warpSpeed,
    showHeight: options.showHeight,
    showBandsOnly: options.showBandsOnly,
    touchGain: options.touchGain,
    touchRadius: options.touchRadius,
    mouseUv: new THREE.Vector2(-1, -1),
    time: 0,
  };

  // Targets & materials
  let rtA: THREE.WebGLRenderTarget | null = null;
  let rtB: THREE.WebGLRenderTarget | null = null;
  let heightTex: THREE.WebGLRenderTarget | null = null;

  function makeRDTarget(size: number) {
    return new THREE.WebGLRenderTarget(size, size, {
      type: THREE.FloatType,
      format: THREE.RGFormat,
      internalFormat: 'RG32F' as any,
      depthBuffer: false,
      stencilBuffer: false,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    });
  }

  function makeHeightTarget(size: number) {
    const ext = gl.getExtension('EXT_color_buffer_half_float');
    return new THREE.WebGLRenderTarget(size, size, {
      type: ext ? THREE.HalfFloatType : THREE.FloatType,
      format: THREE.RedFormat,
      internalFormat: ext ? ('R16F' as any) : ('R32F' as any),
      depthBuffer: false,
      stencilBuffer: false,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
    });
  }

  // Materials
  const stepMat = new THREE.RawShaderMaterial({
    vertexShader: vert,
    fragmentShader: stepFrag,
    glslVersion: THREE.GLSL3,
    depthTest: false,
    depthWrite: false,
    transparent: false,
    uniforms: {
      uPrev: { value: null },
      uTexel: { value: new THREE.Vector2() },
      uDt: { value: sim.dt },
      uFeed: { value: sim.f },
      uKill: { value: sim.k },
      uDu: { value: sim.Du },
      uDv: { value: sim.Dv },
      uMouse: { value: sim.mouseUv },
      uTouchGain: { value: sim.touchGain },
      uTouchRadius: { value: sim.touchRadius },
      uFlowAmp: { value: 0.15 }, // Enable flow to keep pattern evolving
      uFlowFreq: { value: 2.0 },
      uTime: { value: 0.0 },
    }
  });

  const heightMat = new THREE.RawShaderMaterial({
    vertexShader: vert,
    fragmentShader: heightFrag,
    glslVersion: THREE.GLSL3,
    depthTest: false,
    depthWrite: false,
    transparent: false,
    uniforms: {
      uTexUV: { value: null },
      uTexel: { value: new THREE.Vector2() },
      uBlurRadius: { value: sim.blurRadius },
    }
  });

  const bandsMat = new THREE.RawShaderMaterial({
    vertexShader: vert,
    fragmentShader: bandsFrag,
    glslVersion: THREE.GLSL3,
    depthTest: false,
    depthWrite: false,
    transparent: false,
    uniforms: {
      uHeight: { value: null },
      uTexel: { value: new THREE.Vector2() },
      freq: { value: sim.freq },
      bandThickness: { value: sim.bandThickness },
      relief: { value: sim.relief },
      exposure: { value: sim.exposure },
      lightDir: { value: sim.lightDir.clone().normalize() },
      ambient: { value: sim.ambient },
      diffuse: { value: sim.diffuse },
      specular: { value: sim.specular },
      shininess: { value: sim.shininess },
      rim: { value: sim.rim },
      warpAmp: { value: sim.warpAmp },
      warpScale: { value: sim.warpScale },
      warpSpeed: { value: sim.warpSpeed },
      time: { value: 0.0 },
      showHeight: { value: sim.showHeight ? 1.0 : 0.0 },
      showBandsOnly: { value: sim.showBandsOnly ? 1.0 : 0.0 },
    }
  });

  const stepQuad = new THREE.Mesh(geom, stepMat);
  const heightQuad = new THREE.Mesh(geom, heightMat);
  const bandsQuad = new THREE.Mesh(geom, bandsMat);

  stepQuad.frustumCulled = false;
  heightQuad.frustumCulled = false;
  bandsQuad.frustumCulled = false;

  const stepScene = new THREE.Scene();
  stepScene.add(stepQuad);
  const heightScene = new THREE.Scene();
  heightScene.add(heightQuad);
  const bandsScene = new THREE.Scene();
  bandsScene.add(bandsQuad);

  // Seeders
  function seedScatteredDisks(size: number) {
    const data = new Float32Array(size * size * 2);
    for (let i = 0; i < data.length; i += 2) {
      data[i] = 1.0;
      data[i + 1] = 0.0;
    }
    const numDisks = 8 + Math.floor(Math.random() * 12);
    for (let d = 0; d < numDisks; d++) {
      const cx = Math.random();
      const cy = Math.random();
      const radius = 0.03 + Math.random() * 0.05;
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const nx = x / size - cx;
          const ny = y / size - cy;
          const r = Math.hypot(nx, ny);
          if (r < radius) {
            const i = (y * size + x) * 2;
            data[i] = 0.5 + Math.random() * 0.3;
            data[i + 1] = 0.7 + Math.random() * 0.3;
          }
        }
      }
    }
    uploadSeed(data, size);
  }

  function uploadSeed(data: Float32Array, size: number) {
    if (!rtA) return;
    const tex = new THREE.DataTexture(data, size, size, THREE.RGFormat, THREE.FloatType);
    tex.needsUpdate = true;
    const prev = renderer.getRenderTarget();
    renderer.setRenderTarget(rtA);
    renderer.clear();
    // Copy texture data to render target
    (renderer as any).copyTextureToTexture(new THREE.Vector2(0, 0), tex, rtA.texture);
    renderer.setRenderTarget(prev);
    tex.dispose();
  }

  function createTargets(size: number) {
    if (rtA) {
      rtA.dispose();
      rtB?.dispose();
      heightTex?.dispose();
    }
    rtA = makeRDTarget(size);
    rtB = makeRDTarget(size);
    heightTex = makeHeightTarget(size);

    stepMat.uniforms.uPrev.value = rtA.texture;
    stepMat.uniforms.uTexel.value.set(1 / size, 1 / size);
    heightMat.uniforms.uTexel.value.set(1 / size, 1 / size);
    bandsMat.uniforms.uTexel.value.set(1 / size, 1 / size);

    sim.grid = size;
    seedScatteredDisks(size);
    computeHeight();
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
  }

  function rdStep() {
    if (!rtA || !rtB) return;
    for (let i = 0; i < sim.stepsPerFrame; i++) {
      stepMat.uniforms.uPrev.value = rtA.texture;
      renderer.setRenderTarget(rtB);
      renderer.render(stepScene, camera);
      const tmp: THREE.WebGLRenderTarget = rtA;
      rtA = rtB;
      rtB = tmp;
    }
    renderer.setRenderTarget(null);
  }

  function computeHeight() {
    if (!rtA || !heightTex) return;
    heightMat.uniforms.uTexUV.value = rtA.texture;
    heightMat.uniforms.uBlurRadius.value = sim.blurRadius;
    const prev = renderer.getRenderTarget();
    renderer.setRenderTarget(heightTex);
    renderer.clear();
    renderer.render(heightScene, camera);
    bandsMat.uniforms.uHeight.value = heightTex.texture;
    renderer.setRenderTarget(prev);
  }

  let running = true;
  let last: number | null = null;
  let raf = 0;

  function loop(now: number) {
    if (!running) return;

    if (last === null) {
      last = now;
    }

    const dt = Math.max(0, (now - last) / 1000);
    last = now;

    if (isNaN(sim.time)) {
      sim.time = 0;
    }
    if (isNaN(dt) || !isFinite(dt)) {
      sim.time = 0;
      return;
    }

    sim.time += dt;
    const validTime = isNaN(sim.time) ? 0 : sim.time;
    stepMat.uniforms.uTime.value = validTime;

    rdStep();
    computeHeight();

    bandsMat.uniforms.lightDir.value.copy(sim.lightDir).normalize();
    bandsMat.uniforms.warpAmp.value = sim.warpAmp;
    bandsMat.uniforms.warpScale.value = sim.warpScale;
    bandsMat.uniforms.warpSpeed.value = sim.warpSpeed;
    bandsMat.uniforms.time.value = validTime;
    bandsMat.uniforms.showHeight.value = sim.showHeight ? 1.0 : 0.0;
    bandsMat.uniforms.showBandsOnly.value = sim.showBandsOnly ? 1.0 : 0.0;

    if (!bandsMat.uniforms.uHeight.value) {
      raf = requestAnimationFrame(loop);
      return;
    }

    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(bandsScene, camera);

    raf = requestAnimationFrame(loop);
  }

  // Resize observer
  const ro = new ResizeObserver(() => {
    resizeCanvas();
  });
  ro.observe(canvas);

  // Mouse/cursor tracking - use window events so it works even when canvas is behind content
  function pointerToUv(e: PointerEvent | MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const u = (e.clientX - rect.left) / rect.width;
    const v = 1.0 - (e.clientY - rect.top) / rect.height;
    
    // Only update if cursor is over the canvas
    if (u >= 0 && u <= 1 && v >= 0 && v <= 1) {
      sim.mouseUv.set(u, v);
      stepMat.uniforms.uMouse.value.copy(sim.mouseUv);
      // Debug: verify events are firing
      if (Math.random() < 0.01) { // Log 1% of events to avoid spam
        console.log('[TuringStripes] Mouse at UV:', u.toFixed(3), v.toFixed(3), 'TouchGain:', sim.touchGain, 'TouchRadius:', sim.touchRadius);
      }
    } else {
      clearMouse();
    }
  }

  function clearMouse() {
    sim.mouseUv.set(-1, -1);
    stepMat.uniforms.uMouse.value.copy(sim.mouseUv);
  }

  // Use window events so they work even when canvas is behind other content
  window.addEventListener('pointermove', pointerToUv);
  window.addEventListener('pointerdown', pointerToUv);
  window.addEventListener('pointerup', clearMouse);
  window.addEventListener('pointerleave', clearMouse);

  // Initialize
  resizeCanvas();
  createTargets(sim.grid);
  raf = requestAnimationFrame(loop);

  // API
  const api: StripesAPI = {
    cleanup: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', pointerToUv);
      window.removeEventListener('pointerdown', pointerToUv);
      window.removeEventListener('pointerup', clearMouse);
      window.removeEventListener('pointerleave', clearMouse);
      running = false;
      if (rtA) rtA.dispose();
      if (rtB) rtB.dispose();
      if (heightTex) heightTex.dispose();
      stepMat.dispose();
      heightMat.dispose();
      bandsMat.dispose();
      geom.dispose();
      renderer.dispose();
    },
    setParams: (opts: Partial<StripesOptions>) => {
      if (opts.gridSize !== undefined && opts.gridSize !== sim.grid) {
        sim.grid = opts.gridSize;
        createTargets(opts.gridSize);
      }
      if (opts.stepsPerFrame !== undefined) sim.stepsPerFrame = opts.stepsPerFrame;
      if (opts.dt !== undefined) {
        sim.dt = opts.dt;
        stepMat.uniforms.uDt.value = opts.dt;
      }
      if (opts.f !== undefined) {
        sim.f = opts.f;
        stepMat.uniforms.uFeed.value = opts.f;
      }
      if (opts.k !== undefined) {
        sim.k = opts.k;
        stepMat.uniforms.uKill.value = opts.k;
      }
      if (opts.Du !== undefined) {
        sim.Du = opts.Du;
        stepMat.uniforms.uDu.value = opts.Du;
      }
      if (opts.Dv !== undefined) {
        sim.Dv = opts.Dv;
        stepMat.uniforms.uDv.value = opts.Dv;
      }
      if (opts.touchGain !== undefined) {
        sim.touchGain = opts.touchGain;
        stepMat.uniforms.uTouchGain.value = opts.touchGain;
      }
      if (opts.touchRadius !== undefined) {
        sim.touchRadius = opts.touchRadius;
        stepMat.uniforms.uTouchRadius.value = opts.touchRadius;
      }
      if (opts.blurRadius !== undefined) {
        sim.blurRadius = opts.blurRadius;
        heightMat.uniforms.uBlurRadius.value = opts.blurRadius;
      }
      if (opts.freq !== undefined) {
        sim.freq = opts.freq;
        bandsMat.uniforms.freq.value = opts.freq;
      }
      if (opts.bandThickness !== undefined) {
        sim.bandThickness = opts.bandThickness;
        bandsMat.uniforms.bandThickness.value = opts.bandThickness;
      }
      if (opts.relief !== undefined) {
        sim.relief = opts.relief;
        bandsMat.uniforms.relief.value = opts.relief;
      }
      if (opts.exposure !== undefined) {
        sim.exposure = opts.exposure;
        bandsMat.uniforms.exposure.value = opts.exposure;
      }
      if (opts.warpAmp !== undefined) {
        sim.warpAmp = opts.warpAmp;
        bandsMat.uniforms.warpAmp.value = opts.warpAmp;
      }
      if (opts.warpScale !== undefined) {
        sim.warpScale = opts.warpScale;
        bandsMat.uniforms.warpScale.value = opts.warpScale;
      }
      if (opts.warpSpeed !== undefined) {
        sim.warpSpeed = opts.warpSpeed;
        bandsMat.uniforms.warpSpeed.value = opts.warpSpeed;
      }
      if (opts.ambient !== undefined) {
        sim.ambient = opts.ambient;
        bandsMat.uniforms.ambient.value = opts.ambient;
      }
      if (opts.diffuse !== undefined) {
        sim.diffuse = opts.diffuse;
        bandsMat.uniforms.diffuse.value = opts.diffuse;
      }
      if (opts.specular !== undefined) {
        sim.specular = opts.specular;
        bandsMat.uniforms.specular.value = opts.specular;
      }
      if (opts.shininess !== undefined) {
        sim.shininess = opts.shininess;
        bandsMat.uniforms.shininess.value = opts.shininess;
      }
      if (opts.rim !== undefined) {
        sim.rim = opts.rim;
        bandsMat.uniforms.rim.value = opts.rim;
      }
      if (opts.lightDir !== undefined) {
        sim.lightDir.set(...opts.lightDir);
        bandsMat.uniforms.lightDir.value.copy(sim.lightDir).normalize();
      }
      if (opts.showHeight !== undefined) {
        sim.showHeight = opts.showHeight;
        bandsMat.uniforms.showHeight.value = opts.showHeight ? 1.0 : 0.0;
      }
      if (opts.showBandsOnly !== undefined) {
        sim.showBandsOnly = opts.showBandsOnly;
        bandsMat.uniforms.showBandsOnly.value = opts.showBandsOnly ? 1.0 : 0.0;
      }
    },
    reseed: () => {
      if (rtA) {
        seedScatteredDisks(sim.grid);
        computeHeight();
      }
    },
  };

  return api;
}

