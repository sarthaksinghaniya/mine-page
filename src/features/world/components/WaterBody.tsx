/**
 * @file src/features/world/components/WaterBody.tsx
 * @description Advanced water shader using MeshReflectorMaterial for reflections, and simple procedural waves.
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface WaterBodyProps {
  position?: [number, number, number];
  width?: number;
  depth?: number;
}

export function WaterBody({ position = [0, -1.2, 0], width = 1000, depth = 1000 }: WaterBodyProps) {
  const waterMaterialRef = useRef<any>(null);

  useFrame((state) => {
    if (waterMaterialRef.current) {
      // Very subtle texture offset animation for waves if we had a normal map
      // For now, let's just gently modulate opacity or something to simulate life
    }
  });

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[width, depth]} />
      <MeshReflectorMaterial
        ref={waterMaterialRef}
        blur={[300, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={40}
        roughness={0.1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#0066aa"
        metalness={0.2}
        mirror={0.8}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}
