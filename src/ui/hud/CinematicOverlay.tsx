/**
 * @file src/ui/hud/CinematicOverlay.tsx
 * @description HUD overlay for screen fades and cinematic letterbox bars.
 */

import React, { useEffect, useState } from 'react';
import { eventBus } from '@core/events/EventBus';
import { CinematicDirector } from '@core/cinematic/CinematicDirector';

export function CinematicOverlay(): React.ReactElement {
  const [fade, setFade] = useState(0);
  const [letterbox, setLetterbox] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Listen to updates from the CinematicDirector
    const unsub = eventBus.on('ui:menuOpened', (payload) => {
      if (payload.menuId === 'cinematic-screen-update') {
        setFade(CinematicDirector.getFadeOpacity());
        setLetterbox(CinematicDirector.isLetterboxActive());
      } else if (payload.menuId === 'cinematic-welcome-title') {
        setShowWelcome(true);
      }
    });

    const unsubClose = eventBus.on('ui:menuClosed', (payload) => {
      if (payload.menuId === 'cinematic-welcome-title') {
        setShowWelcome(false);
      }
    });

    const checkState = setInterval(() => {
      // Periodic synchronization check
      setFade(CinematicDirector.getFadeOpacity());
      setLetterbox(CinematicDirector.isLetterboxActive());
    }, 100);

    return () => {
      unsub();
      unsubClose();
      clearInterval(checkState);
    };
  }, []);

  return (
    <>
      {/* Dynamic letterbox bars */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: letterbox ? '60px' : '0px',
          backgroundColor: '#050508',
          transition: 'height 0.4s ease-in-out',
          zIndex: 25, // Z_OVERLAY + 5
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: letterbox ? '60px' : '0px',
          backgroundColor: '#050508',
          transition: 'height 0.4s ease-in-out',
          zIndex: 25,
          pointerEvents: 'none',
        }}
      />

      {/* Welcome Title Animation */}
      <div
        style={{
          position: 'fixed',
          top: '40%',
          left: '0',
          width: '100%',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 26,
          opacity: showWelcome ? 1 : 0,
          transform: showWelcome ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          transition: 'all 2s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h1 
          className="neon-text-primary" 
          style={{ 
            fontSize: '72px', 
            fontWeight: 800, 
            letterSpacing: '8px', 
            margin: 0, 
            textTransform: 'uppercase',
            textShadow: '0 0 40px rgba(0,229,240,0.5)' 
          }}
        >
          NEXUS PLAZA
        </h1>
        <p 
          style={{ 
            fontSize: '18px', 
            letterSpacing: '12px', 
            color: 'var(--color-text-secondary)', 
            textTransform: 'uppercase', 
            margin: 0 
          }}
        >
          Open World Portfolio Environment
        </p>
      </div>

      {/* Dynamic screen fade */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#050508',
          opacity: fade,
          transition: 'opacity 0.4s ease-in-out',
          zIndex: 24,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
export default CinematicOverlay;
