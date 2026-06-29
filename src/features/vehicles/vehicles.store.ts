/**
 * @file src/features/vehicles/vehicles.store.ts
 * @description Zustand store for vehicle state.
 */

import { create } from 'zustand';
import type { VehiclesState, VehicleDefinition } from './vehicles.types';

interface VehiclesActions {
  setVehicles: (vehicles: VehicleDefinition[]) => void;
  mountVehicle: (vehicleId: string) => void;
  dismountVehicle: () => void;
}

type VehiclesStore = VehiclesState & VehiclesActions;

export const useVehiclesStore = create<VehiclesStore>()((set) => ({
  vehicles: [],
  playerVehicleId: null,
  mountedVehicleId: null,

  setVehicles: (vehicles) => set({ vehicles }),
  mountVehicle: (vehicleId) => set({ mountedVehicleId: vehicleId }),
  dismountVehicle: () => set({ mountedVehicleId: null }),
}));
