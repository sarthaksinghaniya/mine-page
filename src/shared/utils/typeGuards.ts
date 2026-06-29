/**
 * @file src/shared/utils/typeGuards.ts
 * @description TypeScript type guard utilities.
 * Use these to narrow union types safely — never cast with `as`.
 */

/**
 * Asserts that a value is defined (not null or undefined).
 * Throws a descriptive error in development, asserts in production.
 */
export function assertDefined<T>(value: T | null | undefined, message: string): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(`[assertDefined] ${message}`);
  }
}

/**
 * Type-safe check for non-null/undefined values.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Exhaustive check for discriminated unions.
 * Place at the end of a switch statement to catch unhandled cases.
 *
 * @example
 * switch (action.type) {
 *   case 'a': ...
 *   case 'b': ...
 *   default: assertNever(action.type); // TypeScript error if case is missing
 * }
 */
export function assertNever(value: never): never {
  throw new Error(`[assertNever] Unhandled value: ${String(value)}`);
}

/**
 * Returns true if value is a non-null object.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Returns true if value is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
