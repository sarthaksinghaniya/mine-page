/**
 * @file src/features/world/DistrictPlugins.test.ts
 * @description Unit tests for the district plugin architecture.
 */

import { describe, it, expect } from 'vitest';
import { DISTRICT_PLUGINS } from './systems/districtPlugins';

describe('District Plugin Architecture', () => {
  it('correctly maps spawn and ai-research district plugins', () => {
    expect(DISTRICT_PLUGINS.spawn).toBeDefined();
    expect(DISTRICT_PLUGINS['ai-research']).toBeDefined();
    expect((DISTRICT_PLUGINS as any)['hackathon-arena']).toBeUndefined();
  });
});
