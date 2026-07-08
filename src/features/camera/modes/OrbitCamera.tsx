/**
 * @file src/features/camera/modes/OrbitCamera.tsx
 * @description Orbit camera mode using Drei's OrbitControls.
 *
 * Used for:
 * - Debug exploration
 * - Future: building inspection mode
 * - Future: cinematic overview
 *
 * OrbitControls takes over the camera completely while active.
 * Deactivating this mode restores camera to the previous mode's control.
 */

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

// ── Config ────────────────────────────────────────────────────────────────────

/** Orbit camera configuration constants */
const ORBIT_CONFIG = {
  minDistance: 2,
  maxDistance: 50,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI * 0.85, // Prevent going below ground
  dampingFactor: 0.08,
  rotateSpeed: 0.8,
  zoomSpeed: 1.2,
  panSpeed: 0.8,
  enablePan: true,
  enableZoom: true,
  enableRotate: true,
} as const;

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Orbit Camera mode — wraps Drei OrbitControls.
 * Mount inside Canvas as a child of CameraController.
 */
export function OrbitCamera(): React.ReactElement {
  useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Focus on origin when orbit mode activates
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 1, 0);
      controlsRef.current.update();
    }
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={ORBIT_CONFIG.dampingFactor}
      minDistance={ORBIT_CONFIG.minDistance}
      maxDistance={ORBIT_CONFIG.maxDistance}
      minPolarAngle={ORBIT_CONFIG.minPolarAngle}
      maxPolarAngle={ORBIT_CONFIG.maxPolarAngle}
      rotateSpeed={ORBIT_CONFIG.rotateSpeed}
      zoomSpeed={ORBIT_CONFIG.zoomSpeed}
      panSpeed={ORBIT_CONFIG.panSpeed}
      enablePan={ORBIT_CONFIG.enablePan}
      enableZoom={ORBIT_CONFIG.enableZoom}
    />
  );
}
