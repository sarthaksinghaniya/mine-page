/**
 * @file src/features/buildings/components/BuildingRoot.tsx
 * @description Dynamic placeholder visualizer representing data-driven buildings.
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
    // Check horizontal player distance
    const dx = lot.position.x - playerPos.x;
    const dz = lot.position.z - playerPos.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    const isNear = distance < lot.interactRadius;
    if (isNear !== near) {
      setNear(isNear);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[lot.position.x, lot.position.y, lot.position.z]}
      rotation={[0, lot.rotation, 0]}
    >
      {/* Structural visual placeholder box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[lot.scale.x, lot.scale.y, lot.scale.z]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.7}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Frame casing boundary highlighting */}
      <boxHelper
        args={[new THREE.Mesh(new THREE.BoxGeometry(lot.scale.x, lot.scale.y, lot.scale.z)), color]}
      />

      {/* Glow highlight cylinder when player is near */}
      {near && lot.interior && (
        <mesh position={[0, -lot.position.y + 0.1, 0]}>
          <cylinderGeometry args={[lot.interactRadius * 0.8, lot.interactRadius * 0.8, 0.2, 32]} />
          <meshBasicMaterial color="#00e5f0" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}
