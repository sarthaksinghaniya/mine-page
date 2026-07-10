/**
 * @file src/features/environment/environment.store.ts
 * @description Zustand store for environment / sky / weather state.
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  EnvironmentState,
  SunState,
  WeatherState,
  WeatherType,
  NormalizedTimeOfDay,
} from './environment.types';

interface EnvironmentActions {
  setSunState: (sun: Partial<SunState>) => void;
  setTimeOfDay: (time: NormalizedTimeOfDay) => void;
  setWeather: (type: WeatherType) => void;
  setWeatherState: (weather: Partial<WeatherState>) => void;
  setCycleRunning: (running: boolean) => void;
  setCycleSpeed: (speed: number) => void;
}

type EnvironmentStore = EnvironmentState & EnvironmentActions;

const defaultSun: SunState = {
  timeOfDay: 0.5, // Noon
  phase: 'noon',
  direction: { x: 0, y: 1, z: 0 },
  horizonColor: '#87ceeb',
  zenithColor: '#1a3a6b',
  ambientIntensity: 0.4,
  sunIntensity: 2.5,
};

const defaultWeather: WeatherState = {
  current: 'clear',
  target: 'clear',
  blendFactor: 1,
  windIntensity: 0.1,
  windDirection: { x: 1, z: 0 },
  fogDensity: 0,
  precipitationDensity: 0,
};

export const useEnvironmentStore = create<EnvironmentStore>()(
  subscribeWithSelector((set) => ({
    // ── Initial State ──────────────────────────────────────────────────────────
    sun: { ...defaultSun, timeOfDay: 0.45 },
    weather: defaultWeather,
    cycleRunning: false,
    cycleSpeed: 60, // 1 game-day per 24 real minutes

    // ── Actions ────────────────────────────────────────────────────────────────
    setSunState: (sun) => { set((s) => ({ sun: { ...s.sun, ...sun } })); },
    setTimeOfDay: (time) => { set((s) => ({ sun: { ...s.sun, timeOfDay: time } })); },
    setWeather: (type) => { set((s) => ({ weather: { ...s.weather, target: type } })); },
    setWeatherState: (weather) => { set((s) => ({ weather: { ...s.weather, ...weather } })); },
    setCycleRunning: (cycleRunning) => { set({ cycleRunning }); },
    setCycleSpeed: (cycleSpeed) => { set({ cycleSpeed }); },
  })),
);
