/**
 * @file src/features/npc/components/GuideNPC.tsx
 * @description The main Guide NPC acting as the portfolio assistant.
 */

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { usePlayerStore } from '@/features/player/player.store';

export function GuideNPC(): React.ReactElement {
  const groupRef = useRef<THREE.Group>(null);
  const playerPos = usePlayerStore((s) => s.position);
  const [near, setNear] = useState(false);
  const [talking, setTalking] = useState(false);

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
      {near && !talking && (
        <Html position={[0, 3.5, 0]} center sprite>
          <div className="bg-black/80 backdrop-blur text-white text-sm px-3 py-1.5 rounded-lg border border-white/20 shadow-xl pointer-events-auto cursor-pointer"
               onClick={() => setTalking(true)}>
            <span className="font-bold text-yellow-400 mr-2">E</span>
            Talk to Guide
          </div>
        </Html>
      )}

      {/* Dialogue UI */}
      {talking && (
        <Html position={[0, 4, 0]} center sprite>
          <div className="bg-black/90 backdrop-blur p-4 rounded-xl border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.5)] min-w-[250px]">
            <h4 className="text-blue-400 font-bold mb-2">Portfolio Guide</h4>
            <p className="text-gray-200 text-sm mb-3">
              Welcome to the Developer's Portfolio! Explore the world to see my projects, skills, and experience. 
              Follow the stone paths to visit different districts.
            </p>
            <button 
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded transition-colors w-full"
              onClick={() => setTalking(false)}
            >
              Let's go!
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}
