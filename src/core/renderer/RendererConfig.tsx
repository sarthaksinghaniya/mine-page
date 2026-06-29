/**
 * @file src/core/renderer/RendererConfig.tsx
 * @description Inside-Canvas component that applies renderer configuration imperatively.
 *
 * R3F's <Canvas> accepts some renderer settings as props, but many must be applied
 * via `gl` (the WebGLRenderer) after creation. This component handles that.
 *
 * Renders null — purely a configuration side-effect component.
 *
 * USAGE: Place as the first child of <Canvas>.
 * ```tsx
 * <Canvas>
 *   <RendererConfig />
 *   {children}
 * </Canvas>
 * ```
 */

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  TONE_MAPPING_MAP,
  SHADOW_MAP_TYPE,
  DEFAULT_RENDERER_CONFIG,
  type RendererConfiguration,
} from './renderer.types';
import { performanceProfile } from '@config/performance';

// ── Props ─────────────────────────────────────────────────────────────────────

interface RendererConfigProps {
  /** Override any default renderer settings */
  config?: Partial<RendererConfiguration>;
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Applies WebGL renderer configuration imperatively inside the R3F Canvas.
 * Must be the first child of Canvas to ensure settings are applied before
 * any scene objects are rendered.
 */
export function RendererConfig({ config }: RendererConfigProps): null {
  const { gl, scene } = useThree();

  useEffect(() => {
    const resolved: RendererConfiguration = { ...DEFAULT_RENDERER_CONFIG, ...config };

    // ── Tone Mapping ──────────────────────────────────────────────────────────
    gl.toneMapping         = TONE_MAPPING_MAP[resolved.toneMapping];
    gl.toneMappingExposure = resolved.toneMappingExposure;

    // ── Color Space ───────────────────────────────────────────────────────────
    gl.outputColorSpace = resolved.outputColorSpace === 'srgb'
      ? THREE.SRGBColorSpace
      : THREE.LinearSRGBColorSpace;

    // ── Shadows ───────────────────────────────────────────────────────────────
    gl.shadowMap.enabled = resolved.shadowsEnabled && resolved.shadowQuality !== 'off';
    if (resolved.shadowQuality !== 'off') {
      gl.shadowMap.type = SHADOW_MAP_TYPE[resolved.shadowQuality];
    }

    // ── Background ────────────────────────────────────────────────────────────
    scene.background = new THREE.Color(resolved.backgroundColor);

    // ── Performance-Adaptive Settings ─────────────────────────────────────────
    // Disable shadows entirely on low-tier GPUs
    if (performanceProfile.tier === 'low') {
      gl.shadowMap.enabled = false;
    }

    // ── Cleanup: not needed — renderer is managed by R3F's lifecycle ──────────
  }, [gl, scene, config]);

  return null;
}
