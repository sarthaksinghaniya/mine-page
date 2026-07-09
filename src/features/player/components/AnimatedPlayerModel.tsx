/**
 * @file src/features/player/components/AnimatedPlayerModel.tsx
 * @description Procedural stylized character model with math-driven animations (Minecraft/Roblox style).
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlayerStore } from '../player.store';

export function AnimatedPlayerModel(): React.ReactElement {
  const movementState = usePlayerStore((s) => s.movementState);
  
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Reset rotations
    let legRot = 0;
    let armRot = 0;
    let torsoY = 1.0;
    let headY = 1.6;

    if (movementState === 'walking') {
      legRot = Math.sin(t * 10) * 0.5;
      armRot = Math.sin(t * 10) * 0.5;
    } else if (movementState === 'running') {
      legRot = Math.sin(t * 15) * 0.8;
      armRot = Math.sin(t * 15) * 0.8;
    } else if (movementState === 'idle') {
      // Breathing
      torsoY = 1.0 + Math.sin(t * 2) * 0.02;
      headY = 1.6 + Math.sin(t * 2) * 0.02;
    } else if (movementState === 'jumping' || movementState === 'falling') {
      legRot = -0.2; // Legs slightly bent up
      armRot = 0.5;  // Arms thrown up
    }

    if (leftLeg.current) leftLeg.current.rotation.x = legRot;
    if (rightLeg.current) rightLeg.current.rotation.x = -legRot;
    
    // Arms swing opposite to legs
    if (leftArm.current) leftArm.current.rotation.x = -armRot;
    if (rightArm.current) rightArm.current.rotation.x = armRot;

    if (torso.current) torso.current.position.y = torsoY;
    if (head.current) head.current.position.y = headY;
  });

  return (
    <group name="animated-player-model">
      {/* Head */}
      <group ref={head} position={[0, 1.6, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#fcd5ce" roughness={0.6} />
        </mesh>
        {/* Hair */}
        <mesh castShadow position={[0, 0.45, 0]}>
          <boxGeometry args={[0.42, 0.1, 0.42]} />
          <meshStandardMaterial color="#3e2723" roughness={0.8} />
        </mesh>
      </group>

      {/* Torso */}
      <group ref={torso} position={[0, 1.0, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
          <boxGeometry args={[0.5, 0.6, 0.25]} />
          <meshStandardMaterial color="#0284c7" roughness={0.7} />
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={leftArm} position={[-0.35, 1.5, 0]}>
        <mesh castShadow receiveShadow position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#fcd5ce" roughness={0.6} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArm} position={[0.35, 1.5, 0]}>
        <mesh castShadow receiveShadow position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#fcd5ce" roughness={0.6} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLeg} position={[-0.15, 0.6, 0]}>
        <mesh castShadow receiveShadow position={[0, -0.3, 0]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLeg} position={[0.15, 0.6, 0]}>
        <mesh castShadow receiveShadow position={[0, -0.3, 0]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
