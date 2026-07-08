/**
 * @file src/features/districts/contact/scene/ContactScene.tsx
 * @description Communications & Contact District Scene.
 */

import React from 'react';
import { DistrictScene } from '@/features/world/components/DistrictScene';
import { DroidNPC } from '@/features/npc/components/DroidNPC';

export function ContactScene(): React.ReactElement {
  return (
    <DistrictScene id="contact">
      <pointLight position={[0, 15, -400]} intensity={4.0} color="#ff00ff" distance={100} />
      
      <group position={[0, 0, -400]}>
        <mesh position={[0, 10, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[5, 10, 20, 16]} />
          <meshStandardMaterial color="#201a20" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, 22, 0]}>
          <sphereGeometry args={[5, 32, 32]} />
          <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2.0} wireframe />
        </mesh>
      </group>
      
      <DroidNPC position={[15, 0, -385]} color="#ff00ff" />
    </DistrictScene>
  );
}
