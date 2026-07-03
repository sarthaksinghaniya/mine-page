/**
 * @file src/ui/apps/ApplicationShell.tsx
 * @description Fullscreen container shell wrapper displaying lazy-loaded application frames.
 */

import React, { useEffect, useState, useRef } from 'react';
import { AppManager } from '@core/apps/AppManager';
import type { AppManagerState, PortfolioApp } from '@core/apps/app.types';
import { ApplicationLoader } from './ApplicationLoader';
import { ApplicationTransition } from './ApplicationTransition';
import { usePlayerStore } from '@features/player/player.store';

function AppContainer({ app }: { app: PortfolioApp }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      app.mount(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        app.unmount(containerRef.current);
      }
    };
  }, [app]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}

export function ApplicationShell(): React.ReactElement | null {
  const [state, setState] = useState<AppManagerState>({ activeAppId: null, isOpen: false, isLoading: false });
  // Focus Trap Ref
  const shellRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const unsub = AppManager.subscribe((next) => {
      setState(next);
    });
    return () => {
      unsub();
    };
  }, []);

  // Focus trap effect
  useEffect(() => {
    if (state.isOpen && !state.isLoading && shellRef.current) {
      shellRef.current.focus();
    }
  }, [state.isOpen, state.isLoading]);

  const [fullyClosed, setFullyClosed] = useState(!state.isOpen);
  useEffect(() => {
    if (state.isOpen) setFullyClosed(false);
  }, [state.isOpen]);

  if (fullyClosed && !state.isOpen) return null;

  const app = state.activeAppId ? AppManager.getApp(state.activeAppId) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={app ? `${app.title} Application` : 'Application Overlay'}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 5, 10, 0.4)',
        backdropFilter: 'blur(12px)',
        zIndex: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f0f0ff',
        fontFamily: 'sans-serif',
        pointerEvents: state.isOpen ? 'auto' : 'none',
        opacity: fullyClosed ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
    >
      {state.isLoading && <ApplicationLoader appId={state.activeAppId} />}
      
      <ApplicationTransition
        isOpen={state.isOpen && !state.isLoading}
        onClosed={() => { setFullyClosed(true); }}
      >
        {app && (
          <div
            ref={shellRef}
            tabIndex={-1}
            style={{
              width: '90vw',
              maxWidth: '1200px',
              height: '85vh',
              backgroundColor: '#0a0a14',
              border: '1px solid rgba(0, 229, 240, 0.3)',
              boxShadow: '0 0 40px rgba(0, 229, 240, 0.15)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              outline: 'none'
            }}
          >
            {/* Header / Breadcrumb */}
            <header
              style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '16px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>NEXUS //</span>
                {app.icon && <span style={{ fontSize: '20px' }}>{app.icon}</span>}
                <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#00e5f0', letterSpacing: '1px' }}>
                  {app.title.toUpperCase()}
                </h1>
              </div>
              <button
                aria-label="Close application"
                onClick={() => AppManager.close()}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255, 59, 48, 0.3)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  color: '#ff3b30',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 59, 48, 0.1)')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                CLOSE (ESC)
              </button>
            </header>

            <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
              <AppContainer app={app} />
            </div>
          </div>
        )}
      </ApplicationTransition>
    </div>
  );
}
export default ApplicationShell;
