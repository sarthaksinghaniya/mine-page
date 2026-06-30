/**
 * @file src/ui/apps/ApplicationLoader.tsx
 * @description Loading state UI for applications.
 */

import React from 'react';

export function ApplicationLoader({ appId }: { appId: string | null }): React.ReactElement {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a0a14',
        color: '#00e5f0',
        fontFamily: 'sans-serif',
        zIndex: 10,
      }}
    >
      <div
        className="loader-spinner"
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(0, 229, 240, 0.2)',
          borderTopColor: '#00e5f0',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px',
        }}
      />
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={{ fontSize: '14px', letterSpacing: '2px' }}>
        LOADING APP_{appId?.toUpperCase()}...
      </div>
    </div>
  );
}
