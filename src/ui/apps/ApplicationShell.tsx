/**
 * @file src/ui/apps/ApplicationShell.tsx
 * @description Fullscreen container shell wrapper displaying lazy-loaded application frames.
 */

import React, { useEffect, useState } from 'react';
import { AppManager } from '@core/apps/AppManager';
import type { AppManagerState } from '@core/apps/app.types';

export function ApplicationShell(): React.ReactElement | null {
  const [state, setState] = useState<AppManagerState | null>(null);

  useEffect(() => {
    // Subscribe to AppManager states
    const unsub = AppManager.subscribe((next) => {
      setState(next);
    });

    // Close active app on Escape keydown
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        AppManager.close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsub();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!state || !state.isOpen || !state.activeAppId) return null;

  const app = AppManager.getApp(state.activeAppId);
  if (!app) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 5, 10, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 40, // Z_MENU
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f0f0ff',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          width: '85vw',
          height: '85vh',
          backgroundColor: '#0a0a14',
          border: '1px solid rgba(0, 229, 240, 0.3)',
          boxShadow: '0 0 40px rgba(0, 229, 240, 0.15)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Title header bar */}
        <div
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{ fontSize: '16px', fontWeight: 'bold', color: '#00e5f0', letterSpacing: '1px' }}
          >
            {app.title.toUpperCase()}
          </span>
          <button
            onClick={() => AppManager.close()}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff3b30',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            CLOSE (ESC)
          </button>
        </div>

        {/* Content render viewport */}
        <div style={{ flex: 1, overflowY: 'auto' }}>{app.mount()}</div>
      </div>
    </div>
  );
}
export default ApplicationShell;
