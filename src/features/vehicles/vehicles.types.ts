/**
 * @file src/features/vehicles/vehicles.types.ts
 * @description Type definitions for the vehicles feature.
 */

export type VehicleType = 'hover' | 'ground' | 'aerial';

export type VehicleCategory = 'car' | 'hover' | 'drone' | 'flying' | 'shuttle';

export type VehicleEngineState =
  | 'parked'
  | 'entering'
  | 'idle'
  | 'driving'
  | 'braking'
  | 'reversing'
  | 'boosting'
  | 'exiting'
  | 'disabled';

export interface VehicleSavedState {
  id: string;
  position: { x: number; y: number; z: number };
  rotation: { yaw: number; pitch: number };
  fuel: number; // percentage 0-100
  damage: number; // percentage 0-100 (0 = clean, 100 = wrecked)
}

export interface VehicleConfig {
  id: string;
  name: string;
  category: VehicleCategory;
  position: { x: number; y: number; z: number };
  rotation: number; // Y-axis yaw
  maxSpeed: number;
  acceleration: number;
  mass: number;
}

export interface VehicleDefinition {
  id: string;
  name: string;
  type: VehicleType;
  modelPath: string;
  maxSpeed: number;
  acceleration: number;
  turnSpeed: number;
  spawnPosition: { x: number; y: number; z: number };
}

export interface VehiclesState {
  vehicles: VehicleDefinition[];
  playerVehicleId: string | null;
  mountedVehicleId: string | null;
}
