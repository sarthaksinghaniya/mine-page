/**
 * @file src/features/lighting/components/FogLayer.tsx
 * @description Scene fog applied imperatively to Three.js scene.
 *
 * Supports:
 * - FogExp2 (exponential) — best for outdoor scenes
 * - Fog (linear) — best for interiors / stylistic effects
 * - None — disabled
 *
 * Applied imperatively via `useThree(state => state.scene)` because
 * declarative fog in R3F requires JSX inside the scene graph, which
 * creates unnecessary re-renders when color changes each frame.
 */

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLightingStore } from '../lighting.store';

export function FogLayer(): null {
  const { scene } = useThree();
  const fog = useLightingStore((s) => s.fog);

  useEffect(() => {
    switch (fog.type) {
      case 'exponential':
        scene.fog = new THREE.FogExp2(fog.color, fog.density);
        break;
      case 'linear':
        scene.fog = new THREE.Fog(fog.color, fog.near, fog.far);
        break;
      case 'none':
      default:
        scene.fog = null;
        break;
    }

    return () => {
      // Clean up fog when FogLayer unmounts
      scene.fog = null;
    };
  }, [scene, fog.type, fog.color, fog.density, fog.near, fog.far]);

  return null;
}
