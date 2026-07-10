/**
 * @file src/features/world/components/CollectibleManager.tsx
 * @description Renders interactive collectibles in the 3D world.
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Collectible } from '@/features/gameplay/quest.store';
import { useQuestStore } from '@/features/gameplay/quest.store';
import { usePlayerStore } from '@/features/player/player.store';
import { Html } from '@react-three/drei';

function CollectibleItem({ item }: { item: Collectible }) {
  const meshRef = useRef<THREE.Group>(null);
  const collectItem = useQuestStore((s) => s.collectItem);
  const playerPos = usePlayerStore((s) => s.position);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = item.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;

      // Distance check for collection
      const dx = item.position[0] - playerPos.x;
      const dz = item.position[2] - playerPos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      
      if (dist < 2.0) {
        collectItem(item.id);
        // Dispatch UI notification event or play sound here
      }
    }
  });

  // Different visuals based on type
  return (
    <group ref={meshRef} position={new THREE.Vector3(...item.position)}>
      {item.type === 'coin' && (
        <mesh castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>
      )}
      {item.type === 'book' && (
        <mesh castShadow rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[0.8, 1.2, 0.2]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      )}
      {item.type === 'crystal' && (
        <mesh castShadow>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#a855f7" transparent opacity={0.8} />
        </mesh>
      )}
      
      <pointLight color="#ffffff" intensity={0.5} distance={3} />
      
      <Html position={[0, 1, 0]} center sprite distanceFactor={15} zIndexRange={[100, 0]}>
        <div className="bg-black/50 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full border border-white/20 pointer-events-none drop-shadow-md">
          {item.name}
        </div>
      </Html>
    </group>
  );
}

export function CollectibleManager(): React.ReactElement {
  const collectibles = useQuestStore((s) => s.collectibles);
  return (
    <group name="collectible-manager">
      {collectibles.filter(c => !c.collected).map(c => (
        <CollectibleItem key={c.id} item={c} />
      ))}
    </group>
  );
}
