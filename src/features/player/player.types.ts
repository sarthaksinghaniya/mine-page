/**
 * @file src/features/player/player.types.ts
 * @description Type definitions for the player feature.
 */

// ── Player State ──────────────────────────────────────────────────────────────

export type PlayerMovementState =
  'idle' | 'walking' | 'running' | 'jumping' | 'falling' | 'interacting';

export type PlayerCameraMode = 'thirdPerson' | 'firstPerson' | 'cinematic' | 'overview';

export interface PlayerPosition {
  x: number;
  y: number;
  z: number;
}

export interface PlayerRotation {
  yaw: number; // Y-axis rotation (left/right)
  pitch: number; // X-axis rotation (up/down) — clamped in first person
}

export interface PlayerState {
  position: PlayerPosition;
  rotation: PlayerRotation;
  movementState: PlayerMovementState;
  cameraMode: PlayerCameraMode;
  currentZoneId: string | null;
  speed: number;
  isPointerLocked: boolean;
}
