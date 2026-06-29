/**
 * @file src/features/ai-assistant/assistant.store.ts
 * @description Zustand store for the AI assistant feature.
 */

import { create } from 'zustand';
import type { AssistantState, ChatMessage } from './assistant.types';

interface AssistantActions {
  openAssistant: () => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;
  setThinking: (thinking: boolean) => void;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  setError: (error: string | null) => void;
  setNpcId: (npcId: string | null) => void;
}

type AssistantStore = AssistantState & AssistantActions;

export const useAssistantStore = create<AssistantStore>()((set) => ({
  open: false,
  thinking: false,
  messages: [],
  error: null,
  npcId: null,

  openAssistant: () => set({ open: true }),
  closeAssistant: () => set({ open: false }),
  toggleAssistant: () => set((s) => ({ open: !s.open })),
  setThinking: (thinking) => set({ thinking }),
  addMessage: (message) => set((s) => ({ messages: [...s.messages, message] })),
  clearMessages: () => set({ messages: [] }),
  setError: (error) => set({ error }),
  setNpcId: (npcId) => set({ npcId }),
}));
