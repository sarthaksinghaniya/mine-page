/**
 * @file src/features/vehicles/vehicle.types.ts
 * @description Structure definitions for the universal vehicle framework.
 */

export type VehicleCategory =
  | 'car'
  | 'hover'
  | 'drone'
  | 'flying'
  | 'shuttle';

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
  id:       string;
  position: { x: number; y: number; z: number };
  rotation: { yaw: number; pitch: number };
  fuel:     number; // percentage 0-100
  damage:   number; // percentage 0-100 (0 = clean, 100 = wrecked)
}

export interface VehicleConfig {
  id:           string;
  name:         string;
  category:     VehicleCategory;
  position:     { x: number; y: number; z: number };
  rotation:     number; // Y-axis yaw
  maxSpeed:     number;
  acceleration: number;
  mass:         number;
}

export interface VehiclesState {
  vehicles:          VehicleConfig[];
  activeVehicleId:   string | null;
  driverId:          string | null;
}
