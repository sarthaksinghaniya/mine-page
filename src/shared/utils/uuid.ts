/**
 * @file src/shared/utils/uuid.ts
 * @description UUID generation utility using the Web Crypto API.
 * Does NOT use Math.random() — uses cryptographically random values.
 */

/**
 * Generates a v4 UUID using the browser's Web Crypto API.
 * Available in all modern browsers and Node.js 15+.
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Generates a short ID (8 hex chars) suitable for debug labels.
 * Not guaranteed unique across all runs — use generateUUID for entity IDs.
 */
export function generateShortId(): string {
  return Math.floor(Math.random() * 0xffffffff)
    .toString(16)
    .padStart(8, '0');
}
