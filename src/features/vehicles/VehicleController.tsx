/**
 * @file src/features/vehicles/VehicleController.tsx
 * @description Raycast or Hover vehicle controller for driving across the City Grid.
 */

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function VehicleController() {
  const vehicleRef = useRef<THREE.Group>(null);
  const [isMounted, setIsMounted] = useState(false);
  const velocity = useRef(new THREE.Vector3());

  // Simplified Keyboard state
  const keys = useRef({ forward: false, backward: false, left: false, right: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMounted) return;
      if (e.key === 'w') keys.current.forward = true;
      if (e.key === 's') keys.current.backward = true;
      if (e.key === 'a') keys.current.left = true;
      if (e.key === 'd') keys.current.right = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!isMounted) return;
      if (e.key === 'w') keys.current.forward = false;
      if (e.key === 's') keys.current.backward = false;
      if (e.key === 'a') keys.current.left = false;
      if (e.key === 'd') keys.current.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isMounted]);

  useFrame((_, delta) => {
    if (!isMounted || !vehicleRef.current) return;

    const speed = 20; // Units per second
    const turnSpeed = 2;

    if (keys.current.forward) velocity.current.z -= speed * delta;
    if (keys.current.backward) velocity.current.z += speed * delta;
    if (keys.current.left) vehicleRef.current.rotation.y += turnSpeed * delta;
    if (keys.current.right) vehicleRef.current.rotation.y -= turnSpeed * delta;

    // Apply friction/drag
    velocity.current.multiplyScalar(0.9);

    // Apply local velocity to world position
    vehicleRef.current.translateZ(velocity.current.z * delta);
  });

  return (
    <group ref={vehicleRef} position={[10, 0, 10]}>
      {/* Vehicle Mesh (Cyber-Bike/Hovercraft) */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="#ff5500" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Thruster Glow */}
      {isMounted && (
        <pointLight position={[0, 0.5, 2]} color="#00e5f0" intensity={2} distance={10} />
      )}
    </group>
  );
}
