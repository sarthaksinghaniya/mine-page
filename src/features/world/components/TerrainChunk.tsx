/**
 * @file src/features/world/components/TerrainChunk.tsx
 * @description Handcrafted stylized AAA terrain mapping (Zelda/Genshin style).
 */

import React, { useMemo, useRef } from 'react';
import type { ZoneConfig } from '../zone.types';
import { createNoise2D } from 'simplex-noise';
import * as THREE from 'three';

interface TerrainChunkProps {
  zone: ZoneConfig;
}

const noise2D = createNoise2D();

// Color Palette (Genshin/Zelda inspired)
const COLORS = {
  grass: new THREE.Color('#78c049'),      // Vibrant green
  grassDark: new THREE.Color('#589433'),  // Darker grass
  dirt: new THREE.Color('#b38b59'),       // Warm dirt path
  stoneRoad: new THREE.Color('#94a3b8'),  // Stone road
  beach: new THREE.Color('#f0e6b4'),      // Sand
  cliff: new THREE.Color('#71717a'),      // Grey stone
  snow: new THREE.Color('#f8fafc'),       // White snow
  underwater: new THREE.Color('#4682b4'), // Deep blue dirt
};

export function TerrainChunk({ zone }: TerrainChunkProps): React.ReactElement {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const width = Math.floor(zone.bounds.max.x - zone.bounds.min.x);
  const depth = Math.floor(zone.bounds.max.z - zone.bounds.min.z);
  const resolution = 2; // 1 unit per 0.5 vert

  const { positions, colors, indices } = useMemo(() => {
    const segmentsX = width / resolution;
    const segmentsZ = depth / resolution;
    const vertexCount = (segmentsX + 1) * (segmentsZ + 1);
    
    const pos = new Float32Array(vertexCount * 3);
    const col = new Float32Array(vertexCount * 3);
    const ind = [];

    let i = 0;
    let c = 0;

    for (let z = 0; z <= segmentsZ; z++) {
      for (let x = 0; x <= segmentsX; x++) {
        const localX = (x * resolution) - (width / 2);
        const localZ = (z * resolution) - (depth / 2);

        const globalX = localX + zone.center.x;
        const globalZ = localZ + zone.center.z;
        const distFromSpawn = Math.sqrt(globalX * globalX + globalZ * globalZ);

        // --- 1. BASE ELEVATION (Rolling Hills & Valleys) ---
        let elevation = 0;
        elevation += noise2D(globalX * 0.002, globalZ * 0.002) * 20; // Macro hills
        elevation += noise2D(globalX * 0.01, globalZ * 0.01) * 6;    // Mid details
        elevation += noise2D(globalX * 0.05, globalZ * 0.05) * 1;    // Micro bumps

        // --- 2. CLIFFS (Terracing / Ridges) ---
        // If elevation goes high, step it sharply to form cliffs
        if (elevation > 15) {
          elevation = 15 + Math.floor((elevation - 15) / 4) * 4 + (elevation % 4) * 0.2;
        }

        // --- 3. RIVERS & LAKES (Trenches) ---
        const riverNoise = Math.abs(noise2D(globalX * 0.004, globalZ * 0.004));
        if (riverNoise < 0.08) {
          // Carve river
          elevation -= (0.08 - riverNoise) * 150;
        }

        // --- 4. FLATTEN SPAWN / DISTRICTS ---
        let flattenFactor = 1.0;
        if (distFromSpawn < 60) {
          flattenFactor = Math.pow(distFromSpawn / 60, 2); 
        }
        
        elevation *= flattenFactor;
        elevation -= 2; // Sink slightly to create beaches near y=0

        // Clamp minimum depth so it doesn't spike downwards infinitely
        if (elevation < -10) elevation = -10;

        pos[i++] = localX;
        pos[i++] = elevation;
        pos[i++] = localZ;

        // --- 5. COLOR BLENDING ---
        const vertexColor = new THREE.Color().copy(COLORS.grass);

        // Slope calculation for cliffs
        const eps = 0.5;
        const eX = noise2D((globalX+eps)*0.002, globalZ*0.002)*20 + noise2D((globalX+eps)*0.01, globalZ*0.01)*6;
        const slope = Math.abs(eX - elevation);

        if (elevation < -2) {
          vertexColor.copy(COLORS.underwater);
        } else if (elevation < 1) {
          vertexColor.copy(COLORS.beach);
        } else if (slope > 0.8) {
          vertexColor.copy(COLORS.cliff);
        } else if (elevation > 25) {
          vertexColor.copy(COLORS.snow);
        } else {
          // Grass variations
          const grassNoise = noise2D(globalX * 0.05, globalZ * 0.05);
          if (grassNoise > 0.3) {
            vertexColor.copy(COLORS.grassDark);
          }

          // Paths
          const pathNoise = noise2D(globalX * 0.015, globalZ * 0.015);
          if (distFromSpawn < 100) {
            // Main roads
            if (Math.abs(pathNoise) < 0.1) {
              vertexColor.copy(COLORS.stoneRoad);
            }
          } else {
            // Dirt paths
            if (Math.abs(pathNoise) < 0.05) {
              vertexColor.copy(COLORS.dirt);
            }
          }
        }

        // Add subtle variation
        vertexColor.r += (Math.random() - 0.5) * 0.03;
        vertexColor.g += (Math.random() - 0.5) * 0.03;
        vertexColor.b += (Math.random() - 0.5) * 0.03;

        col[c++] = vertexColor.r;
        col[c++] = vertexColor.g;
        col[c++] = vertexColor.b;
      }
    }

    // Indices
    for (let z = 0; z < segmentsZ; z++) {
      for (let x = 0; x < segmentsX; x++) {
        const a = x + (segmentsX + 1) * z;
        const b = x + (segmentsX + 1) * (z + 1);
        const c_idx = (x + 1) + (segmentsX + 1) * (z + 1);
        const d = (x + 1) + (segmentsX + 1) * z;

        ind.push(a, b, d);
        ind.push(b, c_idx, d);
      }
    }

    return { positions: pos, colors: col, indices: new Uint32Array(ind) };
  }, [width, depth, zone.center.x, zone.center.z]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setIndex(new THREE.BufferAttribute(indices, 1));
    geo.computeVertexNormals();
    return geo;
  }, [positions, colors, indices]);

  return (
    <group position={[zone.center.x, zone.center.y, zone.center.z]}>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial 
          vertexColors 
          roughness={0.8} 
          metalness={0.0} 
          flatShading={false} // Smooth shading for AAA look
        />
      </mesh>
    </group>
  );
}
