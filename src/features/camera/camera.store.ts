/**
 * @file src/features/camera/camera.store.ts
 * @description Zustand store for the camera system.
 *
 * Provides the imperative API for transitioning between modes,
 * triggering shakes, and managing cinematic timelines.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { generateUUID } from '@shared/utils/uuid';
import * as THREE from 'three';
import type {
  CameraState,
  CameraMode,
  ShakeImpulse,
  CameraTransition,
  CameraTransitionTarget,
  TransitionEasing,
  CinematicTimeline,
  FollowConfig,
} from './camera.types';
import { DEFAULT_FOLLOW_CONFIG } from './camera.types';

// ── Actions ───────────────────────────────────────────────────────────────────

interface CameraActions {
  /** Switch to a new camera mode instantly */
  setMode: (mode: CameraMode) => void;

  /** Set the entity ID for the follow camera to track */
  setTarget: (entityId: string | null) => void;

  /**
   * Trigger a camera transition to a new position/look-at.
   * Transitions blend smoothly over `duration` seconds.
   */
  transitionTo: (
    to:       CameraTransitionTarget,
    from:     CameraTransitionTarget,
    duration: number,
    easing?:  TransitionEasing,
    onComplete?: () => void,
  ) => void;

  /** Clear any active transition */
  clearTransition: () => void;

  /** Advance transition elapsed time (called by CameraController each frame) */
  tickTransition: (delta: number) => void;

  /**
   * Add a camera shake impulse.
   * Multiple impulses are summed additively.
   */
  addShake: (intensity: number, decay?: number) => void;

  /** Remove a specific shake impulse by ID */
  removeShake: (id: string) => void;

  /** Decay all active shake impulses (called each frame) */
  tickShakes: (delta: number) => void;

  /** Update follow config */
  setFollowConfig: (config: Partial<FollowConfig>) => void;

  /** Play a cinematic timeline */
  playCinematic: (timeline: CinematicTimeline) => void;

  /** Stop the current cinematic */
  stopCinematic: () => void;

  /** Set field of view */
  setFov: (fov: number) => void;

  /** Set zoom level */
  setZoom: (zoom: number) => void;
}

type CameraStore = CameraState & CameraActions;

// ── Easing Functions ──────────────────────────────────────────────────────────

export function applyEasing(t: number, easing: TransitionEasing): number {
  const c = Math.max(0, Math.min(1, t));
  switch (easing) {
    case 'linear':     return c;
    case 'easeIn':     return c * c;
    case 'easeOut':    return c * (2 - c);
    case 'easeInOut':  return c < 0.5 ? 2 * c * c : -1 + (4 - 2 * c) * c;
    case 'spring': {
      // Exponential spring: overshoots slightly then settles
      const overshoot = 1.70158;
      return c === 1 ? 1 : (c * c * ((overshoot + 1) * c - overshoot));
    }
  }
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useCameraStore = create<CameraStore>()(
  subscribeWithSelector((set, get) => ({
    // ── Initial State ──────────────────────────────────────────────────────────
    mode:           'follow',
    targetEntityId: null,
    fov:            75,
    zoom:           1,
    shakes:         [],
    transition:     null,
    followConfig:   DEFAULT_FOLLOW_CONFIG,
    cinematic:      null,
    isCutscene:     false,

    // ── Actions ────────────────────────────────────────────────────────────────
    setMode: (mode) => set({ mode }),
    setTarget: (targetEntityId) => set({ targetEntityId }),

    transitionTo: (to, from, duration, easing = 'easeInOut', onComplete) => {
      const transition: CameraTransition = {
        from,
        to,
        duration,
        elapsed: 0,
        easing,
        onComplete,
      };
      set({ transition });
    },

    clearTransition: () => set({ transition: null }),

    tickTransition: (delta) => {
      const { transition } = get();
      if (!transition) return;
      const elapsed = transition.elapsed + delta;
      if (elapsed >= transition.duration) {
        transition.onComplete?.();
        set({ transition: null });
      } else {
        set({ transition: { ...transition, elapsed } });
      }
    },

    addShake: (intensity, decay = 6) => {
      const impulse: ShakeImpulse = {
        id:        generateUUID(),
        intensity,
        decay,
        remaining: intensity,
      };
      set((s) => ({ shakes: [...s.shakes, impulse] }));
    },

    removeShake: (id) =>
      set((s) => ({ shakes: s.shakes.filter((sh) => sh.id !== id) })),

    tickShakes: (delta) => {
      const { shakes } = get();
      if (shakes.length === 0) return;

      const updated = shakes
        .map((sh) => ({ ...sh, remaining: sh.remaining * Math.exp(-sh.decay * delta) }))
        .filter((sh) => sh.remaining > 0.001);

      set({ shakes: updated });
    },

    setFollowConfig: (config) =>
      set((s) => ({ followConfig: { ...s.followConfig, ...config } })),

    playCinematic: (timeline) =>
      set({ cinematic: timeline, mode: 'cinematic', isCutscene: true }),

    stopCinematic: () =>
      set({ cinematic: null, mode: 'follow', isCutscene: false }),

    setFov:  (fov)  => set({ fov }),
    setZoom: (zoom) => set({ zoom }),
  })),
);

// ── Imperative shake helper (for use outside React components) ────────────────

/**
 * Trigger a camera shake from any system, without accessing the store hook.
 * @param intensity - Peak displacement amplitude
 * @param decay     - Decay rate (default: 6)
 */
export function triggerCameraShake(intensity: number, decay = 6): void {
  useCameraStore.getState().addShake(intensity, decay);
}

// ── Computed selectors ────────────────────────────────────────────────────────

/** Sum of all shake impulse remaining amplitudes */
export function getTotalShakeAmplitude(): number {
  return useCameraStore.getState().shakes.reduce((sum, s) => sum + s.remaining, 0);
}

/** Current transition progress [0, 1], or 1 if no transition active */
export function getTransitionProgress(): number {
  const { transition } = useCameraStore.getState();
  if (!transition) return 1;
  return Math.min(transition.elapsed / transition.duration, 1);
}

// ── Scratch vectors (reused each frame, never reallocated) ────────────────────
export const _scratchVec3A = new THREE.Vector3();
export const _scratchVec3B = new THREE.Vector3();
export const _scratchVec3C = new THREE.Vector3();
