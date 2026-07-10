/**
 * @file src/core/interaction/InteractionManager.ts
 * @description Coordinates spatial culling, priority sorting, and focus transitions.
 */

import { eventBus } from '@core/events/EventBus';
import type { InteractableConfig } from './interactable.types';
import { DISTRICTS_LIST } from '@/features/buildings/district.types';
import { AppManager } from '@core/apps/AppManager';

class InteractionManagerClass {
  private readonly interactables = new Map<string, InteractableConfig>();
  private focusedId: string | null = null;
  private cooldownActive = false;

  constructor() {
    this.loadBuildings();
  }

  private loadBuildings() {
    for (const district of DISTRICTS_LIST) {
      for (const lot of district.lots) {
        if (lot.appId || lot.interior) {
          this.register({
            id: lot.id,
            name: lot.name,
            position: lot.position,
            radius: lot.interactRadius,
            enabled: true,
            priority: 10,
            type: 'building',
            onFocus: () => {},
            onBlur: () => {},
            onInteract: () => {
              if (lot.appId) {
                AppManager.open(lot.appId);
              }
            }
          });
        }
      }
    }
  }

  register(config: InteractableConfig): void {
    this.interactables.set(config.id, config);
  }

  unregister(id: string): void {
    if (this.focusedId === id) {
      this.clearFocus();
    }
    this.interactables.delete(id);
  }

  getInteractables(): InteractableConfig[] {
    return Array.from(this.interactables.values());
  }

  /**
   * Scans registered objects and resolves the closest active focus target.
   * Emits focus state events when transitions occur.
   */
  update(playerX: number, playerY: number, playerZ: number): void {
    // Ignore updates if app is open or loading
    if (AppManager.isOpen() || AppManager.getActiveAppId() !== null) {
      this.clearFocus();
      return;
    }

    let bestTarget: InteractableConfig | null = null;
    let minDistance = Infinity;

    this.interactables.forEach((item) => {
      if (!item.enabled) return;

      const dx = item.position.x - playerX;
      const dy = item.position.y - playerY;
      const dz = item.position.z - playerZ;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance <= item.radius) {
        if (
          !bestTarget ||
          item.priority > bestTarget.priority ||
          (item.priority === bestTarget.priority && distance < minDistance)
        ) {
          bestTarget = item;
          minDistance = distance;
        }
      }
    });

    if (bestTarget) {
      const target: InteractableConfig = bestTarget;
      if (this.focusedId !== target.id) {
        this.clearFocus();
        this.focusedId = target.id;
        target.onFocus?.();
        eventBus.emit('ui:menuOpened', { menuId: `prompt-${target.id}` }); // reuse for prompts
      }
    } else {
      this.clearFocus();
    }
  }

  private clearFocus(): void {
    if (this.focusedId) {
      const prev = this.interactables.get(this.focusedId);
      if (prev) {
        prev.onBlur?.();
        eventBus.emit('ui:menuClosed', { menuId: `prompt-${prev.id}` });
      }
      this.focusedId = null;
    }
  }

  getFocused(): InteractableConfig | null {
    if (!this.focusedId) return null;
    return this.interactables.get(this.focusedId) ?? null;
  }

  /**
   * Triggers the focus target's onInteract hook if cooldown is not active.
   */
  interact(): void {
    if (this.cooldownActive || !this.focusedId) return;
    
    // Ignore if app manager is busy
    if (AppManager.isOpen()) return;

    const target = this.interactables.get(this.focusedId);
    if (target?.enabled) {
      // Cooldown buffer of 1s to prevent double triggers
      this.cooldownActive = true;
      setTimeout(() => {
        this.cooldownActive = false;
      }, 1000);

      target.onInteract?.();
    }
  }
}

export const InteractionManager = new InteractionManagerClass();
