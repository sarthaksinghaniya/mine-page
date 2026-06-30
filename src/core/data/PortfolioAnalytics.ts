/**
 * @file src/core/data/PortfolioAnalytics.ts
 * @description Unified analytics engine aggregating all live developer data sources.
 */

import { GitHubService } from './GitHubService';
import { LeetCodeService } from './LeetCodeService';
import { CodeforcesService } from './CodeforcesService';
import { eventBus } from '@core/events/EventBus';

export interface DeveloperScore {
  totalProjects: number;
  totalStars: number;
  totalForks: number;
  leetCodeSolved: number;
  codeforcesRating: number;
  activityScore: number; // A composite score based on all platforms
}

class PortfolioAnalyticsClass {
  async aggregateScores(githubUser: string, leetcodeUser: string, codeforcesUser: string): Promise<DeveloperScore> {
    try {
      const [ghProfile, ghRepos, lcProfile, cfProfile] = await Promise.all([
        GitHubService.fetchProfile(githubUser),
        GitHubService.fetchRepositories(githubUser),
        LeetCodeService.fetchProfile(leetcodeUser),
        CodeforcesService.fetchProfile(codeforcesUser)
      ]);

      const totalProjects = ghProfile?.public_repos || ghRepos.length || 0;
      const totalStars = ghRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
      const totalForks = ghRepos.reduce((acc, repo) => acc + repo.forks_count, 0);
      const leetCodeSolved = lcProfile?.totalSolved || 0;
      const codeforcesRating = cfProfile?.rating || 0;

      // Composite scoring formula
      const activityScore = Math.floor(
        totalProjects * 10 + 
        totalStars * 5 + 
        totalForks * 3 + 
        leetCodeSolved * 2 + 
        codeforcesRating * 0.5
      );

      eventBus.emit('analytics:updated', undefined);

      return {
        totalProjects,
        totalStars,
        totalForks,
        leetCodeSolved,
        codeforcesRating,
        activityScore
      };
    } catch (err) {
      console.error('[PortfolioAnalytics] Error aggregating scores:', err);
      // Return zeroes on critical failure
      return {
        totalProjects: 0,
        totalStars: 0,
        totalForks: 0,
        leetCodeSolved: 0,
        codeforcesRating: 0,
        activityScore: 0
      };
    }
  }
}

export const PortfolioAnalytics = new PortfolioAnalyticsClass();
