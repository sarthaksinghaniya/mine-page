/**
 * @file src/features/npc/npc.types.ts
 * @description Type definitions for the NPC feature.
 */

export type NpcRole =
  | 'guide'       // Gives tips about the portfolio
  | 'recruiter'   // Talks about hiring / contact
  | 'colleague'   // Represents a tech community
  | 'ambient';    // Background character, no interaction

export type NpcInteractionState = 'idle' | 'approaching' | 'talking' | 'leaving';

export interface NpcDefinition {
  id:          string;
  name:        string;
  role:        NpcRole;
  modelPath:   string;
  spawnZoneId: string;
  spawnPosition: { x: number; y: number; z: number };
  /** Dialogue tree ID — resolved by the AI assistant or static data */
  dialogueId:  string | null;
}

export interface NpcState {
  npcs:              NpcDefinition[];
  activeNpcId:       string | null;
  interactionState:  NpcInteractionState;
}
