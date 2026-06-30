/**
 * @file src/features/environment/systems/DayNightCycle.tsx
 * @description In-game clock ticking engine, resolving sun orbits and lighting matrices.
 */

import type React from 'react';
import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useEnvironmentStore } from '../environment.store';
import { useLightingStore } from '@/features/lighting/lighting.store';
import { LIGHTING_PRESET_NOON, LIGHTING_PRESET_NIGHT } from '@/features/lighting/lighting.types';
import { eventBus } from '@core/events/EventBus';

export function DayNightCycle(): React.ReactElement | null {
  const cycleRunning = useEnvironmentStore((s) => s.cycleRunning);
  const cycleSpeed = useEnvironmentStore((s) => s.cycleSpeed);
  const sun = useEnvironmentStore((s) => s.sun);
  const setTimeOfDay = useEnvironmentStore((s) => s.setTimeOfDay);
  const setSunState = useEnvironmentStore((s) => s.setSunState);

  const blendToward = useLightingStore((s) => s.blendToward);

  useFrame((_, delta) => {
    if (!cycleRunning) return;

    // Advanced in-game clock (timeOfDay is normalized 0-1)
    // cycleSpeed 60 = 24 game minutes per real minute (1 game day = 24 minutes)
    // 24 minutes * 60 = 1440 seconds. (speed * delta) / 1440.
    const timeDelta = (cycleSpeed * delta) / 1440;
    const nextTime = (sun.timeOfDay + timeDelta) % 1.0;
    setTimeOfDay(nextTime);

    // Calculate dynamic orbit position for sun direction
    // 0 = midnight, 0.25 = dawn, 0.5 = noon, 0.75 = dusk
    const angle = (nextTime * 2 - 1) * Math.PI; // -PI to PI
    const sunY = Math.sin(angle); // Positive = day, Negative = night
    const sunZ = Math.cos(angle);

    setSunState({
      direction: { x: 0, y: sunY, z: sunZ },
      phase: sunY > 0.1 ? 'noon' : sunY < -0.1 ? 'night' : 'dusk',
    });

    // Interpolate lighting presets based on sun position
    const t = Math.max(0, Math.min(1, (sunY + 1) / 2)); // map -1..1 to 0..1
    blendToward(sunY > 0 ? LIGHTING_PRESET_NOON : LIGHTING_PRESET_NIGHT, t);

    // Emit event notifications on major cycle phases
    if (Math.abs(sunY) < 0.05) {
      eventBus.emit('world:dayNightChanged', {
        phase: sunY > 0 ? 'dusk' : 'dawn',
        normalizedTime: nextTime,
      });
    }
  });

  return null;
}
