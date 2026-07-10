/**
 * @file src/features/lighting/components/SunLight.tsx
 * @description Directional sunlight with soft shadows and golden hour warmth.
 */

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useLightingStore } from '../lighting.store';
import { performanceProfile } from '@config/performance';

export function SunLight(): React.ReactElement | null {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  
  const sunEnabled = useLightingStore((s: any) => s.sunEnabled ?? true);
  const sunIntensity = useLightingStore((s: any) => s.sunIntensity ?? 1.5) * 1.5; // Boosted for AAA look
  const sunColor = '#ffe4b5'; // Golden hour warm sunlight (Genshin/Zelda)

  // In a real app we'd link this to time of day
  const sunPosition = new THREE.Vector3(100, 200, 100);

  useFrame(({ camera }) => {
    if (lightRef.current && (performanceProfile as any).shadowsEnabled !== false) {
      // Keep sun shadows centered on camera for crisp dynamic shadows
      lightRef.current.position.x = camera.position.x + sunPosition.x;
      lightRef.current.position.z = camera.position.z + sunPosition.z;
      lightRef.current.target.position.set(camera.position.x, 0, camera.position.z);
      lightRef.current.target.updateMatrixWorld();
    }
  });

  if (!sunEnabled) return null;

  return (
    <directionalLight
      ref={lightRef}
      color={sunColor}
      intensity={sunIntensity}
    />
  );
}
