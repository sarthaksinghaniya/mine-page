/**
 * @file src/features/ai-assistant/assistant.types.ts
 * @description Type definitions for the in-world AI assistant feature.
 */

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id:        string;
  role:      MessageRole;
  content:   string;
  timestamp: number;
}

export interface AssistantState {
  /** Whether the assistant panel is visible */
  open:        boolean;
  /** Whether the assistant is processing a message */
  thinking:    boolean;
  /** Full conversation history */
  messages:    ChatMessage[];
  /** Current error message, if any */
  error:       string | null;
  /** The NPC entity ID that represents the assistant in the world */
  npcId:       string | null;
}
