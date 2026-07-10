/**
 * @file src/app/App.tsx
 * @description Root application component.
 *
 * Integrated with the newly built rendering engine, scene manager,
 * loading screen, and developer overlays.
 */

import { Canvas } from '@react-three/fiber';
import { useEffect, Suspense } from 'react';
import { AppProviders } from './AppProviders';
import { RendererConfig } from '@core/renderer';
import { CameraController } from '@features/camera';
import { LightingSystem } from '@features/lighting';
import { SceneManager, SceneTransition, useSceneStore } from '@features/scene';
import {
  DebugOverlay,
  InteractionDebug,
  CinematicDebug,
  VehicleDebug,
} from '@features/debug';
import { LoadingScreen } from '@/ui/loading';
import { performanceProfile } from '@config/performance';
import { InteractionPrompt } from '@/ui/hud/InteractionPrompt';
import { CinematicOverlay } from '@/ui/hud/CinematicOverlay';
import { TerminalWindow } from '@/ui/hud/TerminalWindow';
import { HUDOverlay } from '@/ui/hud/HUDOverlay';
import { WorldMap } from '@/ui/hud/WorldMap';

import { ApplicationShell } from '@/ui/apps/ApplicationShell';
import { PortfolioModal } from '@features/portfolio/components/PortfolioModal';
import { ErrorBoundary } from '@/ui/system';
import { SkeletonLoader } from '@/ui/components/SharedComponents';

import { QuestManager } from '@/features/gameplay/systems/QuestManager';
import { DayNightCycle, WeatherSystem } from '@features/environment';

// ── Inside-Canvas Controller ──────────────────────────────────────────────────

function CanvasEngineController(): React.ReactElement {
  return (
    <>
      <RendererConfig />
      <CameraController />
      <LightingSystem />
      <SceneManager />
      <DayNightCycle />
      <WeatherSystem />
      <QuestManager />
      <InteractionDebug />
      <CinematicDebug />
      <VehicleDebug />
    </>
  );
}

import { registerAllApps } from '@features/apps';

// ── Root App Component ────────────────────────────────────────────────────────

export function App(): React.ReactElement {
  const loadScene = useSceneStore((s) => s.loadScene);

  // Trigger loading initial world scene
  useEffect(() => {
    registerAllApps();
    loadScene('world');
  }, [loadScene]);

  return (
    <ErrorBoundary>
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
      <HUDOverlay />
      <WorldMap />
      <CinematicOverlay />
      <TerminalWindow />
      <PortfolioModal />
      <Suspense fallback={<SkeletonLoader height="100vh" />}>
        <ApplicationShell />
      </Suspense>
    </AppProviders>
    </ErrorBoundary>
  );
}
