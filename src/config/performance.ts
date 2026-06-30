/**
 * @file src/config/performance.ts
 * @description Runtime GPU performance tier detection and LOD configuration.
 *
 * Detects the user's GPU capability at startup and maps it to a performance
 * profile that controls:
 *  - Shadow map resolution
 *  - LOD distances
 *  - Particle budgets
 *  - Post-processing quality
 *  - Physics substep count
 *
 * All renderer setup and world systems READ from this config — they never
 * make their own quality decisions.
 */

import { env, type PerformanceTier } from './env';

// ── Performance Profile ───────────────────────────────────────────────────────

export interface PerformanceProfile {
  /** Resolved tier after GPU detection */
  readonly tier: Exclude<PerformanceTier, 'auto'>;

  /** Three.js renderer pixel ratio cap */
  readonly pixelRatio: number;

  /** Shadow map resolution (power of 2) */
  readonly shadowMapSize: 512 | 1024 | 2048 | 4096;

  /** Whether soft shadows (PCFSoft) are enabled */
  readonly softShadows: boolean;

  /** Max simultaneous shadow-casting lights */
  readonly maxShadowLights: number;

  /** LOD distances [near, mid, far] in world units */
  readonly lodDistances: [number, number, number];

  /** Max active particle emitters */
  readonly maxParticleEmitters: number;

  /** Max particle count across all emitters */
  readonly particleBudget: number;

  /** Rapier physics substep count per frame */
  readonly physicsSubsteps: number;

  /** Enable post-processing pipeline */
  readonly postProcessing: boolean;

  /** Enable SSAO */
  readonly ssao: boolean;

  /** Enable bloom */
  readonly bloom: boolean;

  /** Enable depth of field */
  readonly depthOfField: boolean;

  /** Number of simultaneously loaded world zones */
  readonly maxActiveZones: number;
}

// ── Profile Presets ───────────────────────────────────────────────────────────

const PROFILES: Record<Exclude<PerformanceTier, 'auto'>, PerformanceProfile> = {
  low: {
    tier: 'low',
    pixelRatio: 1,
    shadowMapSize: 512,
    softShadows: false,
    maxShadowLights: 1,
    lodDistances: [20, 60, 120],
    maxParticleEmitters: 4,
    particleBudget: 500,
    physicsSubsteps: 1,
    postProcessing: false,
    ssao: false,
    bloom: false,
    depthOfField: false,
    maxActiveZones: 2,
  },
  medium: {
    tier: 'medium',
    pixelRatio: Math.min(window.devicePixelRatio, 1.5),
    shadowMapSize: 1024,
    softShadows: true,
    maxShadowLights: 2,
    lodDistances: [40, 100, 200],
    maxParticleEmitters: 12,
    particleBudget: 2000,
    physicsSubsteps: 2,
    postProcessing: true,
    ssao: false,
    bloom: true,
    depthOfField: false,
    maxActiveZones: 4,
  },
  high: {
    tier: 'high',
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    shadowMapSize: 2048,
    softShadows: true,
    maxShadowLights: 4,
    lodDistances: [80, 180, 400],
    maxParticleEmitters: 32,
    particleBudget: 8000,
    physicsSubsteps: 4,
    postProcessing: true,
    ssao: true,
    bloom: true,
    depthOfField: true,
    maxActiveZones: 8,
  },
};

// ── GPU Tier Detection ────────────────────────────────────────────────────────

/**
 * Heuristically detects the GPU performance tier.
 * Uses WebGL renderer info when available, falling back to devicePixelRatio
 * and hardware concurrency as secondary signals.
 *
 * @returns 'low' | 'medium' | 'high'
 */
function detectGpuTier(): Exclude<PerformanceTier, 'auto'> {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return 'low';

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
      const rendererLower = renderer.toLowerCase();

      // Integrated / software renderers → low
      if (
        rendererLower.includes('intel') ||
        rendererLower.includes('mesa') ||
        rendererLower.includes('llvm') ||
        rendererLower.includes('software')
      ) {
        return 'low';
      }

      // High-end discrete → high
      if (
        rendererLower.includes('rtx') ||
        rendererLower.includes('rx 6') ||
        rendererLower.includes('rx 7') ||
        rendererLower.includes('m1') ||
        rendererLower.includes('m2') ||
        rendererLower.includes('m3') ||
        rendererLower.includes('m4')
      ) {
        return 'high';
      }

      // Everything else (GTX, older AMD, etc.) → medium
      return 'medium';
    }
  } catch {
    // Silently fall through to heuristic fallback
  }

  // Fallback: use core count as signal
  const cores = navigator.hardwareConcurrency ?? 2;
  if (cores <= 2) return 'low';
  if (cores <= 6) return 'medium';
  return 'high';
}

// ── Resolved Profile (singleton) ─────────────────────────────────────────────

function resolveProfile(): PerformanceProfile {
  const configured = env.performanceTier;
  const tier =
    configured === 'auto' ? detectGpuTier() : (configured);

  return PROFILES[tier];
}

/**
 * The active performance profile for this session.
 * Resolved once at startup and immutable thereafter.
 */
export const performanceProfile: PerformanceProfile = resolveProfile();
