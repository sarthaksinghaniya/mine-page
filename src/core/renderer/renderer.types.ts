/**
 * @file src/core/renderer/renderer.types.ts
 * @description Type definitions for the WebGL renderer configuration system.
 *
 * All renderer settings flow through these types — never hardcoded in components.
 */

import type * as THREE from 'three';

// ── Tone Mapping ──────────────────────────────────────────────────────────────

/** Supported tone mapping algorithms */
export type ToneMappingMode =
  | 'none'
  | 'linear'
  | 'reinhard'
  | 'cineon'
  | 'aces' // ACESFilmicToneMapping — default for this project
  | 'agx'
  | 'neutral';

/** Maps our tone mapping type to THREE constants */
export const TONE_MAPPING_MAP: Record<ToneMappingMode, THREE.ToneMapping> = {
  none: 0, // THREE.NoToneMapping
  linear: 1, // THREE.LinearToneMapping
  reinhard: 2, // THREE.ReinhardToneMapping
  cineon: 3, // THREE.CineonToneMapping
  aces: 4, // THREE.ACESFilmicToneMapping
  agx: 6, // THREE.AgXToneMapping
  neutral: 7, // THREE.NeutralToneMapping
};

// ── Shadow Quality ────────────────────────────────────────────────────────────

export type ShadowQuality = 'off' | 'basic' | 'soft' | 'vsm';

/** Maps shadow quality to THREE shadow map type constants */
export const SHADOW_MAP_TYPE: Record<Exclude<ShadowQuality, 'off'>, THREE.ShadowMapType> = {
  basic: 0, // THREE.BasicShadowMap
  soft: 1, // THREE.PCFShadowMap
  vsm: 3, // THREE.VSMShadowMap
};

// ── Renderer Configuration ────────────────────────────────────────────────────

/** Full renderer configuration record — all values are explicit, no fallbacks */
export interface RendererConfiguration {
  /** Tone mapping algorithm */
  toneMapping: ToneMappingMode;
  /** Exposure multiplier for tone mapping (1.0 = physically correct) */
  toneMappingExposure: number;
  /** Shadow quality preset */
  shadowQuality: ShadowQuality;
  /** Whether shadows are globally enabled */
  shadowsEnabled: boolean;
  /** Physical correct lighting mode */
  physicallyCorrectLights: boolean;
  /** Output color space (always sRGB for correct display) */
  outputColorSpace: 'srgb' | 'srgb-linear';
  /** Background color of the scene */
  backgroundColor: string;
  /** Background alpha (0 = transparent canvas) */
  backgroundAlpha: number;
}

/** Default renderer configuration — production quality */
export const DEFAULT_RENDERER_CONFIG: RendererConfiguration = {
  toneMapping: 'aces',
  toneMappingExposure: 1.0,
  shadowQuality: 'soft',
  shadowsEnabled: true,
  physicallyCorrectLights: true,
  outputColorSpace: 'srgb',
  backgroundColor: '#050508',
  backgroundAlpha: 1,
};
