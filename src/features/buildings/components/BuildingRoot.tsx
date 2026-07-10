/**
 * @file src/features/buildings/components/BuildingRoot.tsx
 * @description Advanced, clean, futuristic glassmorphic architecture.
 */

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { BuildingLot } from '../district.types';
import { usePlayerStore } from '@/features/player/player.store';

interface BuildingRootProps {
  lot: BuildingLot;
  color: string;
}

export function BuildingRoot({ lot, color }: BuildingRootProps): React.ReactElement {
  const playerPos = usePlayerStore((s) => s.position);
  const [near, setNear] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const dx = lot.position.x - playerPos.x;
    const dz = lot.position.z - playerPos.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    const isNear = distance < lot.interactRadius;
    if (isNear !== near) {
      setNear(isNear);
    }
    
    // Add subtle floating or glowing effect to some elements if desired
  });

  const isTall = lot.scale.y > 15;
  // Use custom color from meta if available, else use zone color
  let colorValue = color;
  if (lot.meta?.data?.borderGlow) {
    // borderGlow is like "rgba(61, 220, 151, 0.8)", extract rgb or just use hex mapping if available. 
    // Fallback to tailwind classes mapping if needed, or simply let Three parse the rgba string.
    colorValue = lot.meta.data.borderGlow;
  }
  const baseColor = new THREE.Color(colorValue);
  const emissiveIntensity = 2.0;

  return (
    <group
      ref={groupRef}
      position={[lot.position.x, lot.position.y + lot.scale.y / 2, lot.position.z]}
      rotation={[0, lot.rotation, 0]}
    >
      {/* Base Foundation (Sleek Dark Metal) */}
      <mesh position={[0, -lot.scale.y / 2 + 1, 0]} castShadow receiveShadow>
        <boxGeometry args={[lot.scale.x + 1.5, 2, lot.scale.z + 1.5]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Main Structure (Glassmorphic Core) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[lot.scale.x, lot.scale.y, lot.scale.z]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          metalness={0.2}
          roughness={0.1}
          transmission={0.9} 
          ior={1.5}
          thickness={0.5}
          envMapIntensity={1.0}
        />
      </mesh>
      
      {/* Inner Core (Neon Center to shine through glass) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[lot.scale.x * 0.2, lot.scale.x * 0.2, lot.scale.y * 0.9, 16]} />
        <meshStandardMaterial 
          color={baseColor} 
          emissive={baseColor} 
          emissiveIntensity={0.5} 
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Sleek Roof (Tech Deck) */}
      <mesh position={[0, lot.scale.y / 2 + 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[lot.scale.x + 0.5, 1, lot.scale.z + 0.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Roof Edge Glow */}
      <mesh position={[0, lot.scale.y / 2 + 1, 0]}>
        <boxGeometry args={[lot.scale.x + 0.6, 0.2, lot.scale.z + 0.6]} />
        <meshBasicMaterial color={baseColor} />
      </mesh>

      {/* Pillars (Neon Edge Trims) */}
      {[
        [-1, -1], [1, -1], [-1, 1], [1, 1]
      ].map(([x, z], i) => (
        <mesh key={i} position={[x * (lot.scale.x / 2 + 0.1), 0, z * (lot.scale.z / 2 + 0.1)]} castShadow receiveShadow>
          <boxGeometry args={[0.4, lot.scale.y + 1, 0.4]} />
          <meshStandardMaterial 
            color={baseColor} 
            emissive={baseColor} 
            emissiveIntensity={1.2} 
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Futuristic Entrance Door (Holographic/Glass) */}
      <mesh position={[0, -lot.scale.y / 2 + 3, lot.scale.z / 2 + 0.1]} castShadow>
        <boxGeometry args={[5, 6, 0.4]} />
        <meshPhysicalMaterial 
          color={baseColor} 
          transmission={0.8}
          roughness={0.1}
          metalness={0.5}
          emissive={baseColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Glowing Interaction Ring */}
      {near && lot.interior && (
        <mesh position={[0, -lot.scale.y / 2 + 0.2, lot.scale.z / 2 + 4]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2, 2.3, 32]} />
          <meshBasicMaterial color={baseColor} transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      )}

      <Html 
        position={[0, lot.scale.y / 2 + (isTall ? 5 : 8), 0]} 
        center 
        transform 
        sprite 
        distanceFactor={40}
        zIndexRange={[100, 0]}
      >
        <div className="flex flex-col items-center pointer-events-none transition-all duration-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          {lot.floatingLabel ? (
            <div className="flex flex-col items-center overflow-hidden rounded-xl border border-white/20 shadow-2xl backdrop-blur-md bg-slate-900/60 transform transition-transform hover:scale-105 duration-300">
              <div className={`${lot.floatingLabel.colorClass} px-4 py-1.5 w-full flex justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]`}>
                <span className="text-white font-black tracking-wide text-[16px] uppercase whitespace-nowrap drop-shadow-md">
                  {lot.floatingLabel.title}
                </span>
              </div>
              <div className="px-4 py-2 w-full flex justify-center bg-slate-900/80">
                <span className="text-slate-200 font-medium text-[13px] whitespace-nowrap">
                  {lot.floatingLabel.subtitle}
                </span>
              </div>
            </div>
          ) : (
            <div 
              className="bg-black/60 backdrop-blur-xl rounded-2xl px-8 py-3 border border-white/10 flex flex-col items-center shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
              style={{ boxShadow: `0 0 20px ${color}40` }}
            >
              <span 
                className="text-white font-black tracking-[0.2em] text-xl uppercase text-center" 
                style={{ textShadow: `0 0 15px ${color}, 0 0 5px ${color}` }}
              >
                {lot.name}
              </span>
            </div>
          )}
          
          {lot.interior && near && !lot.floatingLabel && (
            <div className="mt-3 animate-bounce">
              <span className="text-white text-xs font-bold tracking-[0.3em] uppercase bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/30 shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                Press E to Enter
              </span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}
