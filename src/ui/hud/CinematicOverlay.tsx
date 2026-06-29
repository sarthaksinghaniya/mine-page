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

  useEffect(() => {
    // Listen to updates from the CinematicDirector
    const unsub = eventBus.on('ui:menuOpened', (payload) => {
      if (payload.menuId === 'cinematic-screen-update') {
        setFade(CinematicDirector.getFadeOpacity());
        setLetterbox(CinematicDirector.isLetterboxActive());
      }
    });

    const checkState = setInterval(() => {
      // Periodic synchronization check
      setFade(CinematicDirector.getFadeOpacity());
      setLetterbox(CinematicDirector.isLetterboxActive());
    }, 100);

    return () => {
      unsub();
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
