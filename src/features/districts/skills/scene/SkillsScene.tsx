/**
 * @file src/features/districts/skills/scene/SkillsScene.tsx
 * @description Skills Matrix Lab District Scene.
 */

import React from 'react';
import { DistrictScene } from '@/features/world/components/DistrictScene';
import { DroidNPC } from '@/features/npc/components/DroidNPC';

export function SkillsScene(): React.ReactElement {
  return (
    <DistrictScene id="skills">
      <pointLight position={[-400, 15, 400]} intensity={4.0} color="#00ff66" distance={100} />
      
      <group position={[-400, 0, 400]}>
        <mesh position={[0, 7.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[25, 15, 25]} />
          <meshStandardMaterial color="#1a201a" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, 15, 0]}>
          <octahedronGeometry args={[5, 0]} />
          <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={2.0} wireframe />
        </mesh>
      </group>
      
      <DroidNPC position={[-385, 0, 385]} color="#00ff66" />
    </DistrictScene>
  );
}
