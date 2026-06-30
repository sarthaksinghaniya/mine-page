/**
 * @file src/core/data/LeetCodeService.ts
 * @description Service to fetch and cache LeetCode data.
 */

import { RequestManager } from '@core/network/RequestManager';
import { eventBus } from '@core/events/EventBus';

export interface LeetCodeProfile {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

class LeetCodeServiceClass {
  private readonly CACHE_TTL = 1000 * 60 * 60 * 12; // 12 hours (LeetCode data changes slower)

  async fetchProfile(username: string): Promise<LeetCodeProfile | null> {
    try {
      // Using a public LeetCode proxy API since LeetCode doesn't have open CORS REST API
      const data = await RequestManager.get<any>(
        `https://leetcode-stats-api.herokuapp.com/${username}`,
        { cacheTtlMs: this.CACHE_TTL, retries: 3 }
      );

      if (data.status !== 'success') {
        throw new Error(data.message || 'LeetCode API error');
      }

      const profile: LeetCodeProfile = {
        totalSolved: data.totalSolved,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved,
        acceptanceRate: data.acceptanceRate,
        ranking: data.ranking,
        contributionPoints: data.contributionPoints,
        reputation: data.reputation
      };

      eventBus.emit('leetcode:loaded', undefined);
      return profile;
    } catch (err: any) {
      console.error('[LeetCodeService] fetchProfile Error:', err);
      eventBus.emit('leetcode:error', { error: err.message });
      return null;
    }
  }
}

export const LeetCodeService = new LeetCodeServiceClass();
