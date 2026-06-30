/**
 * @file src/core/cache/CacheManager.ts
 * @description Centralized caching system supporting TTL, versioning, and invalidation.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
  version: string;
}

interface CacheConfig {
  ttlMs?: number;
  version?: string;
  useMemoryOnly?: boolean;
}

class CacheManagerClass {
  private readonly memoryCache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_VERSION = 'v1';
  private readonly DEFAULT_TTL = 1000 * 60 * 60; // 1 hour

  get<T>(key: string, config?: CacheConfig): T | null {
    const version = config?.version || this.DEFAULT_VERSION;
    const cacheKey = `${version}:${key}`;
    const now = Date.now();

    // 1. Check memory cache first
    const memEntry = this.memoryCache.get(cacheKey);
    if (memEntry) {
      if (now < memEntry.expiresAt) {
        return memEntry.data as T;
      } else {
        this.memoryCache.delete(cacheKey); // Expired
      }
    }

    // 2. Check localStorage if not memory-only
    if (!config?.useMemoryOnly) {
      try {
        const localData = localStorage.getItem(cacheKey);
        if (localData) {
          const entry = JSON.parse(localData) as CacheEntry<T>;
          if (now < entry.expiresAt && entry.version === version) {
            // Restore to memory cache
            this.memoryCache.set(cacheKey, entry);
            return entry.data;
          } else {
            localStorage.removeItem(cacheKey); // Expired or version mismatch
          }
        }
      } catch (err) {
        console.warn(`[CacheManager] Failed to read from localStorage for key ${key}`, err);
        localStorage.removeItem(cacheKey);
      }
    }

    return null;
  }

  set<T>(key: string, data: T, config?: CacheConfig): void {
    const version = config?.version || this.DEFAULT_VERSION;
    const ttl = config?.ttlMs || this.DEFAULT_TTL;
    const cacheKey = `${version}:${key}`;
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl,
      version
    };

    // Store in memory
    this.memoryCache.set(cacheKey, entry);

    // Store in localStorage if allowed
    if (!config?.useMemoryOnly) {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(entry));
      } catch (err) {
        console.warn(`[CacheManager] Failed to write to localStorage (Quota exceeded?): ${key}`, err);
      }
    }
  }

  invalidate(key: string, version: string = this.DEFAULT_VERSION): void {
    const cacheKey = `${version}:${key}`;
    this.memoryCache.delete(cacheKey);
    try {
      localStorage.removeItem(cacheKey);
    } catch (e) {}
  }

  clearAll(): void {
    this.memoryCache.clear();
    // Intentionally not clearing entire localStorage to avoid destroying user settings/saves,
    // only iterating and removing known cache keys.
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.includes(':')) {
          // crude check for versioned cache keys
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (e) {}
  }
}

export const CacheManager = new CacheManagerClass();
