/**
 * @file src/core/apps/app.events.ts
 * @description Helpers for application events.
 */

import { eventBus } from '../events/EventBus';

export const appEvents = {
  emitOpened: (appId: string) => eventBus.emit('app:opened', { appId }),
  emitClosed: (appId: string) => eventBus.emit('app:closed', { appId }),
  emitLoading: (appId: string) => eventBus.emit('app:loading', { appId }),
  emitLoaded: (appId: string) => eventBus.emit('app:loaded', { appId }),
};
