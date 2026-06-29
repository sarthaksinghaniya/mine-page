/**
 * @file src/features/camera/modes/CinematicCamera.tsx
 * @description GSAP timeline-driven cinematic camera mode.
 *
 * Plays a `CinematicTimeline` — a sequence of keyframes with position,
 * look-at, and optional FOV — driven by GSAP's ticker for
 * precise, eased animation.
 *
 * DESIGN: The timeline progresses via `useFrame`, not GSAP's own tick,
 * to keep it synchronized with the game loop's time scale.
 */

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useCameraStore } from '../camera.store';
import type { CinematicKeyframe } from '../camera.types';

// ── Scratch ───────────────────────────────────────────────────────────────────
const _pos    = new THREE.Vector3();
const _lookAt = new THREE.Vector3();

// ── Helpers ───────────────────────────────────────────────────────────────────

function interpolateKeyframes(
  keyframes:  CinematicKeyframe[],
  elapsed:    number,
  duration:   number,
): { position: THREE.Vector3; lookAt: THREE.Vector3; fov: number } {
  const t = Math.min(elapsed / duration, 1);

  // Find surrounding keyframes
  let fromKf = keyframes[0];
  let toKf   = keyframes[keyframes.length - 1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    const a = keyframes[i];
    const b = keyframes[i + 1];
    if (!a || !b) continue;
    const kfT = a.time / duration;
    const kfTNext = b.time / duration;
    if (t >= kfT && t <= kfTNext) {
      fromKf = a;
      toKf   = b;
      break;
    }
  }

  // Local t between the two keyframes
  const segDuration = toKf.time - fromKf.time;
  const localT = segDuration > 0
    ? Math.max(0, Math.min(1, (elapsed - fromKf.time) / segDuration))
    : 1;

  // GSAP ease interpolation
  const easedT = gsap.parseEase('power2.inOut')(localT);

  _pos.lerpVectors(
    new THREE.Vector3(fromKf.position.x, fromKf.position.y, fromKf.position.z),
    new THREE.Vector3(toKf.position.x, toKf.position.y, toKf.position.z),
    easedT,
  );

  _lookAt.lerpVectors(
    new THREE.Vector3(fromKf.lookAt.x, fromKf.lookAt.y, fromKf.lookAt.z),
    new THREE.Vector3(toKf.lookAt.x, toKf.lookAt.y, toKf.lookAt.z),
    easedT,
  );

  const fov = THREE.MathUtils.lerp(
    fromKf.fov ?? 75,
    toKf.fov ?? 75,
    easedT,
  );

  return { position: _pos, lookAt: _lookAt, fov };
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CinematicCamera(): null {
  const { camera } = useThree();
  const cinematic   = useCameraStore((s) => s.cinematic);
  const stopCinematic = useCameraStore((s) => s.stopCinematic);

  const elapsedRef = useRef(0);

  // Reset elapsed when a new timeline starts
  useEffect(() => {
    elapsedRef.current = 0;
  }, [cinematic?.id]);

  useFrame((_, delta) => {
    if (!cinematic || cinematic.keyframes.length < 2) return;

    elapsedRef.current += delta;

    if (elapsedRef.current >= cinematic.duration) {
      if (cinematic.loop) {
        elapsedRef.current = elapsedRef.current % cinematic.duration;
      } else {
        stopCinematic();
        return;
      }
    }

    const { position, lookAt, fov } = interpolateKeyframes(
      cinematic.keyframes,
      elapsedRef.current,
      cinematic.duration,
    );

    camera.position.copy(position);
    camera.lookAt(lookAt);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
