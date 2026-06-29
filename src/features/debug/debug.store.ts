/**
 * @file src/features/debug/debug.store.ts
 * @description Zustand store for developer metrics.
 */

import { create } from 'zustand';
import type { DebugState, DebugMetrics } from './debug.types';

interface DebugActions {
  toggleVisibility: () => void;
  setVisibility: (visible: boolean) => void;
  updateMetrics: (metrics: Partial<DebugMetrics>) => void;
}

type DebugStore = DebugState & DebugActions;

const initialMetrics: DebugMetrics = {
  fps: 0,
  memory: 0,
  drawCalls: 0,
  triangles: 0,
  points: 0,
  lines: 0,
  geometries: 0,
  textures: 0,
};

export const useDebugStore = create<DebugStore>()((set) => ({
  visible: false,
  metrics: initialMetrics,

  toggleVisibility: () => set((s) => ({ visible: !s.visible })),
  setVisibility: (visible) => set({ visible }),
  updateMetrics: (metrics) => set((s) => ({ metrics: { ...s.metrics, ...metrics } })),
}));
