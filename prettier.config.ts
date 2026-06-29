// ─────────────────────────────────────────────────────────────────────────────
// Prettier Configuration — Open-World Portfolio
// ─────────────────────────────────────────────────────────────────────────────

/** @type {import("prettier").Config} */
const config = {
  // Formatting
  printWidth:          100,
  tabWidth:            2,
  useTabs:             false,
  semi:                true,
  singleQuote:         true,
  quoteProps:          'as-needed',
  jsxSingleQuote:      false,
  trailingComma:       'all',
  bracketSpacing:      true,
  bracketSameLine:     false,
  arrowParens:         'always',
  endOfLine:           'lf',

  // Plugin overrides per file type
  overrides: [
    {
      files: ['*.json'],
      options: { printWidth: 120 },
    },
    {
      files: ['*.css'],
      options: { singleQuote: false },
    },
    {
      files: ['*.md'],
      options: { proseWrap: 'always' },
    },
  ],
};

export default config;
