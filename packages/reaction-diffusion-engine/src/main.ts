import * as THREE from 'three';
import { GUI } from 'lil-gui';
import vert from './shaders/quad.vert';
import stepFrag from './shaders/rdStep.frag';
import heightFrag from './shaders/height.glsl';
import bandsFrag from './shaders/bands.glsl';
import { PRESETS } from './lib/presets';
import {
  type RDParams, savePreset, getPreset, listPresets,
  deletePreset, exportPresets, importPresets,
  encodeParamsToURL, decodeParamsFromURL
} from './lib/presetManager';

const appEl = document.getElementById('app')!;
const wrap = document.createElement('div');
wrap.className = 'canvas-wrap';
appEl.appendChild(wrap);

const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x000000, 0.0);
wrap.appendChild(renderer.domElement);

const gl = renderer.getContext();
if (!(gl instanceof WebGL2RenderingContext)) throw new Error('WebGL2 required');

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const geom = new THREE.BufferGeometry();
geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
  -1, -1,  1, -1,  1,  1,
  -1, -1,  1,  1, -1,  1,
]), 2));

// Manually set bounding sphere for 2D positions to avoid NaN warnings
const boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), Math.sqrt(3));
geom.boundingSphere = boundingSphere;

// ---------- Sim state ----------
const sim = {
  grid: 1024,
  stepsPerFrame: 10,
  dt: 1.0,
  f: 0.022,              // Labyrinth preset default
  k: 0.051,
  Du: 0.16,
  Dv: 0.08,

  // Height processing
  blurRadius: 1.0,       // Blur radius in texels (0.0..2.5)

  // Band rendering params
  freq: 8.0,             // Band frequency (6..14, default 8)
  bandThickness: 0.65,   // 0.4..0.8
  relief: 0.8,           // 0.5..1.2
  exposure: 1.15,        // 0.9..1.6
  
  // Lighting params
  lightDir: new THREE.Vector3(0.2, 0.5, 1.0),
  ambient: 0.25,
  diffuse: 0.85,
  specular: 0.25,
  shininess: 24.0,
  rim: 0.25,
  
  // Domain warp (applied to render UVs)
  warpAmp: 0.04,         // 0.02..0.08
  warpScale: 3.0,        // 1.0..6.0
  warpSpeed: 0.06,       // 0.02..0.2
  
  // Debug toggles
  showHeight: false,
  showBandsOnly: false,

  touchGain: 0.65,
  touchRadius: 0.03,
  mouseUv: new THREE.Vector2(-1, -1),

  presetIndex: 0,
  time: 0,  // Animation time
};

// ---------- Targets & materials ----------
let rtA: THREE.WebGLRenderTarget, rtB: THREE.WebGLRenderTarget;  // RD ping-pong (RG = U,V)
let heightTex: THREE.WebGLRenderTarget;  // Height field (R16F, LINEAR)

function makeRDTarget(size: number) {
  return new THREE.WebGLRenderTarget(size, size, {
    type: THREE.FloatType,
    format: THREE.RGFormat,
    internalFormat: 'RG32F' as any,
    depthBuffer: false, stencilBuffer: false,
    minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter,
    wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping,  // Changed from REPEAT
  });
}

function makeHeightTarget(size: number) {
  // Height texture: R16F format (single channel float)
  const gl = renderer.getContext() as WebGL2RenderingContext;
  const ext = gl.getExtension('EXT_color_buffer_half_float');
  
  return new THREE.WebGLRenderTarget(size, size, {
    type: ext ? THREE.HalfFloatType : THREE.FloatType,
    format: THREE.RedFormat,  // Single channel (R)
    internalFormat: ext ? ('R16F' as any) : ('R32F' as any),
    depthBuffer: false, stencilBuffer: false,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping,
  });
}

// RD step material
const stepMat = new THREE.RawShaderMaterial({
  vertexShader: vert, fragmentShader: stepFrag, glslVersion: THREE.GLSL3,
  depthTest: false, depthWrite: false, transparent: false,
  uniforms: {
    uPrev:       { value: null },
    uTexel:      { value: new THREE.Vector2() },
    uDt:         { value: sim.dt },
    uFeed:       { value: sim.f },
    uKill:       { value: sim.k },
    uDu:         { value: sim.Du },
    uDv:         { value: sim.Dv },
    uMouse:      { value: sim.mouseUv },
    uTouchGain:  { value: sim.touchGain },
    uTouchRadius:{ value: sim.touchRadius },
    uFlowAmp:    { value: 0.0 },
    uFlowFreq:   { value: 1.0 },
    uTime:       { value: 0.0 },
  }
});

