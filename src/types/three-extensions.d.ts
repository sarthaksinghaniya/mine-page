/**
 * @file src/types/three-extensions.d.ts
 * @description Three.js type augmentations for custom materials, geometries,
 * and shader uniforms used throughout the open-world renderer.
 *
 * Add any `THREE.ShaderMaterial` uniform typings or React Three Fiber
 * JSX element extensions here as the project grows.
 */

import type * as THREE from 'three';
import type { ThreeElements } from '@react-three/fiber';

// ── R3F JSX Extensions ────────────────────────────────────────────────────────
// Extend the R3F JSX namespace with custom elements when custom materials
// or geometries are registered via `extend()` in the future.

declare module '@react-three/fiber' {
  interface ThreeElements extends ThreeElements {
    // Example placeholder — uncomment and type when registering custom elements:
    // customShaderMaterial: ThreeElements['shaderMaterial'] & { uniforms: CustomUniforms };
  }
}

// ── Custom Shader Uniform Types ────────────────────────────────────────────────

/**
 * Uniform structure for the city atmosphere shader.
 * Populated when the environment feature is implemented.
 */
export interface AtmosphereUniforms {
  uTime:      THREE.IUniform<number>;
  uSunDirection: THREE.IUniform<THREE.Vector3>;
  uSunColor:  THREE.IUniform<THREE.Color>;
  uFogColor:  THREE.IUniform<THREE.Color>;
  uFogNear:   THREE.IUniform<number>;
  uFogFar:    THREE.IUniform<number>;
}

/**
 * Uniform structure for building window emissive shader.
 */
export interface BuildingWindowUniforms {
  uTime:       THREE.IUniform<number>;
  uLightColor: THREE.IUniform<THREE.Color>;
  uNightFactor:THREE.IUniform<number>;
}
