// src/components/neural/NeuralFieldFlow.tsx
"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useUiStore } from "@/lib/uiStore";
import * as THREE from "three";

// FBM + latent flow shader
const fragmentShader = `
  uniform vec2 uRes;
  uniform float uTime;
  uniform float uGain;
  uniform vec3 uA;
  uniform vec3 uB;

  varying vec2 vUv;

  // Simplex-like 2D noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float n00 = hash(i);
    float n10 = hash(i + vec2(1.0, 0.0));
    float n01 = hash(i + vec2(0.0, 1.0));
    float n11 = hash(i + vec2(1.0, 1.0));
    
    float nx0 = mix(n00, n10, f.x);
    float nx1 = mix(n01, n11, f.x);
    return mix(nx0, nx1, f.y);
  }

  // Fractional Brownian Motion
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    float maxValue = 0.0;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      maxValue += amplitude;
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value / maxValue;
  }

  void main() {
    vec2 uv = vUv;
    
    float time = uTime * 0.05;
    vec2 flow = vec2(
      fbm(uv * 3.0 + vec2(time, 0.0)),
      fbm(uv * 3.0 + vec2(0.0, time + 10.0))
    );
    
    float n1 = fbm(uv * 2.0 + flow * 0.3 + time);
    float n2 = fbm(uv * 4.0 - flow * 0.2 + time * 0.7);
    
    float pattern = mix(n1, n2, 0.5);
    
    vec3 color = mix(uA, uB, pattern);
    
    float dist = length(uv - 0.5) * 2.0;
    float vignette = smoothstep(1.0, 0.25, dist);
    color *= vignette;
    
    color *= uGain;
    color = pow(color, vec3(1.1));
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FlowPlane: React.FC = () => {
  const { camera } = useThree();
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const { field: fieldConfig, reducedMotion } = useUiStore();

  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      const orthoCamera = camera as THREE.OrthographicCamera;
      orthoCamera.left = -1;
      orthoCamera.right = 1;
      orthoCamera.top = 1;
      orthoCamera.bottom = -1;
    }
    camera.near = 0.1;
    camera.far = 100;
    camera.position.z = 1;
    camera.updateProjectionMatrix();
  }, [camera]);

  const uniforms = useMemo(
    () => ({
      uRes: {
        value: new THREE.Vector2(
          typeof window !== "undefined" ? window.innerWidth : 1024,
          typeof window !== "undefined" ? window.innerHeight : 768
        ),
      },
      uTime: { value: 0 },
      uGain: { value: fieldConfig.gain },
      uA: { value: new THREE.Color("#53d6ff") },
      uB: { value: new THREE.Color("#b08bff") },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!reducedMotion && shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
      shaderRef.current.uniforms.uGain.value = fieldConfig.gain;
    }
  });

  if (reducedMotion) {
    return null;
  }

  return (
    // @ts-expect-error - React Three Fiber JSX elements not in standard JSX namespace
    <mesh position={[0, 0, 0]}>
      {/* @ts-expect-error */}
      <planeGeometry args={[2, 2]} />
      {/* @ts-expect-error */}
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        transparent={false}
      />
      {/* @ts-expect-error */}
    </mesh>
  );
};

const NeuralFieldFlow: React.FC = () => {
  const reducedMotion = useUiStore((s) => s.reducedMotion);

  if (reducedMotion) {
    return (
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #0a0e27 0%, #1a0a3a 25%, #0f0a2a 50%, #1a0a3a 75%, #0a0e27 100%)",
          backgroundAttachment: "fixed",
        }}
      />
    );
  }

  return (
    <Canvas
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: true,
      }}
    >
      <FlowPlane />
    </Canvas>
  );
};

export default NeuralFieldFlow;
