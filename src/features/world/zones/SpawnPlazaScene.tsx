/**
 * @file src/features/world/zones/SpawnPlazaScene.tsx
 * @description Spawn Plaza environment layout, monument, and gate interactables.
 */

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';
import { InteractionManager } from '@core/interaction/InteractionManager';
import { DistrictScene } from '../components/DistrictScene';
import { AppManager } from '@core/apps/AppManager';

export function SpawnPlazaScene(): React.ReactElement {
  const monumentRef = useRef<THREE.Mesh>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  // Rotate hologram monument and oscillate fountain water
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (monumentRef.current) {
      monumentRef.current.rotation.y = elapsed * 0.4;
    }

    if (waterRef.current) {
      // Oscillate scale to simulate water jet pulsing
      const wave = Math.sin(elapsed * 4.0) * 0.15 + 1.0;
      waterRef.current.scale.set(1.0, wave, 1.0);
    }
  });

  // Register interactive doors/gates in Spawn Plaza on mount
  useEffect(() => {
    const gates = [
      { id: 'gate-ai', name: 'AI Research District Gate', text: 'AI District Locked' },
      { id: 'gate-museum', name: 'Achievement Museum Gate', text: 'Museum Gate Locked' },
      { id: 'gate-metro', name: 'Metro Terminal Entrance', text: 'Metro Locked - Out of Order' },
      { id: 'gate-tower', name: 'Experience Tower Entry', text: 'Lobby Security Lockdown' },
    ];

    gates.forEach((gate) => {
      // Offset positions around Spawn Plaza center (0,0,0)
      let pos = { x: 0, y: 1.0, z: -35 };
      if (gate.id === 'gate-ai') pos = { x: 35, y: 1.0, z: 0 };
      if (gate.id === 'gate-museum') pos = { x: -35, y: 1.0, z: 0 };
      if (gate.id === 'gate-tower') pos = { x: 0, y: 1.0, z: 35 };

      InteractionManager.register({
        id: gate.id,
        name: gate.name,
        type: 'door',
        position: pos,
        radius: 5,
        priority: 5,
        enabled: true,
        promptText: `Interact with ${gate.name}`,
        onInteract: () => {
          if (gate.id === 'gate-museum') {
            AppManager.open('museum');
          }
        },
      });
    });

    return () => {
      gates.forEach((gate) => { InteractionManager.unregister(gate.id); });
    };
  }, []);

  return (
    <DistrictScene id="spawn">
      <group position={[0, 4.0, 0]}>
        <mesh ref={monumentRef}>
          <cylinderGeometry args={[2.0, 2.0, 8, 6, 1, true]} />
          <meshStandardMaterial
            color="#00e5f0"
            emissive="#00e5f0"
            emissiveIntensity={3.0}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
        <pointLight intensity={3.0} color="#00e5f0" distance={40} />
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1f2937" roughness={1} metalness={0} />
      </mesh>

      <group position={[0, 0.1, -18]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[8.0, 8.2, 0.4, 32]} />
          <meshStandardMaterial color="#1a1a24" roughness={0.9} />
        </mesh>
        <mesh ref={waterRef} position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 2.4, 8]} />
          <meshStandardMaterial color="#00adc0" transparent opacity={0.7} />
        </mesh>
      </group>

      <group position={[15, 0.5, 15]}>
        <mesh castShadow>
          <boxGeometry args={[12, 1.0, 3]} />
          <meshStandardMaterial color="#0a3c20" roughness={0.8} />
        </mesh>
      </group>
      <group position={[-15, 0.5, 15]}>
        <mesh castShadow>
          <boxGeometry args={[12, 1.0, 3]} />
          <meshStandardMaterial color="#0a3c20" roughness={0.8} />
        </mesh>
      </group>

      {/* ── Widescreen Gate Visuals ── */}
      {/* AI Gate Portal */}
      <group position={[35, 2.0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[8, 4.0, 1.0]} />
          <meshStandardMaterial color="#8000ff" roughness={0.4} metalness={0.9} />
        </mesh>
      </group>
      {/* Museum Gate Portal */}
      <group position={[-35, 2.0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[8, 4.0, 1.0]} />
          <meshStandardMaterial color="#ffcc00" roughness={0.4} metalness={0.9} />
        </mesh>
      </group>
    </DistrictScene>
  );
}
export default SpawnPlazaScene;
