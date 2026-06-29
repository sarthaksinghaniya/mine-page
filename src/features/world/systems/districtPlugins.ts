/**
 * @file src/features/world/systems/districtPlugins.ts
 * @description Centralized registration mapper for district scene plugins.
 */

import React from 'react';
import type { ZoneTheme } from '../zone.types';

export interface DistrictPlugin {
  id: ZoneTheme;
  name: string;
  component: React.ComponentType;
}

export const DISTRICT_PLUGINS: Record<ZoneTheme, DistrictPlugin | null> = {
  spawn: {
    id: 'spawn',
    name: 'Genesis Spawn Plaza',
    component: React.lazy(() =>
      import('../zones/SpawnPlazaScene').then((m) => ({ default: m.SpawnPlazaScene })),
    ),
  },
  'ai-research': {
    id: 'ai-research',
    name: 'Neural AI Research District',
    component: React.lazy(() =>
      import('../../districts/ai-lab/scene/AIResearchScene').then((m) => ({
        default: m.AIResearchScene,
      })),
    ),
  },
  'hackathon-arena': null,
  'tech-hq': null,
  museum: null,
  spaceport: null,
};
