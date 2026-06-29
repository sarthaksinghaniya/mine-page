/**
 * @file src/core/engine/GameLoop.tsx
 * @description Root game loop component — the single orchestrator of all per-frame systems.
 *
 * Renders as a child of the R3F <Canvas>. Uses a single top-level useFrame to:
 *  1. Update the TimeSystem
 *  2. Call all registered system tick functions in priority order
 *
 * This prevents multiple scattered useFrame calls competing for frame budget
 * and gives us explicit control over system execution order.
 *
 * Systems register themselves via the exported `registerSystem` function
 * and are automatically called each frame until deregistered.
 */

import { useFrame } from '@react-three/fiber';
import { updateGameTime } from './TimeSystem';

// ── System Registry ───────────────────────────────────────────────────────────

/** A system tick function. Receives delta time and is called every frame. */
export type SystemTickFn = (delta: number) => void;

interface RegisteredSystem {
  id: string;
  tick: SystemTickFn;
  /** Lower priority runs first. Default: 0 */
  priority: number;
}

/** Internal system registry. Sorted by priority on registration. */
const systems: RegisteredSystem[] = [];

/**
 * Registers a system to run every frame.
 *
 * @param id       - Unique identifier for this system (used for deregistration)
 * @param tick     - Function called each frame with gameDelta
 * @param priority - Execution order (lower = earlier). Default: 0
 */
export function registerSystem(id: string, tick: SystemTickFn, priority = 0): void {
  // Prevent duplicate registrations
  if (systems.some((s) => s.id === id)) {
    console.warn(`[GameLoop] System "${id}" is already registered. Skipping.`);
    return;
  }
  systems.push({ id, tick, priority });
  systems.sort((a, b) => a.priority - b.priority);
}

/**
 * Removes a system from the frame loop.
 *
 * @param id - The system ID passed to registerSystem
 */
export function deregisterSystem(id: string): void {
  const index = systems.findIndex((s) => s.id === id);
  if (index !== -1) {
    systems.splice(index, 1);
  }
}

// ── Game Loop Component ───────────────────────────────────────────────────────

/**
 * Must be rendered as a direct child of <Canvas>.
 * This component has no visual output — it only drives the game loop.
 *
 * @example
 * ```tsx
 * <Canvas>
 *   <GameLoop />
 *   <WorldRoot />
 * </Canvas>
 * ```
 */
export function GameLoop(): null {
  useFrame((_, delta) => {
    // 1. Update time first — systems depend on current delta
    updateGameTime(delta);

    // 2. Tick all registered systems in priority order
    for (const system of systems) {
      system.tick(delta);
    }
  });

  return null;
}
