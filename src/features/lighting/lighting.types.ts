/**
 * @file src/features/lighting/lighting.types.ts
 * @description Type definitions for the lighting system.
 *
 * All lighting values are configured here and never hardcoded in components.
 * Designed to be fully driven by the environment store (day-night cycle, weather).
 */

// ── Sun / Directional ─────────────────────────────────────────────────────────

export interface SunConfig {
  /** Light intensity (physically based — keep in lux range) */
  intensity: number;
  /** RGB hex color of the sun light */
  color: string;
  /** World-space position of the sun (direction = normalize(position - 0)) */
  position: { x: number; y: number; z: number };
  /** Shadow map resolution (overrides performance profile if set explicitly) */
  shadowMapSize?: 512 | 1024 | 2048 | 4096;
  /** Shadow camera near plane */
  shadowNear: number;
  /** Shadow camera far plane */
  shadowFar: number;
  /** Orthographic shadow camera half-size */
  shadowRadius: number;
  /** Shadow bias (prevents shadow acne; tune per scene) */
  shadowBias: number;
  /** Shadow normal bias (prevents shadow peter-panning) */
  shadowNormalBias: number;
}

// ── Ambient ───────────────────────────────────────────────────────────────────

export interface AmbientConfig {
  /** Fill light intensity */
  intensity: number;
  /** Fill light color */
  color: string;
}

// ── Hemisphere ────────────────────────────────────────────────────────────────

export interface HemisphereConfig {
  /** Sky hemisphere color */
  skyColor: string;
  /** Ground hemisphere color */
  groundColor: string;
  /** Hemisphere light intensity */
  intensity: number;
}

// ── Fog ───────────────────────────────────────────────────────────────────────

export type FogType = 'none' | 'linear' | 'exponential';

export interface FogConfig {
  /** Fog implementation type */
  type: FogType;
  /** Fog color (should match sky horizon color) */
  color: string;
  /** Density for exponential fog (0 = none, 0.02 = moderate) */
  density: number;
  /** Near distance for linear fog */
  near: number;
  /** Far distance for linear fog */
  far: number;
}

// ── Environment Map ───────────────────────────────────────────────────────────

export interface EnvironmentMapConfig {
  /** Path to HDR/EXR file, or null to use Drei preset */
  hdriUrl: string | null;
  /** Drei built-in preset to use when hdriUrl is null */
  preset:
    | 'city'
    | 'dawn'
    | 'night'
    | 'sunset'
    | 'forest'
    | 'studio'
    | 'apartment'
    | 'park'
    | 'lobby'
    | 'warehouse';
  /** Environment map intensity on scene materials */
  intensity: number;
  /** Whether the environment map is also visible as background */
  background: boolean;
}

// ── Lighting State ────────────────────────────────────────────────────────────

export interface LightingState {
  sun: SunConfig;
  ambient: AmbientConfig;
  hemisphere: HemisphereConfig;
  fog: FogConfig;
  environment: EnvironmentMapConfig;
}

// ── Presets ───────────────────────────────────────────────────────────────────

/** Default noon lighting — clear day, full sun */
export const LIGHTING_PRESET_NOON: LightingState = {
  sun: {
    intensity: 3.5,
    color: '#fff4e0',
    position: { x: 50, y: 100, z: 30 },
    shadowNear: 0.5,
    shadowFar: 500,
    shadowRadius: 150,
    shadowBias: -0.0001,
    shadowNormalBias: 0.02,
  },
  ambient: {
    intensity: 0.3,
    color: '#d4e8ff',
  },
  hemisphere: {
    skyColor: '#87ceeb',
    groundColor: '#3a2a1a',
    intensity: 0.6,
  },
  fog: {
    type: 'exponential',
    color: '#b0c8e0',
    density: 0.003,
    near: 10,
    far: 800,
  },
  environment: {
    hdriUrl: null,
    preset: 'city',
    intensity: 1.0,
    background: false,
  },
};

/** Night lighting preset */
export const LIGHTING_PRESET_NIGHT: LightingState = {
  sun: {
    intensity: 0.1,
    color: '#c0d0ff',
    position: { x: -50, y: 20, z: -30 },
    shadowNear: 0.5,
    shadowFar: 300,
    shadowRadius: 100,
    shadowBias: -0.0001,
    shadowNormalBias: 0.02,
  },
  ambient: {
    intensity: 0.05,
    color: '#101030',
  },
  hemisphere: {
    skyColor: '#0a0a20',
    groundColor: '#050510',
    intensity: 0.2,
  },
  fog: {
    type: 'exponential',
    color: '#050508',
    density: 0.005,
    near: 5,
    far: 400,
  },
  environment: {
    hdriUrl: null,
    preset: 'night',
    intensity: 0.4,
    background: false,
  },
};
