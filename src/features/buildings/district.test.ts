/**
 * @file src/features/buildings/district.test.ts
 * @description Unit tests for building lot queries and district configurations.
 */

import { describe, it, expect } from 'vitest';
import { DISTRICT_REGISTRY, DISTRICTS_LIST } from './district.types';

describe('District Registry', () => {
  it('correctly maps 6 districts matching world zones', () => {
    expect(DISTRICTS_LIST.length).toBe(6);
  });

  it('contains target lot for Neural AI lab in ai-research district', () => {
    const aiDistrict = DISTRICT_REGISTRY['ai-research'];
    expect(aiDistrict).toBeDefined();
    const lab = aiDistrict.lots.find((l) => l.id === 'ai-research-lab');
    expect(lab).toBeDefined();
    expect(lab?.category).toBe('landmark');
    expect(lab?.interior?.name).toBe('AI Core Sandbox');
  });
});
