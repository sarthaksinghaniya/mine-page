/**
 * @file src/shared/utils/SaveSystem.ts
 * @description LocalStorage backup utility to cache and reload player positional matrices.
 */

export interface SavedPlayerState {
  position: { x: number; y: number; z: number };
  rotation: { yaw: number; pitch: number };
  discoveredZones: string[];
  lastSaved: number;
}

const SAVE_KEY = 'owp_player_save';

export const SaveSystem = {
  save(
    position: { x: number; y: number; z: number },
    rotation: { yaw: number; pitch: number },
    discoveredZones: string[],
  ): void {
    try {
      const data: SavedPlayerState = {
        position,
        rotation,
        discoveredZones,
        lastSaved: Date.now(),
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('[SaveSystem] Failed to write game profile save:', e);
    }
  },

  load(): SavedPlayerState | null {
    try {
      const stored = localStorage.getItem(SAVE_KEY);
      if (!stored) return null;
      return JSON.parse(stored) as SavedPlayerState;
    } catch (e) {
      console.error('[SaveSystem] Failed to load game profile save:', e);
      return null;
    }
  },

  clear(): void {
    localStorage.removeItem(SAVE_KEY);
  },
};
