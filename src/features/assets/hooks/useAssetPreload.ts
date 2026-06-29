/**
 * @file src/features/assets/hooks/useAssetPreload.ts
 * @description Hook to preload batch asset items on mount.
 */

import { useEffect, useState } from 'react';
import { AssetManager } from '../AssetManager';
import type { AssetEntry } from '../asset.types';

/**
 * Preloads a list of assets and returns the completion/loading status.
 */
export function useAssetPreload(entries: AssetEntry[]): { loaded: boolean; error: string | null } {
  const [state, setState] = useState<{ loaded: boolean; error: string | null }>({
    loaded: false,
    error: null,
  });

  useEffect(() => {
    let active = true;

    AssetManager.preload(entries)
      .then(() => {
        if (active) {
          setState({ loaded: true, error: null });
        }
      })
      .catch((err) => {
        if (active) {
          setState({
            loaded: false,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      });

    return () => {
      active = false;
    };
  }, [entries]);

  return state;
}
