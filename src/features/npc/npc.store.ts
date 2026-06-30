/**
 * @file src/features/npc/npc.store.ts
 * @description Zustand store for NPC state and conversation flows.
 */

import { create } from 'zustand';
import type { NpcState, NpcDefinition, NpcInteractionState, DialogueNode } from './npc.types';

interface NpcActions {
  setNpcs: (npcs: NpcDefinition[]) => void;
  setActiveNpc: (npcId: string | null) => void;
  setInteractionState: (state: NpcInteractionState) => void;
  setActiveDialogue: (node: DialogueNode | null) => void;
  setIsTyping: (typing: boolean) => void;
}

type NpcStore = NpcState & NpcActions;

export const useNpcStore = create<NpcStore>()((set) => ({
  npcs: [],
  activeNpcId: null,
  interactionState: 'idle',
  activeDialogue: null,
  isTyping: false,

  setNpcs: (npcs) => set({ npcs }),
  setActiveNpc: (activeNpcId) => set({ activeNpcId }),
  setInteractionState: (interactionState) => set({ interactionState }),
  setActiveDialogue: (activeDialogue) => set({ activeDialogue }),
  setIsTyping: (isTyping) => set({ isTyping }),
}));
