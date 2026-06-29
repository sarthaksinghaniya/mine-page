/**
 * @file src/core/input/InputManager.test.ts
 * @description Unit tests for input translation states.
 */

import { describe, it, expect } from 'vitest';
import { InputManager } from './InputManager';

describe('InputManager', () => {
  it('correctly reports default action values', () => {
    const actions = InputManager.getActions();
    expect(actions.moveForward).toBe(false);
    expect(actions.moveBackward).toBe(false);
    expect(actions.jump).toBe(false);
  });
});
