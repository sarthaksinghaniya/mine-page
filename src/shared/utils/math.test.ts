/**
 * @file src/shared/utils/math.test.ts
 * @description Unit tests for math utilities.
 * These are the foundational tests — expand as more utils are added.
 */

import { describe, it, expect } from 'vitest';
import { lerp, clamp, damp, mapRange, degToRad, radToDeg, distanceXZ } from './math';

describe('lerp', () => {
  it('returns start value at t=0', () => expect(lerp(0, 100, 0)).toBe(0));
  it('returns end value at t=1',   () => expect(lerp(0, 100, 1)).toBe(100));
  it('returns midpoint at t=0.5',  () => expect(lerp(0, 100, 0.5)).toBe(50));
});

describe('clamp', () => {
  it('clamps below min',           () => expect(clamp(-10, 0, 100)).toBe(0));
  it('clamps above max',           () => expect(clamp(200, 0, 100)).toBe(100));
  it('returns value within range', () => expect(clamp(50, 0, 100)).toBe(50));
});

describe('damp', () => {
  it('moves toward target over time', () => {
    const result = damp(0, 100, 5, 0.1);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(100);
  });
});

describe('mapRange', () => {
  it('maps 0 from [0,1] to [0,100]',   () => expect(mapRange(0, 0, 1, 0, 100)).toBe(0));
  it('maps 1 from [0,1] to [0,100]',   () => expect(mapRange(1, 0, 1, 0, 100)).toBe(100));
  it('maps 0.5 from [0,1] to [0,100]', () => expect(mapRange(0.5, 0, 1, 0, 100)).toBe(50));
});

describe('degToRad / radToDeg', () => {
  it('converts 180° to π',  () => expect(degToRad(180)).toBeCloseTo(Math.PI));
  it('converts π to 180°',  () => expect(radToDeg(Math.PI)).toBeCloseTo(180));
});

describe('distanceXZ', () => {
  it('returns 0 for same point',       () => expect(distanceXZ({ x: 0, z: 0 }, { x: 0, z: 0 })).toBe(0));
  it('returns correct distance',       () => expect(distanceXZ({ x: 0, z: 0 }, { x: 3, z: 4 })).toBeCloseTo(5));
});
