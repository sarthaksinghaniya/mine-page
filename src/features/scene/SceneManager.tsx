/**
 * @file src/features/scene/SceneManager.tsx
 * @description Scene manager R3F component.
 *
 * Renders the active scene inside a Suspense boundary and updates
 * scene transitions on the frame tick.
 */

import React, { Suspense, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSceneStore } from './scene.store';
import { SCENE_REGISTRY } from './scenes';

/**
 * Scene Manager component handles mounting the active scene within the R3F Canvas.
 */
export function SceneManager(): React.ReactElement | null {
  const activeSceneId = useSceneStore((s) => s.activeSceneId);
  const transition = useSceneStore((s) => s.transition);
  const tickTransition = useSceneStore((s) => s.tickTransition);

  // Tick the scene transition timer
  useFrame((_, delta) => {
    if (transition) {
      tickTransition(delta);
    }
  });

  // Lazy render active scene component
  const ActiveComponent = useMemo(() => {
    if (!activeSceneId || activeSceneId === 'loading') return null;
    const def = SCENE_REGISTRY[activeSceneId];
    return React.lazy(def.component);
  }, [activeSceneId]);

  if (!ActiveComponent) return null;

  return (
    <Suspense fallback={null}>
      <ActiveComponent />
    </Suspense>
  );
}
