/**
 * @file src/features/world/components/EnvironmentalVFX.tsx
 * @description High-performance particle systems for weather and ambient life.
 */

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLightingStore } from '@/features/lighting/lighting.store';
import { usePlayerStore } from '@/features/player/player.store';

const PARTICLE_COUNT = 300;

export function EnvironmentalVFX(): React.ReactElement {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const playerPos = usePlayerStore((s) => s.position);
  
  // Dummy weather state (in a real app, this would come from a WeatherStore)
  const isNight = false; // Mocking day for now
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Particle State
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 60,
        Math.random() * 10,
        (Math.random() - 0.5) * 60
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      ),
      scale: Math.random() * 0.5 + 0.1,
      type: Math.random() > 0.5 ? 'leaf' : (isNight ? 'firefly' : 'butterfly')
    }));
  }, [isNight]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    particles.forEach((p, i) => {
      // Move particles
      p.position.add(p.velocity);
      
      // Wrap around player so they never run out of particles
      if (p.position.x > playerPos.x + 30) p.position.x = playerPos.x - 30;
      if (p.position.x < playerPos.x - 30) p.position.x = playerPos.x + 30;
      if (p.position.z > playerPos.z + 30) p.position.z = playerPos.z - 30;
      if (p.position.z < playerPos.z - 30) p.position.z = playerPos.z + 30;
      
      // Gentle floating constraint
      if (p.position.y > 10) p.velocity.y -= 0.001;
      if (p.position.y < 0.5) p.velocity.y += 0.001;

      // Wavy motion (butterflies/leaves)
      p.velocity.x += (Math.random() - 0.5) * 0.01;
      p.velocity.z += (Math.random() - 0.5) * 0.01;

      dummy.position.copy(p.position);
      
      // Spin leaves
      if (p.type === 'leaf') {
        dummy.rotation.x += 0.05;
        dummy.rotation.y += 0.02;
      }

      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      // Set color
      if (p.type === 'leaf') {
        meshRef.current!.setColorAt(i, new THREE.Color('#4ade80')); // Green leaf
      } else if (p.type === 'butterfly') {
        meshRef.current!.setColorAt(i, new THREE.Color('#fbbf24')); // Yellow butterfly
      } else {
        meshRef.current!.setColorAt(i, new THREE.Color('#fcd34d')); // Firefly
      }
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <planeGeometry args={[0.2, 0.2]} />
      <meshBasicMaterial side={THREE.DoubleSide} transparent opacity={0.8} />
    </instancedMesh>
  );
}
