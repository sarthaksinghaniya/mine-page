/**
 * @file src/data/projects.ts
 * @description Mock data for Portfolio Projects
 */

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export const projectsData: ProjectData[] = [
  {
    id: 'nexus-os',
    title: 'Nexus OS 3D Environment',
    description: 'A breathtaking WebGL-powered 3D open-world portfolio application. Built with React Three Fiber, featuring a custom entity-component system, dynamic lighting, and cinematic sequences.',
    technologies: ['React', 'Three.js', 'R3F', 'TypeScript', 'TailwindCSS'],
    githubUrl: 'https://github.com/example/nexus-os',
    demoUrl: 'https://example.com/nexus',
    featured: true,
  },
  {
    id: 'cyber-market',
    title: 'CyberMarket Exchange',
    description: 'High-frequency simulated trading platform with real-time WebSocket order books and advanced charting using Canvas API.',
    technologies: ['Next.js', 'Node.js', 'WebSockets', 'Canvas API'],
    githubUrl: 'https://github.com/example/cybermarket',
  },
  {
    id: 'neural-flow',
    title: 'Neural Flow Visualizer',
    description: 'An interactive tool for visualizing forward-propagation in multi-layer perceptron neural networks in real time.',
    technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
    githubUrl: 'https://github.com/example/neural-flow',
    demoUrl: 'https://example.com/neural',
  },
  {
    id: 'neon-synth',
    title: 'Neon Synth Audio Engine',
    description: 'A browser-based polyphonic synthesizer built entirely with the Web Audio API, featuring custom oscillators and effects chains.',
    technologies: ['Web Audio API', 'React', 'Zustand'],
    githubUrl: 'https://github.com/example/neon-synth',
  }
];
