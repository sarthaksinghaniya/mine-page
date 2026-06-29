/**
 * @file src/features/debug/hooks/useDebugMetrics.ts
 * @description R3F hook that queries WebGLRenderer statistics and computes running FPS.
 */

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useDebugStore } from '../debug.store';

/**
 * Hook to collect WebGL render metrics and tick them on the animation frame.
 */
export function useDebugMetrics(): null {
  const { gl } = useThree();
  const updateMetrics = useDebugStore((s) => s.updateMetrics);
  const visible = useDebugStore((s) => s.visible);

  const frameTimes = useRef<number[]>([]);
  const lastTime = useRef(performance.now());

  useFrame(() => {
    if (!visible) return;

    const now = performance.now();
    const dt = now - lastTime.current;
    lastTime.current = now;

    // Running average FPS computation
    frameTimes.current.push(dt);
    if (frameTimes.current.length > 30) {
      frameTimes.current.shift();
    }
    const avgDt = frameTimes.current.reduce((sum, val) => sum + val, 0) / frameTimes.current.length;
    const fps = Math.round(1000 / avgDt);

    // Read WebGL memory properties (Chrome/V8 only)
    let memory = 0;
    const performanceMemory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
    if (performanceMemory) {
      memory = Math.round(performanceMemory.usedJSHeapSize / (1024 * 1024));
    }

    // Read WebGLRenderer metrics
    const info = gl.info;

    updateMetrics({
      fps,
      memory,
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      points:    info.render.points,
      lines:     info.render.lines,
      geometries:info.memory.geometries,
      textures:  info.memory.textures,
    });
  });

  return null;
}
