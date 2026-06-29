/**
 * @file src/shared/utils/CoordinateSystem.ts
 * @description Coordinate transformation logic, map scaling, and world coordinate system tools.
 */

// Total boundaries of the complete city world map
export const MAP_WORLD_SIZE = 1200; // Total width/depth of our world graph

export interface Vector2D {
  x: number;
  y: number;
}

/**
 * Transforms a 3D world coordinate into a normalized [0, 1] 2D coordinate space.
 * Ideal for rendering player coordinates directly on a UI minimap texture overlay.
 *
 * Map Center = (0, 0)
 * Min coordinate = (-MAP_WORLD_SIZE/2, -MAP_WORLD_SIZE/2)
 * Max coordinate = (MAP_WORLD_SIZE/2, MAP_WORLD_SIZE/2)
 */
export function worldToMinimap(worldX: number, worldZ: number): Vector2D {
  const halfSize = MAP_WORLD_SIZE / 2;
  const nx = (worldX + halfSize) / MAP_WORLD_SIZE;
  const ny = (worldZ + halfSize) / MAP_WORLD_SIZE;

  return {
    x: Math.max(0, Math.min(1, nx)),
    y: Math.max(0, Math.min(1, ny)),
  };
}

/**
 * Decides whether the current coordinates require shifting the world coordinate origin (floating origin).
 * Standard feature in open world game engines to avoid floating point precision degradation.
 */
export function shouldShiftOrigin(playerX: number, playerZ: number, threshold = 1000): boolean {
  return Math.sqrt(playerX * playerX + playerZ * playerZ) > threshold;
}
