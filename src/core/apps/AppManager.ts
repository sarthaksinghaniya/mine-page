/**
 * @file src/core/apps/AppManager.ts
 * @description Coordinates application registrations, focus states, overlays, and lifecycle.
 */

import { appEvents } from './app.events';
import type { PortfolioApp, AppManagerState } from './app.types';
import { CinematicDirector } from '@core/cinematic/CinematicDirector';
import { DISTRICTS_LIST } from '@/features/buildings/district.types';
import { ApplicationAudioManager } from '@features/audio/ApplicationAudioManager';
import { useCameraStore } from '@features/camera/camera.store';

class AppManagerClass {
  private readonly apps = new Map<string, PortfolioApp>();
  private readonly state: AppManagerState = {
    activeAppId: null,
    isOpen: false,
    isLoading: false,
  };

  private previousCameraState: any = null;

  private onStateChange: ((state: AppManagerState) => void) | null = null;
  private escapeHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.state.isOpen) {
      this.close();
    }
  };

  constructor() {
    window.addEventListener('keydown', this.escapeHandler);
  }

  register(app: PortfolioApp): void {
    this.apps.set(app.id, app);
  }

  unregister(id: string): void {
    if (this.state.activeAppId === id) {
      this.close();
    }
    const app = this.apps.get(id);
    if (app) {
      app.dispose();
      this.apps.delete(id);
    }
  }

  getApps(): PortfolioApp[] {
    return Array.from(this.apps.values());
  }

  getApp(id: string): PortfolioApp | null {
    return this.apps.get(id) ?? null;
  }

  async open(appId: string): Promise<void> {
    const app = this.apps.get(appId);
    if (!app) {
      console.error(`App ${appId} not found`);
      return;
    }

    if (this.state.isOpen && this.state.activeAppId !== appId) {
      await this.close();
    }
    if (this.state.isOpen) return; // ignore duplicate opens

    this.state.activeAppId = appId;
    this.state.isOpen = true;
    this.state.isLoading = true;
    this.notify();
    appEvents.emitLoading(appId);
    
    ApplicationAudioManager.playSfx('ui_open');

    // Save camera state
    const camStore = useCameraStore.getState();
    this.previousCameraState = {
      mode: camStore.mode,
      fov: camStore.fov,
      zoom: camStore.zoom,
    };

    let targetLot = null;
    for (const district of DISTRICTS_LIST) {
      for (const lot of district.lots) {
        if (lot.appId === appId) {
          targetLot = lot;
        }
      }
    }

    if (targetLot) {
      const entryPos = targetLot.position;
      CinematicDirector.play({
        id: `open-${appId}`,
        name: `Open App ${appId}`,
        priority: 100,
        duration: 3.0,
        keyframes: [
          { time: 0, type: 'player', player: { frozen: true } },
          { time: 0, type: 'screen', screen: { fadeOpacity: 0, letterbox: true } },
          // Start camera outside
          { time: 0, type: 'camera', camera: { position: { x: entryPos.x, y: entryPos.y + 2, z: entryPos.z + 25 }, lookAt: entryPos } },
          // Push camera inside the building slowly
          { time: 2.5, type: 'camera', camera: { position: { x: entryPos.x, y: entryPos.y + 1, z: entryPos.z + 5 }, lookAt: { x: entryPos.x, y: entryPos.y + 1, z: entryPos.z - 10 } } },
          // Fade UI in naturally
          { time: 3.0, type: 'screen', screen: { fadeOpacity: 0.6, letterbox: false } }
        ]
      });
      
      // Delay UI load until camera is inside
      await new Promise(resolve => setTimeout(resolve, 2500));
    }

    try {
      if (app.beforeOpen) await app.beforeOpen();
      await app.load();
      
      if (app.onOpen) await app.onOpen();
      if (app.onFocus) await app.onFocus();
      
      appEvents.emitLoaded(appId);
      appEvents.emitOpened(appId);
    } catch (err) {
      console.error(`Failed to load app ${appId}`, err);
    } finally {
      this.state.isLoading = false;
      this.notify();
    }
  }

  async close(): Promise<void> {
    if (!this.state.isOpen || !this.state.activeAppId) return;

    const appId = this.state.activeAppId;
    const app = this.apps.get(appId);

    if (app) {
      if (app.onBlur) await app.onBlur();
      if (app.beforeClose) await app.beforeClose();
      if (app.onClose) await app.onClose();
      appEvents.emitClosed(appId);
    }

    if (this.previousCameraState) {
      useCameraStore.getState().setMode(this.previousCameraState.mode);
      useCameraStore.getState().setFov(this.previousCameraState.fov);
    }

    CinematicDirector.play({
      id: `close-${appId}`,
      name: `Close App ${appId}`,
      priority: 100,
      duration: 1.0,
      keyframes: [
        { time: 0, type: 'player', player: { frozen: false } }
      ]
    });

    this.state.activeAppId = null;
    this.state.isOpen = false;
    this.state.isLoading = false;
    this.notify();
  }
  
  dispose(): void {
    window.removeEventListener('keydown', this.escapeHandler);
    for (const app of this.apps.values()) {
      app.dispose();
    }
    this.apps.clear();
  }

  subscribe(listener: (state: AppManagerState) => void): () => void {
    this.onStateChange = listener;
    listener({ ...this.state });
    return () => {
      this.onStateChange = null;
    };
  }

  private notify(): void {
    this.onStateChange?.({ ...this.state });
  }

  isOpen(): boolean {
    return this.state.isOpen;
  }

  getActiveAppId(): string | null {
    return this.state.activeAppId;
  }
}

export const AppManager = new AppManagerClass();
export default AppManager;
