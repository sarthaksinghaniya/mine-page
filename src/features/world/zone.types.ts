/**
 * @file src/features/world/zone.types.ts
 * @description Structure declarations for the open world zone streaming system.
 */

import type * as THREE from 'three';

export type ZoneTheme =
  'spawn' | 'ai-research' | 'hackathon-arena' | 'tech-hq' | 'museum' | 'spaceport';

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
    bounds: { min: { x: -150, z: -150 }, max: { x: 150, z: 150 } },
    color: '#00e5f0',
  },
  'ai-research': {
    id: 'ai-research',
    name: 'Neural AI Research District',
    theme: 'ai-research',
    center: { x: 400, y: 0, z: 0 },
    radius: 250,
    bounds: { min: { x: 250, z: -150 }, max: { x: 550, z: 150 } },
    color: '#8000ff',
  },
  'hackathon-arena': {
    id: 'hackathon-arena',
    name: 'Code Arena & Hackathon Hub',
    theme: 'hackathon-arena',
    center: { x: -400, y: 0, z: 0 },
    radius: 250,
    bounds: { min: { x: -550, z: -150 }, max: { x: -250, z: 150 } },
    color: '#ff0090',
  },
  'tech-hq': {
    id: 'tech-hq',
    name: 'TechNeekX Corporate HQ',
    theme: 'tech-hq',
    center: { x: 0, y: 0, z: 400 },
    radius: 250,
    bounds: { min: { x: -150, z: 250 }, max: { x: 150, z: 550 } },
    color: '#00ff66',
  },
  museum: {
    id: 'museum',
    name: 'Career & Projects Museum',
    theme: 'museum',
    center: { x: 0, y: 0, z: -400 },
    radius: 250,
    bounds: { min: { x: -150, z: -550 }, max: { x: 150, z: -250 } },
    color: '#ffcc00',
  },
  spaceport: {
    id: 'spaceport',
    name: 'Spaceport Future Island',
    theme: 'spaceport',
    center: { x: 400, y: 0, z: 400 },
    radius: 300,
    bounds: { min: { x: 250, z: 250 }, max: { x: 550, z: 550 } },
    color: '#ff5500',
  },
};

export const ZONES_LIST = Object.values(WORLD_ZONES);
