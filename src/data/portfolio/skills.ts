/**
 * @file src/data/portfolio/skills.ts
 * @description Skills data block.
 */

import type { SkillCategory } from '../types';

export const skills: SkillCategory[] = [
  {
    category: 'AI & Machine Learning',
    items: [
      { name: 'LLMs & RAG Pipelines', level: 'expert' },
      { name: 'Computer Vision', level: 'proficient' },
      { name: 'PyTorch & TensorFlow', level: 'proficient' },
    ],
  },
  {
    category: 'Web Development',
    items: [
      { name: 'React & React Three Fiber', level: 'expert' },
      { name: 'TypeScript & Node.js', level: 'expert' },
      { name: 'WebGPU & WebGL shaders', level: 'proficient' },
    ],
  },
];
