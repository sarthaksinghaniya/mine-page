/**
 * @file src/features/districts/projects/scene/ProjectsScene.tsx
 * @description Projects District Scene with orange/cyan lighting and construction holograms.
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import { Float, Sparkles } from '@react-three/drei';
import { DistrictScene } from '@/features/world/components/DistrictScene';
import { DroidNPC } from '@/features/npc/components/DroidNPC';

export function ProjectsScene(): React.ReactElement {
  const craneRef = useRef<THREE.Group>(null);
  const cardGroupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (craneRef.current) {
      craneRef.current.rotation.y = elapsed * 0.1;
    }
    if (cardGroupRef.current) {
      cardGroupRef.current.rotation.y = -elapsed * 0.2;
    }
  });

  return (
    <DistrictScene id="projects">
      {/* ── Lighting & Ambiance ── */}
      <pointLight position={[400, 15, 400]} intensity={4.0} color="#ff5500" distance={100} />
      <pointLight position={[400, 5, 400]} intensity={2.0} color="#00e5f0" distance={50} />

      {/* ── Main Architecture: Construction Hub ── */}
      <group position={[400, 0, 400]}>
        
        {/* Scaffolding Base */}
        <mesh position={[0, 2, 0]} receiveShadow castShadow>
          <boxGeometry args={[30, 4, 30]} />
          <meshStandardMaterial color="#1a1a20" metalness={0.9} roughness={0.6} />
        </mesh>

        <mesh position={[0, 6, 0]} receiveShadow castShadow>
          <boxGeometry args={[20, 4, 20]} />
          <meshStandardMaterial color="#2a2a30" metalness={0.8} roughness={0.5} />
        </mesh>

        {/* Holographic Crane */}
        <group ref={craneRef} position={[0, 8, 0]}>
          <mesh position={[0, 10, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 20]} />
            <meshStandardMaterial color="#ff5500" emissive="#ff5500" emissiveIntensity={1.0} wireframe />
          </mesh>
          <mesh position={[10, 20, 0]}>
            <boxGeometry args={[20, 0.5, 0.5]} />
            <meshStandardMaterial color="#ff5500" emissive="#ff5500" emissiveIntensity={1.0} wireframe />
          </mesh>
        </group>

        {/* Floating Project Cards */}
        <group ref={cardGroupRef} position={[0, 15, 0]}>
          {[0, 1, 2, 3].map((i) => (
            <group key={i} rotation={[0, (Math.PI / 2) * i, 0]}>
              <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
                <mesh position={[12, 0, 0]}>
                  <boxGeometry args={[6, 4, 0.2]} />
                  <meshStandardMaterial 
                    color="#00e5f0" 
                    emissive="#00e5f0" 
                    emissiveIntensity={1.5} 
                    transparent 
                    opacity={0.6} 
                  />
                </mesh>
              </Float>
            </group>
          ))}
        </group>

        {/* Construction Particles */}
        <Sparkles position={[0, 10, 0]} count={200} scale={30} size={5} speed={0.5} opacity={0.6} color="#ff5500" />
      </group>

      {/* ── NPCs ── */}
      <DroidNPC position={[385, 0, 385]} color="#ff5500" />
      <DroidNPC position={[415, 0, 415]} color="#00e5f0" />
    </DistrictScene>
  );
}
