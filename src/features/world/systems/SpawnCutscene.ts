/**
 * @file src/features/world/systems/SpawnCutscene.ts
 * @description Coordinates the introductory spawn camera flythrough timeline.
 */

import { CinematicDirector } from '@core/cinematic/CinematicDirector';
import { eventBus } from '@core/events/EventBus';

export const SpawnCutscene = {
  hasPlayedIntro: false,
  
  /**
   * Plays the intro visual sequence sweeps.
   */
  playIntro(): void {
    if (this.hasPlayedIntro) return;
    this.hasPlayedIntro = true;

    CinematicDirector.play({
      id: 'spawn-intro-sequence',
      name: 'Welcome to Spawn Plaza',
      duration: 10.0, // Extended duration for breathtaking cinematic
      priority: 15,
      keyframes: [
        { time: 0.0, type: 'player', player: { frozen: true } },
        { time: 0.0, type: 'screen', screen: { fadeOpacity: 1, letterbox: true } },
        // Fade in from black
        { time: 0.5, type: 'screen', screen: { fadeOpacity: 0, letterbox: true } },
        // Shot 1: High above the monument, looking down
        {
          time: 0.5,
          type: 'camera',
          camera: { position: { x: 0, y: 35, z: -60 }, lookAt: { x: 0, y: 8, z: 0 } },
        },
        // Shot 2: Sweeping low over the reflective floor
        {
          time: 3.0,
          type: 'camera',
          camera: { position: { x: 25, y: 2, z: -30 }, lookAt: { x: 0, y: 6, z: 0 } },
        },
        // Trigger Welcome Text UI via event bus
        {
          time: 4.5,
          type: 'custom',
          custom: () => {
            eventBus.emit('ui:menuOpened', { menuId: 'cinematic-welcome-title' });
          }
        },
        // Shot 3: Close up on the monument particles
        {
          time: 5.5,
          type: 'camera',
          camera: { position: { x: -10, y: 6, z: -15 }, lookAt: { x: 0, y: 4, z: 0 } },
        },
        // Shot 4: Smooth transition back to player perspective (behind player at gate)
        {
          time: 8.0,
          type: 'camera',
          camera: { position: { x: 0, y: 6, z: 55 }, lookAt: { x: 0, y: 2, z: 35 } },
        },
        // Hide Welcome Text and remove letterbox
        {
          time: 9.0,
          type: 'custom',
          custom: () => {
            eventBus.emit('ui:menuClosed', { menuId: 'cinematic-welcome-title' });
          }
        },
        { time: 9.5, type: 'screen', screen: { fadeOpacity: 0, letterbox: false } },
        // Unfreeze player, hand over control
        { time: 10.0, type: 'player', player: { frozen: false } },
      ],
    });
  },
};
