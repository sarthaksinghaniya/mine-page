/**
 * @file src/features/scene/scene.store.ts
 * @description Zustand store for scene management.
 *
 * Manages the active scene, scene transitions, and loading states.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  SceneState,
  SceneId,
  SceneStatus,
  TransitionType,
  TransitionPhase,
} from './scene.types';

interface SceneActions {
  /** Trigger a scene change with transition */
  loadScene: (id: SceneId, transitionType?: TransitionType, transitionDuration?: number) => void;
  /** Set active scene directly without transition */
  setActiveScene: (id: SceneId) => void;
  /** Advance transition progress */
  tickTransition: (delta: number) => void;
  /** Complete transition cycle */
  completeTransition: () => void;
}

type SceneStore = SceneState & SceneActions;

const defaultTransition = {
  type: 'fade' as TransitionType,
  phase: 'idle' as TransitionPhase,
  duration: 0.5,
  progress: 0,
};

export const useSceneStore = create<SceneStore>()(
  subscribeWithSelector((set, get) => ({
    // ── Initial State ──────────────────────────────────────────────────────────
    activeSceneId: null,
    pendingSceneId: null,
    status: 'idle',
    transition: null,

    // ── Actions ────────────────────────────────────────────────────────────────
    loadScene: (id, transitionType = 'fade', transitionDuration = 0.5) => {
      const currentActive = get().activeSceneId;
      if (currentActive === id) return;

      // Start transition fade out
      set({
        pendingSceneId: id,
        status: 'transitioning',
        transition: {
          type: transitionType,
          phase: 'fadeOut',
          duration: transitionDuration,
          progress: 0,
        },
      });
    },

    setActiveScene: (id) =>
      set({
        activeSceneId: id,
        pendingSceneId: null,
        status: 'active',
        transition: null,
      }),

    tickTransition: (delta) => {
      const { transition, pendingSceneId } = get();
      if (!transition || transition.phase === 'idle') return;

      const nextProgress = transition.progress + delta / transition.duration;

      if (nextProgress >= 1) {
        if (transition.phase === 'fadeOut') {
          // Switch scene under the cover of darkness (loading phase)
          set({
            activeSceneId: pendingSceneId,
            pendingSceneId: null,
            status: 'loading',
            transition: {
              ...transition,
              phase: 'fadeIn',
              progress: 0,
            },
          });
        } else if (transition.phase === 'fadeIn') {
          // Finish transition
          set({
            status: 'active',
            transition: null,
          });
        }
      } else {
        set({
          transition: {
            ...transition,
            progress: nextProgress,
          },
        });
      }
    },

    completeTransition: () =>
      set({
        status: 'active',
        transition: null,
      }),
  })),
);
