/**
 * @file src/features/world/world.store.ts
 * @description Zustand store for open-world state management.
 *
 * Manages which zones are active, loading status, and the focused zone.
 * Game systems (ZoneCuller) mutate this store; UI components read from it.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { WorldState, ZoneId, ZoneStatus } from './world.types';

interface WorldActions {
  /** Mark a zone as loading */
  setZoneStatus: (id: ZoneId, status: ZoneStatus) => void;
  /** Add a zone to the active set */
  activateZone: (id: ZoneId) => void;
  /** Remove a zone from the active set */
  deactivateZone: (id: ZoneId) => void;
  /** Set the player's focused zone */
  setFocusedZone: (id: ZoneId | null) => void;
}

type WorldStore = WorldState & WorldActions;

export const useWorldStore = create<WorldStore>()(
  subscribeWithSelector((set) => ({
    // ── Initial State ──────────────────────────────────────────────────────────
    zones: [],
    activeZoneIds: [],
    focusedZoneId: null,
    zoneStatuses: {},

    // ── Actions ────────────────────────────────────────────────────────────────
    setZoneStatus: (id, status) =>
      { set((state) => ({
        zoneStatuses: { ...state.zoneStatuses, [id]: status },
      })); },

    activateZone: (id) =>
      { set((state) => ({
        activeZoneIds: state.activeZoneIds.includes(id)
          ? state.activeZoneIds
          : [...state.activeZoneIds, id],
      })); },

    deactivateZone: (id) =>
      { set((state) => ({
        activeZoneIds: state.activeZoneIds.filter((zId) => zId !== id),
      })); },

    setFocusedZone: (id) => { set({ focusedZoneId: id }); },
  })),
);
