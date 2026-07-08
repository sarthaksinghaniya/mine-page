/**
 * @file src/features/vehicles/systems/VehicleManager.ts
 * @description Manages vehicle registry, possession control transfer, and state saving.
 */

import { eventBus } from '@core/events/EventBus';
import { useVehiclesStore } from '../vehicles.store';
import type { VehicleConfig, VehicleSavedState } from '../vehicles.types';

class VehicleManagerClass {
  private readonly vehicles = new Map<string, VehicleConfig>();
  private readonly savedStates = new Map<string, VehicleSavedState>();
  private activeVehicleId: string | null = null;

  register(config: VehicleConfig): void {
    this.vehicles.set(config.id, config);
  }

  unregister(id: string): void {
    if (this.activeVehicleId === id) {
      this.exitActive();
    }
    this.vehicles.delete(id);
  }

  getVehicles(): VehicleConfig[] {
    return Array.from(this.vehicles.values());
  }

  /**
   * Transfers input possession and camera target focus to the target vehicle.
   */
  enter(vehicleId: string): void {
    const config = this.vehicles.get(vehicleId);
    if (!config) return;

    this.activeVehicleId = vehicleId;
    useVehiclesStore.getState().mountVehicle(vehicleId);

    // Notify listeners that control is possessed by vehicle
    eventBus.emit('vehicles:playerEntered', { vehicleId });
  }

  /**
   * Resets driver seats, placing player capsule next to vehicle doors.
   */
  exitActive(): void {
    if (!this.activeVehicleId) return;

    const prev = this.activeVehicleId;
    this.activeVehicleId = null;
    useVehiclesStore.getState().dismountVehicle();

    eventBus.emit('vehicles:playerExited', { vehicleId: prev });
  }

  getActiveVehicleId(): string | null {
    return this.activeVehicleId;
  }

  saveState(id: string, state: VehicleSavedState): void {
    this.savedStates.set(id, state);
  }

  getSavedState(id: string): VehicleSavedState | null {
    return this.savedStates.get(id) ?? null;
  }
}

export const VehicleManager = new VehicleManagerClass();
