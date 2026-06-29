/**
 * @file src/features/environment/environment.types.ts
 * @description Type definitions for the environment feature (weather, sky, day-night).
 */

// ── Day / Night ───────────────────────────────────────────────────────────────

/** Normalized time of day: 0.0 = midnight, 0.25 = dawn, 0.5 = noon, 0.75 = dusk */
export type NormalizedTimeOfDay = number;

export type DayPhase = 'midnight' | 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'night';

export interface SunState {
  /** Normalized time 0–1 */
  timeOfDay: NormalizedTimeOfDay;
  phase: DayPhase;
  /** Direction vector pointing toward the sun */
  direction: { x: number; y: number; z: number };
  /** Sky color at the horizon */
  horizonColor: string;
  /** Sky color at the zenith */
  zenithColor: string;
  /** Ambient light intensity */
  ambientIntensity: number;
  /** Sun light intensity */
  sunIntensity: number;
}

// ── Weather ───────────────────────────────────────────────────────────────────

export type WeatherType = 'clear' | 'cloudy' | 'foggy' | 'rain' | 'storm' | 'snow';

export interface WeatherState {
  current: WeatherType;
  target: WeatherType;
  /** Transition progress 0–1 */
  blendFactor: number;
  /** 0 = no wind, 1 = storm */
  windIntensity: number;
  windDirection: { x: number; z: number };
  /** Fog density (0 = none, 1 = pea-soup) */
  fogDensity: number;
  /** Particle density for rain/snow */
  precipitationDensity: number;
}

// ── Environment State ─────────────────────────────────────────────────────────

export interface EnvironmentState {
  sun: SunState;
  weather: WeatherState;
  /** Whether the day-night cycle is advancing automatically */
  cycleRunning: boolean;
  /** Speed of the day-night cycle (1 = real-time, 60 = 1 game minute per real second) */
  cycleSpeed: number;
}
