/**
 * @file src/features/lighting/components/FogLayer.tsx
 * @description Stylized distance fog matching the sky atmosphere.
 */

import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLightingStore } from '../lighting.store';

export function FogLayer(): React.ReactElement | null {
  const { scene } = useThree();
  const fogEnabled = useLightingStore((s) => s.fogEnabled);
  const fogDensity = useLightingStore((s) => s.fogDensity) * 0.8; // Reduced slightly for visibility
  const fogColor = '#dbeafe'; // Soft blue/white distance haze (Zelda/Genshin)

  useEffect(() => {
    if (fogEnabled) {
      scene.fog = new THREE.FogExp2(fogColor, fogDensity);
      // Give the scene a matching background color to blend the fog seamlessly
      scene.background = new THREE.Color(fogColor);
    } else {
      scene.fog = null;
      scene.background = null;
    }

    return () => {
      scene.fog = null;
      scene.background = null;
    };
  }, [scene, fogEnabled, fogColor, fogDensity]);

  return null;
}
