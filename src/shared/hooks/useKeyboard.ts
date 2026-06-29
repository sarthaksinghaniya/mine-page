/**
 * @file src/shared/hooks/useKeyboard.ts
 * @description Keyboard input tracking hook.
 *
 * Returns a stable ref containing the current set of pressed keys.
 * Uses a Set<string> so key checks are O(1).
 * The ref is NOT reactive — components never re-render due to key changes.
 * Instead, game systems poll `keys.current` inside the GameLoop each frame.
 *
 * USAGE:
 *   const keys = useKeyboard();
 *   // In a system tick function:
 *   if (keys.current.has('KeyW')) { ... }
 */

import { useEffect, useRef } from 'react';

export type KeySet = Set<string>;

/**
 * Returns a ref to the set of currently pressed key codes.
 * Mount once at the app level (in AppProviders) and pass down or
 * export via a store / context.
 */
export function useKeyboard(): React.RefObject<KeySet> {
  const keys = useRef<KeySet>(new Set());

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      // Prevent default for game keys (arrow keys, space) but not browser shortcuts
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
      keys.current.add(e.code);
    };

    const onKeyUp = (e: KeyboardEvent): void => {
      keys.current.delete(e.code);
    };

    const onBlur = (): void => {
      // Clear all keys when window loses focus to prevent stuck keys
      keys.current.clear();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return keys;
}
