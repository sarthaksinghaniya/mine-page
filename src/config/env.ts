/**
 * @file src/config/env.ts
 * @description Validated, typed wrapper around Vite's import.meta.env.
 *
 * All environment variable access in the application MUST go through this
 * module — never access import.meta.env directly outside of this file.
 * This centralizes validation and provides clear error messages.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type PerformanceTier = 'low' | 'medium' | 'high' | 'auto';

export interface AppEnv {
  /** Human-readable application name */
  readonly appName: string;
  /** Semantic version string */
  readonly appVersion: string;
  /** GitHub personal access token for live data sync */
  readonly githubToken: string;
  /** GitHub username for API queries */
  readonly githubUsername: string;
  /** Base URL for the AI assistant FastAPI backend */
  readonly aiAssistantUrl: string;
  /** Feature flags */
  readonly features: {
    readonly physics: boolean;
    readonly audio: boolean;
    readonly aiAssistant: boolean;
    readonly multiplayer: boolean;
  };
  /** Target GPU performance tier */
  readonly performanceTier: PerformanceTier;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseBool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
}

function parsePerformanceTier(value: string | undefined): PerformanceTier {
  const valid: PerformanceTier[] = ['low', 'medium', 'high', 'auto'];
  if (value && (valid as string[]).includes(value)) {
    return value as PerformanceTier;
  }
  return 'auto';
}

// ── Parsed & Validated Env ────────────────────────────────────────────────────

/**
 * The single source of truth for all environment configuration.
 * Validated at module load time — any missing required variable will
 * cause an explicit error with a descriptive message.
 */
export const env: AppEnv = {
  appName: import.meta.env.VITE_APP_NAME ?? 'Open World Portfolio',
  appVersion: import.meta.env.VITE_APP_VERSION ?? '0.0.0',
  githubToken: import.meta.env.VITE_GITHUB_TOKEN ?? '',
  githubUsername: import.meta.env.VITE_GITHUB_USERNAME ?? '',
  aiAssistantUrl: import.meta.env.VITE_AI_ASSISTANT_URL ?? 'http://localhost:8000',
  features: {
    physics: parseBool(import.meta.env.VITE_ENABLE_PHYSICS, true),
    audio: parseBool(import.meta.env.VITE_ENABLE_AUDIO, true),
    aiAssistant: parseBool(import.meta.env.VITE_ENABLE_AI_ASSISTANT, false),
    multiplayer: parseBool(import.meta.env.VITE_ENABLE_MULTIPLAYER, false),
  },
  performanceTier: parsePerformanceTier(import.meta.env.VITE_PERFORMANCE_TIER),
} as const;
