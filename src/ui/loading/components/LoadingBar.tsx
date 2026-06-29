/**
 * @file src/ui/loading/components/LoadingBar.tsx
 * @description Smoothly animated progress bar.
 */

import React from 'react';

interface LoadingBarProps {
  progress: number;
}

export function LoadingBar({ progress }: LoadingBarProps): React.ReactElement {
  return (
    <div
      style={{
        width: '320px',
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(0, 173, 192, 0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
        margin: '0 auto 12px auto',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #00e5f0 0%, #8000ff 100%)',
          boxShadow: '0 0 8px #00e5f0',
          transition: 'width 0.2s cubic-bezier(0.1, 0.8, 0.2, 1)',
        }}
      />
    </div>
  );
}
