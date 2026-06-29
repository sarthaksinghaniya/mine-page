/**
 * @file src/app/App.tsx
 * @description Root application component.
 *
 * Renders the provider tree and the R3F Canvas.
 * This file should remain minimal — it only wires together the top-level
 * structure. All game logic lives in features/, all 3D rendering in
 * the Canvas children.
 *
 * The Canvas renders:
 *  - GameLoop: frame-by-frame system orchestrator
 *  - (Future) WorldRoot: the open-world scene
 *
 * The HUD (2D overlay) is rendered as a sibling to the Canvas — NOT inside it.
 * This ensures HUD components use normal CSS/React, not Three.js coordinates.
 */

import { Canvas } from '@react-three/fiber';
import { AppProviders } from './AppProviders';
import { GameLoop } from '@core/engine/GameLoop';
import { performanceProfile } from '@config/performance';

export function App(): React.ReactElement {
  return (
    <AppProviders>
      {/* ── 3D Canvas ── */}
      <Canvas
        id="world-canvas"
        style={{ position: 'fixed', inset: 0, zIndex: 0 }}
        camera={{
          fov:  75,
          near: 0.1,
          far:  2000,
          position: [0, 5, 10],
        }}
        gl={{
          antialias:      true,
          powerPreference:'high-performance',
          stencil:        false,
          depth:          true,
        }}
        shadows
        dpr={[1, performanceProfile.pixelRatio]}
      >
        {/* Engine systems — no visual output */}
        <GameLoop />

        {/* Placeholder scene — visible confirmation the canvas is working */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#0a0a14" />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#00adc0" emissive="#00adc0" emissiveIntensity={0.3} />
        </mesh>

        {/* ── Future children ──────────────────────────────────────────────── */}
        {/* <Suspense fallback={<LoadingScene />}>
              <WorldRoot />
            </Suspense> */}
      </Canvas>

      {/* ── 2D HUD Overlay (sibling to canvas, renders above it via z-index) ── */}
      {/* <HUD /> */}
    </AppProviders>
  );
}
