/**
 * @file src/features/camera/modes/FreeCamera.tsx
 * @description Free-fly camera mode (FPS-style).
 *
 * Controls:
 *   WASD / Arrow keys — movement
 *   Mouse (pointer locked) — look
 *   Q/E — up/down
 *   Shift — speed boost
 *
 * Requires pointer lock to be active for mouse look.
 * Falls back to keyboard-only when pointer is not locked.
 */

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── Constants ─────────────────────────────────────────────────────────────────

const FREE_CAM_SPEED = 15; // world units per second
const FREE_CAM_BOOST_MULT = 3; // speed multiplier when Shift held
const FREE_CAM_MOUSE_SENS = 0.002; // radians per pixel
const FREE_CAM_VERTICAL_CLAMP = Math.PI * 0.48; // ~86 degrees up/down

// ── Component ─────────────────────────────────────────────────────────────────

export function FreeCamera(): null {
  const { camera, gl } = useThree();

  // Euler for yaw/pitch — avoids gimbal lock of Euler XYZ order issues
  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const keysRef = useRef(new Set<string>());
  const lockedRef = useRef(false);

  // ── Event listeners ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      keysRef.current.add(e.code);
    };
    const onKeyUp = (e: KeyboardEvent): void => {
      keysRef.current.delete(e.code);
    };

    const onMouseMove = (e: MouseEvent): void => {
      if (!lockedRef.current) return;
      yawRef.current -= e.movementX * FREE_CAM_MOUSE_SENS;
      pitchRef.current -= e.movementY * FREE_CAM_MOUSE_SENS;
      pitchRef.current = THREE.MathUtils.clamp(
        pitchRef.current,
        -FREE_CAM_VERTICAL_CLAMP,
        FREE_CAM_VERTICAL_CLAMP,
      );
    };

    const onPointerLockChange = (): void => {
      lockedRef.current = document.pointerLockElement === gl.domElement;
    };

    const onClick = (): void => {
      void gl.domElement.requestPointerLock();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('pointerlockchange', onPointerLockChange);
    gl.domElement.addEventListener('click', onClick);

    // Sync initial rotation from camera
    const euler = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
    yawRef.current = euler.y;
    pitchRef.current = euler.x;

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      gl.domElement.removeEventListener('click', onClick);
      document.exitPointerLock();
    };
  }, [camera, gl.domElement]);

  useFrame((_, delta) => {
    const keys = keysRef.current;

    // ── Apply rotation ────────────────────────────────────────────────────────
    const euler = new THREE.Euler(pitchRef.current, yawRef.current, 0, 'YXZ');
    camera.quaternion.setFromEuler(euler);

    // ── Compute movement direction ────────────────────────────────────────────
    const speed =
      keys.has('ShiftLeft') || keys.has('ShiftRight')
        ? FREE_CAM_SPEED * FREE_CAM_BOOST_MULT
        : FREE_CAM_SPEED;

    const direction = new THREE.Vector3(0, 0, 0);

    if (keys.has('KeyW') || keys.has('ArrowUp')) direction.z -= 1;
    if (keys.has('KeyS') || keys.has('ArrowDown')) direction.z += 1;
    if (keys.has('KeyA') || keys.has('ArrowLeft')) direction.x -= 1;
    if (keys.has('KeyD') || keys.has('ArrowRight')) direction.x += 1;
    if (keys.has('KeyE')) direction.y += 1;
    if (keys.has('KeyQ')) direction.y -= 1;

    if (direction.lengthSq() > 0) {
      direction.normalize();
      direction.applyQuaternion(camera.quaternion);
      camera.position.addScaledVector(direction, speed * delta);
    }
  });

  return null;
}
