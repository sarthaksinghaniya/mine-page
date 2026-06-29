/**
 * @file src/features/districts/ai-lab/scene/AIResearchScene.tsx
 * @description AI Research District scene layout, neural core, and project laboratories.
 */

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { InteractionManager } from '@core/interaction/InteractionManager';
import { DistrictScene } from '@/features/world/components/DistrictScene';
import { AiRobotNpc } from '../components/AiRobotNpc';
import { TerminalManager } from '@core/terminal/TerminalManager';
import { AppManager } from '@core/apps/AppManager';

export function AIResearchScene(): React.ReactElement {
  const outerSphereRef = useRef<THREE.Mesh>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);

  // Center coordinate of AI Neural Core
  const corePos: [number, number, number] = [400, 5.0, 0];

  // Rotate outer and inner sphere geometries
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y = elapsed * 0.3;
      outerSphereRef.current.rotation.x = elapsed * 0.15;
    }

    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y = -elapsed * 0.6;
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
        radius: 4,
        priority: 7,
        enabled: true,
        promptText: `Use ${term.name}`,
        onInteract: () => {
          TerminalManager.open(term.id);
        },
      });
    });

    // Register dynamic skills lab app portal
    InteractionManager.register({
      id: 'portal-skills-lab',
      name: 'Skills Lab Terminal',
      type: 'terminal',
      position: { x: 370, y: 1.0, z: -10 },
      radius: 5,
      priority: 8,
      enabled: true,
      promptText: 'Open Skills Matrix App',
      onInteract: () => {
        AppManager.open('skills-lab');
      },
    });

    return () => {
      terminals.forEach((term) => InteractionManager.unregister(term.id));
      InteractionManager.unregister('portal-skills-lab');
    };
  }, []);

  return (
    <DistrictScene id="ai-research">
      {/* ── Centerpiece Floating Neural Core ── */}
      <group position={corePos}>
        {/* Outer wireframe shell */}
        <mesh ref={outerSphereRef}>
          <sphereGeometry args={[3.5, 12, 12]} />
          <meshStandardMaterial
            color="#8000ff"
            emissive="#8000ff"
            emissiveIntensity={1.5}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Inner solid glow sphere */}
        <mesh ref={innerSphereRef}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial
            color="#00e5f0"
            emissive="#00e5f0"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
        <pointLight intensity={4.0} color="#8000ff" distance={40} />
      </group>

      {/* ── AI Guide Robot NPC ── */}
      <AiRobotNpc />

      {/* ── Campus Laboratory Buildings ── */}
      {/* LLM Laboratory */}
      <group position={[370, 2.5, -20]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[15, 6, 15]} />
          <meshStandardMaterial color="#3a2a4a" roughness={0.4} metalness={0.7} />
        </mesh>
        <gridHelper args={[15, 10, '#8000ff', '#ffffff']} position={[0, -2.49, 0]} />
      </group>

      {/* Computer Vision Building */}
      <group position={[430, 3.5, 20]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[12, 8, 12]} />
          <meshStandardMaterial color="#2a3a4a" roughness={0.3} metalness={0.8} />
        </mesh>
        <gridHelper args={[12, 8, '#00adc0', '#ffffff']} position={[0, -3.49, 0]} />
      </group>

      {/* Energy cabling details linking CV to neural core */}
      <mesh position={[415, 0.05, 10]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.2, 0.1, 15]} />
        <meshBasicMaterial color="#00e5f0" opacity={0.6} transparent />
      </mesh>
    </DistrictScene>
  );
}
export default AIResearchScene;
