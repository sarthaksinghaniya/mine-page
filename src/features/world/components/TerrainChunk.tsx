/**
 * @file src/features/world/components/TerrainChunk.tsx
 * @description Dynamic procedural terrain block rendering with rolling hills via Simplex Noise.
 */

import React, { useMemo } from 'react';
import type { ZoneConfig } from '../zone.types';
import { createNoise2D } from 'simplex-noise';
import * as THREE from 'three';

interface TerrainChunkProps {
  zone: ZoneConfig;
}

const noise2D = createNoise2D();

export function TerrainChunk({ zone }: TerrainChunkProps): React.ReactElement {
  const width = zone.bounds.max.x - zone.bounds.min.x;
  const depth = zone.bounds.max.z - zone.bounds.min.z;
  
  // Create a memoized geometry with rolling hills
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, depth, Math.floor(width / 4), Math.floor(depth / 4));
    geo.rotateX(-Math.PI / 2); // Lay flat on XZ plane
    
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      // Global coordinates for noise input to ensure seamless chunk boundaries
      const worldX = pos.getX(i) + zone.center.x;
      const worldZ = pos.getZ(i) + zone.center.z;
      
      // Multi-octave noise for natural hills
      // We keep the center near 0 flat by fading out noise based on distance from spawn,
      // or just keep it gentle everywhere. Let's make it gentle everywhere except near spawn.
      // Dist from spawn
      const distFromSpawn = Math.sqrt(worldX * worldX + worldZ * worldZ);
      
      // If we are close to the spawn point, flatten the terrain so buildings sit nicely.
      // E.g., if dist < 100, flatten it completely.
      let flattenFactor = 1.0;
      if (distFromSpawn < 100) {
        flattenFactor = Math.pow(distFromSpawn / 100, 2); 
      }

      // Height logic
      let elevation = 0;
      elevation += noise2D(worldX * 0.005, worldZ * 0.005) * 15;
      elevation += noise2D(worldX * 0.02, worldZ * 0.02) * 5;
      elevation += noise2D(worldX * 0.1, worldZ * 0.1) * 0.5;
      
      // Apply flattening near center
      elevation *= flattenFactor;

      // Base offset so it goes below 0 as well
      elevation -= 2;

      pos.setY(i, elevation);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, [width, depth, zone.center.x, zone.center.z]);

  // Determine base color based on zone theme.
  // We'll replace the cyberpunk colors with natural ones.
  let groundColor = '#3a8c3f'; // lush grass
  if (zone.theme === 'ai-research' || zone.theme === 'projects-district') {
    groundColor = '#4caf50'; // standard grass
  }

  return (
    <group position={[zone.center.x, zone.center.y, zone.center.z]}>
      {/* Visual ground plate for the zone */}
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial
          color={groundColor}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}
