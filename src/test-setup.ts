/**
 * @file src/test-setup.ts
 * @description Vitest global test setup.
 * Runs before every test file to configure the jsdom environment.
 */

import '@testing-library/jest-dom';

// ── WebGL Mock ────────────────────────────────────────────────────────────────
// jsdom does not implement WebGL. Mock getContext for tests that
// instantiate Three.js or R3F without a real browser.

HTMLCanvasElement.prototype.getContext = function () {
  return null;
};

// ── Crypto Mock ───────────────────────────────────────────────────────────────
// Ensure crypto.randomUUID is available in jsdom
if (!globalThis.crypto.randomUUID) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  globalThis.crypto.randomUUID = () =>
    '00000000-0000-4000-8000-000000000000' as ReturnType<typeof crypto.randomUUID>;
}
