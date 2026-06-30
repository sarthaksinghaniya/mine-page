/**
 * @file src/core/events/EventBus.ts
 * @description Typed publish-subscribe event bus for cross-feature communication.
 *
 * Features communicate with each other ONLY through this bus — never by
 * importing each other's stores or functions directly. This enforces
 * feature isolation and makes the system multiplayer-ready (future: events
 * will be mirrored over websockets).
 *
 * USAGE:
 *   // Subscribe
 *   const unsub = eventBus.on('player:zoneChanged', (payload) => { ... });
 *   // Publish
 *   eventBus.emit('player:zoneChanged', { from: 'hub', to: 'projects' });
 *   // Unsubscribe
 *   unsub();
 */

// ── Event Map ─────────────────────────────────────────────────────────────────
// Add new event types here as features are built. All events are typed.

export interface GameEventMap {
  // Player
  'player:zoneChanged': { from: string; to: string };
  'player:interacted': { targetId: string; type: string };
  'player:positionUpdated': { x: number; y: number; z: number };

  // World
  'world:zoneLoaded': { zoneId: string };
  'world:zoneUnloaded': { zoneId: string };
  'world:dayNightChanged': { phase: 'day' | 'dusk' | 'night' | 'dawn'; normalizedTime: number };

  // Audio
  'audio:ambientChanged': { trackId: string; volume: number };
  'audio:sfxTriggered': { soundId: string; position?: { x: number; y: number; z: number } };

  // Portfolio
  'portfolio:projectOpened': { projectId: string };
  'portfolio:projectClosed': void;
  'portfolio:dataRefreshed': { timestamp: number };

  // AI Assistant
  'assistant:messageReceived': { message: string; sender: 'user' | 'assistant' };
  'assistant:sessionStarted': void;
  'assistant:sessionEnded': void;

  // UI
  'ui:menuOpened': { menuId: string };
  'ui:menuClosed': { menuId: string };
  'ui:hudVisibility': { visible: boolean };

  // Apps
  'app:opened': { appId: string };
  'app:closed': { appId: string };
  'app:loading': { appId: string };
  'app:loaded': { appId: string };
}

export type GameEventName = keyof GameEventMap;
export type GameEventPayload<T extends GameEventName> = GameEventMap[T];

// ── Listener Type ─────────────────────────────────────────────────────────────

type Listener<T extends GameEventName> = (payload: GameEventPayload<T>) => void;
type UnsubscribeFn = () => void;

// ── EventBus Implementation ───────────────────────────────────────────────────

class TypedEventBus {
  private readonly listeners = new Map<string, Set<Listener<GameEventName>>>();

  /**
   * Subscribes to an event.
   * @returns An unsubscribe function. Always call it in cleanup to prevent leaks.
   */
  on<T extends GameEventName>(event: T, listener: Listener<T>): UnsubscribeFn {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    const set = this.listeners.get(event)!;
    set.add(listener as Listener<GameEventName>);

    return () => {
      set.delete(listener as Listener<GameEventName>);
    };
  }

  /**
   * Subscribes to an event and automatically unsubscribes after one invocation.
   */
  once<T extends GameEventName>(event: T, listener: Listener<T>): UnsubscribeFn {
    const unsub = this.on(event, (payload) => {
      listener(payload);
      unsub();
    });
    return unsub;
  }

  /**
   * Publishes an event to all subscribers.
   */
  emit<T extends GameEventName>(event: T, payload: GameEventPayload<T>): void {
    const set = this.listeners.get(event);
    if (!set) return;
    for (const listener of set) {
      listener(payload as GameEventPayload<GameEventName>);
    }
  }

  /**
   * Removes all listeners for a specific event (useful for cleanup in tests).
   */
  off(event: GameEventName): void {
    this.listeners.delete(event);
  }

  /**
   * Removes all listeners from all events (useful for full teardown in tests).
   */
  clear(): void {
    this.listeners.clear();
  }
}

/** The singleton event bus. Import this everywhere you need cross-feature communication. */
export const eventBus = new TypedEventBus();
