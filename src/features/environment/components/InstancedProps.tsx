/**
 * @file src/features/environment/components/InstancedProps.tsx
 * @description Highly optimized foliage and street props using instancedMesh.
 */

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ZONES_LIST } from '@/features/world/zone.types';

// Total instances per zone segment
const TREE_COUNT_PER_ZONE = 12;
const LAMP_COUNT_PER_ZONE = 6;

export function InstancedProps(): React.ReactElement {
  const treeRef = useRef<THREE.InstancedMesh>(null);
  const lampRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const tempMatrix = new THREE.Matrix4();
    const tempPosition = new THREE.Vector3();
    const tempRotation = new THREE.Euler();
    const tempScale = new THREE.Vector3();

    const treeMesh = treeRef.current;
    const lampMesh = lampRef.current;

    let treeIdx = 0;
    let lampIdx = 0;

    ZONES_LIST.forEach((zone) => {
      // ── 1. Populate Foliage (Trees) ──────────────────────────────────────────
      for (let i = 0; i < TREE_COUNT_PER_ZONE; i++) {
        // Distribute trees around the zone center bounds
        const angle = (i / TREE_COUNT_PER_ZONE) * Math.PI * 2;
        const radius = 60 + Math.sin(i) * 20;

        const x = zone.center.x + Math.cos(angle) * radius;
        const z = zone.center.z + Math.sin(angle) * radius;

        tempPosition.set(x, 2, z);
        tempRotation.set(0, Math.random() * Math.PI, 0);
        tempScale.set(1.5, 3 + Math.random() * 2, 1.5);

        tempMatrix.compose(
          tempPosition,
          new THREE.Quaternion().setFromEuler(tempRotation),
          tempScale,
        );
        if (treeMesh) {
          treeMesh.setMatrixAt(treeIdx++, tempMatrix);
        }
      }

      // ── 2. Populate Street Lights (Props) ─────────────────────────────────────
      for (let j = 0; j < LAMP_COUNT_PER_ZONE; j++) {
        // Place lights adjacent to the main coordinates
        const angle = (j / LAMP_COUNT_PER_ZONE) * Math.PI * 2;
        const radius = 20;

        const x = zone.center.x + Math.cos(angle) * radius;
        const z = zone.center.z + Math.sin(angle) * radius;

        tempPosition.set(x, 2.5, z);
        tempRotation.set(0, 0, 0);
        tempScale.set(0.4, 5, 0.4);

        tempMatrix.compose(
          tempPosition,
          new THREE.Quaternion().setFromEuler(tempRotation),
          tempScale,
        );
        if (lampMesh) {
          lampMesh.setMatrixAt(lampIdx++, tempMatrix);
        }
      }
    });

    if (treeMesh) {
      treeMesh.instanceMatrix.needsUpdate = true;
    }
    if (lampMesh) {
      lampMesh.instanceMatrix.needsUpdate = true;
    }
  }, []);

  const totalZones = ZONES_LIST.length;
  const totalTrees = totalZones * TREE_COUNT_PER_ZONE;
  const totalLamps = totalZones * LAMP_COUNT_PER_ZONE;

  return (
    <group name="instanced-props">
      {/* Instanced trees: green cylinder placeholders */}
      <instancedMesh ref={treeRef} args={[null as never, null as never, totalTrees]} castShadow>
        <cylinderGeometry args={[0.2, 0.8, 4, 8]} />
        <meshStandardMaterial color="#0b4d2c" roughness={0.9} />
      </instancedMesh>

      {/* Instanced lamps: white pole placeholders */}
      <instancedMesh ref={lampRef} args={[null as never, null as never, totalLamps]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 5, 6]} />
        <meshStandardMaterial color="#4a4d5a" roughness={0.5} metalness={0.8} />
      </instancedMesh>
    </group>
  );
}
