/**
 * @file src/features/world/systems/SpawnManager.ts
 * @description Coordinates player spawning, loading saved configurations, and initial vector alignment.
 */

import { SaveSystem } from '@shared/utils/SaveSystem';

export interface SpawnPoint {
  position: { x: number; y: number; z: number };
  rotation: { yaw: number; pitch: number };
}

const DEFAULT_SPAWN: SpawnPoint = {
  position: { x: 0, y: 1.5, z: 12 },
  rotation: { yaw: 0, pitch: 0 },
};

export const SpawnManager = {
  /**
   * Resolves the starting coordinate system for the player.
   * If a LocalStorage save is found, it restores it; otherwise,
   * it drops the player at the central Genesis Spawn Plaza.
   */
  resolveSpawn(): SpawnPoint {
    const save = SaveSystem.load();
    if (save) {
      return {
        position: save.position,
        rotation: save.rotation,
      };
    }
    return DEFAULT_SPAWN;
  },

  /**
   * Caches current session metrics.
   */
  savePosition(
    position: { x: number; y: number; z: number },
    rotation: { yaw: number; pitch: number },
    zones: string[],
  ): void {
    SaveSystem.save(position, rotation, zones);
  },
};
