/**
 * @file src/features/world/index.ts
 * @description Barrel export for the world feature.
 */

export * from './world.types';
export * from './world.store';
export * from './zone.types';
export * from './components/WorldRoot';
export * from './components/TerrainChunk';
export * from './components/RoadSystem';
export * from './systems/SpawnManager';
export * from './systems/ZoneCuller';
export * from './systems/NavMeshStub';

