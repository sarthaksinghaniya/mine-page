/**
 * @file src/features/npc/npc.store.ts
 * @description Zustand store for NPC state.
 */

import { create } from 'zustand';
import type { NpcState, NpcDefinition, NpcInteractionState } from './npc.types';

interface NpcActions {
  setNpcs:             (npcs: NpcDefinition[]) => void;
  setActiveNpc:        (npcId: string | null) => void;
  setInteractionState: (state: NpcInteractionState) => void;
}

type NpcStore = NpcState & NpcActions;

export const useNpcStore = create<NpcStore>()((set) => ({
  npcs:             [],
  activeNpcId:      null,
  interactionState: 'idle',

  setNpcs:             (npcs) => set({ npcs }),
  setActiveNpc:        (activeNpcId) => set({ activeNpcId }),
  setInteractionState: (interactionState) => set({ interactionState }),
}));
