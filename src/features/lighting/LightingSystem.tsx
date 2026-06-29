/**
 * @file src/features/lighting/LightingSystem.tsx
 * @description Root lighting system — composes all light and atmosphere components.
 *
 * Mount once inside the R3F Canvas. It acts as the single provider of:
 *  - SunLight (directional + shadows)
 *  - AmbientLighting (hemisphere + ambient fill)
 *  - FogLayer (scene.fog applied imperatively)
 *  - EnvironmentMap (IBL for PBR materials)
 *  - ContactShadows (soft ground shadows, medium/high only)
 *
 * All sub-components react to lighting.store changes — this component
 * itself is static and never re-renders due to lighting changes.
 */

import { ContactShadows } from '@react-three/drei';
import { SunLight }       from './components/SunLight';
import { AmbientLighting }from './components/AmbientLighting';
import { FogLayer }       from './components/FogLayer';
import { EnvironmentMap } from './components/EnvironmentMap';
import { performanceProfile } from '@config/performance';

/**
 * Root lighting component. Mount once inside Canvas.
 *
 * @example
 * ```tsx
 * <Canvas>
 *   <LightingSystem />
 * </Canvas>
 * ```
 */
export function LightingSystem(): React.ReactElement {
  const enableContactShadows = performanceProfile.tier !== 'low';

  return (
    <>
      {/* Directional sun with shadows */}
      <SunLight />

      {/* Hemisphere + ambient fill */}
      <AmbientLighting />

      {/* Atmospheric fog */}
      <FogLayer />

      {/* Image-based lighting */}
      <EnvironmentMap />

      {/* Soft contact shadows on ground plane (medium/high only) */}
      {enableContactShadows && (
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.6}
          scale={80}
          blur={2}
          far={20}
          resolution={performanceProfile.shadowMapSize / 2}
          color="#000000"
        />
      )}
    </>
  );
}
