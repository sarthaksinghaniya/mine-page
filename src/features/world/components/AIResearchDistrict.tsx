/**
 * @file src/features/world/components/AIResearchDistrict.tsx
 * @description Highly polished vertical slice of the AI Research District (Modern/Glass/Tech style).
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

export function AIResearchDistrict(): React.ReactElement {
  const hologramRef = useRef<THREE.Mesh>(null);
  const dataStreamRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Animate central hologram
    if (hologramRef.current) {
      hologramRef.current.rotation.y = t * 0.5;
      hologramRef.current.position.y = 4 + Math.sin(t * 2) * 0.2;
    }

    // Animate data streams (rotating rings)
    if (dataStreamRef.current) {
      dataStreamRef.current.rotation.x = t * 0.3;
      dataStreamRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group position={[400, 0, 0]}>
      {/* --- 1. MODERN CAMPUS PLAZA --- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.2} flatShading />
      </mesh>
      
      {/* Neon Grid Floor Overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[15, 18, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>

      {/* --- 2. CENTRAL NEURAL CORE (Hologram) --- */}
      <group position={[0, 0, 0]}>
        {/* Core Base */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[4, 5, 2, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Glowing Hologram */}
        <mesh ref={hologramRef} position={[0, 4, 0]}>
          <icosahedronGeometry args={[2, 1]} />
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.8} />
        </mesh>
        
        {/* Orbiting Data Streams */}
        <group ref={dataStreamRef} position={[0, 4, 0]}>
          <mesh rotation={[Math.PI/4, 0, 0]}>
            <torusGeometry args={[3, 0.05, 16, 64]} />
            <meshBasicMaterial color="#93c5fd" />
          </mesh>
          <mesh rotation={[-Math.PI/4, 0, 0]}>
            <torusGeometry args={[3.5, 0.05, 16, 64]} />
            <meshBasicMaterial color="#3b82f6" />
          </mesh>
        </group>
        <pointLight color="#60a5fa" intensity={2} distance={20} />
      </group>

      {/* --- 3. ENVIRONMENTAL STORYTELLING (ROBOTICS & DATA) --- */}
      {/* AI Terminal */}
      <group position={[0, 0, 20]} rotation={[0, 0, 0]}>
        <mesh position={[0, 2, 0]} castShadow><boxGeometry args={[4, 4, 1]} /><meshStandardMaterial color="#0f172a" metalness={0.8} /></mesh>
        <mesh position={[0, 2.5, 0.51]}><planeGeometry args={[3.5, 2.5]} /><meshBasicMaterial color="#000000" /></mesh>
        <Html position={[0, 2.5, 0.52]} center transform scale={0.5}>
          <div className="bg-black/90 p-4 border border-blue-500/50 rounded text-blue-400 font-mono text-xs w-[300px]">
            <h3 className="text-lg text-white mb-2">Neural Net Status</h3>
            <p>Loss: 0.0014</p>
            <p>Accuracy: 99.8%</p>
            <p className="mt-2 text-green-400">System Online.</p>
          </div>
        </Html>
      </group>

      {/* --- 4. GLASS LABORATORIES --- */}
      {/* Main Lab Building */}
      <group position={[-20, 0, -10]} rotation={[0, Math.PI / 6, 0]}>
        <mesh position={[0, 6, 0]} castShadow receiveShadow>
          <boxGeometry args={[12, 12, 12]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.1} transparent opacity={0.4} /> {/* Glass */}
        </mesh>
        {/* Frame */}
        <mesh position={[0, 12, 0]} castShadow receiveShadow>
          <boxGeometry args={[13, 0.5, 13]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Server Racks Inside */}
        <group position={[0, 0, 0]}>
          <mesh position={[-3, 2, -3]}><boxGeometry args={[2, 4, 1]} /><meshStandardMaterial color="#334155" /></mesh>
          <mesh position={[3, 2, -3]}><boxGeometry args={[2, 4, 1]} /><meshStandardMaterial color="#334155" /></mesh>
          <mesh position={[-3, 2, 3]}><boxGeometry args={[2, 4, 1]} /><meshStandardMaterial color="#334155" /></mesh>
        </group>
      </group>

      {/* --- 5. INDOOR GARDEN / BIOME --- */}
      <group position={[20, 0, 15]}>
        <mesh position={[0, 4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[6, 6, 8, 32]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.3} roughness={0.1} />
        </mesh>
        <mesh position={[0, 8, 0]} castShadow receiveShadow>
          <sphereGeometry args={[6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.3} roughness={0.1} />
        </mesh>
        {/* Tree Inside */}
        <mesh position={[0, 2, 0]}><cylinderGeometry args={[0.2, 0.4, 4]} /><meshStandardMaterial color="#451a03" /></mesh>
        <mesh position={[0, 5, 0]}><icosahedronGeometry args={[3, 0]} /><meshStandardMaterial color="#22c55e" flatShading /></mesh>
      </group>

    </group>
  );
}
