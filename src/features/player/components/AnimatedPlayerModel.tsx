/**
 * @file src/features/player/components/AnimatedPlayerModel.tsx
 * @description Advanced GLTF Player Model with AnimationMixer blending (Idle, Walk, Run, Jump).
 * Falls back to a stylized procedural mesh if the GLTF is missing.
 */

import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import { ASSET_PATHS } from '@/core/assets/AssetManager';

interface AnimatedPlayerModelProps {
  velocityRef: React.MutableRefObject<THREE.Vector3>;
  isGroundedRef: React.MutableRefObject<boolean>;
  isSprintingRef: React.MutableRefObject<boolean>;
}

export function AnimatedPlayerModel({ velocityRef, isGroundedRef, isSprintingRef }: AnimatedPlayerModelProps): React.ReactElement {
  const groupRef = useRef<THREE.Group>(null);
  
  // Safe load attempt for the GLTF
  let gltfResult: any = null;
  let animResult: any = null;
  let hasGltf = false;

  try {
    const { scene, animations } = useGLTF(ASSET_PATHS.player);
    gltfResult = scene;
    animResult = animations;
    hasGltf = true;
  } catch (e) {
    hasGltf = false;
  }

  // Clone scene so it's safe to mutate
  const clonedScene = useMemo(() => {
    if (!gltfResult) return null;
    const clone = gltfResult.clone();
    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [gltfResult]);

  // Setup animations if available
  const { actions } = useAnimations(hasGltf ? animResult : [], groupRef);
  const currentAction = useRef<string>('Idle');

  // Procedural Fallback Refs
  const timeRef = useRef(0);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!velocityRef.current) return;
    const speed = Math.sqrt(velocityRef.current.x * velocityRef.current.x + velocityRef.current.z * velocityRef.current.z);
    
    // GLTF Animation Logic
    if (hasGltf && actions) {
      let targetAction = 'Idle';
      if (!isGroundedRef.current) {
        targetAction = 'Jump';
      } else if (speed > 0.1) {
        targetAction = isSprintingRef.current ? 'Run' : 'Walk';
      }

      if (targetAction !== currentAction.current) {
        const prev = actions[currentAction.current];
        const next = actions[targetAction];
        if (next) {
          next.reset().play();
          if (prev) {
            next.crossFadeFrom(prev, 0.2, true);
          }
        }
        currentAction.current = targetAction;
      }
      return; // Skip procedural if we have GLTF
    }

    // Fallback Procedural Animation State
    timeRef.current += delta;
    
    let bobSpeed = 0;
    let swingAmount = 0;

    if (!isGroundedRef.current) {
      // Jump pose
      swingAmount = 0;
      if (leftLegRef.current) leftLegRef.current.rotation.x = -0.5;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0.2;
      if (leftArmRef.current) leftArmRef.current.rotation.x = 3.14; // Arms up
      if (rightArmRef.current) rightArmRef.current.rotation.x = 3.14;
    } else if (speed > 0.1) {
      // Run/Walk cycle
      bobSpeed = isSprintingRef.current ? 15 : 10;
      swingAmount = isSprintingRef.current ? 1.0 : 0.6;
      const t = timeRef.current * bobSpeed;

      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(t) * swingAmount;
      if (rightLegRef.current) rightLegRef.current.rotation.x = Math.sin(t + Math.PI) * swingAmount;
      if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(t + Math.PI) * swingAmount;
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(t) * swingAmount;
    } else {
      // Idle
      bobSpeed = 2;
      const t = timeRef.current * bobSpeed;
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
      if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(t) * 0.1;
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(t + Math.PI) * 0.1;
      if (headRef.current) headRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
    }
  });

  if (hasGltf && clonedScene) {
    return (
      <group ref={groupRef}>
        <primitive object={clonedScene} position={[0, -1, 0]} />
      </group>
    );
  }

  // FALLBACK STYLIZED PROCEDURAL MESH
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#fcd34d" />
        {/* Eyes */}
        <mesh position={[-0.1, 0.05, 0.26]}><boxGeometry args={[0.05, 0.05, 0.05]} /><meshBasicMaterial color="black" /></mesh>
        <mesh position={[0.1, 0.05, 0.26]}><boxGeometry args={[0.05, 0.05, 0.05]} /><meshBasicMaterial color="black" /></mesh>
      </mesh>
      
      {/* Torso */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.6, 0.9, 0.3]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.45, 0.4, 0]} castShadow>
        <boxGeometry args={[0.2, 0.7, 0.2]} />
        <meshStandardMaterial color="#fcd34d" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.45, 0.4, 0]} castShadow>
        <boxGeometry args={[0.2, 0.7, 0.2]} />
        <meshStandardMaterial color="#fcd34d" />
      </mesh>

      {/* Legs */}
      <mesh ref={leftLegRef} position={[-0.15, -0.6, 0]} castShadow>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
      <mesh ref={rightLegRef} position={[0.15, -0.6, 0]} castShadow>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* Fallback Warning */}
      <Html position={[0, 1.5, 0]} center sprite>
        <div className="bg-black/80 text-yellow-400 px-2 py-1 text-[8px] rounded border border-yellow-500 font-mono">
          GLTF Anim Rig Missing
        </div>
      </Html>
    </group>
  );
}
