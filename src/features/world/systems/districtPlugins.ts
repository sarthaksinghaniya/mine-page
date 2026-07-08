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
  projects: {
    id: 'projects',
    name: 'Projects & Development Hub',
    component: React.lazy(() =>
      import('../../districts/projects/scene/ProjectsScene').then((m) => ({
        default: m.ProjectsScene,
      })),
    ),
  },
  museum: {
    id: 'museum',
    name: 'Achievement Museum',
    component: React.lazy(() =>
      import('../../districts/museum/scene/MuseumScene').then((m) => ({
        default: m.MuseumScene,
      })),
    ),
  },
  skills: {
    id: 'skills',
    name: 'Skills Matrix Lab',
    component: React.lazy(() =>
      import('../../districts/skills/scene/SkillsScene').then((m) => ({
        default: m.SkillsScene,
      })),
    ),
  },
  experience: {
    id: 'experience',
    name: 'Experience Tower',
    component: React.lazy(() =>
      import('../../districts/experience/scene/ExperienceScene').then((m) => ({
        default: m.ExperienceScene,
      })),
    ),
  },
  resume: {
    id: 'resume',
    name: 'Resume Center',
    component: React.lazy(() =>
      import('../../districts/resume/scene/ResumeScene').then((m) => ({
        default: m.ResumeScene,
      })),
    ),
  },
  contact: {
    id: 'contact',
    name: 'Communications & Contact',
    component: React.lazy(() =>
      import('../../districts/contact/scene/ContactScene').then((m) => ({
        default: m.ContactScene,
      })),
    ),
  },
};
