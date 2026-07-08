import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import { DistrictScene } from '@/features/world/components/DistrictScene';

export default function ExperienceTowerScene() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, idx) => {
        ring.rotation.y = clock.getElapsedTime() * (0.2 + idx * 0.1);
        ring.position.y = (Math.sin(clock.getElapsedTime() + idx) * 2) + (idx * 5);
      });
    }
  });

  return (
    <DistrictScene id="experience-tower">
      {/* Massive Glass Tower Base */}
      <group position={[0, 10, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[6, 6, 20, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Floating Neon Rings */}
      <group ref={ringsRef} position={[0, 5, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[8 + i * 2, 0.2, 16, 64]} />
            <meshBasicMaterial color="#00e5f0" transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#001122" roughness={0.7} />
      </mesh>
    </DistrictScene>
  );
}
