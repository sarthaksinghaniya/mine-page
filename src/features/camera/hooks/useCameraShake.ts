/**
 * @file src/features/camera/hooks/useCameraShake.ts
 * @description Hook for applying camera shake to a Three.js Object3D each frame.
 *
 * Generates Gaussian-distributed noise scaled by total shake amplitude.
 * Called from inside CameraController's useFrame — not a standalone hook.
 *
 * @returns A `applyShake(target)` function to call each frame.
 */

import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useCameraStore } from '../camera.store';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ShakeApplicator {
  /** Apply accumulated shake offset to a camera position ref */
  applyShake: (positionRef: THREE.Vector3, delta: number) => void;
}

// ── Gaussian noise helper (Box-Muller transform) ──────────────────────────────

function gaussianRandom(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// ── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns a stable `applyShake` function.
 * Must be called from a component inside a R3F Canvas.
 */
export function useCameraShake(): ShakeApplicator {
  const offsetRef = useRef(new THREE.Vector3());
  const tickShakes = useCameraStore((s) => s.tickShakes);
  const shakes = useCameraStore((s) => s.shakes);

  const applyShake = useCallback(
    (position: THREE.Vector3, delta: number): void => {
      // Decay all impulses
      tickShakes(delta);

      // Compute total amplitude
      const totalAmplitude = shakes.reduce((sum, s) => sum + s.remaining, 0);

      if (totalAmplitude < 0.001) {
        offsetRef.current.set(0, 0, 0);
        return;
      }

      // Generate Gaussian noise in all three axes
      offsetRef.current.set(
        gaussianRandom() * totalAmplitude,
        gaussianRandom() * totalAmplitude,
        gaussianRandom() * totalAmplitude,
      );

      // Apply offset additively
      position.add(offsetRef.current);
    },
    [tickShakes, shakes],
  );

  return { applyShake };
}
