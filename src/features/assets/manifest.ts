/**
 * @file src/features/assets/manifest.ts
 * @description Centralized registry of all game assets.
 */

import type { AssetEntry } from './asset.types';

export const ASSET_MANIFEST: Record<string, AssetEntry> = {
  // Environment HDRI files
  'env-default': {
    id: 'env-default',
    src: 'https://unpkg.com/@react-three/drei@9.105.11/assets/hdr/warehouse.hdr', // Fallback CDN HDRI
    type: 'hdri',
    status: 'idle',
    progress: 0,
  },

  // Audio files
  'ambient-bg': {
    id: 'ambient-bg',
    src: '/audio/ambient-bg.mp3',
    type: 'audio',
    status: 'idle',
    progress: 0,
  },

  // Mesh/GLTF placeholders
  'mesh-cube': {
    id: 'mesh-cube',
    src: '/models/cube.glb', // Local placeholder
    type: 'gltf',
    status: 'idle',
    progress: 0,
  },
};

export const ALL_ASSETS: AssetEntry[] = Object.values(ASSET_MANIFEST);
