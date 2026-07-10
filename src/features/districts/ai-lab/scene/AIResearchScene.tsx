/**
 * @file src/features/districts/ai-lab/scene/AIResearchScene.tsx
 * @description Neural AI Research District Scene with blue/purple lighting and holographic networks.
 */

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import { Sparkles } from '@react-three/drei';
import { InteractionManager } from '@core/interaction/InteractionManager';
import { DistrictScene } from '@/features/world/components/DistrictScene';
import { DroidNPC } from '@/features/npc/components/DroidNPC';
import { TerminalManager } from '@core/terminal/TerminalManager';

export function AIResearchScene(): React.ReactElement {
  const neuralCoreRef = useRef<THREE.Mesh>(null);
  const dataRingRef = useRef<THREE.Group>(null);

  // Center coordinate of AI Neural Core
  // const corePos: [number, number, number] = [400, 10, 0];

  // Rotate outer and inner sphere geometries
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (neuralCoreRef.current) {
      neuralCoreRef.current.rotation.y = elapsed * 0.2;
      neuralCoreRef.current.position.y = 10 + Math.sin(elapsed * 2) * 1;
      
      const mat = neuralCoreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.0 + Math.sin(elapsed * 5) * 1.5;
    }
    if (dataRingRef.current) {
      dataRingRef.current.rotation.z = elapsed * 0.4;
      dataRingRef.current.rotation.x = elapsed * 0.1;
    }
  });

  // Register local campus terminals in InteractionManager on mount
  useEffect(() => {
    const terminals = [
      {
        id: 'ai-term-llm',
        name: 'LLM Sandbox Terminal',
        pos: { x: 380, y: 1.0, z: -10 },
        text: 'LLM Model sandbox loading...',
      },
      {
        id: 'ai-term-cv',
        name: 'Computer Vision Gate',
        pos: { x: 420, y: 1.0, z: 10 },
        text: 'Object detector model loading...',
      },
      {
        id: 'ai-term-core',
        name: 'Neural Core Mainframe',
        pos: { x: 400, y: 1.0, z: -25 },
        text: 'Neural weights database loading...',
      },
    ];

    terminals.forEach((term) => {
      InteractionManager.register({
        id: term.id,
        name: term.name,
        type: 'terminal',
        position: term.pos,
        radius: 5,
        priority: 5,
        enabled: true,
        promptText: `Access ${term.name}`,
        onInteract: () => {
          TerminalManager.open(term.id);
        },
      });
    });

    return () => {
      terminals.forEach((term) => {
        InteractionManager.unregister(term.id);
      });
    };
  }, []);

  return (
    <DistrictScene id="ai-research">
      {/* ── Lighting & Ambiance ── */}
      <pointLight position={[400, 15, 0]} intensity={4.0} color="#8000ff" distance={100} />
      <pointLight position={[400, 2, 0]} intensity={2.0} color="#00e5f0" distance={50} />

      {/* ── Main Architecture: AI Core Building ── */}
      <group position={[400, 0, 0]}>
        {/* Base */}
        <mesh position={[0, 2, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[15, 20, 4, 32]} />
          <meshStandardMaterial color="#0a0a15" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Neural Core Hologram */}
        <mesh ref={neuralCoreRef} position={[0, 10, 0]}>
          <icosahedronGeometry args={[4, 1]} />
          <meshStandardMaterial 
            color="#8000ff" 
            emissive="#8000ff" 
            emissiveIntensity={3.0} 
            wireframe 
            transparent 
            opacity={0.8} 
          />
        </mesh>

        {/* Orbiting Data Rings */}
        <group ref={dataRingRef} position={[0, 10, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[10, 0.2, 16, 64]} />
            <meshStandardMaterial color="#00e5f0" emissive="#00e5f0" emissiveIntensity={2.0} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[12, 0.1, 16, 64]} />
            <meshStandardMaterial color="#8000ff" emissive="#8000ff" emissiveIntensity={2.0} />
          </mesh>
        </group>

        {/* Neural Particles */}
        <Sparkles position={[0, 8, 0]} count={300} scale={25} size={3} speed={0.2} opacity={0.8} color="#8000ff" />
      </group>

      {/* ── Server Banks ── */}
      <group position={[425, 0, -20]}>
        <mesh castShadow receiveShadow position={[0, 5, 0]}>
          <boxGeometry args={[4, 10, 2]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, 5, 1.1]}>
          <planeGeometry args={[3, 9]} />
          <meshStandardMaterial color="#8000ff" emissive="#8000ff" emissiveIntensity={1.5} />
        </mesh>
      </group>
      <group position={[375, 0, 20]}>
        <mesh castShadow receiveShadow position={[0, 5, 0]}>
          <boxGeometry args={[4, 10, 2]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, 5, 1.1]}>
          <planeGeometry args={[3, 9]} />
          <meshStandardMaterial color="#00e5f0" emissive="#00e5f0" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* ── NPCs ── */}
      <DroidNPC position={[385, 0, 15]} color="#8000ff" />
      <DroidNPC position={[415, 0, 25]} color="#00e5f0" />
      
      {/* ── Terminal Interactions Holograms ── */}
      <group position={[380, 2.5, -10]}>
        <mesh>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#8000ff" emissive="#8000ff" emissiveIntensity={1} transparent opacity={0.5} />
        </mesh>
      </group>
      <group position={[420, 2.5, 10]}>
        <mesh>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshStandardMaterial color="#00e5f0" emissive="#00e5f0" emissiveIntensity={1} transparent opacity={0.5} />
        </mesh>
      </group>

    </DistrictScene>
  );
}
