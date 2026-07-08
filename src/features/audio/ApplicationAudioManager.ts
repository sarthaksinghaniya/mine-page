/**
 * @file src/features/audio/ApplicationAudioManager.ts
 * @description Manages application ambience, UI sounds, and environmental ducking.
 */

import { eventBus } from '@core/events/EventBus';

class ApplicationAudioManagerClass {
  private activeAppId: string | null = null;

  init() {
    eventBus.on('app:opened', ({ appId }) => {
      this.activeAppId = appId;
      this.duckEnvironment();
      this.playAppAmbience(appId);
      this.playSfx('ui_open');
    });

    eventBus.on('app:closed', ({ appId }) => {
      if (this.activeAppId === appId) {
        this.activeAppId = null;
        this.restoreEnvironment();
        this.stopAppAmbience(appId);
        this.playSfx('ui_close');
      }
    });
  }

  private duckEnvironment() {
    eventBus.emit('audio:ambientChanged', { trackId: 'duck', volume: 0.1 });
  }

  private restoreEnvironment() {
    eventBus.emit('audio:ambientChanged', { trackId: 'restore', volume: 1.0 });
  }

  private playAppAmbience(appId: string) {
    eventBus.emit('audio:ambientChanged', { trackId: `app_${appId}`, volume: 0.8 });
  }

  private stopAppAmbience(appId: string) {
    eventBus.emit('audio:ambientChanged', { trackId: `app_${appId}`, volume: 0 });
  }

  public playSfx(type: 'ui_open' | 'ui_close' | 'ui_hover' | 'typing') {
    eventBus.emit('audio:sfxTriggered', { soundId: type });
  }
}

export const ApplicationAudioManager = new ApplicationAudioManagerClass();
