/**
 * @file src/core/data/CodeforcesService.ts
 * @description Service to fetch and cache Codeforces data.
 */

import { RequestManager } from '@core/network/RequestManager';
import { eventBus } from '@core/events/EventBus';

export interface CodeforcesProfile {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contribution: number;
  friendOfCount: number;
  organization: string;
}

class CodeforcesServiceClass {
  private readonly CACHE_TTL = 1000 * 60 * 60; // 1 hour

  async fetchProfile(handle: string): Promise<CodeforcesProfile | null> {
    try {
      const data = await RequestManager.get<any>(
        `https://codeforces.com/api/user.info?handles=${handle}`,
        { cacheTtlMs: this.CACHE_TTL, retries: 3 }
      );

      if (data.status !== 'OK' || !data.result || data.result.length === 0) {
        throw new Error(data.comment || 'Codeforces API error');
      }

      const user = data.result[0];
      const profile: CodeforcesProfile = {
        handle: user.handle,
        rating: user.rating || 0,
        maxRating: user.maxRating || 0,
        rank: user.rank || 'unrated',
        maxRank: user.maxRank || 'unrated',
        contribution: user.contribution || 0,
        friendOfCount: user.friendOfCount || 0,
        organization: user.organization || ''
      };

      eventBus.emit('codeforces:loaded', undefined);
      return profile;
    } catch (err: any) {
      console.error('[CodeforcesService] fetchProfile Error:', err);
      // Fallback event could be implemented if error handling was explicitly defined in EventBus
      return null;
    }
  }
}

export const CodeforcesService = new CodeforcesServiceClass();
