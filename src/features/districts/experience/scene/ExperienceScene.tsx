/**
 * @file src/features/districts/experience/scene/ExperienceScene.tsx
 * @description Experience Tower District Scene.
 */

import React from 'react';
import { DistrictScene } from '@/features/world/components/DistrictScene';
import { DroidNPC } from '@/features/npc/components/DroidNPC';

export function ExperienceScene(): React.ReactElement {
  return (
    <DistrictScene id="experience">
      <pointLight position={[-400, 20, 0]} intensity={4.0} color="#ff0055" distance={150} />
      
      <group position={[-400, 0, 0]}>
        <mesh position={[0, 20, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[10, 15, 40, 32]} />
          <meshStandardMaterial color="#201a1a" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 42, 0]}>
          <coneGeometry args={[10, 15, 32]} />
          <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={1.5} wireframe />
        </mesh>
      </group>
      
      <DroidNPC position={[-380, 0, 15]} color="#ff0055" />
    </DistrictScene>
  );
}
