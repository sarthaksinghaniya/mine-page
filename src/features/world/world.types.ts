/**
 * @file src/features/world/world.types.ts
 * @description Type definitions for the open-world management feature.
 */

import type { ZoneTheme } from './zone.types';
import * as THREE from 'three';

export type { ZoneTheme };

export type ZoneId = string;
export type ZoneStatus = 'unloaded' | 'loading' | 'active' | 'unloading';

export interface ZoneDefinition {
  id: ZoneId;
  name: string;
  theme: ZoneTheme;
  /** World-space center of the zone */
  center: THREE.Vector3Like;
  /** Radius at which the zone begins loading */
  loadRadius: number;
  /** Radius at which the zone is fully unloaded */
  unloadRadius: number;
  /** Lazy import function for the zone's React component */
  component: () => Promise<{ default: React.ComponentType }>;
}

// ── World State ───────────────────────────────────────────────────────────────

export interface WorldState {
  /** All zone definitions in the game world */
  zones: ZoneDefinition[];
  /** Currently active (loaded and visible) zone IDs */
  activeZoneIds: ZoneId[];
  /** Zone currently being focused/entered by the player */
  focusedZoneId: ZoneId | null;
  /** Status map for each zone */
  zoneStatuses: Record<ZoneId, ZoneStatus>;
}
