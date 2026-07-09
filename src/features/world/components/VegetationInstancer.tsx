/**
 * @file src/features/world/components/VegetationInstancer.tsx
 * @description Stylized low-poly vegetation instancing (Zelda BOTW / Genshin style).
 */

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

const TREE_COUNT = 2000;
const MAP_SIZE = 1200;

export function VegetationInstancer(): React.ReactElement {
  const leafMeshRef = useRef<THREE.InstancedMesh>(null);
  const trunkMeshRef = useRef<THREE.InstancedMesh>(null);

  const { leafMatrix, trunkMatrix, leafColors } = useMemo(() => {
    const tempObj = new THREE.Object3D();
    const lMat = new Float32Array(TREE_COUNT * 16);
    const tMat = new Float32Array(TREE_COUNT * 16);
    const lCol = new Float32Array(TREE_COUNT * 3);
    const _color = new THREE.Color();

    let placed = 0;
    
    while (placed < TREE_COUNT) {
      const x = (Math.random() - 0.5) * MAP_SIZE;
      const z = (Math.random() - 0.5) * MAP_SIZE;
      
      const distToSpawn = Math.sqrt(x*x + z*z);
      if (distToSpawn < 80) continue;

      const density = noise2D(x * 0.002, z * 0.002);
      if (density < 0.2 && Math.random() > 0.1) continue;

      let elevation = 0;
      elevation += noise2D(x * 0.003, z * 0.003) * 15;
      elevation += noise2D(x * 0.015, z * 0.015) * 5;
      elevation += noise2D(x * 0.05, z * 0.05) * 2;
      
      let flattenFactor = 1.0;
      if (distToSpawn < 120) {
        flattenFactor = Math.pow(distToSpawn / 120, 2); 
      }
      elevation *= flattenFactor;
      elevation -= 2;

      if (elevation < -1 || elevation > 14) continue;

      const scale = 0.8 + Math.random() * 0.6;
      const height = 4 * scale;

      // Trunk
      tempObj.position.set(x, elevation + height / 2, z);
      tempObj.rotation.set(0, Math.random() * Math.PI, 0);
      tempObj.scale.set(scale, scale, scale);
      tempObj.updateMatrix();
      tempObj.matrix.toArray(tMat, placed * 16);

      // Leaves (Low poly sphere)
      tempObj.position.set(x, elevation + height + 1 * scale, z);
      tempObj.scale.set(scale * 1.5, scale * 2, scale * 1.5);
      tempObj.updateMatrix();
      tempObj.matrix.toArray(lMat, placed * 16);

      // Vibrant green Genshin leaves
      _color.set('#22c55e'); 
      _color.r += (Math.random() - 0.5) * 0.1;
      _color.g += (Math.random() - 0.5) * 0.2;
      _color.b += (Math.random() - 0.5) * 0.1;
      _color.toArray(lCol, placed * 3);

      placed++;
    }
    
    return { leafMatrix: lMat, trunkMatrix: tMat, leafColors: lCol };
  }, []);

  return (
    <group name="vegetation-instancer">
      {/* Trunks */}
      <instancedMesh ref={trunkMeshRef} args={[undefined, undefined, TREE_COUNT]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.5, 4, 5]} />
        <meshStandardMaterial color="#78350f" roughness={1.0} flatShading />
        <instancedBufferAttribute attach="instanceMatrix" args={[trunkMatrix, 16]} />
      </instancedMesh>

      {/* Leaves */}
      <instancedMesh ref={leafMeshRef} args={[undefined, undefined, TREE_COUNT]} castShadow receiveShadow>
        <icosahedronGeometry args={[2.5, 0]} /> {/* 0 detail = 20 faces, very low poly / stylized */}
        <meshStandardMaterial vertexColors roughness={0.8} flatShading />
        <instancedBufferAttribute attach="instanceMatrix" args={[leafMatrix, 16]} />
      </instancedMesh>
    </group>
  );
}
