import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import { DistrictScene } from '../components/DistrictScene';

export default function AchievementMuseumScene() {
  const monolithsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (monolithsRef.current) {
      monolithsRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <DistrictScene id="achievement-museum">
      {/* Golden Central Monument */}
      <group position={[0, 4, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4, 8, 4]} />
          <meshStandardMaterial color="#ffcc00" roughness={0.2} metalness={0.9} />
        </mesh>
        <pointLight color="#ffcc00" intensity={2} distance={20} />
      </group>

      {/* Floating Monoliths */}
      <group ref={monolithsRef} position={[0, 6, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh 
            key={i} 
            position={[Math.sin((i * Math.PI) / 2) * 8, Math.sin(i) * 2, Math.cos((i * Math.PI) / 2) * 8]}
            rotation={[Math.PI / 4, i, 0]}
            castShadow
          >
            <octahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffaa00" emissiveIntensity={0.5} wireframe />
          </mesh>
        ))}
      </group>
      
      {/* Museum Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.8} />
      </mesh>
    </DistrictScene>
  );
}
