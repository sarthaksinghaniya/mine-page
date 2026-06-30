/**
 * @file src/features/world/systems/MetroSystem.tsx
 * @description Fast travel terminal for jumping across the City Grid.
 */

import React, { useEffect } from 'react';
import { InteractionManager } from '@core/interaction/InteractionManager';
import { eventBus } from '@core/events/EventBus';
import * as THREE from 'three';

export function MetroSystem() {
  
  useEffect(() => {
    // Register the Metro Terminal interaction
    InteractionManager.register({
      id: 'metro-terminal',
      name: 'City Metro Hub',
      type: 'terminal',
      position: { x: -20, y: 1, z: -20 },
      radius: 6,
      priority: 10,
      enabled: true,
      promptText: 'Access Metro Fast Travel',
      onInteract: () => {
        // Trigger a cinematic transition, then teleport player
        eventBus.emit('metro:access', undefined);
        console.log('[MetroSystem] Metro fast travel accessed.');
      }
    });

    return () => {
      InteractionManager.unregister('metro-terminal');
    };
  }, []);

  return (
    <group position={[-20, 0, -20]}>
      {/* Metro Entrance Mesh */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[8, 4, 8]} />
        <meshStandardMaterial color="#222233" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Metro Hologram Sign */}
      <group position={[0, 5, 0]}>
        <mesh>
          <planeGeometry args={[6, 2]} />
          <meshBasicMaterial color="#ff0055" transparent opacity={0.8} />
        </mesh>
        <pointLight color="#ff0055" intensity={1} distance={15} />
      </group>
    </group>
  );
}
