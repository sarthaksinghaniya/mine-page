/**
 * @file src/core/data/PortfolioDataService.test.ts
 * @description Unit tests for portfolio data engine and search weights.
 */

import { describe, it, expect } from 'vitest';
import { PortfolioDataService } from './PortfolioDataService';

describe('PortfolioDataService', () => {
  it('correctly fetches profile information', () => {
    const prof = PortfolioDataService.getProfile();
    expect(prof.name).toBe('Sarthak Singhaniya');
    expect(prof.title).toContain('AI Engineer');
  });

  it('filters project details by ID slug', () => {
    const proj = PortfolioDataService.getProject('ecosphere-ai');
    expect(proj).toBeDefined();
    expect(proj?.title).toBe('Ecosphere AI');
  });

  it('ranks exact search queries above partial description matches', () => {
    const results = PortfolioDataService.search('ecosphere-ai');
    expect(results.length).toBeGreaterThan(0);
    // Score should be high due to exact title match
    expect(results[0]?.score).toBeGreaterThanOrEqual(100);
    expect(results[0]?.itemType).toBe('project');
  });
});
