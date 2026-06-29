/**
 * @file src/features/world/systems/districtPlugin.types.ts
 * @description Type definition contract for self-contained district scene plugins.
 */

import type { ZoneTheme } from '../zone.types';
import type { BuildingLot } from '@/features/buildings/district.types';
import type { InteractableConfig } from '@/core/interaction/interactable.types';
import type { CinematicSequence } from '@/core/cinematic/cinematic.types';

export interface AudioProfile {
  ambienceId: string;
  volume: number;
}

export interface DistrictPlugin {
  id: ZoneTheme;
  name: string;
  preload: () => Promise<void>;
  mount: () => React.ReactElement;
  unmount: () => void;
  audio: AudioProfile;
  interactions: InteractableConfig[];
  cinematics: CinematicSequence[];
}
