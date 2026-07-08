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
import { Card, Button, Badge } from '@/ui/system';
import { X, Command } from 'lucide-react';

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
          <div ref={shellRef} tabIndex={-1} className="w-[90vw] max-w-6xl h-[85vh] outline-none">
            <Card
              variant="glow"
              padding="none"
              className="w-full h-full flex flex-col shadow-[0_24px_60px_rgba(0,0,0,0.6)] animate-in zoom-in-95 duration-300"
            >
              {/* Header / Breadcrumb */}
              <header className="border-b border-[rgba(255,255,255,0.05)] p-4 px-6 flex justify-between items-center bg-[rgba(0,0,0,0.2)]">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="!px-2 text-xs tracking-widest"><Command size={12} className="inline mr-1" /> NEXUS OS</Badge>
                  {app.icon && <span className="text-xl">{app.icon}</span>}
                  <h1 className="neon-text-primary m-0 text-base font-bold tracking-widest uppercase">
                    {app.title}
                  </h1>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => AppManager.close()}
                  icon={<X size={14} />}
                >
                  CLOSE
                </Button>
              </header>

              <div className="flex-1 overflow-y-auto relative p-0">
                <AppContainer app={app} />
              </div>
            </Card>
          </div>
        )}
      </ApplicationTransition>
    </div>
  );
}
export default ApplicationShell;
