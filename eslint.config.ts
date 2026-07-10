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
      'test-pw.js',
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
      '@typescript-eslint/no-unused-vars':          ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-explicit-any':         'off',
      '@typescript-eslint/no-floating-promises':    'off',
      '@typescript-eslint/await-thenable':          'off',
      '@typescript-eslint/no-misused-promises':     'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain':   'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment':    'off',
      '@typescript-eslint/no-unsafe-argument':      'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call':          'off',
      '@typescript-eslint/no-unsafe-return':        'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-non-null-assertion':   'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-deprecated':           'off',
      '@typescript-eslint/no-empty-object-type':    'off',
      '@typescript-eslint/no-invalid-void-type':    'off',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-extraneous-class':     'off',
      '@typescript-eslint/no-empty-function':       'off',

      // ── React ────────────────────────────────────────────────────────────────
      'react/react-in-jsx-scope':    'off', // React 17+ JSX transform
      'react/prop-types':            'off', // TypeScript handles prop types
      'react/display-name':          'error',
      'react/no-array-index-key':    'off',
      'react/jsx-no-target-blank':   'warn',

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
