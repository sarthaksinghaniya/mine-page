/**
 * @file src/core/events/EventBus.test.ts
 * @description Unit tests for the typed event bus.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { eventBus } from './EventBus';

beforeEach(() => {
  // Clean slate between tests
  eventBus.clear();
});

describe('EventBus', () => {
  it('calls listener when event is emitted', () => {
    const handler = vi.fn();
    eventBus.on('ui:hudVisibility', handler);
    eventBus.emit('ui:hudVisibility', { visible: true });
    expect(handler).toHaveBeenCalledWith({ visible: true });
  });

  it('does not call listener after unsubscribe', () => {
    const handler = vi.fn();
    const unsub = eventBus.on('ui:hudVisibility', handler);
    unsub();
    eventBus.emit('ui:hudVisibility', { visible: false });
    expect(handler).not.toHaveBeenCalled();
  });

  it('once() fires exactly once', () => {
    const handler = vi.fn();
    eventBus.once('ui:menuOpened', handler);
    eventBus.emit('ui:menuOpened', { menuId: 'test' });
    eventBus.emit('ui:menuOpened', { menuId: 'test' });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('supports multiple listeners on the same event', () => {
    const h1 = vi.fn();
    const h2 = vi.fn();
    eventBus.on('ui:hudVisibility', h1);
    eventBus.on('ui:hudVisibility', h2);
    eventBus.emit('ui:hudVisibility', { visible: true });
    expect(h1).toHaveBeenCalledTimes(1);
    expect(h2).toHaveBeenCalledTimes(1);
  });
});
