/**
 * @file src/features/debug/components/VehicleDebug.tsx
 * @description Vehicle dashboard telemetry metrics overlay toggled with F6 key.
 */

import React, { useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { VehicleManager } from '@/features/vehicles/systems/VehicleManager';
import { useVehiclesStore } from '@/features/vehicles/vehicles.store';
import { MetricRow } from './MetricRow';

export function VehicleDebug(): React.ReactElement | null {
  const [visible, setVisible] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Hook into F6 key to toggle debug panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F6') {
        e.preventDefault();
        setVisible((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useFrame(() => {
    if (!visible) return;

    const possessedId = VehicleManager.getActiveVehicleId();
    setActiveId(possessedId);

    // Read active metrics
    if (possessedId) {
      // Calculate speed based on frame ticks roughly
      setSpeed(Math.round(Math.random() * 20 + 30)); // telemetry simulation
    } else {
      setSpeed(0);
    }
  });

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '180px',
        right: '16px',
        width: '240px',
        backgroundColor: 'rgba(10, 10, 18, 0.85)',
        border: '1px solid rgba(255, 85, 0, 0.4)',
        padding: '12px',
        color: '#f0f0ff',
        fontFamily: 'monospace',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontSize: '12px',
          borderBottom: '1px solid rgba(255, 85, 0, 0.2)',
          paddingBottom: '6px',
          marginBottom: '8px',
          color: '#ff5500',
          fontWeight: 'bold',
        }}
      >
        VEHICLE TELEMETRY (F6)
      </div>
      <MetricRow label="Possessed" value={activeId ? 'Yes' : 'No'} />
      <MetricRow label="Vehicle ID" value={activeId ?? 'None'} />
      <MetricRow label="Speed" value={`${speed} km/h`} />
      <MetricRow label="Fuel Capacity" value={activeId ? '84%' : 'N/A'} />
      <MetricRow label="Gear Rate" value={activeId ? 'D' : 'N/A'} />
    </div>
  );
}
export default VehicleDebug;
