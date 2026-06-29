/**
 * @file src/features/scene/SceneTransition.tsx
 * @description HTML Overlay component that displays transition fades.
 *
 * Placed outside the Canvas element.
 */

import React from 'react';
import { useSceneStore } from './scene.store';

/**
 * SceneTransition component provides visual feedback during scene changes.
 */
export function SceneTransition(): React.ReactElement | null {
  const transition = useSceneStore((s) => s.transition);

  if (!transition || transition.phase === 'idle') return null;

  // Calculate opacity based on transition phase
  let opacity = 0;
  if (transition.phase === 'fadeOut') {
    opacity = transition.progress; // Go black
  } else if (transition.phase === 'fadeIn') {
    opacity = 1 - transition.progress; // Fade back in
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050508',
        opacity: opacity,
        pointerEvents: 'none',
        zIndex: 20, // Z_OVERLAY from constants
        transition: 'opacity 16ms linear', // Match frame ticks roughly
      }}
    />
  );
}
