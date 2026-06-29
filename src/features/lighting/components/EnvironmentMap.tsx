/**
 * @file src/features/lighting/components/EnvironmentMap.tsx
 * @description HDR environment map for image-based lighting and reflections.
 *
 * Uses Drei's <Environment> component which handles:
 * - HDRI loading and caching
 * - PMREMGenerator (pre-computed radiance environment map)
 * - Applying to scene.environment for IBL on all PBR materials
 *
 * Reads from lighting.store for URL, preset, and intensity.
 * Falls back to Drei preset when no custom HDRI is loaded.
 */

import { Suspense } from 'react';
import { Environment } from '@react-three/drei';
import { useLightingStore } from '../lighting.store';
import { performanceProfile } from '@config/performance';

// ── Inner Component (inside Suspense) ─────────────────────────────────────────

function EnvironmentMapInner(): React.ReactElement {
  const env = useLightingStore((s) => s.environment);

  // On low-tier GPU: skip environment map entirely to save GPU memory
  if (performanceProfile.tier === 'low') {
    return <></>;
  }

  if (env.hdriUrl) {
    return (
      <Environment
        files={env.hdriUrl}
        background={env.background}
        environmentIntensity={env.intensity}
      />
    );
  }

  return (
    <Environment
      preset={env.preset}
      background={env.background}
      environmentIntensity={env.intensity}
    />
  );
}

// ── Exported Component ────────────────────────────────────────────────────────

/**
 * Environment map provider — Suspense-wrapped for async HDRI loading.
 */
export function EnvironmentMap(): React.ReactElement {
  return (
    <Suspense fallback={null}>
      <EnvironmentMapInner />
    </Suspense>
  );
}
