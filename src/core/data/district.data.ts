/**
 * @file src/core/data/district.data.ts
 * @description Centralized definitions for all buildings and districts.
 */

export interface BuildingDefinition {
  id: string;
  appId: string;
  cameraPreset: string;
  ambientProfile: string;
  interactionRadius: number;
  entryPosition: { x: number; y: number; z: number };
  expansionReady?: boolean;
}

export const DISTRICT_BUILDINGS: Record<string, BuildingDefinition> = {
  'ai-research-lab': {
    id: 'ai-research-lab',
    appId: 'ai-research',
    cameraPreset: 'building_entrance',
    ambientProfile: 'electronic',
    interactionRadius: 8,
    entryPosition: { x: -45, y: 0, z: -120 },
  },
  'achievement-museum': {
    id: 'achievement-museum',
    appId: 'achievement-museum',
    cameraPreset: 'building_entrance',
    ambientProfile: 'quiet',
    interactionRadius: 8,
    entryPosition: { x: 50, y: 0, z: -120 },
  },
  'projects-district': {
    id: 'projects-district',
    appId: 'projects-district',
    cameraPreset: 'building_entrance',
    ambientProfile: 'cyber',
    interactionRadius: 8,
    entryPosition: { x: -80, y: 0, z: -50 },
  },
  'experience-tower': {
    id: 'experience-tower',
    appId: 'experience-tower',
    cameraPreset: 'building_entrance',
    ambientProfile: 'corporate',
    interactionRadius: 10,
    entryPosition: { x: 80, y: 0, z: -50 },
  },
  'skills-lab': {
    id: 'skills-lab',
    appId: 'skills-lab',
    cameraPreset: 'building_entrance',
    ambientProfile: 'tech',
    interactionRadius: 8,
    entryPosition: { x: -30, y: 0, z: -180 },
  },
  'resume-center': {
    id: 'resume-center',
    appId: 'resume-center',
    cameraPreset: 'building_entrance',
    ambientProfile: 'minimal',
    interactionRadius: 8,
    entryPosition: { x: 30, y: 0, z: -180 },
  },
  'contact-center': {
    id: 'contact-center',
    appId: 'contact-center',
    cameraPreset: 'building_entrance',
    ambientProfile: 'comms',
    interactionRadius: 8,
    entryPosition: { x: 0, y: 0, z: -200 },
  }
};
