/**
 * @file src/features/assets/hooks/useAsset.ts
 * @description Typed hook for fetching preloaded assets.
 */

import { AssetManager } from '../AssetManager';

/**
 * Fetches an asset from the preload cache. Throws if the asset has not been loaded.
 */
export function useAsset<T>(id: string): T {
  return AssetManager.get<T>(id);
}
