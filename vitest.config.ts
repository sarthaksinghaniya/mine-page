import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

// ─────────────────────────────────────────────────────────────────────────────
// Vitest Configuration — Open-World Portfolio
// Shares path aliases with vite.config.ts to avoid duplication.
// ─────────────────────────────────────────────────────────────────────────────

export default defineConfig({
  test: {
    // Use jsdom for React component tests
    environment: 'jsdom',

    // Setup files run before each test suite
    setupFiles: ['./src/test-setup.ts'],

    // Global test utilities (describe, it, expect) without explicit imports
    globals: true,

    // Coverage via v8 (built into Node, no extra tool needed)
    coverage: {
      provider: 'v8',
      reporter:  ['text', 'json', 'html'],
      include:   ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.types.ts',
        'src/**/*.d.ts',
        'src/**/index.ts',
        'src/test-setup.ts',
      ],
      thresholds: {
        lines:      80,
        functions:  80,
        branches:   70,
        statements: 80,
      },
    },
  },

  // Mirror path aliases from tsconfig
  resolve: {
    alias: {
      '@':         resolve(__dirname, './src'),
      '@core':     resolve(__dirname, './src/core'),
      '@features': resolve(__dirname, './src/features'),
      '@ui':       resolve(__dirname, './src/ui'),
      '@shared':   resolve(__dirname, './src/shared'),
      '@config':   resolve(__dirname, './src/config'),
      '@types':    resolve(__dirname, './src/types'),
      '@styles':   resolve(__dirname, './src/styles'),
    },
  },
});
