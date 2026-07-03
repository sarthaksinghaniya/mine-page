/**
 * @file src/features/world/systems/ZoneCuller.ts
 * @description Monitors player coordinate distances to stream zones in and out.
 */

import { useWorldStore } from '../world.store';
import { ZONES_LIST } from '../zone.types';
import { eventBus } from '@core/events/EventBus';

export const ZoneCuller = {
  /**
   * Updates streamed/active zones based on player position.
   * Emits events to eventBus to notify systems of load updates.
   */
  update(playerX: number, playerZ: number): void {
    const store = useWorldStore.getState();
    const activeZoneIds = new Set(store.activeZoneIds);
    let focusedZoneId = store.focusedZoneId;

    ZONES_LIST.forEach((zone) => {
      // Calculate flat XZ distance
      const dx = zone.center.x - playerX;
      const dz = zone.center.z - playerZ;
      const distance = Math.sqrt(dx * dx + dz * dz);

      if (distance <= zone.radius) {
        // Stream in zone
        if (!activeZoneIds.has(zone.id)) {
          store.activateZone(zone.id);
          store.setZoneStatus(zone.id, 'active');
          eventBus.emit('world:zoneLoaded', { zoneId: zone.id });
        }

        // Check if this is the player's current closest (focused) zone
        if (!focusedZoneId || distance < this.getDistanceToZone(focusedZoneId, playerX, playerZ)) {
          if (focusedZoneId !== zone.id) {
            const previous = focusedZoneId;
            focusedZoneId = zone.id;
            store.setFocusedZone(zone.id);
            eventBus.emit('player:zoneChanged', { from: previous ?? 'none', to: zone.id });
          }
        }
      } else {
        // Stream out zone
        if (activeZoneIds.has(zone.id)) {
          store.deactivateZone(zone.id);
          store.setZoneStatus(zone.id, 'unloaded');
          eventBus.emit('world:zoneUnloaded', { zoneId: zone.id });

          if (focusedZoneId === zone.id) {
            focusedZoneId = null;
            store.setFocusedZone(null);
          }
        }
      }
    });
  },

  getDistanceToZone(zoneId: string, playerX: number, playerZ: number): number {
    const zone = ZONES_LIST.find((z) => z.id === zoneId);
    if (!zone) return Infinity;
    const dx = zone.center.x - playerX;
    const dz = zone.center.z - playerZ;
    return Math.sqrt(dx * dx + dz * dz);
  },
};
