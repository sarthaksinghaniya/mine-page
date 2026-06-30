/**
 * @file src/features/districts/ai-lab/components/AiRobotNpc.tsx
 * @description AI Guide Robot NPC with dialogue bubbles, interactions, and head tracking.
 */

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePlayerStore } from '@features/player/player.store';
import { useNpcStore } from '@features/npc/npc.store';
import { DialogueManager } from '@features/npc/DialogueManager';
import { InteractionManager } from '@core/interaction/InteractionManager';

export function AiRobotNpc(): React.ReactElement {
  const npcId = 'ai-guide-nexus';
  const robotRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const playerPos = usePlayerStore((s) => s.position);
  
  const activeNpcId = useNpcStore(s => s.activeNpcId);
  const dialogue = useNpcStore(s => s.activeDialogue);
  const isTyping = useNpcStore(s => s.isTyping);
  
  const isActive = activeNpcId === npcId;

  // Position of NPC in the AI campus
  const npcWorldPos = new THREE.Vector3(380, 1.5, 10);

  useEffect(() => {
    InteractionManager.register({
      id: npcId,
      position: { x: npcWorldPos.x, y: npcWorldPos.y, z: npcWorldPos.z },
      radius: 8,
      enabled: true,
      priority: 20,
      type: 'npc',
      onInteract: () => {
        if (!isActive) {
          DialogueManager.startConversation(npcId);
        }
      }
    });

    return () => {
      InteractionManager.unregister(npcId);
    };
  }, [isActive, npcWorldPos]);

  useFrame(() => {
    const robot = robotRef.current;
    if (!robot) return;

    // Calculate heading vector from robot to player
    const dx = playerPos.x - npcWorldPos.x;
    const dz = playerPos.z - npcWorldPos.z;
    const angle = Math.atan2(dx, dz);

    // Smooth turn robot body towards player
    const targetQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, angle, 0));
    robot.quaternion.slerp(targetQuat, 0.1);

    // Oscillate head slightly to simulate hovering floating
    const time = performance.now() * 0.003;
    robot.position.y = npcWorldPos.y + Math.sin(time) * 0.15;
  });

  return (
    <group ref={robotRef} position={[npcWorldPos.x, npcWorldPos.y, npcWorldPos.z]}>
      {/* Speech Bubble */}
      {isActive && (
        <Html position={[0, 2.5, 0]} center transform sprite zIndexRange={[100, 0]}>
          <div style={{
            backgroundColor: 'rgba(10, 10, 20, 0.9)',
            border: '1px solid #00e5f0',
            borderRadius: '12px',
            padding: '16px',
            color: '#fff',
            width: '300px',
            boxShadow: '0 0 20px rgba(0, 229, 240, 0.2)',
            fontFamily: 'sans-serif',
            pointerEvents: 'auto',
          }}>
            {isTyping ? (
              <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                <span className="typing-dot">.</span>
                <span className="typing-dot">.</span>
                <span className="typing-dot">.</span>
              </div>
            ) : (
              <>
                <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.4' }}>{dialogue?.text}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {dialogue?.options.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => DialogueManager.handleOptionSelect(opt)}
                      style={{
                        padding: '8px',
                        backgroundColor: 'rgba(0, 229, 240, 0.1)',
                        border: '1px solid rgba(0, 229, 240, 0.3)',
                        borderRadius: '4px',
                        color: '#00e5f0',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(0, 229, 240, 0.2)'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(0, 229, 240, 0.1)'}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </>
            )}
            <style>
              {`
                @keyframes bounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-5px); }
                }
                .typing-dot {
                  animation: bounce 1s infinite;
                  display: inline-block;
                }
                .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                .typing-dot:nth-child(3) { animation-delay: 0.4s; }
              `}
            </style>
          </div>
        </Html>
      )}

      {/* Robot Base chassis */}
      <mesh castShadow>
        <cylinderGeometry args={[0.4, 0.6, 1.0, 8]} />
        <meshStandardMaterial color="#2a2d3a" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Floating Head sphere */}
      <mesh ref={headRef} position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#4a4d5a" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Visor details */}
      <mesh position={[0, 0.85, 0.28]}>
        <boxGeometry args={[0.4, 0.1, 0.1]} />
        <meshBasicMaterial color={isActive ? "#ff0055" : "#00e5f0"} />
      </mesh>

      {/* Base hovering ring glow */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 0.5, 16]} />
        <meshBasicMaterial color="#00e5f0" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
export default AiRobotNpc;
