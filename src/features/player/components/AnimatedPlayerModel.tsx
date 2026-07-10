/**
 * @file src/features/player/components/AnimatedPlayerModel.tsx
 * @description Advanced GLTF Player Model with AnimationMixer blending (Idle, Walk, Run, Jump).
 * Falls back to a stylized procedural mesh if the GLTF is missing.
 */

import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { ASSET_PATHS } from '@/core/assets/AssetManager';

interface AnimatedPlayerModelProps {
  velocityRef: React.MutableRefObject<THREE.Vector3>;
  isGroundedRef: React.MutableRefObject<boolean>;
  isSprintingRef: React.MutableRefObject<boolean>;
}


function PlayerModelGLTF({ velocityRef, isGroundedRef, isSprintingRef }: AnimatedPlayerModelProps): React.ReactElement | null {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(ASSET_PATHS.player);
  
  const clonedScene = useMemo(() => {
    if (!gltf.scene) return null;
    const clone = gltf.scene.clone();
    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [gltf.scene]);

  const { actions } = useAnimations(gltf.animations, groupRef);
  const currentAction = useRef<string>('Idle');

  useFrame(() => {
    if (!velocityRef.current || !actions) return;
    const speed = Math.sqrt(velocityRef.current.x * velocityRef.current.x + velocityRef.current.z * velocityRef.current.z);
    
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
  });

  if (!clonedScene) return null;
  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} position={[0, -1, 0]} />
    </group>
  );
}

function PlayerModelProcedural({ velocityRef, isGroundedRef, isSprintingRef }: AnimatedPlayerModelProps): React.ReactElement {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!velocityRef.current) return;
    const speed = Math.sqrt(velocityRef.current.x * velocityRef.current.x + velocityRef.current.z * velocityRef.current.z);
    timeRef.current += delta;
    
    let bobSpeed = 0;
    let swingAmount = 0;

    if (!isGroundedRef.current) {
      swingAmount = 0;
      if (leftLegRef.current) leftLegRef.current.rotation.x = -0.5;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0.2;
      // Throw arms up when jumping/falling
      if (leftArmRef.current) leftArmRef.current.rotation.x = Math.PI; 
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.PI;
      // Lean body back slightly when falling
      if (groupRef.current) {
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -0.1, 0.1);
      }
    } else if (speed > 0.1) {
      bobSpeed = isSprintingRef.current ? 18 : 12; // faster bobbing
      swingAmount = isSprintingRef.current ? 1.4 : 0.8; // larger leg/arm swings
      const leanAmount = isSprintingRef.current ? 0.3 : 0.1; // lean forward when running
      
      if (groupRef.current) {
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, leanAmount, 0.1);
      }
      
      const t = timeRef.current * bobSpeed;
      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(t) * swingAmount;
      if (rightLegRef.current) rightLegRef.current.rotation.x = Math.sin(t + Math.PI) * swingAmount;
      if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(t + Math.PI) * swingAmount;
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(t) * swingAmount;
    } else {
      bobSpeed = 3;
      const t = timeRef.current * bobSpeed;
      
      // Return to upright stance smoothly
      if (groupRef.current) {
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
      }
      
      if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.2);
      if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.2);
      if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(t) * 0.15;
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(t + Math.PI) * 0.15;
      if (headRef.current) headRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh ref={headRef} position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#fcd34d" />
        <mesh position={[-0.1, 0.05, 0.26]}><boxGeometry args={[0.05, 0.05, 0.05]} /><meshBasicMaterial color="black" /></mesh>
        <mesh position={[0.1, 0.05, 0.26]}><boxGeometry args={[0.05, 0.05, 0.05]} /><meshBasicMaterial color="black" /></mesh>
      </mesh>
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.6, 0.9, 0.3]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      <mesh ref={leftArmRef} position={[-0.45, 0.4, 0]} castShadow>
        <boxGeometry args={[0.2, 0.7, 0.2]} />
        <meshStandardMaterial color="#fcd34d" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.45, 0.4, 0]} castShadow>
        <boxGeometry args={[0.2, 0.7, 0.2]} />
        <meshStandardMaterial color="#fcd34d" />
      </mesh>
      <mesh ref={leftLegRef} position={[-0.15, -0.6, 0]} castShadow>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
      <mesh ref={rightLegRef} position={[0.15, -0.6, 0]} castShadow>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
    </group>
  );
}

export function AnimatedPlayerModel(props: AnimatedPlayerModelProps): React.ReactElement {
  return <PlayerModelProcedural {...props} />;
}
