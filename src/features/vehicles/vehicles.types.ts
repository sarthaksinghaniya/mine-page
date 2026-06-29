/**
 * @file src/features/vehicles/vehicles.types.ts
 * @description Type definitions for the vehicles feature.
 */

export type VehicleType = 'hover' | 'ground' | 'aerial';

export interface VehicleDefinition {
  id:           string;
  name:         string;
  type:         VehicleType;
  modelPath:    string;
  maxSpeed:     number;
  acceleration: number;
  turnSpeed:    number;
  spawnPosition: { x: number; y: number; z: number };
}

export interface VehiclesState {
  vehicles:         VehicleDefinition[];
  playerVehicleId:  string | null;
  mountedVehicleId: string | null;
}
