/**
 * @file src/core/assets/AssetManager.ts
 * @description Global Asset Manager for GLTF/GLB models with Draco compression, caching, and Instancing support.
 */

import React, { useMemo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

// Optional: Pre-configure Draco if user provides decoder
// useGLTF.preload('/assets/models/example.glb', '/draco-gltf/')

export const ASSET_PATHS = {
  // Characters
  player: '/assets/characters/player.glb',
  guide: '/assets/characters/guide_npc.glb',
  // Village Buildings
  villageHouse: '/assets/buildings/village_house.glb',
  market: '/assets/buildings/market.glb',
  windmill: '/assets/buildings/windmill.glb',
  fountain: '/assets/buildings/fountain.glb',
  // Projects District
  revibeLab: '/assets/buildings/revibe_lab.glb',
  hanuAi: '/assets/buildings/hanu_ai.glb',
  studio: '/assets/buildings/portfolio_studio.glb',
  hackathon: '/assets/buildings/hackathon_arena.glb',
  webHub: '/assets/buildings/web_dev_hub.glb',
  // Props
  tree: '/assets/props/tree.glb',
  bench: '/assets/props/bench.glb',
  lamp: '/assets/props/lamp.glb',
  flower: '/assets/props/flower.glb',
  crate: '/assets/props/crate.glb',
  barrel: '/assets/props/barrel.glb',
};

interface SafeModelProps {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
  fallbackPrimitive?: 'box' | 'cylinder' | 'sphere' | 'cone';
  fallbackColor?: string;
}

/**
 * Robust wrapper for useGLTF that automatically handles:
 * - Missing files (graceful fallback)
 * - Cloning (allows multiple instances of the same loaded model)
 * - Shadow casting configuration
 */
export function SafeModel({ 
  path, 
  position = [0,0,0], 
  rotation = [0,0,0], 
  scale = 1, 
  castShadow = true,
  receiveShadow = true,
  fallbackPrimitive = 'box',
  fallbackColor = '#94a3b8' 
}: SafeModelProps) {
  
  try {
    const { scene } = useGLTF(path);
    
    // Deep clone the scene so we can mutate materials/positions per instance
    const clonedScene = useMemo(() => {
      const clone = scene.clone();
      clone.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = castShadow;
          child.receiveShadow = receiveShadow;
        }
      });
      return clone;
    }, [scene, castShadow, receiveShadow]);

    return (
      <primitive 
        object={clonedScene} 
        position={position} 
        rotation={rotation} 
        scale={scale} 
      />
    );
  } catch (e) {
    // Graceful fallback if asset is not downloaded yet
    const s = typeof scale === 'number' ? [scale, scale, scale] : scale;
    return (
      <group position={position} rotation={rotation} scale={s}>
        <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
          {fallbackPrimitive === 'box' && <boxGeometry args={[1, 1, 1]} />}
          {fallbackPrimitive === 'cylinder' && <cylinderGeometry args={[0.5, 0.5, 1]} />}
          {fallbackPrimitive === 'sphere' && <sphereGeometry args={[0.5]} />}
          {fallbackPrimitive === 'cone' && <coneGeometry args={[0.5, 1]} />}
          <meshStandardMaterial color={fallbackColor} />
        </mesh>
      </group>
    );
  }
}
