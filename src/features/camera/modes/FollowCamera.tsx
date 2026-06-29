/**
 * @file src/features/camera/modes/FollowCamera.tsx
 * @description Smooth follow camera mode.
 *
 * Follows a target entity using exponential damping (framerate-independent).
 * Position and look-at are computed each frame from the target's position
 * and the follow config offset.
 *
 * ARCHITECTURE NOTE: This component reads the target from world state.
 * It does NOT hold state — it reads refs and mutates the camera imperatively.
 */

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { damp } from '@shared/utils/math';
import { useCameraStore } from '../camera.store';
import { useCameraShake } from '../hooks/useCameraShake';

// ── Scratch objects — allocated once, reused every frame ──────────────────────
const _targetPos    = new THREE.Vector3();
const _desiredPos   = new THREE.Vector3();
const _currentPos   = new THREE.Vector3();
const _lookAtTarget = new THREE.Vector3();
const _offsetWorld  = new THREE.Vector3();

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Follow Camera — renders null, drives camera via useFrame.
 * Mount inside Canvas as a child of CameraController.
 */
export function FollowCamera(): null {
  const { camera } = useThree();
  const { applyShake } = useCameraShake();
  const followConfig = useCameraStore((s) => s.followConfig);

  // Current smoothed position and look-at (initialized from camera)
  const smoothedPos    = useRef(camera.position.clone());
  const smoothedLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    // ── Resolve target position ────────────────────────────────────────────────
    // In the future, this reads from the player/entity ECS position.
    // For now: follow origin as placeholder.
    _targetPos.set(0, 0, 0);

    // ── Compute desired camera position ───────────────────────────────────────
    const { offset, positionLag, rotationLag } = followConfig;
    _offsetWorld.set(offset.x, offset.y, offset.z);
    _desiredPos.copy(_targetPos).add(_offsetWorld);

    // ── Smooth position with damp (framerate-independent) ─────────────────────
    _currentPos.copy(smoothedPos.current);
    _currentPos.x = damp(_currentPos.x, _desiredPos.x, positionLag, delta);
    _currentPos.y = damp(_currentPos.y, _desiredPos.y, positionLag, delta);
    _currentPos.z = damp(_currentPos.z, _desiredPos.z, positionLag, delta);
    smoothedPos.current.copy(_currentPos);

    // ── Smooth look-at ────────────────────────────────────────────────────────
    _lookAtTarget.x = damp(smoothedLookAt.current.x, _targetPos.x, rotationLag, delta);
    _lookAtTarget.y = damp(smoothedLookAt.current.y, _targetPos.y + 1, rotationLag, delta);
    _lookAtTarget.z = damp(smoothedLookAt.current.z, _targetPos.z, rotationLag, delta);
    smoothedLookAt.current.copy(_lookAtTarget);

    // ── Apply camera shake ────────────────────────────────────────────────────
    applyShake(_currentPos, delta);

    // ── Write to camera ───────────────────────────────────────────────────────
    camera.position.copy(_currentPos);
    camera.lookAt(_lookAtTarget);
  });

  return null;
}
