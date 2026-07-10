/**
 * @file src/features/buildings/district.types.ts
 * @description Data-driven structures for districts, lots, buildings, and interiors.
 */

import type { ZoneTheme } from '../world/zone.types';
import { projects, experience, skills } from '../../../data/content';

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
  appId?: string; // Links this lot to an Application in AppManager
  interactRadius: number;
  floatingLabel?: { title: string; subtitle: string; colorClass: string };
  meta?: any; // To hold raw data references like project details
}

export interface DistrictDefinition {
  id: ZoneTheme;
  name: string;
  lots: BuildingLot[];
  ambienceId: string; // Track loops from AudioManager
}

// Map Projects into a circular or grid layout around the Projects zone center (400, 400)
const projectLots: BuildingLot[] = projects.map((proj, index) => {
  const angle = (index / projects.length) * Math.PI * 2;
  const radius = 80;
  // Center is approx (400, 400)
  const px = 400 + Math.cos(angle) * radius;
  const pz = 400 + Math.sin(angle) * radius;
  
  // Height based on rarity
  let height = 20;
  if (proj.rarity === 'Legendary') height = 35;
  if (proj.rarity === 'Epic') height = 25;

  return {
    id: `project-${proj.slug}`,
    name: proj.title,
    category: 'commercial',
    position: { x: px, y: height/2, z: pz },
    scale: { x: 15, y: height, z: 15 },
    rotation: -angle, // face center
    interactRadius: 15,
    interior: { id: `proj-interior-${proj.slug}`, name: proj.title, ambientIntensity: 0.5, lightColor: '#ffffff', skyColor: '#000000' },
    meta: { type: 'project', data: proj }
  };
});

// Map Experience into a street row layout in Experience zone (-400, 0)
const experienceLots: BuildingLot[] = experience.map((exp, index) => {
  const zOffset = (index - experience.length / 2) * 50;
  const height = 15 + exp.level * 4;

  return {
    id: `exp-${index}`,
    name: exp.company,
    category: 'commercial',
    position: { x: -400, y: height/2, z: zOffset },
    scale: { x: 20, y: height, z: 20 },
    rotation: Math.PI / 2, // face street
    interactRadius: 15,
    interior: { id: `exp-interior-${index}`, name: exp.role, ambientIntensity: 0.5, lightColor: '#ffffff', skyColor: '#000000' },
    meta: { type: 'experience', data: exp }
  };
});

// Map Skills into categorized data centers in Skills zone (-400, 400)
// Group skills by type
const skillTypes = Array.from(new Set(skills.map(s => s.type))) as string[];
const skillLots: BuildingLot[] = skillTypes.map((type, index) => {
  const angle = (index / skillTypes.length) * Math.PI * 2;
  const radius = 60;
  const px = -400 + Math.cos(angle) * radius;
  const pz = 400 + Math.sin(angle) * radius;
  
  return {
    id: `skill-category-${index}`,
    name: `${type} Datacenter`,
    category: 'residential',
    position: { x: px, y: 15, z: pz },
    scale: { x: 25, y: 30, z: 25 },
    rotation: -angle,
    interactRadius: 20,
    interior: { id: `skill-interior-${index}`, name: type, ambientIntensity: 0.5, lightColor: '#ffffff', skyColor: '#000000' },
    meta: { type: 'skill_category', categoryName: type, data: skills.filter(s => s.type === type) }
  };
});

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
        appId: 'ai-research',
        interior: {
          id: 'ai-lab-interior',
          name: 'AI Core Mainframe',
          ambientIntensity: 0.2,
          lightColor: '#8000ff',
          skyColor: '#050015',
        },
        floatingLabel: {
          title: 'AI RESEARCH LAB',
          subtitle: 'Explore AI & ML Work',
          colorClass: 'bg-sky-500',
        },
      },
    ],
  },
  projects: {
    id: 'projects',
    name: 'Projects & Development Hub',
    ambienceId: 'projects-ambient',
    lots: [
      ...projectLots,
      {
        id: 'projects-hub',
        name: 'Development Hub Core',
        category: 'commercial',
        position: { x: 400, y: 5, z: 400 },
        scale: { x: 25, y: 20, z: 25 },
        rotation: 0,
        interactRadius: 15,
        appId: 'projects-district',
        floatingLabel: {
          title: 'PROJECTS DISTRICT',
          subtitle: 'View My Projects',
          colorClass: 'bg-purple-600',
        },
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
        appId: 'achievement-museum',
        floatingLabel: {
          title: 'ACHIEVEMENT MUSEUM',
          subtitle: 'Awards & Honors',
          colorClass: 'bg-amber-500',
        },
      },
    ],
  },
  skills: {
    id: 'skills',
    name: 'Skills Matrix Lab',
    ambienceId: 'skills-ambient',
    lots: [
      ...skillLots,
      {
        id: 'skills-lab-core',
        name: 'Skills Matrix Core',
        category: 'residential',
        position: { x: -400, y: 5, z: 400 },
        scale: { x: 15, y: 15, z: 15 },
        rotation: 0,
        interactRadius: 10,
        appId: 'skills-lab',
        floatingLabel: {
          title: 'SKILLS LAB',
          subtitle: 'My Skills & Tech',
          colorClass: 'bg-teal-500',
        },
      },
    ],
  },
  experience: {
    id: 'experience',
    name: 'Experience Tower',
    ambienceId: 'experience-ambient',
    lots: [
      {
        id: 'experience-tower-core',
        name: 'Experience Tower Core',
        category: 'landmark',
        position: { x: -400, y: 15, z: 0 },
        scale: { x: 20, y: 30, z: 20 },
        rotation: 0,
        interactRadius: 20,
        appId: 'experience-tower',
        floatingLabel: {
          title: 'EXPERIENCE TOWER',
          subtitle: 'My Journey',
          colorClass: 'bg-blue-600',
        },
      },
      ...experienceLots
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
        appId: 'resume-center',
        floatingLabel: {
          title: 'RESUME CENTER',
          subtitle: 'Download Resume',
          colorClass: 'bg-rose-500',
        },
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
        appId: 'contact-center',
        floatingLabel: {
          title: 'CONTACT HUB',
          subtitle: "Let's Connect",
          colorClass: 'bg-emerald-500',
        },
      },
    ],
  },
};
export const DISTRICTS_LIST = Object.values(DISTRICT_REGISTRY);
