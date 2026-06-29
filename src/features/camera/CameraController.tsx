/**
 * @file src/features/camera/CameraController.tsx
 * @description Root camera controller — delegates to active mode component.
 *
 * This is the single camera-related component mounted inside the Canvas.
 * It:
 *  1. Reads the active mode from camera.store
 *  2. Mounts the corresponding mode component
 *  3. Handles transition interpolation between modes
 *  4. Applies FOV changes via useFrame
 *
 * DESIGN: Mode components are lazy-loaded to keep the initial bundle lean.
 * Each mode is only mounted when it is the active mode.
 */

import { Suspense, lazy, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { damp } from '@shared/utils/math';
import { useCameraStore, applyEasing, getTransitionProgress } from './camera.store';

// ── Lazy mode components ──────────────────────────────────────────────────────
const FollowCamera    = lazy(() => import('./modes/FollowCamera').then((m) => ({ default: m.FollowCamera })));
const OrbitCamera     = lazy(() => import('./modes/OrbitCamera').then((m) => ({ default: m.OrbitCamera })));
const CinematicCamera = lazy(() => import('./modes/CinematicCamera').then((m) => ({ default: m.CinematicCamera })));
const FreeCamera      = lazy(() => import('./modes/FreeCamera').then((m) => ({ default: m.FreeCamera })));

// ── FOV smoothing ─────────────────────────────────────────────────────────────

const FOV_DAMP = 6; // Lambda for FOV damping

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Root camera component. Mount once inside the R3F Canvas.
 *
 * @example
 * ```tsx
 * <Canvas>
 *   <CameraController />
 * </Canvas>
 * ```
 */
export function CameraController(): React.ReactElement {
  const { camera } = useThree();
  const mode             = useCameraStore((s) => s.mode);
  const targetFov        = useCameraStore((s) => s.fov);
  const zoom             = useCameraStore((s) => s.zoom);
  const transition       = useCameraStore((s) => s.transition);
  const tickTransition   = useCameraStore((s) => s.tickTransition);

  const currentFovRef = useRef(targetFov);

  // ── Per-frame: FOV damping + transition interpolation ─────────────────────
  useFrame((_, delta) => {
    // Smooth FOV changes
    if (camera instanceof THREE.PerspectiveCamera) {
      const effectiveFov = targetFov / zoom;
      currentFovRef.current = damp(currentFovRef.current, effectiveFov, FOV_DAMP, delta);
      if (Math.abs(camera.fov - currentFovRef.current) > 0.01) {
        camera.fov = currentFovRef.current;
        camera.updateProjectionMatrix();
      }
    }

    // Advance transition
    if (transition) {
      tickTransition(delta);
      const progress = getTransitionProgress();
      const easedT   = applyEasing(progress, transition.easing);

      // Interpolate between transition from/to positions
      camera.position.lerpVectors(
        new THREE.Vector3(transition.from.position.x, transition.from.position.y, transition.from.position.z),
        new THREE.Vector3(transition.to.position.x,   transition.to.position.y,   transition.to.position.z),
        easedT,
      );

      const lookAt = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(transition.from.lookAt.x, transition.from.lookAt.y, transition.from.lookAt.z),
        new THREE.Vector3(transition.to.lookAt.x,   transition.to.lookAt.y,   transition.to.lookAt.z),
        easedT,
      );
      camera.lookAt(lookAt);
    }
  });

  // ── Render active mode ────────────────────────────────────────────────────
  // During a transition, the mode component is suspended (no user input).
  const modeActive = !transition;

  return (
    <Suspense fallback={null}>
      {modeActive && mode === 'follow'    && <FollowCamera />}
      {modeActive && mode === 'orbit'     && <OrbitCamera />}
      {modeActive && mode === 'cinematic' && <CinematicCamera />}
      {modeActive && mode === 'free'      && <FreeCamera />}
    </Suspense>
  );
}
