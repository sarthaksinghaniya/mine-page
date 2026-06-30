/**
 * @file src/core/data/UnstopService.ts
 * @description Service to fetch and cache Unstop profile data.
 */

import { eventBus } from '@core/events/EventBus';

export interface UnstopProfile {
  username: string;
  globalRank: number;
  totalCertificates: number;
  competitionsWon: number;
  badges: string[];
}

class UnstopServiceClass {
  // Since Unstop does not expose a public CORS-enabled REST API,
  // we simulate the fetch with a robust mock payload matching the user profile.
  async fetchProfile(username: string): Promise<UnstopProfile | null> {
    try {
      // Simulate network delay
      await new Promise(res => setTimeout(res, 800));

      const profile: UnstopProfile = {
        username: username,
        globalRank: 14205, // Mocked rank based on typical active student
        totalCertificates: 12,
        competitionsWon: 3,
        badges: ['Top 1% Hacker', 'UI/UX Finalist', 'Cloud Master']
      };

      eventBus.emit('unstop:loaded', undefined);
      return profile;
    } catch (err: any) {
      console.error('[UnstopService] fetchProfile Error:', err);
      eventBus.emit('unstop:error', { error: err.message });
      return null;
    }
  }
}

export const UnstopService = new UnstopServiceClass();
