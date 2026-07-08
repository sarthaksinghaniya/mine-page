/**
 * @file src/data/skills.ts
 * @description Mock data for Portfolio Skills
 */

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number; // 0-100
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Three.js / WebGL', level: 85 },
      { name: 'Next.js', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'GraphQL', level: 70 },
      { name: 'Redis', level: 65 },
    ],
  },
  {
    name: 'Tools & DevOps',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 60 },
      { name: 'CI/CD', level: 80 },
    ],
  },
];
