/**
 * @file src/features/world/systems/CityGridLoader.tsx
 * @description Loads and positions districts in a cohesive physical grid, implementing basic occlusion culling.
 */

import React, { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Import District Scenes
import SpawnPlazaScene from '../zones/SpawnPlazaScene';
// Dynamic imports for other districts to prevent blocking
const AchievementMuseumScene = React.lazy(() => import('@features/districts/achievement-museum/AchievementMuseumScene'));
const ExperienceTowerScene = React.lazy(() => import('@features/districts/experience-tower/ExperienceTowerScene'));
const SkillsLabScene = React.lazy(() => import('@features/districts/skills-lab/SkillsLabScene'));
const ResumeCenterScene = React.lazy(() => import('@features/districts/resume-center/ResumeCenterScene'));
const ContactCenterScene = React.lazy(() => import('@features/districts/contact-center/ContactCenterScene'));
const ProjectsDistrictScene = React.lazy(() => import('@features/districts/projects-district/ProjectsDistrictScene'));

interface GridNode {
  id: string;
  position: [number, number, number];
  Component: React.LazyExoticComponent<any> | React.FC;
}

const CITY_GRID: GridNode[] = [
  { id: 'spawn', position: [0, 0, 0], Component: SpawnPlazaScene },
  { id: 'museum', position: [-80, 0, 0], Component: AchievementMuseumScene },
  { id: 'tower', position: [80, 0, 0], Component: ExperienceTowerScene },
  { id: 'skills', position: [0, 0, -80], Component: SkillsLabScene },
  { id: 'resume', position: [-80, 0, -80], Component: ResumeCenterScene },
  { id: 'contact', position: [80, 0, -80], Component: ContactCenterScene },
  { id: 'projects', position: [0, 0, 80], Component: ProjectsDistrictScene },
];

export function CityGridLoader() {
  const { camera } = useThree();
  const renderDistance = 150; // Units

  // Calculate which districts are close enough to render
  const visibleDistricts = useMemo(() => {
    return CITY_GRID.filter(node => {
      const dist = camera.position.distanceTo(new THREE.Vector3(...node.position));
      return dist < renderDistance;
    });
  }, [camera.position.x, camera.position.z]); // Re-eval when camera moves significantly

  return (
    <group name="CityGrid">
      {CITY_GRID.map((node) => {
        // Render fallback or null if occluded to save GPU
        const isVisible = visibleDistricts.find(d => d.id === node.id);
        if (!isVisible && node.id !== 'spawn') return null; // Always keep spawn for now

        const Comp = node.Component;
        return (
          <group key={node.id} position={node.position}>
            <React.Suspense fallback={null}>
              <Comp />
            </React.Suspense>
          </group>
        );
      })}
    </group>
  );
}
