/**
 * @file src/features/world/systems/NavMeshStub.test.ts
 * @description Unit tests for NPC navigation mesh stubs.
 */

import { describe, it, expect } from 'vitest';
import { NavMeshStub } from './NavMeshStub';

describe('NavMeshStub', () => {
  it('correctly maps route from Spawn to spaceport', () => {
    const path = NavMeshStub.findPath('spawn', 'spaceport');
    expect(path.length).toBeGreaterThan(0);
    // Spawn should lead to either AI or HQ, and then to Spaceport
    expect(path[0]).toEqual({ x: 0, y: 0, z: 0 }); // spawn start
    expect(path[path.length - 1]).toEqual({ x: 400, y: 0, z: 400 }); // spaceport end
  });

  it('returns empty path for invalid nodes', () => {
    const path = NavMeshStub.findPath('spawn', 'invalid-node-id');
    expect(path.length).toBe(0);
  });
});
