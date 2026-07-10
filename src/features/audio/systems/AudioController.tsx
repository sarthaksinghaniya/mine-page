import React, { useEffect } from 'react';
import { useWorldStore } from '@/features/world/world.store';
import { AudioManager } from '../AudioManager';
import { AudioZones } from './AudioZones';
import { DISTRICTS_LIST } from '@/features/buildings/district.types';
import type { ZoneTheme } from '@/features/world/zone.types';

export function AudioController(): React.ReactElement | null {
  const focusedZoneId = useWorldStore((s) => s.focusedZoneId);

  // Initialize and register audio tracks on mount
  useEffect(() => {
    DISTRICTS_LIST.forEach((district) => {
      AudioManager.register({
        id: district.ambienceId,
        src: [`/assets/audio/dummy-${district.id}.mp3`],
        category: 'ambient',
        loop: true,
        volume: 0.5,
        spatial: false,
        preload: false, // Don't actually preload dummy files
      });
    });

    // Also register wilderness
    AudioManager.register({
      id: 'wilderness-ambient',
      src: [`/assets/audio/wilderness.mp3`],
      category: 'ambient',
      loop: true,
      volume: 0.3,
      spatial: false,
      preload: false,
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Monitor zone changes and trigger crossfades
  useEffect(() => {
    if (focusedZoneId) {
      AudioZones.transition(focusedZoneId as ZoneTheme);
    } else {
      // If null, we cast 'spawn' or a custom fallback to ZoneTheme
      AudioZones.transition('spawn' as ZoneTheme);
    }
  }, [focusedZoneId]);

  return null;
}
