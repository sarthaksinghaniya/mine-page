/**
 * @file src/features/world/components/WorldRoot.tsx
 * @description The main scene root container placeholder component.
 *
 * Implements a simple interactive visual container for engine validation.
 */

import React from 'react';

export function WorldRoot(): React.ReactElement {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0a0a14" />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#00adc0" emissive="#00adc0" emissiveIntensity={0.3} />
      </mesh>
    </>
  );
}
