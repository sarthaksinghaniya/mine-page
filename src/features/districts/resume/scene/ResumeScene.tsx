/**
 * @file src/features/districts/resume/scene/ResumeScene.tsx
 * @description Resume Center District Scene.
 */

import React from 'react';
import { DistrictScene } from '@/features/world/components/DistrictScene';
import { DroidNPC } from '@/features/npc/components/DroidNPC';

export function ResumeScene(): React.ReactElement {
  return (
    <DistrictScene id="resume">
      <pointLight position={[-400, 15, -400]} intensity={4.0} color="#0055ff" distance={100} />
      
      <group position={[-400, 0, -400]}>
        <mesh position={[0, 5, 0]} receiveShadow castShadow>
          <boxGeometry args={[30, 10, 20]} />
          <meshStandardMaterial color="#1a1a20" metalness={0.8} roughness={0.5} />
        </mesh>
        <mesh position={[0, 12, 0]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial color="#0055ff" emissive="#0055ff" emissiveIntensity={1.5} transparent opacity={0.8} side={2} />
        </mesh>
      </group>
      
      <DroidNPC position={[-385, 0, -385]} color="#0055ff" />
    </DistrictScene>
  );
}