// Height pass: compute H = blur(U-V) from RD state
const heightMat = new THREE.RawShaderMaterial({
  vertexShader: vert, fragmentShader: heightFrag, glslVersion: THREE.GLSL3,
  depthTest: false, depthWrite: false, transparent: false,
  uniforms: {
    uTexUV:     { value: null },  // RD texture (RG format)
    uTexel:     { value: new THREE.Vector2() },
    uBlurRadius: { value: sim.blurRadius },
  }
});

// Bands render pass: domain-warped UV, cosine bands, lighting
const bandsMat = new THREE.RawShaderMaterial({
  vertexShader: vert, fragmentShader: bandsFrag, glslVersion: THREE.GLSL3,
  depthTest: false, depthWrite: false, transparent: false,
  uniforms: {
    uHeight:       { value: null },
    uTexel:        { value: new THREE.Vector2() },
    freq:          { value: sim.freq },
    bandThickness: { value: sim.bandThickness },
    relief:        { value: sim.relief },
    exposure:      { value: sim.exposure },
    lightDir:      { value: sim.lightDir.clone().normalize() },
    ambient:       { value: sim.ambient },
    diffuse:       { value: sim.diffuse },
    specular:      { value: sim.specular },
    shininess:     { value: sim.shininess },
    rim:           { value: sim.rim },
    warpAmp:       { value: sim.warpAmp },
    warpScale:     { value: sim.warpScale },
    warpSpeed:     { value: sim.warpSpeed },
    time:          { value: 0.0 },
    showHeight:    { value: sim.showHeight ? 1.0 : 0.0 },
    showBandsOnly: { value: sim.showBandsOnly ? 1.0 : 0.0 },
  }
});

// Check for shader compilation errors
if (!bandsMat.fragmentShader || !bandsMat.vertexShader) {
  console.error('[Shader] Bands material shaders missing');
} else {
  console.log('[Shader] Bands material created');
}

const stepQuad = new THREE.Mesh(geom, stepMat);
const heightQuad = new THREE.Mesh(geom, heightMat);
const bandsQuad = new THREE.Mesh(geom, bandsMat);

stepQuad.frustumCulled = false;
heightQuad.frustumCulled = false;
bandsQuad.frustumCulled = false;

const stepScene = new THREE.Scene(); stepScene.add(stepQuad);
const heightScene = new THREE.Scene(); heightScene.add(heightQuad);
const bandsScene = new THREE.Scene(); bandsScene.add(bandsQuad);

// ---------- Seeders ----------
function seedCenterBlob(size: number) {
  const data = new Float32Array(size * size * 2);
  for (let y=0; y<size; y++){
    for (let x=0; x<size; x++){
      const i = (y * size + x) * 2;
      let U = 1.0, V = 0.0;
      const nx = x/size - 0.5, ny = y/size - 0.5;
      const r = Math.hypot(nx, ny);
      if (r < 0.18 + 0.02*Math.random()) { V = 0.25 + 0.15*Math.random(); U = 0.60 + 0.10*Math.random(); }
      data[i] = U; data[i+1] = V;
    }
  }
  uploadSeed(data, size);
}

