/**
 * @file src/features/audio/audio.types.ts
 * @description Type definitions for the audio feature (Howler.js).
 */

// ── Sound Categories ──────────────────────────────────────────────────────────

export type SoundCategory = 'ambient' | 'sfx' | 'music' | 'voice' | 'ui';

// ── Sound Definition ──────────────────────────────────────────────────────────

export interface SoundDefinition {
  id: string;
  src: string[]; // Multiple formats for browser compatibility
  category: SoundCategory;
  volume: number; // 0–1, category volume is multiplied on top
  loop: boolean;
  /** If true, uses Howler's spatial audio (pannerAttr) */
  spatial: boolean;
  /** Max distance for spatial audio attenuation */
  maxDistance?: number;
  /** Preload on AudioManager init */
  preload: boolean;
}

// ── Audio State ───────────────────────────────────────────────────────────────

export interface CategoryVolumes {
  master: number;
  ambient: number;
  sfx: number;
  music: number;
  voice: number;
  ui: number;
}

export interface AudioState {
  /** Whether audio context is unlocked (requires user gesture) */
  unlocked: boolean;
  /** Global mute */
  muted: boolean;
  /** Volume per category */
  volumes: CategoryVolumes;
  /** Currently playing ambient track ID */
  currentAmbient: string | null;
  /** Currently playing music track ID */
  currentMusic: string | null;
}
