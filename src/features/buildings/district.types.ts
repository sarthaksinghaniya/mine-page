/**
 * @file src/features/buildings/district.types.ts
 * @description Data-driven structures for districts, lots, buildings, and interiors.
 */

import type { ZoneTheme } from '../world/zone.types';

export interface InteriorConfig {
  id:             string;
  name:           string;
  ambientIntensity: number;
  lightColor:     string;
  skyColor:       string;
}

export interface BuildingLot {
  id:           string;
  name:         string;
  category:     'landmark' | 'commercial' | 'civic' | 'residential';
  position:     { x: number; y: number; z: number };
  scale:        { x: number; y: number; z: number };
  rotation:     number; // Y yaw
  interior?:    InteriorConfig; // Presence denotes interactable building
  interactRadius: number;
}

export interface DistrictDefinition {
  id:        ZoneTheme;
  name:      string;
  lots:      BuildingLot[];
  ambienceId:string; // Track loops from AudioManager
}

export const DISTRICT_REGISTRY: Record<ZoneTheme, DistrictDefinition> = {
  'spawn': {
    id: 'spawn',
    name: 'Genesis Spawn Plaza',
    ambienceId: 'spawn-plaza-bg',
    lots: [
      {
        id: 'spawn-plaza-pillar',
        name: 'Genesis Central Obelisk',
        category: 'landmark',
        position: { x: 0, y: 1.5, z: -10 },
        scale: { x: 4, y: 12, z: 4 },
        rotation: 0,
        interactRadius: 5,
      },
    ],
  },
  'ai-research': {
    id: 'ai-research',
    name: 'Neural AI Research District',
    ambienceId: 'ai-lab-ambient',
    lots: [
      {
        id: 'ai-research-lab',
        name: 'Neural AI Core Lab',
        category: 'landmark',
        position: { x: 400, y: 3, z: 0 },
        scale: { x: 15, y: 25, z: 15 },
        rotation: Math.PI / 4,
        interactRadius: 8,
        interior: {
          id: 'ai-lab-interior',
          name: 'AI Core Sandbox',
          ambientIntensity: 0.15,
          lightColor: '#8000ff',
          skyColor: '#050510',
        },
      },
    ],
  },
  'hackathon-arena': {
    id: 'hackathon-arena',
    name: 'Code Arena & Hackathon Hub',
    ambienceId: 'arena-crowd-ambient',
    lots: [
      {
        id: 'hackathon-hq',
        name: 'Code Coliseum',
        category: 'civic',
        position: { x: -400, y: 2.5, z: 0 },
        scale: { x: 20, y: 10, z: 20 },
        rotation: 0,
        interactRadius: 10,
        interior: {
          id: 'hackathon-interior',
          name: 'Coliseum Arena Floor',
          ambientIntensity: 0.4,
          lightColor: '#ff0090',
          skyColor: '#100510',
        },
      },
    ],
  },
  'tech-hq': {
    id: 'tech-hq',
    name: 'TechNeekX Corporate HQ',
    ambienceId: 'office-hum-ambient',
    lots: [
      {
        id: 'techneekx-tower',
        name: 'TechNeekX Tower',
        category: 'landmark',
        position: { x: 0, y: 10, z: 400 },
        scale: { x: 15, y: 60, z: 15 },
        rotation: 0,
        interactRadius: 8,
        interior: {
          id: 'tech-tower-lobby',
          name: 'Tower Grand Lobby',
          ambientIntensity: 0.5,
          lightColor: '#00ff66',
          skyColor: '#051005',
        },
      },
    ],
  },
  'museum': {
    id: 'museum',
    name: 'Career & Projects Museum',
    ambienceId: 'museum-echo-ambient',
    lots: [
      {
        id: 'achievement-hall',
        name: 'Hall of Achievements',
        category: 'civic',
        position: { x: 0, y: 4, z: -400 },
        scale: { x: 30, y: 12, z: 15 },
        rotation: Math.PI / 2,
        interactRadius: 12,
        interior: {
          id: 'museum-interior',
          name: 'Main Exhibition Hall',
          ambientIntensity: 0.3,
          lightColor: '#ffcc00',
          skyColor: '#0a0a05',
        },
      },
    ],
  },
  'spaceport': {
    id: 'spaceport',
    name: 'Spaceport Future Island',
    ambienceId: 'spaceport-launch-ambient',
    lots: [
      {
        id: 'launch-pad-alpha',
        name: 'Spaceport Gantry Alpha',
        category: 'landmark',
        position: { x: 400, y: 1, z: 400 },
        scale: { x: 12, y: 40, z: 12 },
        rotation: 0,
        interactRadius: 10,
      },
    ],
  },
};
export const DISTRICTS_LIST = Object.values(DISTRICT_REGISTRY);