function seedScatteredDisks(size: number) {
  const data = new Float32Array(size * size * 2);
  // Initialize all to U=1.0, V=0.0
  for (let i=0; i<data.length; i+=2) {
    data[i] = 1.0;
    data[i+1] = 0.0;
  }
  // Add 8-20 random disks
  const numDisks = 8 + Math.floor(Math.random() * 12);
  for (let d=0; d<numDisks; d++) {
    const cx = Math.random();
    const cy = Math.random();
    const radius = 0.03 + Math.random() * 0.05;
    for (let y=0; y<size; y++) {
      for (let x=0; x<size; x++) {
        const nx = x/size - cx;
        const ny = y/size - cy;
        const r = Math.hypot(nx, ny);
        if (r < radius) {
          const i = (y * size + x) * 2;
          data[i] = 0.5 + Math.random() * 0.3;  // U
          data[i+1] = 0.7 + Math.random() * 0.3; // V
        }
      }
    }
  }
  uploadSeed(data, size);
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function seedRings(size: number) {
  const data = new Float32Array(size * size * 2).fill(0);
  for (let y=0; y<size; y++){
    for (let x=0; x<size; x++){
      const i=(y*size+x)*2;
      const nx=x/size-0.5, ny=y/size-0.5;
      const r=Math.hypot(nx,ny);
      const ring = smoothstep(0.21,0.205, Math.abs(r-0.22)) + smoothstep(0.34,0.335, Math.abs(r-0.35));
      const V = 0.35 * ring;
      const U = 1.0 - 0.4 * ring;
      data[i]=U; data[i+1]=V;
    }
  }
  uploadSeed(data, size);
}

function seedSprinkles(size: number) {
  const data = new Float32Array(size * size * 2);
  for (let i=0;i<data.length;i+=2){ data[i]=1.0; data[i+1]=0.0; }
  for (let s=0;s<Math.floor(size*1.2); s++){
    const x = Math.floor(Math.random()*size);
    const y = Math.floor(Math.random()*size);
    for (let dy=-2; dy<=2; dy++){
      for (let dx=-2; dx<=2; dx++){
        const xx=(x+dx+size)%size, yy=(y+dy+size)%size;
        const k=(yy*size+xx)*2;
        data[k]=0.7; data[k+1]=0.45;
      }
    }
  }
  uploadSeed(data, size);
}

let brushMode = false;

function uploadSeed(data: Float32Array, size: number){
  if (!rtA) return;
  const tex = new THREE.DataTexture(data, size, size, THREE.RGFormat, THREE.FloatType);
  tex.needsUpdate = true;
  const prev = renderer.getRenderTarget();
  renderer.setRenderTarget(rtA);
  renderer.clear();
  renderer.copyTextureToTexture(new THREE.Vector2(0,0), tex, rtA.texture);
  renderer.setRenderTarget(prev);
}

// ---------- Targets lifecycle ----------
function createTargets(size: number) {
  if (rtA) { 
    rtA.dispose(); 
    rtB.dispose(); 
    heightTex?.dispose();
  }
  rtA = makeRDTarget(size);
  rtB = makeRDTarget(size);
  heightTex = makeHeightTarget(size);  // Same resolution as sim
  
  stepMat.uniforms.uPrev.value = rtA.texture;
  stepMat.uniforms.uTexel.value.set(1/size, 1/size);
  heightMat.uniforms.uTexel.value.set(1/size, 1/size);
  bandsMat.uniforms.uTexel.value.set(1/size, 1/size);
  
  sim.grid = size;
  seedScatteredDisks(size);  // Use scattered disks by default
  
  // Initialize height texture from RD state
  computeHeight();
}

// ---------- Resize canvas ----------
function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setSize(window.innerWidth, window.innerHeight, false);
}
window.addEventListener('resize', resizeCanvas);

// ---------- Mouse → UV ----------
function pointerToUv(e: PointerEvent){
  const rect = renderer.domElement.getBoundingClientRect();
  const u = (e.clientX - rect.left) / rect.width;
  const v = 1.0 - (e.clientY - rect.top) / rect.height;
  sim.mouseUv.set(u, v);
}
function clearMouse(){ sim.mouseUv.set(-1, -1); }
renderer.domElement.addEventListener('pointermove', pointerToUv);
renderer.domElement.addEventListener('pointerdown', (e: PointerEvent)=>{ brushMode = true; pointerToUv(e); });
renderer.domElement.addEventListener('pointerup', ()=>{ brushMode = false; clearMouse(); });
renderer.domElement.addEventListener('pointerleave', ()=>{ brushMode = false; clearMouse(); });

// ---------- Apply preset ----------
function applyPreset(idx: number){
  const p = PRESETS[idx]; if (!p) return;
  sim.presetIndex = idx;
  sim.f  = p.f;  stepMat.uniforms.uFeed.value = p.f;
  sim.k  = p.k;  stepMat.uniforms.uKill.value = p.k;
  sim.Du = p.Du; stepMat.uniforms.uDu.value   = p.Du;
  sim.Dv = p.Dv; stepMat.uniforms.uDv.value   = p.Dv;
}

