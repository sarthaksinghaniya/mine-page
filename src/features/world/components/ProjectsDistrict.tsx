/**
 * @file src/features/world/components/ProjectsDistrict.tsx
 * @description The Projects District (AAA Vertical Slice). Uses real GLTF assets from the asset pipeline.
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, useGLTF } from '@react-three/drei';
import { useCharacterAsset } from '@/core/assets/AssetLoader';
import { CanvasErrorBoundary } from '@/ui/system/CanvasErrorBoundary';

// Assuming the user downloads Kenney / Quaternius assets to these paths:
const ASSETS = {
  revibeLab: '/assets/buildings/revibe_lab.glb',
  hanuAi: '/assets/buildings/hanu_ai.glb',
  studio: '/assets/buildings/portfolio_studio.glb',
  hackathon: '/assets/buildings/hackathon_arena.glb',
  webHub: '/assets/buildings/web_dev_hub.glb',
  tree: '/assets/vegetation/tree_large.glb',
  bench: '/assets/props/bench.glb',
  lamp: '/assets/props/street_lamp.glb',
};

function SafeModelInner({ path, position, rotation, scale = 1 }: { path: string, position: [number, number, number], rotation?: [number, number, number], scale?: number }) {
  const { scene } = useGLTF(path);
  const clone = React.useMemo(() => scene.clone(), [scene]);
  return <primitive object={clone} position={position} rotation={rotation} scale={scale} castShadow receiveShadow />;
}

function SafeModelFallback({ path, position, rotation, scale = 1, fallbackContent }: { path: string, position: [number, number, number], rotation?: [number, number, number], scale?: number, fallbackContent?: React.ReactNode }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {fallbackContent || (
        <mesh castShadow receiveShadow position={[0, 5, 0]}>
          <boxGeometry args={[10, 10, 10]} />
          <meshStandardMaterial color="#cbd5e1" wireframe />
          <Html center position={[0, 6, 0]}>
            <div className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
              Missing Asset: {path.split('/').pop()}
            </div>
          </Html>
        </mesh>
      )}
    </group>
  );
}

// Safe loader wrapper that returns fallback if the file doesn't exist yet
function SafeModel(props: { path: string, position: [number, number, number], rotation?: [number, number, number], scale?: number, fallbackContent?: React.ReactNode }) {
  return (
    <CanvasErrorBoundary fallback={<SafeModelFallback {...props} />}>
      <SafeModelInner {...props} />
    </CanvasErrorBoundary>
  );
}

export function ProjectsDistrict(): React.ReactElement {
  return (
    <group position={[0, 0, -400]}>
      {/* --- 1. DISTRICT FOUNDATION --- */}
      {/* Main Boulevard */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#475569" roughness={0.9} /> {/* Asphalt/Concrete color */}
      </mesh>

      {/* --- 2. PROJECT BUILDINGS (Using GLTF Asset Pipeline) --- */}
      
      {/* Revibe Lab */}
      <group position={[-40, 0, 40]}>
        <SafeModel 
          path={ASSETS.revibeLab} 
          position={[0, 0, 0]} 
          fallbackContent={<mesh position={[0,5,0]}><boxGeometry args={[20,10,20]}/><meshStandardMaterial color="#22c55e"/></mesh>} 
        />
        <Html position={[0, 15, 0]} center transform distanceFactor={50}>
          <div className="bg-green-600/90 text-white px-4 py-2 rounded border-2 border-white text-lg font-bold">
            Revibe Lab
          </div>
        </Html>
      </group>

      {/* HANU AI Headquarters */}
      <group position={[40, 0, 40]}>
        <SafeModel 
          path={ASSETS.hanuAi} 
          position={[0, 0, 0]} 
          fallbackContent={<mesh position={[0,10,0]}><cylinderGeometry args={[10,10,20,32]}/><meshStandardMaterial color="#3b82f6"/></mesh>} 
        />
        <Html position={[0, 25, 0]} center transform distanceFactor={50}>
          <div className="bg-blue-600/90 text-white px-4 py-2 rounded border-2 border-white text-lg font-bold">
            HANU AI
          </div>
        </Html>
      </group>

      {/* Portfolio Studio */}
      <group position={[-40, 0, -40]}>
        <SafeModel 
          path={ASSETS.studio} 
          position={[0, 0, 0]} 
          fallbackContent={<mesh position={[0,6,0]}><boxGeometry args={[25,12,15]}/><meshStandardMaterial color="#f59e0b"/></mesh>} 
        />
        <Html position={[0, 15, 0]} center transform distanceFactor={50}>
          <div className="bg-yellow-600/90 text-white px-4 py-2 rounded border-2 border-white text-lg font-bold">
            Design Studio
          </div>
        </Html>
      </group>

      {/* Web Development Hub */}
      <group position={[40, 0, -40]}>
        <SafeModel 
          path={ASSETS.webHub} 
          position={[0, 0, 0]} 
          fallbackContent={<mesh position={[0,8,0]}><boxGeometry args={[15,16,15]}/><meshStandardMaterial color="#8b5cf6"/></mesh>} 
        />
        <Html position={[0, 20, 0]} center transform distanceFactor={50}>
          <div className="bg-purple-600/90 text-white px-4 py-2 rounded border-2 border-white text-lg font-bold">
            Web Dev Hub
          </div>
        </Html>
      </group>

      {/* Hackathon Arena */}
      <group position={[0, 0, -80]}>
        <SafeModel 
          path={ASSETS.hackathon} 
          position={[0, 0, 0]} 
          fallbackContent={<mesh position={[0,5,0]}><sphereGeometry args={[15,32,16, 0, Math.PI*2, 0, Math.PI/2]}/><meshStandardMaterial color="#ef4444"/></mesh>} 
        />
        <Html position={[0, 20, 0]} center transform distanceFactor={50}>
          <div className="bg-red-600/90 text-white px-4 py-2 rounded border-2 border-white text-lg font-bold">
            Hackathon Arena
          </div>
        </Html>
      </group>

      {/* --- 3. STREET PROPS & VEGETATION --- */}
      {[
        [-20, 20], [20, 20], [-20, -20], [20, -20], [0, -40]
      ].map(([x, z], i) => (
        <group key={`prop-${i}`} position={[x, 0, z]}>
          <SafeModel 
            path={ASSETS.tree} 
            position={[0, 0, 0]} 
            scale={2}
            fallbackContent={<mesh position={[0,2,0]}><cylinderGeometry args={[0.5,0.5,4]}/><meshStandardMaterial color="#451a03"/></mesh>} 
          />
          <SafeModel 
            path={ASSETS.bench} 
            position={[3, 0, 0]} 
            fallbackContent={<mesh position={[3,0.5,0]}><boxGeometry args={[2,1,1]}/><meshStandardMaterial color="#a16207"/></mesh>} 
          />
          <SafeModel 
            path={ASSETS.lamp} 
            position={[-3, 0, 0]} 
            fallbackContent={<mesh position={[-3,3,0]}><cylinderGeometry args={[0.2,0.2,6]}/><meshStandardMaterial color="#1e293b"/></mesh>} 
          />
        </group>
      ))}

      {/* --- 4. DATA INTEGRATION (Interactive Displays) --- */}
      <group position={[0, 0, 0]}>
        {/* Central Information Kiosk */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 3, 2]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 3, 1.01]}>
          <planeGeometry args={[1.8, 1]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <Html position={[0, 3, 1.02]} center transform scale={0.5}>
          <div className="bg-black/90 p-4 border border-blue-500/50 rounded w-[350px]">
            <h3 className="text-xl text-blue-400 font-bold mb-2">Projects District Directory</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Revibe Lab: Environmental AI</li>
              <li>• HANU AI: Voice Assistants</li>
              <li>• Design Studio: Portfolio & UI/UX</li>
              <li>• Web Dev Hub: Open Source & Repos</li>
              <li>• Hackathon Arena: Competitions</li>
            </ul>
            <p className="mt-3 text-xs text-green-400 blink">System Status: Online</p>
          </div>
        </Html>
      </group>
    </group>
  );
}
