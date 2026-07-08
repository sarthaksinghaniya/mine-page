/**
 * @file src/features/npc/npc.types.ts
 * @description Type definitions for the NPC feature and conversation system.
 */

export type NpcRole =
  | 'guide' // Gives tips about the portfolio
  | 'recruiter' // Talks about hiring / contact
  | 'colleague' // Represents a tech community
  | 'ambient'; // Background character, no interaction

export type NpcInteractionState = 'idle' | 'approaching' | 'talking' | 'leaving';

export interface DialogueOption {
  id: string;
  text: string;
  action?: 'launch_app' | 'run_terminal' | 'next_node' | 'end_conversation' | 'query_knowledge' | 'query_recommendation';
  actionPayload?: string;
}

export interface DialogueNode {
  id: string;
  text: string;
  isTyping?: boolean;
  options: DialogueOption[];
}

export interface NpcDefinition {
  id: string;
  name: string;
  role: NpcRole;
  modelPath: string;
  spawnZoneId: string;
  spawnPosition: { x: number; y: number; z: number };
  dialogueId: string | null;
}

export interface NpcState {
  npcs: NpcDefinition[];
  activeNpcId: string | null;
  interactionState: NpcInteractionState;
  
  // Dialogue System
  activeDialogue: DialogueNode | null;
  isTyping: boolean;
}