// ---------- Simulation pipeline ----------
let frameCount = 0;
function rdStep(){
  if (!rtA || !rtB) {
    console.warn('[rdStep] Missing targets', { rtA: !!rtA, rtB: !!rtB });
    return;
  }
  for (let i=0; i<sim.stepsPerFrame; i++){
    stepMat.uniforms.uPrev.value = rtA.texture;
    renderer.setRenderTarget(rtB);
    renderer.render(stepScene, camera);
    const tmp = rtA; rtA = rtB; rtB = tmp;
  }
  renderer.setRenderTarget(null);
  const error = gl.getError();
  if (error !== gl.NO_ERROR && frameCount < 5) {
    console.warn('[rdStep] WebGL error:', error, 'frame:', frameCount);
  }
}

function computeHeight() {
  if (!rtA || !heightTex) {
    console.warn('[computeHeight] Missing targets', { rtA: !!rtA, heightTex: !!heightTex });
    return;
  }
  
  // Compute height field H = blur(U-V) from RD state
  heightMat.uniforms.uTexUV.value = rtA.texture;
  heightMat.uniforms.uBlurRadius.value = sim.blurRadius;
  
  const prev = renderer.getRenderTarget();
  renderer.setRenderTarget(heightTex);
  renderer.clear();
  renderer.render(heightScene, camera);
  
  // Update bands shader
  bandsMat.uniforms.uHeight.value = heightTex.texture;
  
  renderer.setRenderTarget(prev);
}


let running = true;
let last: number | null = null;

function loop(now: number){
  if (!running) return;
  
  // Initialize last on first frame
  if (last === null) {
    last = now;
  }
  
  const dt = Math.max(0, (now - last) / 1000);
  last = now;
  
  // Ensure time is valid
  if (isNaN(sim.time)) {
    sim.time = 0;
  }
  if (isNaN(dt) || !isFinite(dt)) {
    console.warn('[Loop] Invalid dt:', dt, 'resetting time');
    sim.time = 0;
    return;
  }
  
  sim.time += dt;
  frameCount++;
  
  const validTime = isNaN(sim.time) ? 0 : sim.time;
  stepMat.uniforms.uTime.value = validTime;

  rdStep();
  
  // Compute height field H = blur(U-V)
  computeHeight();
  
  // Update bands shader uniforms
  bandsMat.uniforms.lightDir.value.copy(sim.lightDir).normalize();
  bandsMat.uniforms.warpAmp.value = sim.warpAmp;
  bandsMat.uniforms.warpScale.value = sim.warpScale;
  bandsMat.uniforms.warpSpeed.value = sim.warpSpeed;
  bandsMat.uniforms.time.value = validTime;
  bandsMat.uniforms.showHeight.value = sim.showHeight ? 1.0 : 0.0;
  bandsMat.uniforms.showBandsOnly.value = sim.showBandsOnly ? 1.0 : 0.0;
  
  // Check if we have a valid height texture before rendering
  if (!bandsMat.uniforms.uHeight.value) {
    if (frameCount < 5) {
      console.warn('[Loop] No height texture available yet, frame:', frameCount);
    }
    requestAnimationFrame(loop);
    return;
  }
  
  // Render bands to screen
  const prevTarget = renderer.getRenderTarget();
  renderer.setRenderTarget(null);
  renderer.clear();
  renderer.render(bandsScene, camera);
  
  const error = gl.getError();
  if (error !== gl.NO_ERROR && frameCount < 10) {
    console.error('[Render] WebGL error:', error, 'frame:', frameCount);
  }
  
  requestAnimationFrame(loop);
}

// ---------- GUI ----------
const gui = new GUI({ width: 320 });

const gSim = gui.addFolder('Simulation');
gSim.add(sim, 'stepsPerFrame', 1, 40, 1).name('Steps/Frame');
gSim.add(sim, 'dt', 0.1, 2.0, 0.05).name('dt').onChange((v: number) => {
  stepMat.uniforms.uDt.value = v;
});
gSim.add(sim, 'grid', { '512':512, '768':768, '1024 (hi-res)':1024, '1536':1536 })
  .name('Grid Size')
  .onChange((size:number)=> createTargets(size));

