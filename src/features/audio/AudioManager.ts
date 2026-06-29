/**
 * @file src/features/audio/AudioManager.ts
 * @description Howler.js singleton wrapper for centralized audio management.
 *
 * All sound playback in the application goes through this manager.
 * It handles:
 *  - Sound registration and preloading
 *  - Category-based volume control
 *  - Spatial audio positioning
 *  - Audio context unlocking (required on mobile)
 *  - Graceful degradation when audio is unavailable
 */

import { Howl, Howler } from 'howler';
import type { SoundDefinition, SoundCategory, CategoryVolumes } from './audio.types';

// ── AudioManager ─────────────────────────────────────────────────────────────

class AudioManagerClass {
  private readonly sounds = new Map<string, Howl>();
  private volumes: CategoryVolumes = {
    master:  1.0,
    ambient: 0.6,
    sfx:     1.0,
    music:   0.4,
    voice:   1.0,
    ui:      0.8,
  };
  private readonly soundCategories = new Map<string, SoundCategory>();

  // ── Initialization ──────────────────────────────────────────────────────────

  /**
   * Registers and optionally preloads a sound.
   * Call this during feature initialization, not at runtime.
   */
  register(definition: SoundDefinition): void {
    if (this.sounds.has(definition.id)) {
      console.warn(`[AudioManager] Sound "${definition.id}" is already registered.`);
      return;
    }

    const howl = new Howl({
      src:        definition.src,
      volume:     this.getCategoryVolume(definition.category) * definition.volume,
      loop:       definition.loop,
      preload:    definition.preload,
      ...(definition.spatial && {
        pannerAttr: {
          panningModel:    'HRTF',
          distanceModel:   'inverse',
          refDistance:     1,
          maxDistance:     definition.maxDistance ?? 100,
          rolloffFactor:   1,
        },
      }),
    });

    this.sounds.set(definition.id, howl);
    this.soundCategories.set(definition.id, definition.category);
  }

  // ── Playback ────────────────────────────────────────────────────────────────

  play(id: string): number | null {
    const howl = this.sounds.get(id);
    if (!howl) {
      console.warn(`[AudioManager] Sound "${id}" not found.`);
      return null;
    }
    return howl.play() as number;
  }

  stop(id: string): void {
    this.sounds.get(id)?.stop();
  }

  pause(id: string): void {
    this.sounds.get(id)?.pause();
  }

  fade(id: string, from: number, to: number, durationMs: number): void {
    this.sounds.get(id)?.fade(from, to, durationMs);
  }

  /** Update the 3D position of a spatial sound */
  setPosition(id: string, x: number, y: number, z: number): void {
    this.sounds.get(id)?.pos(x, y, z);
  }

  // ── Volume Control ──────────────────────────────────────────────────────────

  setMasterVolume(volume: number): void {
    this.volumes.master = Math.max(0, Math.min(1, volume));
    Howler.volume(this.volumes.master);
  }

  setCategoryVolume(category: SoundCategory, volume: number): void {
    this.volumes[category] = Math.max(0, Math.min(1, volume));
    // Apply updated volume to all sounds in this category
    for (const [id, howl] of this.sounds) {
      if (this.soundCategories.get(id) === category) {
        howl.volume(this.getCategoryVolume(category));
      }
    }
  }

  mute(): void  { Howler.mute(true); }
  unmute(): void { Howler.mute(false); }

  // ── Listener Position (for spatial audio) ────────────────────────────────────

  /** Update the 3D listener position to match the player/camera */
  setListenerPosition(x: number, y: number, z: number): void {
    Howler.pos(x, y, z);
  }

  setListenerOrientation(
    forwardX: number, forwardY: number, forwardZ: number,
    upX: number, upY: number, upZ: number,
  ): void {
    Howler.orientation(forwardX, forwardY, forwardZ, upX, upY, upZ);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  private getCategoryVolume(category: SoundCategory): number {
    return this.volumes.master * this.volumes[category];
  }

  isRegistered(id: string): boolean {
    return this.sounds.has(id);
  }

  dispose(): void {
    for (const howl of this.sounds.values()) {
      howl.unload();
    }
    this.sounds.clear();
    this.soundCategories.clear();
  }
}

/** Singleton AudioManager — the single interface to Howler.js */
export const AudioManager = new AudioManagerClass();
