/**
 * @file src/app/App.tsx
 * @description Root application component.
 *
 * Integrated with the newly built rendering engine, scene manager,
 * loading screen, and developer overlays.
 */

import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { AppProviders } from './AppProviders';
import { RendererConfig } from '@core/renderer';
import { CameraController } from '@features/camera';
import { LightingSystem } from '@features/lighting';
import { SceneManager, SceneTransition, useSceneStore } from '@features/scene';
import {
  DebugOverlay,
  useDebugMetrics,
  InteractionDebug,
  CinematicDebug,
  VehicleDebug,
} from '@features/debug';
import { LoadingScreen } from '@/ui/loading';
import { performanceProfile } from '@config/performance';
import { InteractionPrompt } from '@/ui/hud/InteractionPrompt';
import { CinematicOverlay } from '@/ui/hud/CinematicOverlay';
import { TerminalWindow } from '@/ui/hud/TerminalWindow';
import { AppManager } from '@core/apps/AppManager';
import { ApplicationShell } from '@/ui/apps/ApplicationShell';
import { SkillsLabApp } from '@/features/apps/SkillsMatrix';
import { MuseumApp } from '@/features/apps/Museum';

import { DayNightCycle, WeatherSystem } from '@features/environment';

// ── Inside-Canvas Controller ──────────────────────────────────────────────────

function CanvasEngineController(): React.ReactElement {
  // Drives real-time benchmarks (FPS, heap, drawcalls)
  useDebugMetrics();

  return (
    <>
      <RendererConfig />
      <CameraController />
      <LightingSystem />
      <SceneManager />
      <DayNightCycle />
      <WeatherSystem />
      <InteractionDebug />
      <CinematicDebug />
      <VehicleDebug />
    </>
  );
}

// ── Root App Component ────────────────────────────────────────────────────────

export function App(): React.ReactElement {
  const loadScene = useSceneStore((s) => s.loadScene);

  // Trigger loading initial world scene and register apps on mount
  useEffect(() => {
    loadScene('world');

    // Register modular portfolio apps
    AppManager.register({
      id: 'skills-lab',
      title: 'Technical Skills Matrix',
      mount: () => <SkillsLabApp />,
    });

    AppManager.register({
      id: 'museum',
      title: 'Achievement Museum Displays',
      mount: () => <MuseumApp />,
    });
  }, [loadScene]);

  return (
    <AppProviders>
      {/* ── 3D Canvas ── */}
      <Canvas
        id="world-canvas"
        style={{ position: 'fixed', inset: 0, zIndex: 0 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        shadows={false}
        dpr={[1, performanceProfile.pixelRatio]}
      >
        <CanvasEngineController />
      </Canvas>

      {/* ── 2D overlays ── */}
      <LoadingScreen />
      <SceneTransition />
      <DebugOverlay />
      <InteractionPrompt />
      <CinematicOverlay />
      <TerminalWindow />
      <ApplicationShell />
    </AppProviders>
  );
}