const gParams = gui.addFolder('Gray–Scott');
gParams.add(sim, 'f', 0.01, 0.08, 0.001).name('feed f').onChange((v: number) => stepMat.uniforms.uFeed.value = v);
gParams.add(sim, 'k', 0.02, 0.10, 0.001).name('kill k').onChange((v: number) => stepMat.uniforms.uKill.value = v);
gParams.add(sim, 'Du', 0.02, 0.30, 0.01).name('Du').onChange((v: number) => stepMat.uniforms.uDu.value = v);
gParams.add(sim, 'Dv', 0.01, 0.20, 0.01).name('Dv').onChange((v: number) => stepMat.uniforms.uDv.value = v);
gParams.add(sim, 'touchGain', 0.0, 1.5, 0.01).name('Touch Gain').onChange((v: number) => stepMat.uniforms.uTouchGain.value = v);
gParams.add(sim, 'touchRadius', 0.005, 0.15, 0.001).name('Touch Radius').onChange((v: number) => stepMat.uniforms.uTouchRadius.value = v);

const gHeight = gui.addFolder('Height Processing');
gHeight.add(sim, 'blurRadius', 0.0, 2.5, 0.1).name('Blur Radius').onChange((v: number) => {
  sim.blurRadius = v;
  heightMat.uniforms.uBlurRadius.value = v;
});

const gBands = gui.addFolder('Bands');
gBands.add(sim, 'freq', 6, 14, 0.5).name('Frequency').onChange((v: number) => bandsMat.uniforms.freq.value = v);
gBands.add(sim, 'bandThickness', 0.4, 0.8, 0.01).name('Thickness').onChange((v: number) => bandsMat.uniforms.bandThickness.value = v);
gBands.add(sim, 'relief', 0.5, 1.2, 0.05).name('Relief').onChange((v: number) => bandsMat.uniforms.relief.value = v);
gBands.add(sim, 'exposure', 0.9, 1.6, 0.01).name('Exposure').onChange((v: number) => bandsMat.uniforms.exposure.value = v);

const gWarp = gui.addFolder('Domain Warp');
gWarp.add(sim, 'warpAmp', 0.02, 0.08, 0.001).name('Amplitude').onChange((v: number) => bandsMat.uniforms.warpAmp.value = v);
gWarp.add(sim, 'warpScale', 1.0, 6.0, 0.1).name('Scale').onChange((v: number) => bandsMat.uniforms.warpScale.value = v);
gWarp.add(sim, 'warpSpeed', 0.02, 0.2, 0.001).name('Speed').onChange((v: number) => bandsMat.uniforms.warpSpeed.value = v);

const gLight = gui.addFolder('Lighting');
gLight.add(sim, 'ambient', 0.0, 1.0, 0.01).name('Ambient').onChange((v: number) => bandsMat.uniforms.ambient.value = v);
gLight.add(sim, 'diffuse', 0.0, 1.5, 0.01).name('Diffuse').onChange((v: number) => bandsMat.uniforms.diffuse.value = v);
gLight.add(sim, 'specular', 0.0, 1.0, 0.01).name('Specular').onChange((v: number) => bandsMat.uniforms.specular.value = v);
gLight.add(sim, 'shininess', 4, 64, 1).name('Shininess').onChange((v: number) => bandsMat.uniforms.shininess.value = v);
gLight.add(sim, 'rim', 0, 1, 0.01).name('Rim').onChange((v: number) => bandsMat.uniforms.rim.value = v);

const gDebug = gui.addFolder('Debug');
gDebug.add(sim, 'showHeight').name('Show Height').onChange((v: boolean) => bandsMat.uniforms.showHeight.value = v ? 1.0 : 0.0);
gDebug.add(sim, 'showBandsOnly').name('Show Bands Only').onChange((v: boolean) => bandsMat.uniforms.showBandsOnly.value = v ? 1.0 : 0.0);

const gSeed = gui.addFolder('Seeds');
gSeed.add({ seed: ()=>seedCenterBlob(sim.grid) }, 'seed').name('Center');
gSeed.add({ seed: ()=>seedRings(sim.grid) }, 'seed').name('Rings');
gSeed.add({ seed: ()=>seedSprinkles(sim.grid) }, 'seed').name('Sprinkles');
gSeed.add({ seed: ()=>seedScatteredDisks(sim.grid) }, 'seed').name('Scattered Disks');
gSeed.add({ seed: ()=>seedScatteredDisks(sim.grid) }, 'seed').name('Reset Seeds');

