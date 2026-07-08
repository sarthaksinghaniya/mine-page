/**
 * @file src/features/world/zone.types.ts
 * @description Structure declarations for the open world zone streaming system.
 */

import type * as THREE from 'three';

export type ZoneTheme =
  'spawn' | 'ai-research' | 'projects' | 'museum' | 'skills' | 'experience' | 'resume' | 'contact';

export interface ZoneBounds {
  min: { x: number; z: number };
  max: { x: number; z: number };
}

export interface ZoneConfig {
  id: string;
  name: string;
  theme: ZoneTheme;
  center: { x: number; y: number; z: number };
  radius: number; // Radius for streaming activation
  bounds: ZoneBounds;
  color: string; // Debug terrain grids
}

export const WORLD_ZONES: Record<ZoneTheme, ZoneConfig> = {
  spawn: {
    id: 'spawn',
    name: 'Genesis Spawn Plaza',
    theme: 'spawn',
    center: { x: 0, y: 0, z: 0 },
    radius: 250,
    bounds: { min: { x: -200, z: -200 }, max: { x: 200, z: 200 } },
    color: '#00e5f0',
  },
  'ai-research': {
    id: 'ai-research',
    name: 'Neural AI Research District',
    theme: 'ai-research',
    center: { x: 400, y: 0, z: 0 },
    radius: 250,
    bounds: { min: { x: 200, z: -200 }, max: { x: 600, z: 200 } },
    color: '#8000ff',
  },
  projects: {
    id: 'projects',
    name: 'Projects & Development Hub',
    theme: 'projects',
    center: { x: 400, y: 0, z: 400 },
    radius: 250,
    bounds: { min: { x: 200, z: 200 }, max: { x: 600, z: 600 } },
    color: '#ff5500',
  },
  museum: {
    id: 'museum',
    name: 'Achievement Museum',
    theme: 'museum',
    center: { x: 0, y: 0, z: 400 },
    radius: 250,
    bounds: { min: { x: -200, z: 200 }, max: { x: 200, z: 600 } },
    color: '#ffcc00',
  },
  skills: {
    id: 'skills',
    name: 'Skills Matrix Lab',
    theme: 'skills',
    center: { x: -400, y: 0, z: 400 },
    radius: 250,
    bounds: { min: { x: -600, z: 200 }, max: { x: -200, z: 600 } },
    color: '#00ff66',
  },
  experience: {
    id: 'experience',
    name: 'Experience Tower',
    theme: 'experience',
    center: { x: -400, y: 0, z: 0 },
    radius: 250,
    bounds: { min: { x: -600, z: -200 }, max: { x: -200, z: 200 } },
    color: '#ff0055',
  },
  resume: {
    id: 'resume',
    name: 'Resume Center',
    theme: 'resume',
    center: { x: -400, y: 0, z: -400 },
    radius: 250,
    bounds: { min: { x: -600, z: -600 }, max: { x: -200, z: -200 } },
    color: '#0055ff',
  },
  contact: {
    id: 'contact',
    name: 'Communications & Contact',
    theme: 'contact',
    center: { x: 0, y: 0, z: -400 },
    radius: 250,
    bounds: { min: { x: -200, z: -600 }, max: { x: 200, z: -200 } },
    color: '#ff00ff',
  },
};

export const ZONES_LIST = Object.values(WORLD_ZONES);
