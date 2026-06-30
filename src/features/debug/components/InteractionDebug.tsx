/**
 * @file src/features/debug/components/InteractionDebug.tsx
 * @description Interaction zone visualizer toggled with F4 key.
 */

import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { InteractionManager } from '@core/interaction/InteractionManager';
import type { InteractableConfig } from '@core/interaction/interactable.types';

export function InteractionDebug(): React.ReactElement | null {
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState<InteractableConfig[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  // Hook into F4 key to toggle debug visualizers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F4') {
        e.preventDefault();
        setVisible((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  useFrame(() => {
    if (!visible) return;
    setItems(InteractionManager.getInteractables());
    const focused = InteractionManager.getFocused();
    setFocusedId(focused ? focused.id : null);
  });

  if (!visible) return null;

  return (
    <group name="interaction-debug">
      {items.map((item) => {
        const isFocused = item.id === focusedId;
        const color = isFocused ? '#ff0090' : '#00e5f0';

        return (
          <group
            key={`debug-${item.id}`}
            position={[item.position.x, item.position.y, item.position.z]}
          >
            {/* Range boundary sphere */}
            <mesh>
              <sphereGeometry args={[item.radius, 16, 16]} />
              <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
            </mesh>
            {/* Center target node */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshBasicMaterial color={color} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
