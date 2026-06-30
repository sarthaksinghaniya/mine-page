/**
 * @file src/features/apps/index.ts
 * @description Export all portfolio applications with lazy loading and provide an initializer.
 */

import { AppManager } from '@core/apps/AppManager';
import { createReactApp } from '@core/apps/createReactApp';

export const AIResearchApp = createReactApp(
  'ai-research',
  'AI Research',
  () => import('./AIResearch'),
  '🤖'
);

export const AchievementMuseumApp = createReactApp(
  'achievement-museum',
  'Achievement Museum',
  () => import('./AchievementMuseum'),
  '🏆'
);

export const ExperienceTowerApp = createReactApp(
  'experience-tower',
  'Experience Tower',
  () => import('./ExperienceTower'),
  '🏢'
);

export const ProjectsDistrictApp = createReactApp(
  'projects-district',
  'Projects District',
  () => import('./ProjectsDistrict'),
  '🏗️'
);

export const SkillsLabApp = createReactApp(
  'skills-lab',
  'Skills Lab',
  () => import('./SkillsLab'),
  '🧪'
);

export const ResumeCenterApp = createReactApp(
  'resume-center',
  'Resume Center',
  () => import('./ResumeCenter'),
  '📄'
);

export const ContactCenterApp = createReactApp(
  'contact-center',
  'Contact Center',
  () => import('./ContactCenter'),
  '📞'
);

export function registerAllApps() {
  AppManager.register(AIResearchApp);
  AppManager.register(AchievementMuseumApp);
  AppManager.register(ExperienceTowerApp);
  AppManager.register(ProjectsDistrictApp);
  AppManager.register(SkillsLabApp);
  AppManager.register(ResumeCenterApp);
  AppManager.register(ContactCenterApp);
}
