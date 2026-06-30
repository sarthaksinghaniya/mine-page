/**
 * @file src/core/network/RequestManager.ts
 * @description Centralized fetch wrapper implementing backoff, timeouts, and caching.
 */

import { CacheManager } from '@core/cache/CacheManager';

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
  cacheTtlMs?: number;
  forceRefresh?: boolean;
}

class RequestManagerClass {
  private inFlightRequests = new Map<string, Promise<any>>();

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    const cacheKey = `req_GET_${url}`;
    
    // 1. Check cache unless forced refresh
    if (!options?.forceRefresh) {
      const cached = CacheManager.get<T>(cacheKey);
      if (cached) return cached;
    }

    // 2. Request deduplication (if already in flight, await that promise)
    if (this.inFlightRequests.has(cacheKey)) {
      return this.inFlightRequests.get(cacheKey);
    }

    // 3. Execute fetch with retries
    const reqPromise = this.executeWithRetry<T>(url, options).then(data => {
      // 4. Cache successful response
      CacheManager.set(cacheKey, data, { ttlMs: options?.cacheTtlMs });
      this.inFlightRequests.delete(cacheKey);
      return data;
    }).catch(err => {
      this.inFlightRequests.delete(cacheKey);
      throw err;
    });

    this.inFlightRequests.set(cacheKey, reqPromise);
    return reqPromise;
  }

  private async executeWithRetry<T>(url: string, options?: RequestOptions): Promise<T> {
    const maxRetries = options?.retries ?? 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
      try {
        return await this.executeFetch<T>(url, options);
      } catch (err: any) {
        attempt++;
        if (attempt >= maxRetries) {
          throw err;
        }
        
        // Exponential backoff: 500ms, 1000ms, 2000ms
        const delay = (options?.retryDelayMs ?? 500) * Math.pow(2, attempt - 1);
        console.warn(`[RequestManager] Request failed: ${url}. Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`);
        await new Promise(res => setTimeout(res, delay));
      }
    }
    throw new Error('Unreachable');
  }

  private async executeFetch<T>(url: string, options?: RequestOptions): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options?.timeoutMs ?? 10000);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      if (!response.ok) {
        // Parse GitHub/LeetCode rate limits if headers exist
        if (response.status === 403 || response.status === 429) {
          throw new Error(`Rate limit exceeded or forbidden: ${response.status}`);
        }
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      // Fallback for raw text
      return (await response.text()) as unknown as T;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        throw new Error(`Request timeout: ${url}`);
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

export const RequestManager = new RequestManagerClass();
