/**
 * @file src/features/vehicles/components/VehicleBase.tsx
 * @description Rapier physics rigid body base for cars, hovercrafts, and shuttles.
 */

import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RigidBody, CapsuleCollider, type RapierRigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { InputManager } from '@core/input/InputManager';
import { InteractionManager } from '@core/interaction/InteractionManager';
import { CinematicDirector } from '@core/cinematic/CinematicDirector';
import { useCameraStore } from '@/features/camera/camera.store';
import { usePlayerStore } from '@/features/player/player.store';
import { VehicleManager } from '../systems/VehicleManager';
import type { VehicleConfig, VehicleEngineState } from '../vehicle.types';

interface VehicleBaseProps {
  config: VehicleConfig;
  color: string;
}

export function VehicleBase({ config, color }: VehicleBaseProps): React.ReactElement {
  const bodyRef = useRef<RapierRigidBody>(null);
  const { camera } = useThree();

  const [engineState, setEngineState] = useState<VehicleEngineState>('parked');
  const [speed, setSpeed] = useState(0);

  const setPlayerPosition = usePlayerStore((s) => s.setPosition);
  const playerPos = usePlayerStore((s) => s.position);

  const isPossessed = VehicleManager.getActiveVehicleId() === config.id;

  // Sync initial location
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.setTranslation(
        { x: config.position.x, y: config.position.y, z: config.position.z },
        true,
      );
    }

    // Register vehicle entry interactable portal
    InteractionManager.register({
      id: `portal-${config.id}`,
      name: config.name,
      type: 'vehicle',
      position: config.position,
      radius: 6,
      priority: 8,
      enabled: true,
      promptText: `Drive ${config.name}`,
      onInteract: () => {
        if (!isPossessed) {
          // Play entrance sequence
          CinematicDirector.play({
            id: `enter-${config.id}`,
            name: `Enter ${config.name}`,
            duration: 1.5,
            priority: 10,
            keyframes: [
              { time: 0.0, type: 'player', player: { frozen: true } },
              { time: 0.0, type: 'screen', screen: { fadeOpacity: 0, letterbox: true } },
              {
                time: 0.2,
                type: 'camera',
                camera: {
                  position: {
                    x: config.position.x,
                    y: config.position.y + 6,
                    z: config.position.z - 12,
                  },
                  lookAt: config.position,
                },
              },
              { time: 1.0, type: 'screen', screen: { fadeOpacity: 1, letterbox: true } },
              { time: 1.3, type: 'screen', screen: { fadeOpacity: 0, letterbox: false } },
              { time: 1.4, type: 'custom', custom: () => VehicleManager.enter(config.id) },
              { time: 1.5, type: 'player', player: { frozen: false } },
            ],
          });
        }
      },
    });

    return () => {
      InteractionManager.unregister(`portal-${config.id}`);
    };
  }, [isPossessed]);

  useFrame((_, delta) => {
    const body = bodyRef.current;
    if (!body) return;

    const translation = body.translation();
    const velocity = body.linvel();
    const speedXZ = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
    setSpeed(Math.round(speedXZ));

    // Dynamic Interaction coordinate updating (anchor to car position)
    const portal = InteractionManager.getInteractables().find(
      (item) => item.id === `portal-${config.id}`,
    );
    if (portal) {
      portal.position = { x: translation.x, y: translation.y, z: translation.z };
    }

    if (isPossessed) {
      const actions = InputManager.getActions();

      // Check exit trigger
      if (actions.interact) {
        // Exiting vehicle sequence
        CinematicDirector.play({
          id: `exit-${config.id}`,
          name: `Exit ${config.name}`,
          duration: 1.2,
          priority: 10,
          keyframes: [
            { time: 0.0, type: 'player', player: { frozen: true } },
            { time: 0.0, type: 'screen', screen: { fadeOpacity: 0, letterbox: true } },
            { time: 0.8, type: 'screen', screen: { fadeOpacity: 1, letterbox: true } },
            {
              time: 0.9,
              type: 'custom',
              custom: () => {
                VehicleManager.exitActive();
                // Drop player adjacent to the car door
                setPlayerPosition({ x: translation.x + 3, y: translation.y + 1, z: translation.z });
              },
            },
            { time: 1.1, type: 'screen', screen: { fadeOpacity: 0, letterbox: false } },
            { time: 1.2, type: 'player', player: { frozen: false } },
          ],
        });
        return;
      }

      // ── Steering & Acceleration forces ──────────────────────────────────────
      const heading = body.rotation();
      const euler = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion(heading.x, heading.y, heading.z, heading.w),
      );
      const yaw = euler.y;

      const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw)).normalize();

      let targetForce = 0;
      if (actions.moveForward) targetForce = config.acceleration;
      if (actions.moveBackward) targetForce = -config.acceleration * 0.5; // half speed reverse

      // Apply forward velocity
      velocity.x = forward.x * targetForce;
      velocity.z = forward.z * targetForce;

      // Simple Yaw Steering
      let steerAngle = 0;
      if (actions.moveLeft) steerAngle = 1.5; // rads per sec
      if (actions.moveRight) steerAngle = -1.5;

      const newYaw = yaw + steerAngle * delta;
      const newQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, newYaw, 0));
      body.setRotation(newQuat, true);

      body.setLinvel(velocity, true);

      // Sync active follow camera look targets to possessed vehicle
      useCameraStore.getState().setFollowConfig({
        offset: { x: 0, y: 5, z: -12 },
        positionLag: 12,
        rotationLag: 12,
      });
      setPlayerPosition({ x: translation.x, y: translation.y, z: translation.z });

      setEngineState(actions.moveForward ? 'driving' : actions.moveBackward ? 'reversing' : 'idle');
    } else {
      setEngineState('parked');
    }
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders={false}
      position={[config.position.x, config.position.y, config.position.z]}
      name={config.id}
    >
      <CapsuleCollider args={[1, 2]} />
      {/* Visual placeholder box representing cyber car */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.2, 5.0]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Windshield window details */}
      <mesh position={[0, 0.8, 0.5]}>
        <boxGeometry args={[2.2, 0.8, 1.5]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.1} transparent opacity={0.6} />
      </mesh>
    </RigidBody>
  );
}
export default VehicleBase;
