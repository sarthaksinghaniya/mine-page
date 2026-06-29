/**
 * @file src/features/assets/asset.types.ts
 * @description Type definitions for the asset preloading and management system.
 */

export type AssetType = 'gltf' | 'hdri' | 'texture' | 'audio' | 'font';

export type AssetStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface AssetEntry {
  id: string;
  src: string;
  type: AssetType;
  status: AssetStatus;
  progress: number; // 0–100 progress for this asset
  error?: string;
}

export interface AssetManifest {
  assets: AssetEntry[];
}

export interface AssetState {
  assets: Record<string, AssetEntry>;
  isLoading: boolean;
  totalProgress: number; // overall percentage 0-100
}
