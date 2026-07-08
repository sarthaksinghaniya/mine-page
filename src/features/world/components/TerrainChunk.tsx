/**
 * @file src/features/world/components/TerrainChunk.tsx
 * @description Dynamic procedural terrain block rendering based on zone details.
 */

import React from 'react';
import type { ZoneConfig } from '../zone.types';

interface TerrainChunkProps {
  zone: ZoneConfig;
}

export function TerrainChunk({ zone }: TerrainChunkProps): React.ReactElement {
  const width = zone.bounds.max.x - zone.bounds.min.x;
  const depth = zone.bounds.max.z - zone.bounds.min.z;

  return (
    <group position={[zone.center.x, zone.center.y, zone.center.z]}>
      {/* Visual ground plate for the zone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial
          color={zone.color}
          roughness={0.8}
          metalness={0.2}
          wireframe={false}
          opacity={0.15}
          transparent
        />
      </mesh>

      {/* Grid helper visualizing coordinates inside the zone bounds */}
      <gridHelper
        args={[width, Math.round(width / 10), '#ffffff', zone.color]}
        position={[0, 0.01, 0]}
      />

      {/* Minor center anchor cylinder */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 16]} />
        <meshBasicMaterial color={zone.color} opacity={0.6} transparent />
      </mesh>
    </group>
  );
}
