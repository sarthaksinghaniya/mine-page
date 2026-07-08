/**
 * @file src/features/world/components/PostProcessing.tsx
 * @description Global post-processing effects for the 3D scene (Bloom, Vignette).
 */

import React from 'react';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useCameraStore } from '@/features/camera/camera.store';

export function PostProcessing(): React.ReactElement {
  const isCinematic = useCameraStore((s) => s.isCinematic);

  return (
    <EffectComposer disableNormalPass multisampling={4}>
      {/* 
        High threshold bloom for Neon/Holograms.
        Luminance threshold is high so only emissive materials glow.
      */}
      <Bloom 
        luminanceThreshold={1.2} 
        luminanceSmoothing={0.9} 
        intensity={2.0} 
        mipmapBlur 
      />
      
      {/* Subtle cinematic vignette */}
      <Vignette 
        eskil={false} 
        offset={0.1} 
        darkness={0.7} 
        blendFunction={BlendFunction.NORMAL} 
      />

      {/* Dynamic DoF during cinematic fly-throughs */}
      {isCinematic && (
        <DepthOfField 
          focusDistance={0.015} 
          focalLength={0.02} 
          bokehScale={2} 
          height={480} 
        />
      )}
    </EffectComposer>
  );
}
