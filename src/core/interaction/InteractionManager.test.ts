/**
 * @file src/core/interaction/InteractionManager.test.ts
 * @description Unit tests for the interaction manager and priority solver.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { InteractionManager } from './InteractionManager';

describe('InteractionManager', () => {
  beforeEach(() => {
    // Unregister everything before each test run
    InteractionManager.getInteractables().forEach((item) => {
      InteractionManager.unregister(item.id);
    });
  });

  it('correctly registers and unregisters items', () => {
    InteractionManager.register({
      id: 'test-item',
      name: 'Test Target',
      type: 'button',
      position: { x: 10, y: 0, z: 10 },
      radius: 4,
      priority: 1,
      enabled: true,
    });

    expect(InteractionManager.getInteractables().length).toBe(1);
    InteractionManager.unregister('test-item');
    expect(InteractionManager.getInteractables().length).toBe(0);
  });

  it('correctly resolves priority overlap', () => {
    // Low priority closer item
    InteractionManager.register({
      id: 'closer-low-priority',
      name: 'Closer Low',
      type: 'button',
      position: { x: 1, y: 0, z: 1 },
      radius: 5,
      priority: 1,
      enabled: true,
    });

    // High priority further item
    InteractionManager.register({
      id: 'further-high-priority',
      name: 'Further High',
      type: 'button',
      position: { x: 3, y: 0, z: 3 },
      radius: 5,
      priority: 10,
      enabled: true,
    });

    InteractionManager.update(0, 0, 0); // Player standing at origin
    const focused = InteractionManager.getFocused();
    expect(focused?.id).toBe('further-high-priority'); // Prioritized weight resolver
  });
});
