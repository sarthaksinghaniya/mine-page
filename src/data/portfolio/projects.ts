/**
 * @file src/data/portfolio/projects.ts
 * @description Projects data block.
 */

import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'ecosphere-ai',
    title: 'Ecosphere AI',
    summary: 'A decentralized ML routing layer running local weights inside client browsers.',
    description: 'Developed an instanced browser execution graph compiling custom WebGPU shaders. Scales neural inferences dynamically across 1,000 parallel clients.',
    technologies: ['WebGPU', 'TypeScript', 'ONNX Runtime', 'React Three Fiber'],
    role: 'Lead Architect & Shaders Engineer',
  },
  {
    id: 'agentic-mesh',
    title: 'Agentic Mesh Routing',
    summary: 'Proximity-aware message routing system for swarms of autonomous drones.',
    description: 'Designed a high-frequency communications network solver utilizing dynamic navigation meshes and A* pathfinders.',
    technologies: ['Node.js', 'C++', 'Rapier Physics', 'Three.js'],
    role: 'Core Systems Developer',
  },
];
