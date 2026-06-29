/**
 * @file src/core/ecs/world.ts
 * @description Miniplex ECS world singleton.
 *
 * This is the single, shared ECS world instance for the entire application.
 * Import `world` wherever you need to create, query, or destroy entities.
 *
 * USAGE:
 *   import { world } from '@core/ecs/world';
 *
 *   // Create an entity
 *   const entity = world.add({ id: { id: uuid(), tag: 'player' }, transform: { ... } });
 *
 *   // Query entities
 *   const npcs = world.with('brain', 'navigation');
 *
 *   // Remove an entity
 *   world.remove(entity);
 */

import { World } from 'miniplex';
import type { BaseEntity } from './components';

/**
 * The global ECS world. Typed to `BaseEntity` so all entities must
 * have at minimum an `id` and `transform` component.
 *
 * Additional component archetypes narrow queries at the system level:
 *   `world.with('brain', 'navigation')` returns only NPC-like entities.
 */
export const world = new World<BaseEntity>();

/**
 * Type alias for any entity that exists in the world.
 * Systems receive references to these from archetype queries.
 */
export type WorldEntity = ReturnType<typeof world.add>;
