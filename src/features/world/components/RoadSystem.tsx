/**
 * @file src/features/world/components/RoadSystem.tsx
 * @description Procedural road grid generator connecting the key zones.
 */

import React from 'react';
import * as THREE from 'three';
import { ZONES_LIST } from '../zone.types';

export function RoadSystem(): React.ReactElement {
  // Create paths between the center plaza (Spawn) and outer sectors
  const connections = ZONES_LIST.filter((z) => z.id !== 'spawn');

  return (
    <group name="road-system">
      {connections.map((c) => {
        // Calculate midpoints to draw simple connection roads
        const dx = c.center.x - 0;
        const dz = c.center.z - 0;
        const length = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dx, dz);

        const midX = c.center.x / 2;
        const midZ = c.center.z / 2;

        return (
          <mesh
            key={`road-${c.id}`}
            position={[midX, 0.02, midZ]}
            rotation={[-Math.PI / 2, 0, angle]}
          >
            <planeGeometry args={[6, length]} />
            <meshStandardMaterial color="#1a1a24" roughness={0.9} opacity={0.8} transparent />
          </mesh>
        );
      })}
    </group>
  );
}
