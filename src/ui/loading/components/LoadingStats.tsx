/**
 * @file src/ui/loading/components/LoadingStats.tsx
 * @description Dynamic description stats displaying file downloads and assets.
 */

import React from 'react';
import type { AssetEntry } from '@/features/assets/asset.types';

interface LoadingStatsProps {
  progress: number;
  assets: Record<string, AssetEntry>;
}

export function LoadingStats({ progress, assets }: LoadingStatsProps): React.ReactElement {
  const activeList = Object.values(assets);
  const total = activeList.length;
  const loaded = activeList.filter((a) => a.status === 'loaded').length;

  // Locate the active loading target
  const currentAsset = activeList.find((a) => a.status === 'loading');
  const currentName = currentAsset ? currentAsset.src.split('/').pop() ?? 'asset' : 'Ready';

  return (
    <div style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: '11px', color: '#a0a0c0' }}>
      <div style={{ color: '#00e5f0', fontSize: '14px', marginBottom: '8px', fontWeight: 'bold' }}>
        {progress}%
      </div>
      {total > 0 && (
        <div style={{ marginBottom: '4px' }}>
          Assets: {loaded} / {total}
        </div>
      )}
      <div style={{ opacity: 0.6, fontSize: '10px' }}>
        {currentAsset ? `Fetching: ${currentName}` : 'Connecting environment...'}
      </div>
    </div>
  );
}
