/**
 * @file src/features/world/components/VillageSquare.tsx
 * @description Central spawn village square with stone paths, fountain, and stalls.
 */

import React from 'react';
import * as THREE from 'three';

const BLOCK_SIZE = 2;

export function VillageSquare(): React.ReactElement {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Stone Plaza Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#a8a29e" roughness={1.0} />
      </mesh>

      {/* Central Fountain */}
      <group position={[0, 0, 0]}>
        {/* Fountain Base */}
        <mesh position={[0, BLOCK_SIZE / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[BLOCK_SIZE * 3, BLOCK_SIZE, BLOCK_SIZE * 3]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        
        {/* Fountain Water */}
        <mesh position={[0, BLOCK_SIZE + 0.1, 0]} receiveShadow>
          <boxGeometry args={[BLOCK_SIZE * 2.8, 0.2, BLOCK_SIZE * 2.8]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.8} />
        </mesh>

        {/* Fountain Pillar */}
        <mesh position={[0, BLOCK_SIZE * 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[BLOCK_SIZE / 2, BLOCK_SIZE * 2, BLOCK_SIZE / 2]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        
        {/* Spout Water */}
        <mesh position={[0, BLOCK_SIZE * 2.5, 0]}>
          <boxGeometry args={[BLOCK_SIZE, 0.2, BLOCK_SIZE]} />
          <meshBasicMaterial color="#7dd3fc" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Market Stall 1 */}
      <group position={[-15, BLOCK_SIZE / 2, -10]} rotation={[0, Math.PI / 4, 0]}>
        {/* Table */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[BLOCK_SIZE * 2, BLOCK_SIZE, BLOCK_SIZE]} />
          <meshStandardMaterial color="#854d0e" />
        </mesh>
        {/* Awning */}
        <mesh position={[0, BLOCK_SIZE * 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[BLOCK_SIZE * 2.2, 0.2, BLOCK_SIZE * 2.2]} />
          <meshStandardMaterial color="#ef4444" /> {/* Red awning */}
        </mesh>
        {/* Poles */}
        <mesh position={[-BLOCK_SIZE + 0.2, BLOCK_SIZE, -BLOCK_SIZE / 2 + 0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.2, BLOCK_SIZE * 2, 0.2]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[BLOCK_SIZE - 0.2, BLOCK_SIZE, -BLOCK_SIZE / 2 + 0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.2, BLOCK_SIZE * 2, 0.2]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
      </group>
      
      {/* Market Stall 2 */}
      <group position={[15, BLOCK_SIZE / 2, 5]} rotation={[0, -Math.PI / 6, 0]}>
        {/* Table */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[BLOCK_SIZE * 2, BLOCK_SIZE, BLOCK_SIZE]} />
          <meshStandardMaterial color="#854d0e" />
        </mesh>
        {/* Awning */}
        <mesh position={[0, BLOCK_SIZE * 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[BLOCK_SIZE * 2.2, 0.2, BLOCK_SIZE * 2.2]} />
          <meshStandardMaterial color="#3b82f6" /> {/* Blue awning */}
        </mesh>
        {/* Poles */}
        <mesh position={[-BLOCK_SIZE + 0.2, BLOCK_SIZE, -BLOCK_SIZE / 2 + 0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.2, BLOCK_SIZE * 2, 0.2]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[BLOCK_SIZE - 0.2, BLOCK_SIZE, -BLOCK_SIZE / 2 + 0.2]} castShadow receiveShadow>
          <boxGeometry args={[0.2, BLOCK_SIZE * 2, 0.2]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
      </group>
    </group>
  );
}
