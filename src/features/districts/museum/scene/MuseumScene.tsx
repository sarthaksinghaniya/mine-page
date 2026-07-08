/**
 * @file src/features/districts/museum/scene/MuseumScene.tsx
 * @description Achievement Museum District Scene.
 */

import React from 'react';
import { DistrictScene } from '@/features/world/components/DistrictScene';
import { DroidNPC } from '@/features/npc/components/DroidNPC';

export function MuseumScene(): React.ReactElement {
  return (
    <DistrictScene id="museum">
      <pointLight position={[0, 15, 400]} intensity={4.0} color="#ffcc00" distance={100} />
      
      <group position={[0, 0, 400]}>
        <mesh position={[0, 6, 0]} receiveShadow castShadow>
          <boxGeometry args={[40, 12, 40]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 12, 0]}>
          <torusGeometry args={[15, 0.5, 16, 100]} />
          <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={2.0} />
        </mesh>
      </group>
      
      <DroidNPC position={[15, 0, 385]} color="#ffcc00" />
    </DistrictScene>
  );
}
