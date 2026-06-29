/**
 * @file src/features/debug/debug.types.ts
 * @description Type definitions for the developer metrics overlay.
 */

export interface DebugMetrics {
  fps:       number;
  memory:    number; // MB used
  drawCalls: number;
  triangles: number;
  points:    number;
  lines:     number;
  geometries:number;
  textures:  number;
}

export interface DebugState {
  visible: boolean;
  metrics: DebugMetrics;
}
