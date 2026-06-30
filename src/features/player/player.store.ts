/**
 * @file src/features/player/player.store.ts
 * @description Zustand store for player state.
 *
 * NOTE: High-frequency values (position, rotation) are stored here for
 * UI reading (minimap, HUD). The actual authoritative physics position
 * lives in the Rapier RigidBody and is synced here at reduced frequency
 * (e.g., every 3 frames) to avoid flooding React's reconciler.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  PlayerState,
  PlayerMovementState,
  PlayerCameraMode,
  PlayerPosition,
  PlayerRotation,
} from './player.types';

interface PlayerActions {
  setPosition: (position: PlayerPosition) => void;
  setRotation: (rotation: PlayerRotation) => void;
  setMovementState: (state: PlayerMovementState) => void;
  setCameraMode: (mode: PlayerCameraMode) => void;
  setCurrentZone: (zoneId: string | null) => void;
  setPointerLocked: (locked: boolean) => void;
}

type PlayerStore = PlayerState & PlayerActions;

export const usePlayerStore = create<PlayerStore>()(
  subscribeWithSelector((set) => ({
    // ── Initial State ──────────────────────────────────────────────────────────
    position: { x: 0, y: 0, z: 0 },
    rotation: { yaw: 0, pitch: 0 },
    movementState: 'idle',
    cameraMode: 'thirdPerson',
    currentZoneId: null,
    speed: 5,
    isPointerLocked: false,

    // ── Actions ────────────────────────────────────────────────────────────────
    setPosition: (position) => { set({ position }); },
    setRotation: (rotation) => { set({ rotation }); },
    setMovementState: (movementState) => { set({ movementState }); },
    setCameraMode: (cameraMode) => { set({ cameraMode }); },
    setCurrentZone: (currentZoneId) => { set({ currentZoneId }); },
    setPointerLocked: (isPointerLocked) => { set({ isPointerLocked }); },
  })),
);
