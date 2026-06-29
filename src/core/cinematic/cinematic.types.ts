/**
 * @file src/core/cinematic/cinematic.types.ts
 * @description Action schemas, timeline keyframes, and director types.
 */

export type CinematicActionType = 'camera' | 'player' | 'screen' | 'audio' | 'custom';

export interface CameraActionPayload {
  position: { x: number; y: number; z: number };
  lookAt: { x: number; y: number; z: number };
  fov?: number;
}

export interface PlayerActionPayload {
  frozen: boolean;
}

export interface ScreenActionPayload {
  fadeOpacity: number; // 0 (clear) to 1 (black)
  letterbox: boolean;
}

export interface AudioActionPayload {
  soundId: string;
  action: 'play' | 'stop' | 'fade';
  volume?: number;
}

export interface CinematicKeyframe {
  time: number; // Seconds from start of sequence
  type: CinematicActionType;
  camera?: CameraActionPayload;
  player?: PlayerActionPayload;
  screen?: ScreenActionPayload;
  audio?: AudioActionPayload;
  custom?: () => void;
}

export interface CinematicSequence {
  id: string;
  name: string;
  duration: number; // total duration in seconds
  keyframes: CinematicKeyframe[];
  priority: number; // Higher priority overrides active sequence
  onComplete?: () => void;
}

export interface DirectorState {
  activeSequence: CinematicSequence | null;
  elapsedTime: number;
  playbackSpeed: number;
  isPaused: boolean;
  queue: CinematicSequence[];
}
