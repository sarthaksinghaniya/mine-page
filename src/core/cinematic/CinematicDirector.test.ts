/**
 * @file src/core/cinematic/CinematicDirector.test.ts
 * @description Unit tests for the cinematic director and sequence playback engine.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { CinematicDirector } from './CinematicDirector';

describe('CinematicDirector', () => {
  beforeEach(() => {
    // Cancel any active sequence to reset state
    CinematicDirector.cancel();
  });

  it('correctly reports default player freeze states', () => {
    expect(CinematicDirector.isPlayerFrozen()).toBe(false);
    expect(CinematicDirector.isLetterboxActive()).toBe(false);
    expect(CinematicDirector.getFadeOpacity()).toBe(0);
  });

  it('plays high-priority overrides over queued sequences', () => {
    // Register sequence A (priority 1)
    CinematicDirector.play({
      id: 'seq-a',
      name: 'Sequence A',
      duration: 5,
      priority: 1,
      keyframes: [],
    });

    expect(CinematicDirector.getActiveSequence()?.id).toBe('seq-a');

    // Override with sequence B (priority 10)
    CinematicDirector.play({
      id: 'seq-b',
      name: 'Sequence B',
      duration: 2,
      priority: 10,
      keyframes: [],
    });

    expect(CinematicDirector.getActiveSequence()?.id).toBe('seq-b');
  });
});
