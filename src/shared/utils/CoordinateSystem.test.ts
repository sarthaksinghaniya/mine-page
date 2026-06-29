/**
 * @file src/shared/utils/CoordinateSystem.test.ts
 * @description Unit tests for coordinate transformations and range mapping.
 */

import { describe, it, expect } from 'vitest';
import { worldToMinimap, shouldShiftOrigin, MAP_WORLD_SIZE } from './CoordinateSystem';

describe('CoordinateSystem', () => {
  it('maps center coordinates to 0.5, 0.5', () => {
    const coords = worldToMinimap(0, 0);
    expect(coords.x).toBeCloseTo(0.5);
    expect(coords.y).toBeCloseTo(0.5);
  });

  it('clamps coordinates outside map boundary limits', () => {
    const farCoords = worldToMinimap(MAP_WORLD_SIZE * 2, -MAP_WORLD_SIZE * 2);
    expect(farCoords.x).toBe(1);
    expect(farCoords.y).toBe(0);
  });

  it('correctly reports when origin shift threshold is exceeded', () => {
    expect(shouldShiftOrigin(100, 100, 1000)).toBe(false);
    expect(shouldShiftOrigin(1000, 500, 1000)).toBe(true);
  });
});
