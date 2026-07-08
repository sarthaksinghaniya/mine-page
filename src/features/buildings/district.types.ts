/**
 * @file src/features/buildings/district.types.ts
 * @description Data-driven structures for districts, lots, buildings, and interiors.
 */

import type { ZoneTheme } from '../world/zone.types';

export interface InteriorConfig {
  id: string;
  name: string;
  ambientIntensity: number;
  lightColor: string;
  skyColor: string;
}

export interface BuildingLot {
  id: string;
  name: string;
  category: 'landmark' | 'commercial' | 'civic' | 'residential';
  position: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  rotation: number; // Y yaw
  interior?: InteriorConfig; // Presence denotes interactable building
  interactRadius: number;
}

export interface DistrictDefinition {
  id: ZoneTheme;
  name: string;
  lots: BuildingLot[];
  ambienceId: string; // Track loops from AudioManager
}

export const DISTRICT_REGISTRY: Record<ZoneTheme, DistrictDefinition> = {
  spawn: {
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
        scale: { x: 20, y: 15, z: 20 },
        rotation: 0,
        interactRadius: 10,
        interior: {
          id: 'ai-lab-interior',
          name: 'AI Core Mainframe',
          ambientIntensity: 0.2,
          lightColor: '#8000ff',
          skyColor: '#050015',
        },
      },
    ],
  },
  projects: {
    id: 'projects',
    name: 'Projects & Development Hub',
    ambienceId: 'projects-ambient',
    lots: [
      {
        id: 'projects-hub',
        name: 'Development Hub',
        category: 'commercial',
        position: { x: 400, y: 5, z: 400 },
        scale: { x: 25, y: 20, z: 25 },
        rotation: 0,
        interactRadius: 15,
      },
    ],
  },
  museum: {
    id: 'museum',
    name: 'Achievement Museum',
    ambienceId: 'museum-ambient',
    lots: [
      {
        id: 'museum-main',
        name: 'Main Exhibition Hall',
        category: 'civic',
        position: { x: 0, y: 5, z: 400 },
        scale: { x: 30, y: 12, z: 30 },
        rotation: 0,
        interactRadius: 15,
      },
    ],
  },
  skills: {
    id: 'skills',
    name: 'Skills Matrix Lab',
    ambienceId: 'skills-ambient',
    lots: [
      {
        id: 'skills-lab',
        name: 'Skills Matrix Lab',
        category: 'residential',
        position: { x: -400, y: 5, z: 400 },
        scale: { x: 15, y: 15, z: 15 },
        rotation: 0,
        interactRadius: 10,
      },
    ],
  },
  experience: {
    id: 'experience',
    name: 'Experience Tower',
    ambienceId: 'experience-ambient',
    lots: [
      {
        id: 'experience-tower',
        name: 'Experience Tower',
        category: 'commercial',
        position: { x: -400, y: 15, z: 0 },
        scale: { x: 15, y: 40, z: 15 },
        rotation: 0,
        interactRadius: 15,
      },
    ],
  },
  resume: {
    id: 'resume',
    name: 'Resume Center',
    ambienceId: 'resume-ambient',
    lots: [
      {
        id: 'resume-center',
        name: 'Resume Center',
        category: 'civic',
        position: { x: -400, y: 5, z: -400 },
        scale: { x: 20, y: 10, z: 20 },
        rotation: 0,
        interactRadius: 10,
      },
    ],
  },
  contact: {
    id: 'contact',
    name: 'Communications & Contact',
    ambienceId: 'contact-ambient',
    lots: [
      {
        id: 'contact-center',
        name: 'Communications & Contact Array',
        category: 'commercial',
        position: { x: 0, y: 10, z: -400 },
        scale: { x: 10, y: 25, z: 10 },
        rotation: 0,
        interactRadius: 12,
      },
    ],
  },
};
export const DISTRICTS_LIST = Object.values(DISTRICT_REGISTRY);
