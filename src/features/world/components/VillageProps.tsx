/**
 * @file src/features/world/components/VillageProps.tsx
 * @description Additional detailed props for Spawn Village: Gate, Farm, Cave, Bridges.
 */

import React, { useRef } from 'react';
import type * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function VillageProps(): React.ReactElement {
  const sheepRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    // Make sheep bob and rotate slightly
    if (sheepRef.current) {
      sheepRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      sheepRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group name="village-props">
      {/* 0. Environmental Storytelling Props (Campfire, Tents, Barrels) */}
      <group position={[-10, 0, -5]}>
        {/* Campfire */}
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0.2, 0]} castShadow><cylinderGeometry args={[0.8, 0.8, 0.2, 8]} /><meshStandardMaterial color="#475569" /></mesh>
          <mesh position={[0, 0.6, 0]} castShadow><coneGeometry args={[0.5, 0.8, 4]} /><meshStandardMaterial color="#ea580c" /></mesh>
          <pointLight color="#ea580c" intensity={1.5} distance={10} castShadow />
        </group>
        
        {/* Logs */}
        <mesh position={[-1.5, 0.3, 0]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow><cylinderGeometry args={[0.3, 0.3, 2]} /><meshStandardMaterial color="#451a03" /></mesh>
        
        {/* Tent */}
        <mesh position={[3, 1.5, 2]} rotation={[0, Math.PI/4, 0]} castShadow receiveShadow>
          <coneGeometry args={[2, 3, 4]} />
          <meshStandardMaterial color="#fef08a" />
        </mesh>
        
        {/* Crates and Barrels */}
        <group position={[5, 0, -2]}>
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#78350f" /></mesh>
          <mesh position={[0, 1.5, 0]} castShadow receiveShadow><boxGeometry args={[0.8, 0.8, 0.8]} /><meshStandardMaterial color="#854d0e" /></mesh>
          <mesh position={[1.2, 0.4, 0]} castShadow receiveShadow><cylinderGeometry args={[0.4, 0.4, 0.8, 8]} /><meshStandardMaterial color="#451a03" /></mesh>
        </group>
      </group>

      {/* 1. Grand Entrance Gate (South) */}
      <group position={[0, 0, 35]}>
        <mesh position={[-5, 5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 10, 2]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[5, 5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 10, 2]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 11, 0]} castShadow receiveShadow>
          <boxGeometry args={[14, 2, 2]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        {/* Arc */}
        <mesh position={[0, 12, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[4, 4, 2, 16, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* 2. Small Farm & Animals (East) */}
      <group position={[25, 0, 0]}>
        {/* Fences */}
        {[-4, 0, 4].map((z, i) => (
          <mesh key={i} position={[-5, 1, z]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 2, 0.2]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
        ))}
        <mesh position={[-5, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.2, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[-5, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.2, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>

        {/* Crops */}
        {[
          [-2, -2], [0, -2], [2, -2],
          [-2, 0], [0, 0], [2, 0],
          [-2, 2], [0, 2], [2, 2],
        ].map(([x, z], i) => (
          <group key={`crop-${i}`} position={[x, 0, z]}>
            <mesh position={[0, 0.1, 0]} receiveShadow><boxGeometry args={[1.5, 0.2, 1.5]} /><meshStandardMaterial color="#451a03" /></mesh>
            <mesh position={[0, 0.5, 0]} castShadow><boxGeometry args={[0.4, 0.8, 0.4]} /><meshStandardMaterial color="#facc15" flatShading /></mesh>
          </group>
        ))}

        {/* Low-Poly Sheep */}
        <group ref={sheepRef} position={[5, 0.5, 2]}>
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 1, 1]} />
            <meshStandardMaterial color="#f8fafc" roughness={1} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.8, 0.5, 0]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh castShadow receiveShadow position={[-0.5, -0.8, 0.3]}><boxGeometry args={[0.2, 0.6, 0.2]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh castShadow receiveShadow position={[-0.5, -0.8, -0.3]}><boxGeometry args={[0.2, 0.6, 0.2]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh castShadow receiveShadow position={[0.5, -0.8, 0.3]}><boxGeometry args={[0.2, 0.6, 0.2]} /><meshStandardMaterial color="#1e293b" /></mesh>
          <mesh castShadow receiveShadow position={[0.5, -0.8, -0.3]}><boxGeometry args={[0.2, 0.6, 0.2]} /><meshStandardMaterial color="#1e293b" /></mesh>
        </group>
      </group>

      {/* 3. Stream & Wooden Bridge (West) */}
      <group position={[-25, -1, 10]}>
        {/* Stream Water bed is handled by TerrainChunk, we add the bridge over it */}
        <group position={[0, 1.5, 0]}>
          {/* Bridge Base */}
          <mesh castShadow receiveShadow><boxGeometry args={[10, 0.4, 4]} /><meshStandardMaterial color="#78350f" /></mesh>
          {/* Railings */}
          <mesh position={[0, 1, 1.8]} castShadow receiveShadow><boxGeometry args={[10, 0.2, 0.2]} /><meshStandardMaterial color="#451a03" /></mesh>
          <mesh position={[0, 1, -1.8]} castShadow receiveShadow><boxGeometry args={[10, 0.2, 0.2]} /><meshStandardMaterial color="#451a03" /></mesh>
          {[-4, -2, 0, 2, 4].map((x, i) => (
            <React.Fragment key={`rail-${i}`}>
              <mesh position={[x, 0.5, 1.8]} castShadow receiveShadow><boxGeometry args={[0.2, 1, 0.2]} /><meshStandardMaterial color="#451a03" /></mesh>
              <mesh position={[x, 0.5, -1.8]} castShadow receiveShadow><boxGeometry args={[0.2, 1, 0.2]} /><meshStandardMaterial color="#451a03" /></mesh>
            </React.Fragment>
          ))}
        </group>
      </group>

      {/* 4. Secret Cave & Scenic Viewpoint (North-East Cliff) */}
      <group position={[35, 0, -35]} rotation={[0, -Math.PI / 4, 0]}>
        {/* Big Rock Formation */}
        <mesh position={[0, 5, 0]} castShadow receiveShadow>
          <dodecahedronGeometry args={[10, 0]} />
          <meshStandardMaterial color="#64748b" flatShading />
        </mesh>
        {/* Cave Entrance Cutout (using dark material to simulate hole) */}
        <mesh position={[0, 2, 9.5]}>
          <boxGeometry args={[4, 6, 1]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Viewpoint Sign */}
        <group position={[-8, 8, 2]}>
          <mesh position={[0, 1, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 2, 0.2]} /><meshStandardMaterial color="#78350f" /></mesh>
          <mesh position={[0, 2, 0]} castShadow receiveShadow><boxGeometry args={[2, 1, 0.2]} /><meshStandardMaterial color="#fef3c7" /></mesh>
        </group>
      </group>
    </group>
  );
}
