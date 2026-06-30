/**
 * @file src/features/environment/systems/WeatherSystem.tsx
 * @description Coordinates weather conditions and dynamics.
 */

import type React from 'react';
import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useEnvironmentStore } from '../environment.store';
import { useLightingStore } from '@/features/lighting/lighting.store';
import { damp } from '@shared/utils/math';

export function WeatherSystem(): React.ReactElement | null {
  const weather = useEnvironmentStore((s) => s.weather);
  const setWeatherState = useEnvironmentStore((s) => s.setWeatherState);
  const setFog = useLightingStore((s) => s.setFog);

  // Transition parameters on mount
  useEffect(() => {
    // Basic automatic weather cycle trigger every 120 seconds
    const interval = setInterval(() => {
      const types = ['clear', 'cloudy', 'foggy', 'rain'] as const;
      const nextType = types[Math.floor(Math.random() * types.length)]!;
      setWeatherState({ target: nextType, blendFactor: 0 });
    }, 120000);

    return () => { clearInterval(interval); };
  }, [setWeatherState]);

  useFrame((_, delta) => {
    if (weather.blendFactor >= 1) return;

    // Blend targets
    const nextBlend = Math.min(1, weather.blendFactor + delta * 0.1); // 10s fade duration

    // Interpolate target values based on selection
    let targetFog = 0.003;
    let precipitation = 0;

    if (weather.target === 'foggy') {
      targetFog = 0.025;
    } else if (weather.target === 'rain') {
      precipitation = 0.8;
      targetFog = 0.008;
    }

    const currentFog = damp(weather.fogDensity, targetFog, 2, delta);
    const currentPrecip = damp(weather.precipitationDensity, precipitation, 2, delta);

    setWeatherState({
      blendFactor: nextBlend,
      fogDensity: currentFog,
      precipitationDensity: currentPrecip,
      current: nextBlend >= 0.99 ? weather.target : weather.current,
    });

    // Update scene renderer fog variables
    setFog({ density: currentFog });
  });

  return null;
}