// ---------- Preset Manager Functions ----------
function getParamsFromGUI(): RDParams {
  return {
    stepsPerFrame: sim.stepsPerFrame,
    dt: sim.dt,
    gridSize: sim.grid,
    f: sim.f,
    k: sim.k,
    Du: sim.Du,
    Dv: sim.Dv,
    touchGain: sim.touchGain,
    touchRadius: sim.touchRadius,
    blurRadius: sim.blurRadius,
    freq: sim.freq,
    bandThickness: sim.bandThickness,
    relief: sim.relief,
    exposure: sim.exposure,
    warpAmp: sim.warpAmp,
    warpScale: sim.warpScale,
    warpSpeed: sim.warpSpeed,
    ambient: sim.ambient,
    diffuse: sim.diffuse,
    specular: sim.specular,
    shininess: sim.shininess,
    rim: sim.rim,
    showHeight: sim.showHeight,
    showBandsOnly: sim.showBandsOnly,
  };
}

function applyParamsToGUI(p: RDParams) {
  // Update sim object
  if (p.stepsPerFrame !== undefined) sim.stepsPerFrame = p.stepsPerFrame;
  if (p.dt !== undefined) sim.dt = p.dt;
  if (p.gridSize !== undefined) {
    sim.grid = p.gridSize;
    createTargets(p.gridSize);
  }
  if (p.f !== undefined) { sim.f = p.f; stepMat.uniforms.uFeed.value = p.f; }
  if (p.k !== undefined) { sim.k = p.k; stepMat.uniforms.uKill.value = p.k; }
  if (p.Du !== undefined) { sim.Du = p.Du; stepMat.uniforms.uDu.value = p.Du; }
  if (p.Dv !== undefined) { sim.Dv = p.Dv; stepMat.uniforms.uDv.value = p.Dv; }
  if (p.touchGain !== undefined) { sim.touchGain = p.touchGain; stepMat.uniforms.uTouchGain.value = p.touchGain; }
  if (p.touchRadius !== undefined) { sim.touchRadius = p.touchRadius; stepMat.uniforms.uTouchRadius.value = p.touchRadius; }
  if (p.blurRadius !== undefined) { sim.blurRadius = p.blurRadius; heightMat.uniforms.uBlurRadius.value = p.blurRadius; }
  if (p.freq !== undefined) { sim.freq = p.freq; bandsMat.uniforms.freq.value = p.freq; }
  if (p.bandThickness !== undefined) { sim.bandThickness = p.bandThickness; bandsMat.uniforms.bandThickness.value = p.bandThickness; }
  if (p.relief !== undefined) { sim.relief = p.relief; bandsMat.uniforms.relief.value = p.relief; }
  if (p.exposure !== undefined) { sim.exposure = p.exposure; bandsMat.uniforms.exposure.value = p.exposure; }
  if (p.warpAmp !== undefined) { sim.warpAmp = p.warpAmp; bandsMat.uniforms.warpAmp.value = p.warpAmp; }
  if (p.warpScale !== undefined) { sim.warpScale = p.warpScale; bandsMat.uniforms.warpScale.value = p.warpScale; }
  if (p.warpSpeed !== undefined) { sim.warpSpeed = p.warpSpeed; bandsMat.uniforms.warpSpeed.value = p.warpSpeed; }
  if (p.ambient !== undefined) { sim.ambient = p.ambient; bandsMat.uniforms.ambient.value = p.ambient; }
  if (p.diffuse !== undefined) { sim.diffuse = p.diffuse; bandsMat.uniforms.diffuse.value = p.diffuse; }
  if (p.specular !== undefined) { sim.specular = p.specular; bandsMat.uniforms.specular.value = p.specular; }
  if (p.shininess !== undefined) { sim.shininess = p.shininess; bandsMat.uniforms.shininess.value = p.shininess; }
  if (p.rim !== undefined) { sim.rim = p.rim; bandsMat.uniforms.rim.value = p.rim; }
  if (p.showHeight !== undefined) { sim.showHeight = p.showHeight; bandsMat.uniforms.showHeight.value = p.showHeight ? 1.0 : 0.0; }
  if (p.showBandsOnly !== undefined) { sim.showBandsOnly = p.showBandsOnly; bandsMat.uniforms.showBandsOnly.value = p.showBandsOnly ? 1.0 : 0.0; }
  
  // Update light direction normalization
  bandsMat.uniforms.lightDir.value.copy(sim.lightDir).normalize();
}

const gPreset = gui.addFolder('Presets');
gPreset.add(sim, 'presetIndex', PRESETS.reduce((m,p,i)=> (m[p.name]=i, m), {} as any)).name('Preset')
  .onChange((i:number)=>applyPreset(i));

