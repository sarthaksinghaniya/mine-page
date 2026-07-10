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

import { SunLight } from './components/SunLight';
import { AmbientLighting } from './components/AmbientLighting';
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
  return (
    <>
      {/* Directional sun with shadows */}
      <SunLight />

      {/* Hemisphere + ambient fill */}
      <AmbientLighting />
    </>
  );
}
