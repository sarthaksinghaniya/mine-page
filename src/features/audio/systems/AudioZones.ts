/**
 * @file src/features/audio/systems/AudioZones.ts
 * @description Coordinates spatial music and ambient sound shifts as districts change.
 */

import { AudioManager } from '../AudioManager';
import { DISTRICT_REGISTRY } from '@/features/buildings/district.types';
import type { ZoneTheme } from '@/features/world/zone.types';

export const AudioZones = {
  private activeTheme: '' as string,

  /**
   * Cross-fades background music to match the newly entered district.
   */
  transition(toZone: ZoneTheme): void {
    const config = DISTRICT_REGISTRY[toZone];
    if (!config) return;

    const nextAmbience = config.ambienceId;
    if (this.activeTheme === nextAmbience) return;

    const previousAmbience = this.activeTheme;
    this.activeTheme = nextAmbience;

    // Trigger Howler ambient cross-fade transitions
    if (previousAmbience && AudioManager.isRegistered(previousAmbience)) {
      AudioManager.fade(previousAmbience, 0.6, 0.0, 1500);
      setTimeout(() => AudioManager.stop(previousAmbience), 1500);
    }

    if (AudioManager.isRegistered(nextAmbience)) {
      AudioManager.play(nextAmbience);
      AudioManager.fade(nextAmbience, 0.0, 0.6, 1500);
    } else {
      console.warn(`[AudioZones] Ambient soundtrack "${nextAmbience}" is not preloaded.`);
    }
  },
};
