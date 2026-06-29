/**
 * @file src/features/lighting/lighting.store.ts
 * @description Zustand store for the lighting system.
 *
 * Initially seeded with the noon preset. In a future integration,
 * the DayNightSystem will mutate this store each frame to drive
 * smooth transitions between lighting states.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  LightingState,
  SunConfig,
  AmbientConfig,
  HemisphereConfig,
  FogConfig,
  EnvironmentMapConfig,
} from './lighting.types';
import { LIGHTING_PRESET_NOON } from './lighting.types';

interface LightingActions {
  /** Partially update sun configuration */
  setSun:         (config: Partial<SunConfig>) => void;
  /** Partially update ambient configuration */
  setAmbient:     (config: Partial<AmbientConfig>) => void;
  /** Partially update hemisphere configuration */
  setHemisphere:  (config: Partial<HemisphereConfig>) => void;
  /** Partially update fog configuration */
  setFog:         (config: Partial<FogConfig>) => void;
  /** Partially update environment map configuration */
  setEnvironment: (config: Partial<EnvironmentMapConfig>) => void;
  /** Apply a full lighting preset instantly (for day/night transitions) */
  applyPreset:    (preset: LightingState) => void;
  /**
   * Interpolate toward a target preset (for smooth day/night blending).
   * @param target - Target lighting state
   * @param t      - Blend factor [0, 1]
   */
  blendToward:    (target: LightingState, t: number) => void;
}

type LightingStore = LightingState & LightingActions;

export const useLightingStore = create<LightingStore>()(
  subscribeWithSelector((set, get) => ({
    // ── Initial State — noon preset ────────────────────────────────────────────
    ...LIGHTING_PRESET_NOON,

    // ── Actions ────────────────────────────────────────────────────────────────
    setSun:        (config) => set((s) => ({ sun:         { ...s.sun,         ...config } })),
    setAmbient:    (config) => set((s) => ({ ambient:     { ...s.ambient,     ...config } })),
    setHemisphere: (config) => set((s) => ({ hemisphere:  { ...s.hemisphere,  ...config } })),
    setFog:        (config) => set((s) => ({ fog:         { ...s.fog,         ...config } })),
    setEnvironment:(config) => set((s) => ({ environment: { ...s.environment, ...config } })),

    applyPreset: (preset) =>
      set({
        sun:         preset.sun,
        ambient:     preset.ambient,
        hemisphere:  preset.hemisphere,
        fog:         preset.fog,
        environment: preset.environment,
      }),

    blendToward: (target, t) => {
      const current = get();
      const lerp = (a: number, b: number) => a + (b - a) * t;
      const lerpColor = (a: string, b: string): string => {
        // Simple hex color lerp via canvas-free approach
        const parse = (hex: string): [number, number, number] => {
          const n = parseInt(hex.replace('#', ''), 16);
          return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
        };
        const toHex = (r: number, g: number, b: number): string =>
          `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
        const [ar, ag, ab] = parse(a);
        const [br, bg, bb] = parse(b);
        return toHex(lerp(ar, br), lerp(ag, bg), lerp(ab, bb));
      };

      set({
        sun: {
          ...current.sun,
          intensity: lerp(current.sun.intensity, target.sun.intensity),
          color:     lerpColor(current.sun.color, target.sun.color),
          position: {
            x: lerp(current.sun.position.x, target.sun.position.x),
            y: lerp(current.sun.position.y, target.sun.position.y),
            z: lerp(current.sun.position.z, target.sun.position.z),
          },
        },
        ambient: {
          intensity: lerp(current.ambient.intensity, target.ambient.intensity),
          color:     lerpColor(current.ambient.color, target.ambient.color),
        },
        hemisphere: {
          skyColor:    lerpColor(current.hemisphere.skyColor,    target.hemisphere.skyColor),
          groundColor: lerpColor(current.hemisphere.groundColor, target.hemisphere.groundColor),
          intensity:   lerp(current.hemisphere.intensity, target.hemisphere.intensity),
        },
        fog: {
          ...current.fog,
          color:   lerpColor(current.fog.color, target.fog.color),
          density: lerp(current.fog.density, target.fog.density),
        },
      });
    },
  })),
);
