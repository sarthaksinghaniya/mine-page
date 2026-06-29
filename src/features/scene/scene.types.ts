/**
 * @file src/features/scene/scene.types.ts
 * @description Type definitions for the scene management system.
 */

import type React from 'react';

// ── Scene Identity ────────────────────────────────────────────────────────────

/**
 * All scene IDs in the application.
 * Add new scenes here before implementing them.
 */
export type SceneId =
  | 'loading'   // Not a real scene — handled by LoadingScreen
  | 'world'     // Main open-world scene
  | 'menu';     // Main menu (future)

// ── Transition ────────────────────────────────────────────────────────────────

export type TransitionType = 'fade' | 'dissolve' | 'wipe';
export type TransitionPhase = 'idle' | 'fadeOut' | 'loading' | 'fadeIn';

export interface SceneTransitionState {
  type:     TransitionType;
  phase:    TransitionPhase;
  duration: number; // seconds per phase
  progress: number; // 0–1 within current phase
}

// ── Scene Definition ──────────────────────────────────────────────────────────

export interface SceneDefinition {
  id: SceneId;
  /** Lazy component factory — dynamic import */
  component: () => Promise<{ default: React.ComponentType }>;
  /** Asset IDs to preload before the scene is shown */
  preloadAssets: string[];
}

// ── Scene State ───────────────────────────────────────────────────────────────

export type SceneStatus = 'idle' | 'loading' | 'active' | 'transitioning';

export interface SceneState {
  activeSceneId:  SceneId | null;
  pendingSceneId: SceneId | null;
  status:         SceneStatus;
  transition:     SceneTransitionState | null;
}
