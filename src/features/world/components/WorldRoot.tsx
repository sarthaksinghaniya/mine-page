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

import { Physics } from '@react-three/rapier';
import { PlayerPhysicsController } from '@/features/player/components/PlayerPhysicsController';
import { BuildingRoot, DISTRICTS_LIST } from '@/features/buildings';
import { InstancedProps } from '@/features/environment';
import { AudioZones } from '@/features/audio';
import { InteractionManager } from '@core/interaction/InteractionManager';
import { CinematicDirector } from '@core/cinematic/CinematicDirector';
import { VehicleBase, VehicleManager } from '@/features/vehicles';



export function WorldRoot(): React.ReactElement {
  const activeZoneIds = useWorldStore((s) => s.activeZoneIds);
  const activateZone = useWorldStore((s) => s.activateZone);
  const setZoneStatus = useWorldStore((s) => s.setZoneStatus);
  const focusedZoneId = useWorldStore((s) => s.focusedZoneId);

  const playerPos = usePlayerStore((s) => s.position);
  const setPosition = usePlayerStore((s) => s.setPosition);
  const setRotation = usePlayerStore((s) => s.setRotation);

  // Initialize Spawn Location and register interactable lots on Mount
  useEffect(() => {
    const spawn = SpawnManager.resolveSpawn();
    setPosition(spawn.position);
    setRotation(spawn.rotation);

    // Register all district lots in the InteractionManager
    DISTRICTS_LIST.forEach((district) => {
      district.lots.forEach((lot) => {
        InteractionManager.register({
          id: lot.id,
          name: lot.name,
          type: lot.interior ? 'building' : 'custom',
          position: lot.position,
          radius: lot.interactRadius,
          priority: lot.category === 'landmark' ? 10 : 5,
          enabled: true,
          promptText: lot.interior ? `Enter ${lot.name}` : `Inspect ${lot.name}`,
          onInteract: () => {
            console.log(`[Interaction] Interacted with: ${lot.name}`);
            if (lot.id === 'spawn-plaza-pillar') {
              // Trigger a cinematic sequence
              CinematicDirector.play({
                id: 'obelisk-cinematic',
                name: 'Inspect Central Obelisk',
                duration: 4.0,
                priority: 10,
                keyframes: [
                  { time: 0.0, type: 'player', player: { frozen: true } },
                  { time: 0.0, type: 'screen', screen: { fadeOpacity: 0, letterbox: true } },
                  { time: 0.5, type: 'camera', camera: { position: { x: 0, y: 15, z: -30 }, lookAt: { x: 0, y: 12, z: -10 } } },
                  { time: 2.0, type: 'screen', screen: { fadeOpacity: 1, letterbox: true } },
                  { time: 3.0, type: 'screen', screen: { fadeOpacity: 0, letterbox: false } },
                  { time: 3.5, type: 'player', player: { frozen: false } },
                ],
              });
            }
            if (lot.interior) {
              console.log(`[Interaction] Portal triggered for interior: ${lot.interior.id}`);
            }
          },
        });
      });
    });


    // Register a test cyber car vehicle config
    VehicleManager.register({
      id: 'cyber-car-01',
      name: 'Cyber Roadster',
      category: 'car',
      position: { x: 10, y: 1.5, z: 15 },
      rotation: 0,
      maxSpeed: 40,
      acceleration: 25,
      mass: 1200,
    });

    // Bootstrap initial active zone at spawn
    activateZone('spawn');
    setZoneStatus('spawn', 'active');

    return () => {
      // Unregister lots on unmount
      DISTRICTS_LIST.forEach((district) => {
        district.lots.forEach((lot) => {
          InteractionManager.unregister(lot.id);
        });
      });
      VehicleManager.unregister('cyber-car-01');
    };

  }, [setPosition, setRotation, activateZone, setZoneStatus]);

  // Handle ambient soundtrack transitions as districts shift
  useEffect(() => {
    if (focusedZoneId) {
      AudioZones.transition(focusedZoneId as any);
    }
  }, [focusedZoneId]);

  // Tick the streaming zone detector every frame
  useFrame(() => {
    ZoneCuller.update(playerPos.x, playerPos.z);
  });

  // Dynamically resolve chunks to render based on activeZoneIds list
  const activeChunks = ZONES_LIST.filter((z) => activeZoneIds.includes(z.id));

  return (
    <Physics gravity={[0, -20, 0]}>
      <group name="world-root">
        {/* Dynamic streamed zones */}
        {activeChunks.map((zone) => (
          <TerrainChunk key={zone.id} zone={zone} />
        ))}

        {/* Dynamic buildings on active lots */}
        {activeChunks.map((zone) => {
          const district = DISTRICTS_LIST.find((d) => d.id === zone.id);
          if (!district) return null;
          return district.lots.map((lot) => (
            <BuildingRoot key={lot.id} lot={lot} color={zone.color} />
          ));
        })}

        {/* Dynamic vehicles in active zones */}
        {activeZoneIds.includes('spawn') && (
          <VehicleBase
            config={{
              id: 'cyber-car-01',
              name: 'Cyber Roadster',
              category: 'car',
              position: { x: 10, y: 1.5, z: 15 },
              rotation: 0,
              maxSpeed: 40,
              acceleration: 25,
              mass: 1200,
            }}
            color="#ff5500"
          />
        )}

        {/* Interconnecting roads */}
        <RoadSystem />

        {/* Foliage and environment props */}
        <InstancedProps />


        {/* Player physical body */}
        <PlayerPhysicsController />

        {/* Floor boundaries collider base */}
        <gridHelper args={[1200, 120, '#00e5f0', '#0a0a14']} position={[0, -0.05, 0]} opacity={0.1} transparent />
      </group>
    </Physics>
  );
}
export default WorldRoot;


