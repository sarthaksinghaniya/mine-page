/**
 * @file src/data/types.ts
 * @description Standard type declarations for the portfolio data engine.
 */

export interface Profile {
  name: string;
  title: string;
  summary: string;
  email: string;
  location: string;
}

export interface Skill {
  name: string;
  level: 'expert' | 'proficient' | 'beginner';
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  role: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
}

export interface Hackathon {
  name: string;
  award: string;
  date: string;
  project: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface ResumeMetadata {
  url: string;
  lastUpdated: string;
}
