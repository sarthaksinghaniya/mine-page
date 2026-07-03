/**
 * @file src/ui/loading/LoadingScreen.tsx
 * @description Root loader page providing smooth exit fades.
 */

import React, { useEffect, useState } from 'react';
import { useAssetStore } from '@/features/assets/asset.store';
import { LoadingLogo } from './components/LoadingLogo';
import { LoadingBar } from './components/LoadingBar';
import { LoadingStats } from './components/LoadingStats';

export function LoadingScreen(): React.ReactElement | null {
  const assets = useAssetStore((s) => s.assets);
  const totalProgress = useAssetStore((s) => s.totalProgress);
  const isLoading = useAssetStore((s) => s.isLoading);

  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Dismiss the loading screen as soon as the engine reports no pending loads.
    // If nothing was ever registered, isLoading starts false and we exit immediately.
    if (!isLoading) {
      const fadeTimeout = setTimeout(() => { setOpacity(0); }, 500);
      const removeTimeout = setTimeout(() => { setVisible(false); }, 1100);
      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(removeTimeout);
      };
    }
    return undefined;
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050508',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: opacity,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 30, // Z_MENU from constants
      }}
    >
      <div style={{ position: 'relative' }}>
        <LoadingLogo />
        <LoadingBar progress={totalProgress} />
        <LoadingStats progress={totalProgress} assets={assets} />
      </div>
    </div>
  );
}
