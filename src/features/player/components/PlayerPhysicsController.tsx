/**
 * @file src/features/player/components/PlayerPhysicsController.tsx
 * @description Rapier physics character rigid body, kinematic movement solver, and event bindings.
 */

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, type RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { usePlayerStore } from '../player.store';
import { InputManager } from '@core/input/InputManager';
import { FootstepAudio, type SurfaceType } from '@/features/audio/systems/FootstepAudio';
import { useCameraStore } from '@/features/camera/camera.store';

// ── Physics parameters ────────────────────────────────────────────────────────
const ACCELERATION  = 30; // units/s²
const DRAG          = 8;  // damping factor
const JUMP_FORCE    = 7;  // velocity impulse

export function PlayerPhysicsController(): React.ReactElement {
  const bodyRef = useRef<RapierRigidBody>(null);
  const { camera } = useThree();

  const setPosition = usePlayerStore((s) => s.setPosition);
  const setMovementState = usePlayerStore((s) => s.setMovementState);
  const playerStorePos = usePlayerStore((s) => s.position);

  // Footstep timings
  const stepTimer = useRef(0);

  // Air states
  const isGrounded = useRef(true);
  const coyoteTimer = useRef(0);
  const jumpBuffer = useRef(false);

  // Sync camera position to initial spawn point on mount
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.setTranslation({ x: playerStorePos.x, y: playerStorePos.y, z: playerStorePos.z }, true);
    }
  }, []);

  useFrame((_, delta) => {
    const body = bodyRef.current;
    if (!body) return;

    const translation = body.translation();
    const velocity = body.linvel();
    const actions = InputManager.getActions();

    // ── 1. Ground detection ──────────────────────────────────────────────────
    // Simple vertical trace check to see if character is resting on terrain
    const castStart = new THREE.Vector3(translation.x, translation.y - 0.9, translation.z);
    // Standard height checks
    const onGround = velocity.y < 0.1 && velocity.y > -0.5;
    isGrounded.current = onGround;

    if (onGround) {
      coyoteTimer.current = 0.15; // Reset coyote timer window
    } else {
      coyoteTimer.current = Math.max(0, coyoteTimer.current - delta);
    }

    // ── 2. Movement Forces ────────────────────────────────────────────────────
    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir);
    cameraDir.y = 0; // lock to horizontal plane
    cameraDir.normalize();

    const cameraRight = new THREE.Vector3();
    cameraRight.crossVectors(cameraDir, camera.up).normalize();

    const moveVector = new THREE.Vector3(0, 0, 0);

    if (actions.moveForward)  moveVector.add(cameraDir);
    if (actions.moveBackward) moveVector.sub(cameraDir);
    if (actions.moveRight)    moveVector.add(cameraRight);
    if (actions.moveLeft)     moveVector.sub(cameraRight);

    if (moveVector.lengthSq() > 0) {
      moveVector.normalize();
    }

    const speedLimit = actions.sprint ? 9 : 5;
    const targetVelX = moveVector.x * speedLimit;
    const targetVelZ = moveVector.z * speedLimit;

    // Apply linear acceleration and friction drag
    velocity.x += (targetVelX - velocity.x) * ACCELERATION * delta;
    velocity.z += (targetVelZ - velocity.z) * ACCELERATION * delta;

    // ── 3. Jumping Mechanics ─────────────────────────────────────────────────
    if (actions.jump) {
      jumpBuffer.current = true;
    }

    if (jumpBuffer.current && coyoteTimer.current > 0) {
      velocity.y = JUMP_FORCE;
      jumpBuffer.current = false;
      coyoteTimer.current = 0;
      setMovementState('jumping');
    }

    body.setLinvel(velocity, true);

    // ── 4. Footsteps Orchestrator ─────────────────────────────────────────────
    const speedXZ = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
    if (onGround && speedXZ > 0.5) {
      stepTimer.current += delta * speedXZ * 0.4;
      if (stepTimer.current > 1.2) {
        stepTimer.current = 0;
        // Check local coordinates to resolve surface type
        // In the future, this reads active zone metadata. Defaulting to concrete.
        const surface: SurfaceType = translation.z > 200 ? 'grass' : 'concrete';
        FootstepAudio.trigger(surface, 0.4);
      }
      setMovementState(actions.sprint ? 'running' : 'walking');
    } else if (onGround) {
      setMovementState('idle');
    } else if (velocity.y < -0.5) {
      setMovementState('falling');
    }

    // ── 5. Sync to game store ─────────────────────────────────────────────────
    setPosition({ x: translation.x, y: translation.y, z: translation.z });
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders={false}
      enabledRotations={[false, false, false]} // lock axes to prevent capsule tipping
      position={[playerStorePos.x, playerStorePos.y, playerStorePos.z]}
      name="player"
    >
      <CapsuleCollider args={[0.5, 0.4]} />
      {/* Visual Debug Mesh for Player Capsule */}
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.4, 1.0, 4, 8]} />
        <meshStandardMaterial color="#00adc0" roughness={0.3} metalness={0.8} />
      </mesh>
    </RigidBody>
  );
}
export default PlayerPhysicsController;
