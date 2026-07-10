/**
 * @file src/features/camera/modes/FollowCamera.tsx
 * @description AAA Third-Person camera mode. Smoothly follows the player and orbits based on mouse input.
 */

import type React from 'react';
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { damp } from '@shared/utils/math';
import { useCameraStore } from '../camera.store';
import { useCameraShake } from '../hooks/useCameraShake';
import { usePlayerStore } from '@/features/player/player.store';

const _targetPos = new THREE.Vector3();
const _idealOffset = new THREE.Vector3();
const _idealPos = new THREE.Vector3();

export function FollowCamera(): React.ReactElement | null {
  const { camera, gl } = useThree();
  const { applyShake } = useCameraShake();
  const playerPos = usePlayerStore((s) => s.position);
  const followConfig = useCameraStore((s) => s.followConfig);

  const smoothedPos = useRef(camera.position.clone());
  const smoothedTarget = useRef(new THREE.Vector3(0, 0, 0));

  // Mouse rotation state
  const angles = useRef({ phi: Math.PI / 8, theta: 0 }); // elevation, azimuth
  const isDragging = useRef(false);

  useEffect(() => {
    const handlePointerDown = () => (isDragging.current = true);
    const handlePointerUp = () => (isDragging.current = false);
    const handlePointerMove = (e: PointerEvent) => {
      // In a real AAA game, we'd use PointerLock API. 
      // For portfolio, drag to rotate or lock on click.
      if (isDragging.current || document.pointerLockElement) {
        angles.current.theta -= e.movementX * 0.005;
        angles.current.phi -= e.movementY * 0.005;
        // Clamp elevation
        angles.current.phi = Math.max(-Math.PI / 4, Math.min(Math.PI / 3, angles.current.phi));
      }
    };

    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [gl.domElement]);

  useFrame((_, delta) => {
    _targetPos.set(playerPos.x, playerPos.y + 1.5, playerPos.z); // Focus on head/shoulders

    // Calculate ideal camera offset based on spherical coordinates
    const radius = 6; // distance from player
    const { phi, theta } = angles.current;
    
    _idealOffset.x = radius * Math.cos(phi) * Math.sin(theta);
    _idealOffset.y = radius * Math.sin(phi);
    _idealOffset.z = radius * Math.cos(phi) * Math.cos(theta);

    _idealPos.copy(_targetPos).add(_idealOffset);

    // Floor collision - simple clamp
    if (_idealPos.y < 0.5) _idealPos.y = 0.5;

    // Smooth position and target
    smoothedPos.current.lerp(_idealPos, 1 - Math.exp(-followConfig.positionLag * delta));
    smoothedTarget.current.lerp(_targetPos, 1 - Math.exp(-followConfig.rotationLag * delta));

    camera.position.copy(smoothedPos.current);
    camera.lookAt(smoothedTarget.current);

    applyShake(camera.position, delta);
  });

  return null;
}
