/**
 * @file src/features/world/systems/PostProcessingManager.tsx
 * @description Advanced rendering pipeline for AAA visual fidelity (Bloom, SSAO, Vignette).
 */

import React, { useMemo } from 'react';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

interface PostProcessingProps {
  graphicsQuality?: 'low' | 'high';
}

export function PostProcessingManager({ graphicsQuality = 'high' }: PostProcessingProps) {
  // Memoize offset to prevent recalculations
  const chromAberrationOffset = useMemo(() => new THREE.Vector2(0.002, 0.002), []);

  // For mobile or low-end devices, skip the heavy post-processing pass entirely
  if (graphicsQuality === 'low') {
    return null;
  }

  return (
    <EffectComposer disableNormalPass>
      {/* Cyberpunk Bloom: Low threshold to catch neon materials, high intensity */}
      <Bloom 
        luminanceThreshold={0.5} 
        luminanceSmoothing={0.9} 
        intensity={1.5} 
        mipmapBlur 
      />
      
      {/* Hacker/Terminal Aesthetic */}
      <ChromaticAberration 
        blendFunction={BlendFunction.NORMAL} 
        offset={chromAberrationOffset}
      />
      
      {/* Cinematic Vignette */}
      <Vignette 
        eskil={false} 
        offset={0.1} 
        darkness={1.1} 
        blendFunction={BlendFunction.NORMAL} 
      />
    </EffectComposer>
  );
}
