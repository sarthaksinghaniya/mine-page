import React from 'react';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useCameraStore } from '@/features/camera/camera.store';
import { performanceProfile } from '@/config/performance';

export function PostProcessing(): React.ReactElement | null {
  const cinematic = useCameraStore((s) => s.cinematic);

  if (!performanceProfile.postProcessing) return null;

  return (
    <EffectComposer disableNormalPass multisampling={performanceProfile.tier === 'high' ? 4 : 2}>
      <Bloom 
        luminanceThreshold={1.2} 
        luminanceSmoothing={0.9} 
        intensity={2.0} 
        mipmapBlur 
      />
      <Vignette 
        eskil={false} 
        offset={0.1} 
        darkness={0.7} 
        blendFunction={BlendFunction.NORMAL} 
      />
      {cinematic && performanceProfile.tier === 'high' ? (
        <DepthOfField 
          focusDistance={0.015} 
          focalLength={0.02} 
          bokehScale={2} 
        />
      ) : null}
    </EffectComposer>
  );
}
