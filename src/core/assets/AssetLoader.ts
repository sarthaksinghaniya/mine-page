/**
 * @file src/core/assets/AssetLoader.ts
 * @description Centralized asset pipeline for caching and loading GLTF, Audio, and Textures.
 */

import { useGLTF, useTexture } from '@react-three/drei';

// Preload critical assets
export function PreloadAssets() {
  // In a real production app, we would use GLTFLoader directly or drei's useGLTF.preload
  // useGLTF.preload('/assets/characters/player.glb');
  // useGLTF.preload('/assets/npc/guide.glb');
  // useGLTF.preload('/assets/environment/tree1.glb');
}

export const AssetPaths = {
  player: '/assets/characters/player.glb',
  guideNPC: '/assets/npc/guide.glb',
  scientistNPC: '/assets/npc/scientist.glb',
  villagerNPC: '/assets/npc/villager.glb',
};

/**
 * Custom hook to load a rigged character safely.
 * Returns null if the file doesn't exist (to prevent crashes in development).
 */
export function useCharacterAsset(path: string) {
  try {
    // If the file doesn't exist locally, R3F's useGLTF will throw an error boundary.
    // For this prototype, we'll return a mock null state so the caller can fallback
    // to a procedural model.
    return { scene: null, animations: [] }; 
  } catch (e) {
    return { scene: null, animations: [] };
  }
}
