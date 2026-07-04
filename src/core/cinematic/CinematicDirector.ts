/**
 * @file src/core/cinematic/CinematicDirector.ts
 * @description Sequence timeline orchestrator, queue solver, and event bindings.
 */

import { eventBus } from '@core/events/EventBus';
import { useCameraStore } from '@/features/camera/camera.store';
import type { CinematicSequence, CinematicKeyframe } from './cinematic.types';

class CinematicDirectorClass {
  private activeSequence: CinematicSequence | null = null;
  private queue: CinematicSequence[] = [];
  private elapsedTime = 0;
  private isPaused = false;

  // Track executing keyframes to avoid double-triggers
  private executedKeyframeTimes = new Set<string>();

  // Screen overlay variables (for HUD subscription)
  private fadeOpacity = 0;
  private letterboxActive = false;

  // Player physics lock flag
  private playerFrozen = false;

  play(sequence: CinematicSequence): void {
    if (this.activeSequence) {
      if (sequence.priority > this.activeSequence.priority) {
        // High priority overrides current
        this.cancel();
      } else {
        // Low priority gets queued
        this.queue.push(sequence);
        this.queue.sort((a, b) => b.priority - a.priority);
        return;
      }
    }

    this.activeSequence = sequence;
    this.elapsedTime = 0;
    this.isPaused = false;
    this.executedKeyframeTimes.clear();
    eventBus.emit('ui:hudVisibility', { visible: false }); // hide HUD
  }

  update(delta: number): void {
    if (!this.activeSequence || this.isPaused) return;

    this.elapsedTime += delta;

    // Process keyframe events
    this.activeSequence.keyframes.forEach((kf) => {
      const key = `${kf.time}-${kf.type}`;
      if (this.elapsedTime >= kf.time && !this.executedKeyframeTimes.has(key)) {
        this.executedKeyframeTimes.add(key);
        this.executeKeyframe(kf);
      }
    });

    // Handle end of sequence
    if (this.elapsedTime >= this.activeSequence.duration) {
      this.complete();
    }
  }

  private executeKeyframe(kf: CinematicKeyframe): void {
    switch (kf.type) {
      case 'camera':
        if (kf.camera) {
          const cam = kf.camera;
          // Smoothly translate camera coordinates
          useCameraStore.getState().transitionTo(
            { position: cam.position, lookAt: cam.lookAt },
            useCameraStore.getState().transition?.to ?? {
              position: { x: 0, y: 5, z: 10 },
              lookAt: { x: 0, y: 0, z: 0 },
            },
            0.5,
          );
        }
        break;

      case 'player':
        if (kf.player) {
          this.playerFrozen = kf.player.frozen;
          eventBus.emit('ui:hudVisibility', { visible: !this.playerFrozen });
        }
        break;

      case 'screen':
        if (kf.screen) {
          this.fadeOpacity = kf.screen.fadeOpacity;
          this.letterboxActive = kf.screen.letterbox;
          eventBus.emit('ui:menuOpened', { menuId: 'cinematic-screen-update' }); // notify overlays
        }
        break;

      case 'audio':
        if (kf.audio) {
          // Future Howler bindings hook
          console.log(
            `[CinematicDirector] Audio action: ${kf.audio.action} on ${kf.audio.soundId}`,
          );
        }
        break;

      case 'custom':
        kf.custom?.();
        break;
    }
  }

  pause(): void {
    this.isPaused = true;
  }
  resume(): void {
    this.isPaused = false;
  }

  cancel(): void {
    if (this.activeSequence) {
      this.activeSequence = null;
      this.playerFrozen = false;
      this.fadeOpacity = 0;
      this.letterboxActive = false;
      eventBus.emit('ui:hudVisibility', { visible: true });
      eventBus.emit('ui:menuOpened', { menuId: 'cinematic-screen-update' });
    }
  }

  private complete(): void {
    const prev = this.activeSequence;
    this.activeSequence = null;

    if (prev?.onComplete) {
      prev.onComplete();
    }

    // Play next queued sequence
    if (this.queue.length > 0) {
      const next = this.queue.shift()!;
      this.play(next);
    } else {
      this.playerFrozen = false;
      this.fadeOpacity = 0;
      this.letterboxActive = false;
      eventBus.emit('ui:hudVisibility', { visible: true });
      eventBus.emit('ui:menuOpened', { menuId: 'cinematic-screen-update' });
    }
  }

  isPlayerFrozen(): boolean {
    return this.playerFrozen;
  }
  getFadeOpacity(): number {
    return this.fadeOpacity;
  }
  isLetterboxActive(): boolean {
    return this.letterboxActive;
  }
  getActiveSequence(): CinematicSequence | null {
    return this.activeSequence;
  }
  getElapsedTime(): number {
    return this.elapsedTime;
  }
  getQueue(): CinematicSequence[] {
    return [...this.queue];
  }
}

export const CinematicDirector = new CinematicDirectorClass();
