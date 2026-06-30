/**
 * @file src/shared/utils/math.ts
 * @description Math utility functions for 3D world calculations.
 * All functions are pure and stateless.
 */

import type * as THREE from 'three';

// ── Interpolation ─────────────────────────────────────────────────────────────

/**
 * Linear interpolation between two values.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Smooth-step interpolation (ease in/out).
 */
export function smoothstep(a: number, b: number, t: number): number {
  const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
}

/**
 * Damp towards a target value using exponential decay.
 * Framerate-independent alternative to lerp.
 * @param current  - Current value
 * @param target   - Target value
 * @param lambda   - Decay rate (higher = faster, typical: 4–12)
 * @param delta    - Frame delta time in seconds
 */
export function damp(current: number, target: number, lambda: number, delta: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * delta));
}

// ── Range ─────────────────────────────────────────────────────────────────────

/**
 * Clamps a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Maps a value from one range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

// ── Angles ────────────────────────────────────────────────────────────────────

export function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function radToDeg(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Wraps an angle to the range [-PI, PI].
 */
export function wrapAngle(angle: number): number {
  return ((angle + Math.PI) % (2 * Math.PI)) - Math.PI;
}

// ── Distance ──────────────────────────────────────────────────────────────────

/**
 * 2D horizontal distance between two Vector3-like objects (ignores Y).
 */
export function distanceXZ(a: { x: number; z: number }, b: { x: number; z: number }): number {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  return Math.sqrt(dx * dx + dz * dz);
}

/**
 * Full 3D distance between two Vector3s.
 */
export function distance3D(a: THREE.Vector3, b: THREE.Vector3): number {
  return a.distanceTo(b);
}

// ── Random ────────────────────────────────────────────────────────────────────

/**
 * Returns a random float in [min, max).
 */
export function randomFloat(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * Returns a random integer in [min, max].
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min + 1));
}

// ── Conversion ────────────────────────────────────────────────────────────────

/**
 * Converts a normalized time-of-day (0–1) to a sun elevation angle in radians.
 * 0 = midnight (sun below horizon), 0.5 = noon (sun at peak).
 */
export function timeOfDayToSunAngle(normalizedTime: number): number {
  // Map [0, 1] to [-PI, PI] so noon (0.5) gives PI/2 elevation
  return (normalizedTime * 2 - 1) * Math.PI;
}
