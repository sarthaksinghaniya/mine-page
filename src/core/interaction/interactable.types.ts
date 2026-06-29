/**
 * @file src/core/interaction/interactable.types.ts
 * @description Type definitions for the universal gameplay interaction framework.
 */

export type InteractableType =
  | 'door'
  | 'npc'
  | 'computer'
  | 'vehicle'
  | 'building'
  | 'terminal'
  | 'button'
  | 'elevator'
  | 'portal'
  | 'billboard'
  | 'screen'
  | 'pickup'
  | 'custom';

export interface InteractableConfig {
  id: string;
  name: string;
  type: InteractableType;
  position: { x: number; y: number; z: number };
  radius: number;
  priority: number; // Higher runs first on overlap
  enabled: boolean;
  promptText?: string; // e.g. "Enter Building", "Drive", "Talk"
  onFocus?: () => void;
  onBlur?: () => void;
  onInteract?: () => void;
  onEnter?: () => void;
  onExit?: () => void;
}
