/**
 * @file src/core/data/PortfolioDataService.ts
 * @description Centralized query service fetching structured portfolio datasets.
 */

import {
  profile,
  projects,
  skills,
  experience,
  certifications,
  achievements,
  hackathons,
  education,
  social,
  resume,
} from '@/data';

import type {
  Profile,
  Project,
  SkillCategory,
  Experience,
  Certification,
  Achievement,
  Hackathon,
  Education,
  SocialLink,
  ResumeMetadata,
} from '@/data/types';

export interface SearchResult {
  score: number;
  itemType: 'project' | 'skill' | 'achievement' | 'hackathon';
  title: string;
  description: string;
  payload: any;
}

class PortfolioDataServiceClass {
  getProfile(): Profile {
    return profile;
  }

  getProjects(): Project[] {
    return projects;
  }

  getProject(id: string): Project | null {
    return projects.find((p) => p.id === id) ?? null;
  }

  getSkills(): SkillCategory[] {
    return skills;
  }

  getExperience(): Experience[] {
    return experience;
  }

  getCertifications(): Certification[] {
    return certifications;
  }

  getAchievements(): Achievement[] {
    return achievements;
  }

  getHackathons(): Hackathon[] {
    return hackathons;
  }

  getEducation(): Education[] {
    return education;
  }

  getSocial(): SocialLink[] {
    return social;
  }

  getResume(): ResumeMetadata {
    return resume;
  }

  /**
   * Search across projects, skills, achievements, and hackathons.
   * Calculates dynamic scores based on matches.
   */
  search(query: string): SearchResult[] {
    const term = query.trim().toLowerCase();
    if (!term) return [];

    const results: SearchResult[] = [];

    // ── 1. Search Projects ──
    projects.forEach((proj) => {
      let score = 0;
      if (proj.id === term || proj.title.toLowerCase() === term) score += 100;
      else if (proj.title.toLowerCase().includes(term) || proj.id.includes(term)) score += 50;

      if (proj.summary.toLowerCase().includes(term)) score += 20;
      if (proj.description.toLowerCase().includes(term)) score += 10;
      if (proj.technologies.some((tech) => tech.toLowerCase().includes(term))) score += 30;

      if (score > 0) {
        results.push({
          score,
          itemType: 'project',
          title: proj.title,
          description: proj.summary,
          payload: proj,
        });
      }
    });

    // ── 2. Search Skills ──
    skills.forEach((cat) => {
      cat.items.forEach((skill) => {
        let score = 0;
        if (skill.name.toLowerCase() === term) score += 80;
        else if (skill.name.toLowerCase().includes(term)) score += 40;

        if (score > 0) {
          results.push({
            score,
            itemType: 'skill',
            title: skill.name,
            description: `Skill under category: ${cat.category} [Level: ${skill.level}]`,
            payload: skill,
          });
        }
      });
    });

    // ── 3. Search Achievements ──
    achievements.forEach((ach) => {
      let score = 0;
      if (ach.title.toLowerCase().includes(term)) score += 50;
      if (ach.description.toLowerCase().includes(term)) score += 15;

      if (score > 0) {
        results.push({
          score,
          itemType: 'achievement',
          title: ach.title,
          description: ach.description,
          payload: ach,
        });
      }
    });

    // ── 4. Search Hackathons ──
    hackathons.forEach((h) => {
      let score = 0;
      if (h.name.toLowerCase().includes(term)) score += 50;
      if (h.project.toLowerCase().includes(term)) score += 30;

      if (score > 0) {
        results.push({
          score,
          itemType: 'hackathon',
          title: h.name,
          description: `${h.award} - Project: ${h.project}`,
          payload: h,
        });
      }
    });

    // Sort descending by match score
    return results.sort((a, b) => b.score - a.score);
  }
}

export const PortfolioDataService = new PortfolioDataServiceClass();
export default PortfolioDataService;
