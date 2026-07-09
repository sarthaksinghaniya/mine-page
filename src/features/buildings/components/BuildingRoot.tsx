/**
 * @file src/features/buildings/components/BuildingRoot.tsx
 * @description Dynamic procedural architectural building generator.
 */

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { BuildingLot } from '../district.types';
import { usePlayerStore } from '@/features/player/player.store';

interface BuildingRootProps {
  lot: BuildingLot;
  color: string;
}

export function BuildingRoot({ lot, color }: BuildingRootProps): React.ReactElement {
  const playerPos = usePlayerStore((s) => s.position);
  const [near, setNear] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const dx = lot.position.x - playerPos.x;
    const dz = lot.position.z - playerPos.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    const isNear = distance < lot.interactRadius;
    if (isNear !== near) {
      setNear(isNear);
    }
  });

  // Calculate some procedural architectural properties
  const isTall = lot.scale.y > 20;
  const isWide = lot.scale.x > lot.scale.z * 1.5;

  return (
    <group
      ref={groupRef}
      position={[lot.position.x, lot.position.y + lot.scale.y / 2, lot.position.z]}
      rotation={[0, lot.rotation, 0]}
    >
      {/* Base Structure (White Concrete / Modern) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[lot.scale.x, lot.scale.y, lot.scale.z]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Glass Windows Wrap */}
      <mesh position={[0, 0, 0]} castShadow={false}>
        <boxGeometry args={[lot.scale.x + 0.1, lot.scale.y * 0.8, lot.scale.z + 0.1]} />
        <meshStandardMaterial
          color="#0ea5e9"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Roof trim (Wood or Dark Metal depending on style) */}
      <mesh position={[0, lot.scale.y / 2 + 0.25, 0]} castShadow>
        <boxGeometry args={[lot.scale.x + 1, 0.5, lot.scale.z + 1]} />
        <meshStandardMaterial color={isTall ? '#1e293b' : '#854d0e'} roughness={0.7} />
      </mesh>

      {/* Entrance Door Indicator */}
      <mesh position={[0, -lot.scale.y / 2 + 1.5, lot.scale.z / 2 + 0.1]} castShadow>
        <boxGeometry args={[3, 3, 0.2]} />
        <meshStandardMaterial color={near ? '#22c55e' : '#e2e8f0'} roughness={0.2} />
      </mesh>

      {/* Glow highlight cylinder when player is near */}
      {near && lot.interior && (
        <mesh position={[0, -lot.scale.y / 2 + 0.1, 0]}>
          <cylinderGeometry args={[lot.interactRadius * 0.8, lot.interactRadius * 0.8, 0.2, 32]} />
          <meshBasicMaterial color="#eab308" transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  );
}
