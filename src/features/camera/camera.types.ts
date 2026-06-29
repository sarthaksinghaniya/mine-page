/**
 * @file src/features/camera/camera.types.ts
 * @description Type definitions for the camera system.
 *
 * The camera system uses a strategy pattern — CameraController delegates
 * to the active mode component. All mode components share this type contract.
 */

import type * as THREE from 'three';

// ── Camera Modes ──────────────────────────────────────────────────────────────

/**
 * Active camera behaviour mode:
 * - `follow`    : Smooth damp following a target entity
 * - `orbit`     : Drei OrbitControls (for exploration / debug)
 * - `cinematic` : GSAP timeline-driven path animation
 * - `free`      : WASD + mouse delta FPS-style camera
 */
export type CameraMode = 'follow' | 'orbit' | 'cinematic' | 'free';

// ── Shake ─────────────────────────────────────────────────────────────────────

/** A single camera shake impulse added to the active shake stack */
export interface ShakeImpulse {
  /** Unique ID for tracking */
  id:        string;
  /** Peak displacement amplitude (world units) */
  intensity: number;
  /** Decay rate: higher = faster decay. Typical: 4–10 */
  decay:     number;
  /** Remaining intensity budget (mutated each frame) */
  remaining: number;
}

// ── Transitions ───────────────────────────────────────────────────────────────

export type TransitionEasing = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'spring';

export interface CameraTransitionTarget {
  position: THREE.Vector3Like;
  lookAt:   THREE.Vector3Like;
  fov?:     number;
}

export interface CameraTransition {
  from:     CameraTransitionTarget;
  to:       CameraTransitionTarget;
  duration: number;    // seconds
  elapsed:  number;    // seconds (mutated each frame)
  easing:   TransitionEasing;
  onComplete?: () => void;
}

// ── Cinematic Timeline ────────────────────────────────────────────────────────

export interface CinematicKeyframe {
  /** Time in seconds from start of this clip */
  time:     number;
  position: THREE.Vector3Like;
  lookAt:   THREE.Vector3Like;
  fov?:     number;
}

export interface CinematicTimeline {
  id:         string;
  duration:   number;
  keyframes:  CinematicKeyframe[];
  loop:       boolean;
}

// ── Follow Config ─────────────────────────────────────────────────────────────

export interface FollowConfig {
  /** Position offset from target (in target's local space) */
  offset:      THREE.Vector3Like;
  /** Damp lambda for position (higher = faster snap) */
  positionLag: number;
  /** Damp lambda for look-at direction */
  rotationLag: number;
  /** Minimum distance to maintain from target */
  minDistance: number;
  /** Maximum distance from target */
  maxDistance: number;
}

export const DEFAULT_FOLLOW_CONFIG: FollowConfig = {
  offset:      { x: 0, y: 4, z: -8 },
  positionLag: 6,
  rotationLag: 8,
  minDistance: 2,
  maxDistance: 20,
};

// ── Camera State ──────────────────────────────────────────────────────────────

export interface CameraState {
  /** Active camera behaviour mode */
  mode:           CameraMode;
  /** ECS entity ID to follow (used in `follow` mode) */
  targetEntityId: string | null;
  /** Current field of view in degrees */
  fov:            number;
  /** Zoom multiplier (applied on top of FOV) */
  zoom:           number;
  /** Active shake impulses */
  shakes:         ShakeImpulse[];
  /** In-progress transition, or null */
  transition:     CameraTransition | null;
  /** Current follow configuration */
  followConfig:   FollowConfig;
  /** Current cinematic timeline, or null */
  cinematic:      CinematicTimeline | null;
  /** Whether the camera is currently in a cutscene (disables player input) */
  isCutscene:     boolean;
}
