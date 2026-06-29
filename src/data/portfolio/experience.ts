/**
 * @file src/data/portfolio/experience.ts
 * @description Experience data block.
 */

import type { Experience } from '../types';

export const experience: Experience[] = [
  {
    company: 'Neural Labs',
    role: 'Lead Graphics Engineer',
    period: '2025 - Present',
    bullets: [
      'Engineered instanced mesh pipelines using WebGPU, increasing GPU throughput by 40%.',
      'Developed real-time bounding volume hierarchy raycasters in browser scopes.',
    ],
  },
];
