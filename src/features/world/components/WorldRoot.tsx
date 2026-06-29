/**
 * @file src/features/world/components/WorldRoot.tsx
 * @description The main open world scene container root component.
 *
 * Integrates procedural terrain chunks, road systems, and handles streaming.
 */

import React, { useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useWorldStore } from '../world.store';
import { ZONES_LIST, WORLD_ZONES } from '../zone.types';
import { TerrainChunk } from './TerrainChunk';
import { RoadSystem } from './RoadSystem';
import { ZoneCuller } from '../systems/ZoneCuller';
import { usePlayerStore } from '@/features/player/player.store';
import { SpawnManager } from '../systems/SpawnManager';

export function WorldRoot(): React.ReactElement {
  const activeZoneIds = useWorldStore((s) => s.activeZoneIds);
  const activateZone = useWorldStore((s) => s.activateZone);
  const setZoneStatus = useWorldStore((s) => s.setZoneStatus);

  const playerPos = usePlayerStore((s) => s.position);
  const setPosition = usePlayerStore((s) => s.setPosition);
  const setRotation = usePlayerStore((s) => s.setRotation);

  // Initialize Spawn Location on Mount
  useEffect(() => {
    const spawn = SpawnManager.resolveSpawn();
    setPosition(spawn.position);
    setRotation(spawn.rotation);

    // Bootstrap initial active zone at spawn
    activateZone('spawn');
    setZoneStatus('spawn', 'active');
  }, [setPosition, setRotation, activateZone, setZoneStatus]);

  // Tick the streaming zone detector every frame
  useFrame(() => {
    ZoneCuller.update(playerPos.x, playerPos.z);
  });

  // Dynamically resolve chunks to render based on activeZoneIds list
  const activeChunks = ZONES_LIST.filter((z) => activeZoneIds.includes(z.id));

  return (
    <group name="world-root">
      {/* Dynamic streamed zones */}
      {activeChunks.map((zone) => (
        <TerrainChunk key={zone.id} zone={zone} />
      ))}

      {/* Interconnecting roads */}
      <RoadSystem />

      {/* Floor boundaries collider base */}
      <gridHelper args={[1200, 120, '#00e5f0', '#0a0a14']} position={[0, -0.05, 0]} opacity={0.1} transparent />
    </group>
  );
}
export default WorldRoot;