// Preset Manager
let presetName = "MyPreset";
const gPresetMgr = gui.addFolder('Preset Manager');
gPresetMgr.add({ presetName }, 'presetName').name('Name').onChange((v: string) => { presetName = v; });
gPresetMgr.add({ Save: () => {
  savePreset(presetName, getParamsFromGUI());
  console.log('[Preset] Saved:', presetName);
  refreshPresetList();
}}, 'Save').name('Save');
gPresetMgr.add({ Load: () => {
  const p = getPreset(presetName);
  if (p) {
    applyParamsToGUI(p);
    console.log('[Preset] Loaded:', presetName);
  } else {
    console.warn('[Preset] Not found:', presetName);
  }
}}, 'Load').name('Load');
gPresetMgr.add({ Delete: () => {
  deletePreset(presetName);
  console.log('[Preset] Deleted:', presetName);
  refreshPresetList();
}}, 'Delete').name('Delete');

// Preset list dropdown
const presetNames = () => ["—", ...listPresets()];
let selectedPreset = "—";
const presetListCtrl = gPresetMgr.add({ selectedPreset }, 'selectedPreset', presetNames()).name('List').onChange((name: string) => {
  if (name !== "—") {
    const p = getPreset(name);
    if (p) {
      presetName = name;
      applyParamsToGUI(p);
      console.log('[Preset] Loaded from list:', name);
    }
  }
});

// Helper to refresh the preset list dropdown
function refreshPresetList() {
  const names = presetNames();
  presetListCtrl.options(names);
  presetListCtrl.updateDisplay();
}

// Share/Export
gPresetMgr.add({ CopyURL: () => {
  const b64 = encodeParamsToURL(getParamsFromGUI());
  const url = `${location.origin}${location.pathname}?p=${b64}`;
  navigator.clipboard?.writeText(url).then(() => {
    console.log('[Preset] URL copied to clipboard:', url);
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = url;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('[Preset] URL copied (fallback):', url);
  });
}}, 'CopyURL').name('Copy Share Link');

gPresetMgr.add({ ExportJSON: () => {
  const txt = exportPresets();
  navigator.clipboard?.writeText(txt).then(() => {
    console.log('[Preset] JSON copied to clipboard');
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = txt;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('[Preset] JSON copied (fallback)');
  });
}}, 'ExportJSON').name('Export JSON');

gPresetMgr.add({ ImportJSON: () => {
  const txt = prompt('Paste presets JSON:');
  if (txt) {
    const success = importPresets(txt);
    if (success) {
      console.log('[Preset] Imported presets');
      refreshPresetList();
    } else {
      alert('Failed to import presets. Check console for details.');
    }
  }
}}, 'ImportJSON').name('Import JSON');


gui.add({ pause:false }, 'pause').onChange((p:boolean)=>{ running=!p; if (running) requestAnimationFrame(loop); });

// ---------- Boot ----------
function boot(){
  resizeCanvas();
  createTargets(sim.grid);
  
  // Load from URL if present (shareable links)
  const urlParams = new URLSearchParams(location.search);
  const packed = urlParams.get("p");
  if (packed) {
    const p = decodeParamsFromURL(packed);
    if (p) {
      console.log('[Preset] Loading from URL');
      applyParamsToGUI(p);
    } else {
      console.warn('[Preset] Failed to decode URL params, using defaults');
      applyPreset(0);  // Apply Labyrinth preset (index 0)
    }
  } else {
    applyPreset(0);  // Apply Labyrinth preset (index 0)
  }
  
  // Debug: log texture info
  console.log('[Bands] Pipeline initialized');
  console.log('- Grid size:', sim.grid);
  console.log('- RD targets:', rtA ? 'OK' : 'MISSING');
  console.log('- Height targets:', heightTex ? 'OK' : 'MISSING');
  
  // Initialize time properly
  sim.time = 0;
  last = null;
  
  requestAnimationFrame((t)=>{ loop(t); });
}

// Quick-save hotkey (⌘/Ctrl + S)
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
    e.preventDefault();
    const name = prompt("Save preset name:", presetName) || presetName;
    presetName = name;
    savePreset(name, getParamsFromGUI());
    console.log('[Preset] Saved via hotkey:', name);
    refreshPresetList();
  }
});

boot();

console.log('[Bands] RD → Height → Bands pipeline ready');
