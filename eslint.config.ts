import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

// ─────────────────────────────────────────────────────────────────────────────
// ESLint Flat Config — Open-World Portfolio
// Uses ESLint v9 flat config format (eslint.config.ts)
// ─────────────────────────────────────────────────────────────────────────────

export default tseslint.config(
  // ── Global Ignores ──────────────────────────────────────────────────────────
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'public/**',
      '*.config.ts',
      '*.config.js',
      'coverage/**',
    ],
  },

  // ── Base TypeScript Rules ───────────────────────────────────────────────────
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // ── Project Config ──────────────────────────────────────────────────────────
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react':         reactPlugin,
      'react-hooks':   reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // ── TypeScript ───────────────────────────────────────────────────────────
      '@typescript-eslint/no-unused-vars':          ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-explicit-any':         'error',
      '@typescript-eslint/no-floating-promises':    'error',
      '@typescript-eslint/await-thenable':          'error',
      '@typescript-eslint/no-misused-promises':     'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain':   'error',

      // ── React ────────────────────────────────────────────────────────────────
      'react/react-in-jsx-scope':    'off', // React 17+ JSX transform
      'react/prop-types':            'off', // TypeScript handles prop types
      'react/display-name':          'error',
      'react/no-array-index-key':    'warn',
      'react/jsx-no-target-blank':   'error',

      // ── React Hooks ──────────────────────────────────────────────────────────
      'react-hooks/rules-of-hooks':  'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ── React Refresh (HMR) ──────────────────────────────────────────────────
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // ── General ──────────────────────────────────────────────────────────────
      'no-console':    ['warn', { allow: ['warn', 'error'] }],
      'prefer-const':  'error',
      'no-var':        'error',
    },
  },
);
