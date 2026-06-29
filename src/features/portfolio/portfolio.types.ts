/**
 * @file src/features/portfolio/portfolio.types.ts
 * @description Type definitions for the portfolio data feature.
 */

// ── Portfolio Data ────────────────────────────────────────────────────────────

export type TechTag = string;

export interface GitHubStats {
  stars:    number;
  forks:    number;
  language: string | null;
  updatedAt: string;
}

export interface PortfolioProject {
  id:           string;
  name:         string;
  description:  string;
  longDescription: string;
  tags:         TechTag[];
  githubUrl:    string | null;
  liveUrl:      string | null;
  imageUrl:     string | null;
  /** In-world zone/building this project is associated with */
  worldNodeId:  string | null;
  featured:     boolean;
  github?:      GitHubStats;
}

export interface PortfolioSkill {
  id:         string;
  name:       string;
  category:   'language' | 'framework' | 'tool' | 'platform' | 'soft';
  level:      1 | 2 | 3 | 4 | 5;
  icon:       string;
}

export interface WorkExperience {
  id:          string;
  company:     string;
  role:        string;
  startDate:   string;
  endDate:     string | null;
  description: string;
  tags:        TechTag[];
  location:    string;
}

export interface PortfolioData {
  projects:    PortfolioProject[];
  skills:      PortfolioSkill[];
  experience:  WorkExperience[];
  lastUpdated: number | null;
}

// ── Store State ───────────────────────────────────────────────────────────────

export interface PortfolioState extends PortfolioData {
  loading:     boolean;
  error:       string | null;
  activeProjectId: string | null;
}
