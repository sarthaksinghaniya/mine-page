/**
 * @file src/core/apps/AppManager.ts
 * @description Coordinates application registrations, focus states, and overlays.
 */

import { eventBus } from '@core/events/EventBus';
import type { PortfolioApp, AppManagerState } from './app.types';

class AppManagerClass {
  private readonly apps = new Map<string, PortfolioApp>();
  private readonly state: AppManagerState = {
    activeAppId: null,
    isOpen:      false,
  };

  private onStateChange: ((state: AppManagerState) => void) | null = null;

  register(app: PortfolioApp): void {
    this.apps.set(app.id, app);
  }

  unregister(id: string): void {
    if (this.state.activeAppId === id) {
      this.close();
    }
    this.apps.delete(id);
  }

  getApps(): PortfolioApp[] {
    return Array.from(this.apps.values());
  }

  getApp(id: string): PortfolioApp | null {
    return this.apps.get(id) ?? null;
  }

  open(appId: string): void {
    if (!this.apps.has(appId)) return;

    this.state.activeAppId = appId;
    this.state.isOpen = true;
    this.notify();

    eventBus.emit('ui:menuOpened', { menuId: `app-${appId}` });
  }

  close(): void {
    if (!this.state.isOpen) return;

    const prev = this.state.activeAppId;
    this.state.activeAppId = null;
    this.state.isOpen = false;
    this.notify();

    if (prev) {
      const app = this.apps.get(prev);
      app?.dispose?.();
    }

    eventBus.emit('ui:menuClosed', { menuId: 'app-overlay' });
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
