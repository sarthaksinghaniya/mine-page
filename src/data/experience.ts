/**
 * @file src/data/experience.ts
 * @description Mock data for Experience timeline
 */

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export const experienceData: ExperienceData[] = [
  {
    id: 'exp-1',
    role: 'Senior Creative Technologist',
    company: 'TechNeekX Global',
    startDate: '2024',
    endDate: 'Present',
    description: [
      'Architected a globally distributed WebGL rendering pipeline reducing load times by 40%.',
      'Led a cross-functional team of 5 engineers to deliver interactive 3D campaigns for Fortune 500 clients.',
      'Established the frontend design system used across 12 enterprise applications.'
    ]
  },
  {
    id: 'exp-2',
    role: 'Full Stack Engineer',
    company: 'Neural Networks Inc.',
    startDate: '2021',
    endDate: '2024',
    description: [
      'Built a real-time data visualization dashboard using React, D3, and WebSockets.',
      'Migrated legacy monolithic backend to a scalable microservices architecture using Node.js and Docker.',
      'Mentored 3 junior developers and instituted comprehensive code review guidelines.'
    ]
  },
  {
    id: 'exp-3',
    role: 'Frontend Developer',
    company: 'Startup Alpha',
    startDate: '2019',
    endDate: '2021',
    description: [
      'Developed responsive single-page applications from the ground up using React and TypeScript.',
      'Integrated RESTful APIs and implemented complex client-side state management using Redux.',
      'Improved SEO and accessibility scores from 60 to 95+ across the main product site.'
    ]
  }
];
