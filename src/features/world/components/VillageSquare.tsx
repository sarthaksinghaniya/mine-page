/**
 * @file src/features/world/components/VillageSquare.tsx
 * @description Highly polished vertical slice of the Spawn Village (Zelda/Genshin style).
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

export function VillageSquare(): React.ReactElement {
  const windmillBladeRef = useRef<THREE.Group>(null);
  const fountainWaterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Animate windmill
    if (windmillBladeRef.current) {
      windmillBladeRef.current.rotation.z = t * -0.5;
    }
    
    // Animate fountain water pulse
    if (fountainWaterRef.current) {
      fountainWaterRef.current.position.y = 1.1 + Math.sin(t * 3) * 0.05;
      fountainWaterRef.current.scale.x = 1 + Math.sin(t * 2) * 0.02;
      fountainWaterRef.current.scale.z = 1 + Math.sin(t * 2) * 0.02;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      
      {/* --- 1. STONE PLAZA & PATHS --- */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[25, 32]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.9} flatShading />
      </mesh>
      
      {/* Decorative center ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
        <ringGeometry args={[12, 14, 32]} />
        <meshStandardMaterial color="#64748b" roughness={0.9} />
      </mesh>

      {/* --- 2. CENTRAL ANIMATED FOUNTAIN --- */}
      <group position={[0, 0, 0]}>
        {/* Base Pool */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[6, 6, 1, 16]} />
          <meshStandardMaterial color="#e2e8f0" flatShading />
        </mesh>
        {/* Inner Pool cutoff */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[5.5, 5.5, 0.1, 16]} />
          <meshStandardMaterial color="#0ea5e9" transparent opacity={0.8} />
        </mesh>
        
        {/* Center Pillar */}
        <mesh position={[0, 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1, 1.5, 4, 8]} />
          <meshStandardMaterial color="#cbd5e1" flatShading />
        </mesh>
        
        {/* Top Bowl */}
        <mesh position={[0, 4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[3, 1, 0.5, 12]} />
          <meshStandardMaterial color="#cbd5e1" flatShading />
        </mesh>
        
        {/* Spouting Water */}
        <mesh ref={fountainWaterRef} position={[0, 4.25, 0]}>
          <cylinderGeometry args={[0.5, 2.5, 1, 12]} />
          <meshBasicMaterial color="#7dd3fc" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* --- 3. ENVIRONMENTAL STORYTELLING (SIGNS/BOARDS) --- */}
      {/* Welcome Sign */}
      <group position={[0, 0, 20]} rotation={[0, 0, 0]}>
        <mesh position={[-1.5, 2, 0]} castShadow><boxGeometry args={[0.2, 4, 0.2]} /><meshStandardMaterial color="#78350f" /></mesh>
        <mesh position={[1.5, 2, 0]} castShadow><boxGeometry args={[0.2, 4, 0.2]} /><meshStandardMaterial color="#78350f" /></mesh>
        <mesh position={[0, 3, 0]} castShadow><boxGeometry args={[4, 1.5, 0.2]} /><meshStandardMaterial color="#fef3c7" /></mesh>
        <Html position={[0, 3, 0.11]} center transform>
          <div className="bg-transparent text-[#78350f] font-serif font-bold text-center w-[200px]">
            <h1 className="text-xl">Sarthak Dev</h1>
            <p className="text-sm">Full Stack & AI Engineer</p>
          </div>
        </Html>
      </group>

      {/* Skills Board */}
      <group position={[-15, 0, 10]} rotation={[0, Math.PI / 4, 0]}>
        <mesh position={[0, 2, 0]} castShadow><boxGeometry args={[4, 3, 0.2]} /><meshStandardMaterial color="#451a03" /></mesh>
        <mesh position={[0, 0.5, 0]} castShadow><boxGeometry args={[1, 1, 0.2]} /><meshStandardMaterial color="#78350f" /></mesh>
        <Html position={[0, 2, 0.11]} center transform scale={0.5}>
          <div className="bg-[#fef3c7] p-2 border-4 border-[#78350f] text-[#451a03] font-mono text-xs w-[160px] h-[200px]">
            <b>SKILLS:</b><br/>- React / Next.js<br/>- Three.js / WebGL<br/>- Node.js<br/>- Python / AI<br/>- TailwindCSS
          </div>
        </Html>
      </group>

      {/* --- 4. MARKET STALLS & PROPS --- */}
      {/* Stall 1 (Projects) */}
      <group position={[12, 0, -10]} rotation={[0, -Math.PI / 6, 0]}>
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow><boxGeometry args={[4, 3, 2]} /><meshStandardMaterial color="#854d0e" /></mesh>
        <mesh position={[0, 3.5, 0]} castShadow receiveShadow><coneGeometry args={[3, 2, 4]} /><meshStandardMaterial color="#ef4444" flatShading /></mesh>
        <Html position={[0, 4.5, 0]} center transform sprite>
          <div className="bg-red-500/80 text-white px-2 py-1 rounded-full text-xs font-bold border border-white">
            PROJECTS
          </div>
        </Html>
      </group>

      {/* --- 5. WINDMILL (Animated) --- */}
      <group position={[-20, 0, -15]} rotation={[0, Math.PI / 4, 0]}>
        {/* Tower */}
        <mesh position={[0, 8, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2, 3, 16, 8]} />
          <meshStandardMaterial color="#e2e8f0" flatShading />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 17, 0]} castShadow receiveShadow>
          <coneGeometry args={[2.5, 3, 8]} />
          <meshStandardMaterial color="#1e293b" flatShading />
        </mesh>
        {/* Blades */}
        <group ref={windmillBladeRef} position={[0, 14, 2.2]}>
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.5, 0.5, 1]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[0, 4, 0.2]} castShadow>
            <boxGeometry args={[1, 8, 0.1]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0, -4, 0.2]} castShadow>
            <boxGeometry args={[1, 8, 0.1]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[4, 0, 0.2]} rotation={[0, 0, Math.PI/2]} castShadow>
            <boxGeometry args={[1, 8, 0.1]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[-4, 0, 0.2]} rotation={[0, 0, Math.PI/2]} castShadow>
            <boxGeometry args={[1, 8, 0.1]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
      </group>

      {/* --- 6. FLOWER BEDS & BENCHES --- */}
      {[
        [-8, 8], [8, 8], [-8, -8], [8, -8]
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Planter Box */}
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[3, 1, 3]} />
            <meshStandardMaterial color="#a16207" />
          </mesh>
          {/* Dirt */}
          <mesh position={[0, 1.05, 0]}>
            <boxGeometry args={[2.8, 0.1, 2.8]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          {/* Flower */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <sphereGeometry args={[0.6, 8, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#ec4899" : "#a855f7"} flatShading />
          </mesh>
          
          {/* Wooden Bench nearby */}
          <group position={[x > 0 ? 3 : -3, 0.5, 0]} rotation={[0, x > 0 ? Math.PI/2 : -Math.PI/2, 0]}>
            <mesh castShadow receiveShadow><boxGeometry args={[2, 0.2, 1]} /><meshStandardMaterial color="#78350f" /></mesh>
            <mesh position={[-0.8, -0.4, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 0.8, 0.8]} /><meshStandardMaterial color="#78350f" /></mesh>
            <mesh position={[0.8, -0.4, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 0.8, 0.8]} /><meshStandardMaterial color="#78350f" /></mesh>
          </group>
        </group>
      ))}

      {/* --- 7. LANTERNS (Lighting) --- */}
      {[
        [-15, 0], [15, 0], [0, -20]
      ].map(([x, z], i) => (
        <group key={`lantern-${i}`} position={[x, 0, z]}>
          <mesh position={[0, 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.1, 4]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0, 4.2, 0]}>
            <boxGeometry args={[0.6, 0.8, 0.6]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <pointLight position={[0, 4.2, 0]} color="#fef08a" intensity={2} distance={15} castShadow />
        </group>
      ))}

    </group>
  );
}
