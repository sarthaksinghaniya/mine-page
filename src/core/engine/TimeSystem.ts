/**
 * @file src/core/engine/TimeSystem.ts
 * @description Centralized game time tracking.
 *
 * Provides both real elapsed time (wall-clock) and game time (pausable, scalable).
 * All systems that need dt or elapsed time should read from this module rather
 * than computing their own deltas from useFrame's `state.clock`.
 *
 * This is a plain object (not a React hook) so it can be imported into systems
 * that run outside of the React tree if needed.
 */

// ── Time State ────────────────────────────────────────────────────────────────

interface GameTime {
  /** Total wall-clock time since app start (seconds) */
  elapsed: number;
  /** Delta time from last frame (seconds), capped to prevent spiral of death */
  delta: number;
  /** Current game time scale — 0 = paused, 1 = real-time, 2 = 2× speed */
  timeScale: number;
  /** Game elapsed time (elapsed × timeScale, paused when scale = 0) */
  gameElapsed: number;
  /** Game delta time (delta × timeScale) */
  gameDelta: number;
  /** Frame count since app start */
  frame: number;
}

const MAX_DELTA_SECONDS = 0.1; // 100ms cap — prevents physics tunneling on tab-blur

export const gameTime: GameTime = {
  elapsed:     0,
  delta:       0,
  timeScale:   1,
  gameElapsed: 0,
  gameDelta:   0,
  frame:       0,
};

// ── Update (called by GameLoop.tsx every frame) ────────────────────────────────

/**
 * Updates the game time state. Called once per frame by the engine's
 * top-level GameLoop component via R3F's useFrame hook.
 *
 * @param rawDelta - Raw delta time in seconds from Three.js Clock
 */
export function updateGameTime(rawDelta: number): void {
  const clampedDelta = Math.min(rawDelta, MAX_DELTA_SECONDS);
  gameTime.delta       = clampedDelta;
  gameTime.elapsed    += clampedDelta;
  gameTime.gameDelta   = clampedDelta * gameTime.timeScale;
  gameTime.gameElapsed += gameTime.gameDelta;
  gameTime.frame      += 1;
}

/**
 * Pauses the game clock. Real elapsed time still advances.
 */
export function pauseGameTime(): void {
  gameTime.timeScale = 0;
}

/**
 * Resumes the game clock at normal speed.
 */
export function resumeGameTime(): void {
  gameTime.timeScale = 1;
}

/**
 * Sets a custom time scale for slow-motion or fast-forward effects.
 * @param scale - Multiplier (0 = paused, 1 = normal, >1 = fast)
 */
export function setTimeScale(scale: number): void {
  gameTime.timeScale = Math.max(0, scale);
}
