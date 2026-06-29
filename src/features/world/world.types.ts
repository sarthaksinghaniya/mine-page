/**
 * @file src/features/world/world.types.ts
 * @description Type definitions for the open-world management feature.
 */

import type * as THREE from 'three';

// ── Zone ──────────────────────────────────────────────────────────────────────

export type ZoneId = string;
export type ZoneStatus = 'unloaded' | 'loading' | 'active' | 'unloading';

/** The career theme / aesthetic of a zone */
export type ZoneTheme =
  | 'hub'           // Central plaza — portfolio overview
  | 'projects'      // Tower district — featured projects
  | 'skills'        // Tech grid — skills visualization
  | 'experience'    // Timeline avenue — work history
  | 'contact'       // Rooftop — contact / socials
  | 'secret';       // Easter egg zone

export interface ZoneDefinition {
  id:          ZoneId;
  name:        string;
  theme:       ZoneTheme;
  /** World-space center of the zone */
  center:      THREE.Vector3Like;
  /** Radius at which the zone begins loading */
  loadRadius:  number;
  /** Radius at which the zone is fully unloaded */
  unloadRadius: number;
  /** Lazy import function for the zone's React component */
  component:   () => Promise<{ default: React.ComponentType }>;
}

// ── World State ───────────────────────────────────────────────────────────────

export interface WorldState {
  /** All zone definitions in the game world */
  zones:         ZoneDefinition[];
  /** Currently active (loaded and visible) zone IDs */
  activeZoneIds: ZoneId[];
  /** Zone currently being focused/entered by the player */
  focusedZoneId: ZoneId | null;
  /** Status map for each zone */
  zoneStatuses:  Record<ZoneId, ZoneStatus>;
}
