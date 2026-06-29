/**
 * @file src/features/audio/systems/FootstepAudio.ts
 * @description Triggers surface-aware footstep audio effects.
 */

import { AudioManager } from '../AudioManager';

export type SurfaceType = 'concrete' | 'grass' | 'metal' | 'wood' | 'glass';

export const FootstepAudio = {
  /**
   * Triggers a footstep sound based on surface texture.
   * Leverages pre-cached audio nodes from the manifest.
   */
  trigger(surface: SurfaceType, volume = 0.5): void {
    const soundId = `step-${surface}`;
    if (AudioManager.isRegistered(soundId)) {
      AudioManager.play(soundId);
    } else {
      // Direct console trace for fallback diagnostics
      console.warn(`[FootstepAudio] Footstep audio asset "${soundId}" not registered.`);
    }
  },
};
