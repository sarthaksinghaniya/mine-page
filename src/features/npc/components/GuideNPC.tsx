/**
 * @file src/features/npc/components/GuideNPC.tsx
 * @description The main Guide NPC acting as the portfolio assistant.
 */

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { usePlayerStore } from '@/features/player/player.store';
import { useNpcStore } from '@/features/npc/npc.store';
import { DialogueManager } from '@/features/npc/DialogueManager';

export function GuideNPC(): React.ReactElement {
  const groupRef = useRef<THREE.Group>(null);
  const playerPos = usePlayerStore((s) => s.position);
  const interactionState = useNpcStore((s) => s.interactionState);
  const [near, setNear] = useState(false);

  // Hardcoded spawn position for guide
  const spawnPos = new THREE.Vector3(0, 0, 5);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Check distance to player
    const dist = spawnPos.distanceTo(playerPos);
    setNear(dist < 5);

    // Look at player if near
    if (dist < 10) {
      const target = new THREE.Vector3(playerPos.x, playerPos.y, playerPos.z);
      groupRef.current.lookAt(target);
    }

    // Bobbing animation (idle)
    groupRef.current.position.y = spawnPos.y + Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  return (
    <group ref={groupRef} position={spawnPos}>
      {/* Procedural NPC Body */}
      <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 2, 8]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh castShadow receiveShadow position={[0, 2.8, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#fcd34d" roughness={0.6} />
      </mesh>

      {/* Interaction UI */}
      {near && interactionState === 'idle' && (
        <Html position={[0, 3.5, 0]} center sprite>
          <div className="bg-black/80 backdrop-blur text-white text-sm px-3 py-1.5 rounded-lg border border-white/20 shadow-xl pointer-events-auto cursor-pointer"
               onClick={() => { DialogueManager.startConversation('guide-npc'); }}>
            <span className="font-bold text-yellow-400 mr-2">E</span>
            Talk to Guide
          </div>
        </Html>
      )}
    </group>
  );
}
