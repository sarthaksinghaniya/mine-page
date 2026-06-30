/**
 * @file src/features/debug/components/DebugOverlay.tsx
 * @description Developer overlay element that shows real-time graphics benchmarks.
 */

import React, { useEffect } from 'react';
import { useDebugStore } from '../debug.store';
import { MetricRow } from './MetricRow';

export function DebugOverlay(): React.ReactElement | null {
  const visible = useDebugStore((s) => s.visible);
  const toggleVisibility = useDebugStore((s) => s.toggleVisibility);
  const metrics = useDebugStore((s) => s.metrics);

  // Hook into F3 key event to toggle panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F3') {
        e.preventDefault();
        toggleVisibility();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, [toggleVisibility]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        left: '16px',
        width: '240px',
        backgroundColor: 'rgba(10, 10, 18, 0.85)',
        border: '1px solid rgba(0, 173, 192, 0.4)',
        padding: '12px',
        color: '#f0f0ff',
        fontFamily: 'monospace',
        zIndex: 50, // Z_TOAST / Z_MAX
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontSize: '12px',
          borderBottom: '1px solid rgba(0, 173, 192, 0.2)',
          paddingBottom: '6px',
          marginBottom: '8px',
          color: '#ff0090',
          fontWeight: 'bold',
        }}
      >
        ENGINE STATISTICS (F3)
      </div>
      <MetricRow label="FPS" value={metrics.fps} />
      <MetricRow label="JS Heap Size" value={`${metrics.memory} MB`} />
      <MetricRow label="Draw Calls" value={metrics.drawCalls} />
      <MetricRow label="Triangles" value={metrics.triangles} />
      <MetricRow label="Points" value={metrics.points} />
      <MetricRow label="Lines" value={metrics.lines} />
      <MetricRow label="Geometries" value={metrics.geometries} />
      <MetricRow label="Textures" value={metrics.textures} />
    </div>
  );
}
