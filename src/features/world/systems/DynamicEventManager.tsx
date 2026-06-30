/**
 * @file src/features/world/systems/DynamicEventManager.tsx
 * @description Manages ambient world events like weather changes, passing drones, or holographic glitches.
 */

import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DynamicEventManager() {
  const [activeEvent, setActiveEvent] = useState<'none' | 'drone' | 'glitch'>('none');

  useEffect(() => {
    // Randomly trigger ambient events every 15-30 seconds
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.8) setActiveEvent('drone');
      else if (rand > 0.6) setActiveEvent('glitch');
      else setActiveEvent('none');

      // Clear event after 5 seconds
      setTimeout(() => setActiveEvent('none'), 5000);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <group name="DynamicEvents">
      {activeEvent === 'drone' && <PassingDrone />}
      {activeEvent === 'glitch' && <HoloGlitch />}
    </group>
  );
}

function PassingDrone() {
  const ref = React.useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      // Fly overhead
      ref.current.position.z += 10 * delta;
      ref.current.position.x += 5 * delta;
    }
  });

  return (
    <group ref={ref} position={[-50, 20, -50]}>
      <mesh>
        <boxGeometry args={[1, 0.5, 1]} />
        <meshStandardMaterial color="#333" metalness={0.9} />
      </mesh>
      <pointLight color="#ff0000" intensity={2} distance={10} position={[0, -0.5, 0]} />
    </group>
  );
}

function HoloGlitch() {
  // Simulates a massive ambient light flicker in the sky
  const [intensity, setIntensity] = useState(0);
  
  useFrame(() => {
    setIntensity(Math.random() > 0.5 ? 2 : 0.2);
  });

  return <ambientLight color="#00e5f0" intensity={intensity} />;
}
