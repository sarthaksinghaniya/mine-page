/**
 * @file src/features/scene/scenes/index.ts
 * @description Scene registry file for lazy loading.
 */

import type { SceneDefinition, SceneId } from '../scene.types';

/**
 * Scene registry maps SceneId to SceneDefinition containing lazy components
 * and asset dependencies.
 */
export const SCENE_REGISTRY: Record<Exclude<SceneId, 'loading'>, SceneDefinition> = {
  world: {
    id: 'world',
    // Dynamic import of the world rendering node
    component: () =>
      import('@/features/world/components/WorldRoot').then((m) => ({ default: m.WorldRoot })),
    preloadAssets: ['env-default', 'mesh-cube'],
  },
  menu: {
    id: 'menu',
    component: () => import('@/ui/menus/MainMenu').then((m) => ({ default: m.MainMenu })),
    preloadAssets: [],
  },
};
