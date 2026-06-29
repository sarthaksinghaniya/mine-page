/**
 * @file src/features/districts/ai-lab/components/AiRobotNpc.tsx
 * @description AI Guide Robot NPC with dynamic head turn tracking towards player coordinates.
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlayerStore } from '@/features/player/player.store';

export function AiRobotNpc(): React.ReactElement {
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const playerPos = usePlayerStore((s) => s.position);

  // Position of NPC in the AI campus (X: 380, Z: 0)
  const npcWorldPos = new THREE.Vector3(380, 1.5, 10);

  useFrame(() => {
    const robot = robotRef.current;
    const head = headRef.current;
    if (!robot || !head) return;

    // Calculate heading vector from robot to player
    const dx = playerPos.x - npcWorldPos.x;
    const dz = playerPos.z - npcWorldPos.z;
    const angle = Math.atan2(dx, dz);

    // Smooth turn robot body towards player
    const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0));
    robot.quaternion.slerp(targetQuat, 0.1);

    // Oscillate head slightly to simulate hovering floating
    const time = performance.now() * 0.003;
    robot.position.y = npcWorldPos.y + Math.sin(time) * 0.15;
  });

  return (
    <group ref={robotRef} position={[npcWorldPos.x, npcWorldPos.y, npcWorldPos.z]}>
      {/* Robot Base chassis */}
      <mesh castShadow>
        <cylinderGeometry args={[0.4, 0.6, 1.0, 8]} />
        <meshStandardMaterial color="#2a2d3a" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Floating Head sphere */}
      <mesh ref={headRef} position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#4a4d5a" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Visor details (glowing visor indicator visor) */}
      <mesh position={[0, 0.85, 0.28]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshBasicMaterial color="#00e5f0" />
      </mesh>

      {/* Base hovering ring glow */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.5, 16]} />
        <meshBasicMaterial color="#00e5f0" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
export default AiRobotNpc;
