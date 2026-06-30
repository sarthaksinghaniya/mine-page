/**
 * @file src/features/lighting/components/SunLight.tsx
 * @description Physically-correct directional sun light with shadow support.
 *
 * Reads position, intensity, and shadow config from lighting.store.
 * Shadow camera frustum is configured to cover the active world area efficiently.
 */

import { useRef, useEffect } from 'react';
import type * as THREE from 'three';
import { useLightingStore } from '../lighting.store';
import { performanceProfile } from '@config/performance';

export function SunLight(): React.ReactElement {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);
  const sun = useLightingStore((s) => s.sun);
  const shadowMapSize = sun.shadowMapSize ?? performanceProfile.shadowMapSize;

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;

    // Configure shadow camera frustum
    const d = sun.shadowRadius;
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.near = sun.shadowNear;
    light.shadow.camera.far = sun.shadowFar;
    light.shadow.camera.updateProjectionMatrix();
  }, [sun.shadowRadius, sun.shadowNear, sun.shadowFar]);

  return (
    <>
      {/* Shadow target at world origin — follow player in future */}
      <object3D ref={targetRef} position={[0, 0, 0]} />
      <directionalLight
        ref={lightRef}
        color={sun.color}
        intensity={sun.intensity}
        position={[sun.position.x, sun.position.y, sun.position.z]}
        castShadow={performanceProfile.tier !== 'low'}
        shadow-mapSize={[shadowMapSize, shadowMapSize]}
        shadow-bias={sun.shadowBias}
        shadow-normalBias={sun.shadowNormalBias}
      />
    </>
  );
}
