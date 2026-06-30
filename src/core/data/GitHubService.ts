/**
 * @file src/core/data/GitHubService.ts
 * @description Service to fetch and cache GitHub data using RequestManager.
 */

import { RequestManager } from '@core/network/RequestManager';
import { eventBus } from '@core/events/EventBus';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export interface GitHubContribution {
  date: string;
  count: number;
}

export interface GitHubProfile {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

class GitHubServiceClass {
  private readonly CACHE_TTL = 1000 * 60 * 60; // 1 hour
  
  async fetchProfile(username: string): Promise<GitHubProfile | null> {
    try {
      const data = await RequestManager.get<GitHubProfile>(
        `https://api.github.com/users/${username}`,
        { cacheTtlMs: this.CACHE_TTL, retries: 3 }
      );
      eventBus.emit('github:loaded', undefined);
      return data;
    } catch (err: any) {
      console.error('[GitHubService] fetchProfile Error:', err);
      eventBus.emit('github:error', { error: err.message });
      return null;
    }
  }

  async fetchRepositories(username: string): Promise<GitHubRepo[]> {
    try {
      const data = await RequestManager.get<any[]>(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
        { cacheTtlMs: this.CACHE_TTL, retries: 3 }
      );
      
      const processed = data
        .filter((repo: any) => !repo.fork)
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language,
          updated_at: repo.updated_at
        }));
      
      eventBus.emit('github:loaded', undefined);
      return processed;
    } catch (err: any) {
      console.error('[GitHubService] fetchRepositories Error:', err);
      eventBus.emit('github:error', { error: err.message });
      return [];
    }
  }

  async fetchContributions(username: string): Promise<GitHubContribution[]> {
    try {
      // Simulate network delay for fetching contributions
      await new Promise(res => setTimeout(res, 500));
      
      // Generate 365 days of mock contribution data for the heatmap
      const contributions: GitHubContribution[] = [];
      const today = new Date();
      for (let i = 364; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        // Randomize count with higher probability of 0-2, some spikes
        const rand = Math.random();
        let count = 0;
        if (rand > 0.6) count = Math.floor(Math.random() * 5);
        if (rand > 0.95) count = Math.floor(Math.random() * 15) + 5;
        
        contributions.push({
          date: d.toISOString().split('T')[0],
          count
        });
      }
      return contributions;
    } catch (err) {
      console.error('[GitHubService] fetchContributions Error:', err);
      return [];
    }
  }
}

export const GitHubService = new GitHubServiceClass();
