/**
 * @file src/features/audio/audio.store.ts
 * @description Zustand store for audio state (volumes, mute, current tracks).
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AudioState, CategoryVolumes } from './audio.types';

interface AudioActions {
  setUnlocked:         (unlocked: boolean) => void;
  setMuted:            (muted: boolean) => void;
  setVolume:           (category: keyof CategoryVolumes, volume: number) => void;
  setCurrentAmbient:   (trackId: string | null) => void;
  setCurrentMusic:     (trackId: string | null) => void;
}

type AudioStore = AudioState & AudioActions;

export const useAudioStore = create<AudioStore>()(
  persist(
    (set) => ({
      // ── Initial State ────────────────────────────────────────────────────────
      unlocked:       false,
      muted:          false,
      volumes: {
        master:  1.0,
        ambient: 0.6,
        sfx:     1.0,
        music:   0.4,
        voice:   1.0,
        ui:      0.8,
      },
      currentAmbient: null,
      currentMusic:   null,

      // ── Actions ──────────────────────────────────────────────────────────────
      setUnlocked:       (unlocked) => set({ unlocked }),
      setMuted:          (muted) => set({ muted }),
      setVolume:         (category, volume) =>
        set((s) => ({ volumes: { ...s.volumes, [category]: volume } })),
      setCurrentAmbient: (currentAmbient) => set({ currentAmbient }),
      setCurrentMusic:   (currentMusic) => set({ currentMusic }),
    }),
    {
      // Persist volume prefs to localStorage
      name: 'owp-audio-prefs',
      partialize: (state) => ({ muted: state.muted, volumes: state.volumes }),
    },
  ),
);
