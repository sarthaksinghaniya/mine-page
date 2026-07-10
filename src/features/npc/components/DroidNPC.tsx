/**
 * @file src/features/npc/components/DroidNPC.tsx
 * @description A stylized, lightweight Cyberpunk Droid NPC using Three.js primitives.
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import { Float } from '@react-three/drei';

interface DroidNPCProps {
  position: [number, number, number];
  color?: string;
  scale?: number;
}

export function DroidNPC({ position, color = '#00e5f0', scale = 1 }: DroidNPCProps): React.ReactElement {
  const eyeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (eyeRef.current) {
      // Pulse the eye glow
      const material = eyeRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 2.0 + Math.sin(elapsed * 4) * 1.5;
    }
    if (ringRef.current) {
      // Rotate the data ring
      ringRef.current.rotation.x = elapsed * 0.5;
      ringRef.current.rotation.y = elapsed * 0.8;
    }
  });

  return (
    <group position={position} scale={scale}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core Body */}
        <mesh position={[0, 1.5, 0]}>
          <capsuleGeometry args={[0.3, 0.6, 16, 16]} />
          <meshStandardMaterial color="#1a1a24" roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Glowing Eye */}
        <mesh ref={eyeRef} position={[0, 1.7, 0.25]}>
          <boxGeometry args={[0.4, 0.1, 0.1]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.0} />
        </mesh>

        {/* Orbiting Data Ring */}
        <mesh ref={ringRef} position={[0, 1.5, 0]}>
          <torusGeometry args={[0.6, 0.02, 8, 32]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.0} transparent opacity={0.6} wireframe />
        </mesh>

        {/* Floating shadow cast onto ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.3} depthWrite={false} />
        </mesh>
      </Float>
    </group>
  );
}
