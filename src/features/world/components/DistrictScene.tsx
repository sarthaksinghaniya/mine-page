/**
 * @file src/features/world/components/DistrictScene.tsx
 * @description Orchestrates local district assets, sub-meshes, and bounds.
 */

import React, { Suspense } from 'react';

interface DistrictSceneProps {
  id: string;
  children: React.ReactNode;
}

export function DistrictScene({ id, children }: DistrictSceneProps): React.ReactElement {
  return (
    <group name={`district-scene-${id}`}>
      <Suspense fallback={null}>{children}</Suspense>
    </group>
  );
}
export default DistrictScene;
