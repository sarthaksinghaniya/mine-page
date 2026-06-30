/**
 * @file src/features/world/DistrictScene.test.ts
 * @description Unit tests for district scenes.
 */

import { describe, it, expect } from 'vitest';
import { DISTRICT_REGISTRY } from '@/features/buildings/district.types';

describe('DistrictScene Abstraction', () => {
  it('verifies Spawn Plaza lots configuration', () => {
    const spawnDef = DISTRICT_REGISTRY.spawn;
    expect(spawnDef).toBeDefined();
    expect(spawnDef.lots.length).toBe(1);
    expect(spawnDef.lots[0]?.name).toBe('Genesis Central Obelisk');
  });
});
