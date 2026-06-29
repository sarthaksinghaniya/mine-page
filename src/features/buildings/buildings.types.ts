/**
 * @file src/features/buildings/buildings.types.ts
 * @description Type definitions for the buildings/city feature.
 */

import type { ZoneId, ZoneTheme } from '../world/world.types';

export type BuildingCategory =
  | 'landmark' // Major portfolio landmark (hero project tower)
  | 'commercial' // Regular portfolio project building
  | 'civic' // Skills / experience building
  | 'residential' // Background filler building
  | 'special'; // Easter egg / secret building

export interface BuildingDefinition {
  id: string;
  name: string;
  category: BuildingCategory;
  theme: ZoneTheme;
  zoneId: ZoneId;
  modelPath: string;
  position: { x: number; y: number; z: number };
  rotation: { y: number };
  scale: number;
  /** Portfolio project/skill/experience ID this building represents */
  portfolioId: string | null;
  interactable: boolean;
  emissiveColor?: string;
}

export interface BuildingsState {
  buildings: BuildingDefinition[];
  hoveredBuildingId: string | null;
  activeBuildingId: string | null;
}
