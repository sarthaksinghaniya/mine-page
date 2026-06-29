/**
 * @file src/shared/hooks/useGameLoop.ts
 * @description Hook to register a system callback in the GameLoop.
 *
 * Use this hook to register a per-frame callback from a React component
 * or feature without using useFrame directly.
 *
 * The callback is automatically deregistered on unmount.
 *
 * IMPORTANT: The callback must be stable (wrapped in useCallback) or defined
 * outside of the component to prevent churn in the system registry.
 *
 * USAGE:
 *   useGameLoop('myFeature.update', (delta) => {
 *     // runs every frame with gameDelta
 *   }, 10); // priority 10
 */

import { useEffect, useRef } from 'react';
import { registerSystem, deregisterSystem, type SystemTickFn } from '@core/engine/GameLoop';

/**
 * Registers a system function in the game loop for the lifetime of the component.
 *
 * @param id       - Unique system identifier
 * @param tick     - Frame callback (gameDelta: number) => void
 * @param priority - Execution priority (lower = runs first). Default: 0
 */
export function useGameLoop(id: string, tick: SystemTickFn, priority = 0): void {
  // Keep the tick ref updated without re-registering the system
  const tickRef = useRef<SystemTickFn>(tick);
  tickRef.current = tick;

  useEffect(() => {
    // Register a stable wrapper so the system registry never needs to update
    registerSystem(id, (delta) => tickRef.current(delta), priority);
    return () => deregisterSystem(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, priority]);
}
