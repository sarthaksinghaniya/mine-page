/**
 * @file src/features/buildings/components/BuildingRoot.tsx
 * @description Handcrafted, stylized low-poly architecture (Zelda/Genshin style).
 */

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
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

  const isTall = lot.scale.y > 15;

  return (
    <group
      ref={groupRef}
      position={[lot.position.x, lot.position.y + lot.scale.y / 2, lot.position.z]}
      rotation={[0, lot.rotation, 0]}
    >
      {/* Base Foundation (Stone) */}
      <mesh position={[0, -lot.scale.y / 2 + 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[lot.scale.x + 2, 2, lot.scale.z + 2]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.9} />
      </mesh>

      {/* Main Structure (White Plaster / Walls) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[lot.scale.x, lot.scale.y, lot.scale.z]} />
        <meshStandardMaterial color="#f8fafc" roughness={1.0} />
      </mesh>

      {/* Stylized Angled Roof */}
      <mesh position={[0, lot.scale.y / 2 + (isTall ? 2 : 4), 0]} castShadow receiveShadow>
        <coneGeometry args={[lot.scale.x * 0.8, isTall ? 4 : 8, 4]} />
        <meshStandardMaterial color={isTall ? '#1e293b' : '#0284c7'} roughness={0.7} flatShading />
      </mesh>

      {/* Pillars (Stylized Corners) */}
      {[
        [-1, -1], [1, -1], [-1, 1], [1, 1]
      ].map(([x, z], i) => (
        <mesh key={i} position={[x * (lot.scale.x / 2 + 0.5), 0, z * (lot.scale.z / 2 + 0.5)]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, lot.scale.y + 1, 8]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
        </mesh>
      ))}

      {/* Grand Entrance Door */}
      <mesh position={[0, -lot.scale.y / 2 + 3, lot.scale.z / 2 + 0.1]} castShadow>
        <boxGeometry args={[4, 6, 0.2]} />
        <meshStandardMaterial color="#78350f" roughness={0.6} />
      </mesh>

      {/* Glowing Interaction Ring */}
      {near && lot.interior && (
        <mesh position={[0, -lot.scale.y / 2 + 1.1, lot.scale.z / 2 + 3]}>
          <ringGeometry args={[1.5, 2, 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} side={THREE.DoubleSide} />
          <group rotation={[-Math.PI/2, 0, 0]} />
        </mesh>
      )}

      {/* Floating UI Label */}
      <Html 
        position={[0, lot.scale.y / 2 + (isTall ? 8 : 12), 0]} 
        center 
        transform 
        sprite 
        distanceFactor={45}
        zIndexRange={[100, 0]}
      >
        <div className="flex flex-col items-center pointer-events-none drop-shadow-xl">
          <div className="bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-md rounded-full px-6 py-2 border border-white/20">
            <span className="text-white font-bold tracking-widest text-lg uppercase text-center" style={{ textShadow: `0 0 10px ${color}` }}>
              {lot.name}
            </span>
          </div>
          {lot.interior && (
            <span className="text-gray-300 text-sm font-semibold mt-1 tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full border border-white/10">
              Press E to Enter
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}
