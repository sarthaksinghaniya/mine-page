/**
 * @file src/features/world/components/VegetationInstancer.tsx
 * @description High performance instanced vegetation (trees, bushes) generated via noise.
 */

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

const TREE_COUNT = 3000;
const MAP_SIZE = 1200;

export function VegetationInstancer(): React.ReactElement {
  const leafMeshRef = useRef<THREE.InstancedMesh>(null);
  const trunkMeshRef = useRef<THREE.InstancedMesh>(null);

  const { leafMatrix, trunkMatrix } = useMemo(() => {
    const tempObj = new THREE.Object3D();
    const lMat = new Float32Array(TREE_COUNT * 16);
    const tMat = new Float32Array(TREE_COUNT * 16);

    let placed = 0;
    
    // Random distribution but biased by noise to create forests
    while (placed < TREE_COUNT) {
      const x = (Math.random() - 0.5) * MAP_SIZE;
      const z = (Math.random() - 0.5) * MAP_SIZE;
      
      // Avoid spawn area
      const distToSpawn = Math.sqrt(x*x + z*z);
      if (distToSpawn < 80) continue;

      // Noise density check (create forests)
      const density = noise2D(x * 0.002, z * 0.002);
      if (density < 0.2 && Math.random() > 0.1) continue; // mostly skip sparse areas

      // Calculate terrain height to place the tree on the ground
      // Note: Must roughly match the TerrainChunk formula!
      let elevation = 0;
      elevation += noise2D(x * 0.005, z * 0.005) * 15;
      elevation += noise2D(x * 0.02, z * 0.02) * 5;
      elevation += noise2D(x * 0.1, z * 0.1) * 0.5;
      
      let flattenFactor = 1.0;
      if (distToSpawn < 100) {
        flattenFactor = Math.pow(distToSpawn / 100, 2); 
      }
      elevation *= flattenFactor;
      elevation -= 2;

      // Skip if underwater
      if (elevation < -1.2) continue;

      const scale = 0.8 + Math.random() * 0.6;
      const rotationY = Math.random() * Math.PI * 2;

      // Trunk
      tempObj.position.set(x, elevation + 1 * scale, z);
      tempObj.rotation.set(0, rotationY, 0);
      tempObj.scale.set(scale, scale, scale);
      tempObj.updateMatrix();
      tempObj.matrix.toArray(tMat, placed * 16);

      // Leaves (Sphere or Cone on top)
      tempObj.position.set(x, elevation + 3.5 * scale, z);
      tempObj.scale.set(scale * 1.5, scale * 2, scale * 1.5);
      tempObj.updateMatrix();
      tempObj.matrix.toArray(lMat, placed * 16);

      placed++;
    }
    
    return { leafMatrix: lMat, trunkMatrix: tMat };
  }, []);

  // Simple wind animation via shader or object rotation could go here in useFrame,
  // but for 3000 instances, doing it on CPU is expensive. We'll leave it static for now
  // or implement a custom shader material if we want wind sway.

  return (
    <group name="vegetation-instancer">
      {/* Trunks */}
      <instancedMesh ref={trunkMeshRef} args={[undefined, undefined, TREE_COUNT]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.4, 2, 6]} />
        <meshStandardMaterial color="#5c4033" roughness={0.9} />
        <instancedBufferAttribute attach="instanceMatrix" args={[trunkMatrix, 16]} />
      </instancedMesh>

      {/* Leaves */}
      <instancedMesh ref={leafMeshRef} args={[undefined, undefined, TREE_COUNT]} castShadow receiveShadow>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#2e7d32" roughness={0.8} />
        <instancedBufferAttribute attach="instanceMatrix" args={[leafMatrix, 16]} />
      </instancedMesh>
    </group>
  );
}
