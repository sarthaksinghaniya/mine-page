/**
 * @file src/features/portfolio/portfolio.store.ts
 * @description Zustand store for portfolio data and active project state.
 */

import { create } from 'zustand';
import type {
  PortfolioState,
  PortfolioProject,
  PortfolioSkill,
  WorkExperience,
} from './portfolio.types';

interface PortfolioActions {
  setProjects: (projects: PortfolioProject[]) => void;
  setSkills: (skills: PortfolioSkill[]) => void;
  setExperience: (experience: WorkExperience[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setActiveProject: (projectId: string | null) => void;
  setActiveItem: (activeItem: any) => void;
  setLastUpdated: (timestamp: number) => void;
}

type PortfolioStore = PortfolioState & PortfolioActions & { activeItem: any };

export const usePortfolioStore = create<PortfolioStore>()((set) => ({
  // ── Initial State ────────────────────────────────────────────────────────────
  projects: [],
  skills: [],
  experience: [],
  loading: false,
  error: null,
  activeProjectId: null,
  activeItem: null, // Any type of portfolio item for the modal
  lastUpdated: null,

  // ── Actions ──────────────────────────────────────────────────────────────────
  setProjects: (projects) => { set({ projects }); },
  setSkills: (skills) => { set({ skills }); },
  setExperience: (experience) => { set({ experience }); },
  setLoading: (loading) => { set({ loading }); },
  setError: (error) => { set({ error }); },
  setActiveProject: (activeProjectId) => { set({ activeProjectId }); },
  setActiveItem: (activeItem: any) => { set({ activeItem }); },
  setLastUpdated: (timestamp) => { set({ lastUpdated: timestamp }); },
}));
