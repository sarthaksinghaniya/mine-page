/**
 * @file src/features/lighting/components/AmbientLighting.tsx
 * @description Ambient fill and hemisphere lighting.
 *
 * Combines:
 * - HemisphereLight: sky/ground color gradient (most important for outdoor scenes)
 * - AmbientLight:    flat fill to prevent pitch-black shadows
 *
 * Both read from lighting.store and react to day-night cycle changes.
 */

import { useLightingStore } from '../lighting.store';

export function AmbientLighting(): React.ReactElement {
  const ambient = useLightingStore((s) => s.ambient);
  const hemisphere = useLightingStore((s) => s.hemisphere);

  return (
    <>
      <hemisphereLight
        color={hemisphere.skyColor}
        groundColor={hemisphere.groundColor}
        intensity={hemisphere.intensity}
      />
      <ambientLight color={ambient.color} intensity={ambient.intensity} />
    </>
  );
}
