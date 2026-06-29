/**
 * @file src/features/assets/asset.store.ts
 * @description Zustand store for asset preloading progress and cache states.
 */

import { create } from 'zustand';
import type { AssetState, AssetEntry, AssetStatus } from './asset.types';

interface AssetActions {
  /** Register assets before load starts */
  registerAssets: (entries: AssetEntry[]) => void;
  /** Update loading progress of a specific asset */
  updateAssetProgress: (id: string, progress: number, status?: AssetStatus) => void;
  /** Mark an asset loaded */
  setAssetLoaded: (id: string) => void;
  /** Mark an asset error */
  setAssetError: (id: string, errorMsg: string) => void;
}

type AssetStore = AssetState & AssetActions;

export const useAssetStore = create<AssetStore>()((set, get) => ({
  assets: {},
  isLoading: false,
  totalProgress: 0,

  registerAssets: (entries) => {
    const assets: Record<string, AssetEntry> = { ...get().assets };
    let alreadyLoading = get().isLoading;

    entries.forEach((e) => {
      if (!assets[e.id]) {
        assets[e.id] = { ...e, status: 'idle', progress: 0 };
        alreadyLoading = true;
      }
    });

    set({ assets, isLoading: alreadyLoading, totalProgress: 0 });
  },

  updateAssetProgress: (id, progress, status = 'loading') => {
    const assets = { ...get().assets };
    const asset = assets[id];
    if (!asset) return;

    assets[id] = {
      ...asset,
      progress,
      status,
    };

    // Calculate total average progress of loading assets
    const activeList = Object.values(assets);
    const totalCount = activeList.length;
    const loadedCount = activeList.filter((a) => a.status === 'loaded').length;

    let totalPercent = 0;
    if (totalCount > 0) {
      const sumProgress = activeList.reduce((sum, a) => sum + a.progress, 0);
      totalPercent = sumProgress / totalCount;
    }

    set({
      assets,
      totalProgress: Math.min(Math.round(totalPercent), 100),
      isLoading: loadedCount < totalCount,
    });
  },

  setAssetLoaded: (id) => {
    get().updateAssetProgress(id, 100, 'loaded');
  },

  setAssetError: (id, errorMsg) => {
    get().updateAssetProgress(id, 0, 'error');
    const assets = { ...get().assets };
    const asset = assets[id];
    if (asset) {
      assets[id] = { ...asset, error: errorMsg };
      set({ assets });
    }
  },
}));
