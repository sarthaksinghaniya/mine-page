/**
 * @file src/features/world/systems/SpawnCutscene.ts
 * @description Coordinates the introductory spawn camera flythrough timeline.
 */

import { CinematicDirector } from '@core/cinematic/CinematicDirector';

export const SpawnCutscene = {
  /**
   * Plays the intro visual sequence sweeps.
   */
  playIntro(): void {
    CinematicDirector.play({
      id: 'spawn-intro-sequence',
      name: 'Welcome to Spawn Plaza',
      duration: 5.0,
      priority: 15,
      keyframes: [
        { time: 0.0, type: 'player', player: { frozen: true } },
        { time: 0.0, type: 'screen', screen: { fadeOpacity: 1, letterbox: true } },
        { time: 0.5, type: 'screen', screen: { fadeOpacity: 0, letterbox: true } },
        { time: 0.8, type: 'camera', camera: { position: { x: 0, y: 18, z: -40 }, lookAt: { x: 0, y: 4, z: 0 } } },
        { time: 2.8, type: 'camera', camera: { position: { x: 12, y: 8, z: -25 }, lookAt: { x: 0, y: 2, z: -10 } } },
        { time: 4.0, type: 'screen', screen: { fadeOpacity: 1, letterbox: true } },
        { time: 4.8, type: 'screen', screen: { fadeOpacity: 0, letterbox: false } },
        { time: 5.0, type: 'player', player: { frozen: false } },
      ],
    });
  },
};
