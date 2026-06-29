/**
 * @file src/features/buildings/components/InteriorRoot.tsx
 * @description Dynamic interior scene container providing isolated lighting.
 */

import React from 'react';
import type { InteriorConfig } from '../district.types';

interface InteriorRootProps {
  config: InteriorConfig;
}

export function InteriorRoot({ config }: InteriorRootProps): React.ReactElement {
  return (
    <group name={`interior-${config.id}`}>
      {/* Dynamic isolated lighting */}
      <ambientLight intensity={config.ambientIntensity} color={config.lightColor} />
      <directionalLight
        position={[5, 15, 5]}
        intensity={1.5}
        color={config.lightColor}
        castShadow
      />
      <pointLight position={[0, 8, 0]} intensity={2.0} color="#ffffff" distance={30} />

      {/* Ceiling box */}
      <mesh position={[0, 10, 0]}>
        <boxGeometry args={[40, 0.2, 40]} />
        <meshStandardMaterial color="#111116" roughness={0.9} />
      </mesh>

      {/* Ground floor plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0c0c12" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Four walls encapsulating the interior sandbox */}
      <mesh position={[0, 5, -20]}>
        <boxGeometry args={[40, 10, 0.2]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.8} />
      </mesh>
      <mesh position={[0, 5, 20]}>
        <boxGeometry args={[40, 10, 0.2]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.8} />
      </mesh>
      <mesh position={[-20, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[40, 10, 0.2]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.8} />
      </mesh>
      <mesh position={[20, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[40, 10, 0.2]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.8} />
      </mesh>
    </group>
  );
}
export default InteriorRoot;
