/**
 * @file src/features/vehicles/VehicleManager.test.ts
 * @description Unit tests for the vehicle manager.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { VehicleManager } from './systems/VehicleManager';

describe('VehicleManager', () => {
  beforeEach(() => {
    // Unregister everything before each test run
    VehicleManager.getVehicles().forEach((v) => {
      VehicleManager.unregister(v.id);
    });
  });

  it('correctly registers vehicles in registry', () => {
    VehicleManager.register({
      id: 'test-car',
      name: 'Cyber Test',
      category: 'car',
      position: { x: 0, y: 0, z: 0 },
      rotation: 0,
      maxSpeed: 40,
      acceleration: 20,
      mass: 1000,
    });

    expect(VehicleManager.getVehicles().length).toBe(1);
    VehicleManager.unregister('test-car');
    expect(VehicleManager.getVehicles().length).toBe(0);
  });

  it('correctly tracks possessed driver controls', () => {
    VehicleManager.register({
      id: 'test-car',
      name: 'Cyber Test',
      category: 'car',
      position: { x: 0, y: 0, z: 0 },
      rotation: 0,
      maxSpeed: 40,
      acceleration: 20,
      mass: 1000,
    });

    expect(VehicleManager.getActiveVehicleId()).toBeNull();
    VehicleManager.enter('test-car');
    expect(VehicleManager.getActiveVehicleId()).toBe('test-car');
    VehicleManager.exitActive();
    expect(VehicleManager.getActiveVehicleId()).toBeNull();
  });
});
