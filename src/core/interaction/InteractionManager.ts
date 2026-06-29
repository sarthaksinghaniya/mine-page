/**
 * @file src/core/interaction/InteractionManager.ts
 * @description Coordinates spatial culling, priority sorting, and focus transitions.
 */

import { eventBus } from '@core/events/EventBus';
import type { InteractableConfig } from './interactable.types';

class InteractionManagerClass {
  private readonly interactables = new Map<string, InteractableConfig>();
  private focusedId: string | null = null;
  private cooldownActive = false;

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
    let bestTarget: InteractableConfig | null = null;
    let minDistance = Infinity;

    this.interactables.forEach((item) => {
      if (!item.enabled) return;

      const dx = item.position.x - playerX;
      const dy = item.position.y - playerY;
      const dz = item.position.z - playerZ;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance <= item.radius) {
        // Priority resolving: prioritize higher priority weight, or closer if priority is equal
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

    const target = this.interactables.get(this.focusedId);
    if (target && target.enabled) {
      target.onInteract?.();

      // Cooldown buffer of 0.5s to prevent double triggers
      this.cooldownActive = true;
      setTimeout(() => {
        this.cooldownActive = false;
      }, 500);
    }
  }
}

export const InteractionManager = new InteractionManagerClass();
