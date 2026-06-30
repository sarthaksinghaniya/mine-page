/**
 * @file src/features/npc/DialogueManager.ts
 * @description Centralized engine for NPC conversation states and action routing.
 */

import { useNpcStore } from './npc.store';
import { eventBus } from '@core/events/EventBus';
import { AppManager } from '@core/apps/AppManager';
import { TerminalManager } from '@core/terminal/TerminalManager';
import type { DialogueNode, DialogueOption } from './npc.types';

// Mock dialogue tree for the AI Guide
const DIALOGUE_TREE: Record<string, DialogueNode> = {
  'root': {
    id: 'root',
    text: 'Hello! I am the Nexus AI Guide. I can analyze the portfolio, guide you to districts, or execute terminal commands. What would you like to do?',
    options: [
      { id: 'opt_stats', text: 'Analyze Developer Stats', action: 'run_terminal', actionPayload: 'analytics' },
      { id: 'opt_projects', text: 'Show me the Projects District', action: 'launch_app', actionPayload: 'projects-district' },
      { id: 'opt_skills', text: 'Show me the Skills Lab', action: 'launch_app', actionPayload: 'skills-lab' },
      { id: 'opt_leave', text: 'Goodbye.', action: 'end_conversation' }
    ]
  },
  'processing': {
    id: 'processing',
    text: 'Processing your request...',
    options: []
  }
};

class DialogueManagerClass {
  
  startConversation(npcId: string) {
    const store = useNpcStore.getState();
    store.setActiveNpc(npcId);
    store.setInteractionState('talking');
    
    eventBus.emit('npc:conversationStarted', { npcId });
    this.goToNode('root');
  }

  async goToNode(nodeId: string) {
    const store = useNpcStore.getState();
    const node = DIALOGUE_TREE[nodeId];
    if (!node) return this.endConversation();

    // Simulate typing
    store.setIsTyping(true);
    store.setActiveDialogue({ ...node, text: '' }); // Clear text while typing

    const delay = Math.max(1000, node.text.length * 20); // Dynamic typing delay based on text length
    await new Promise(resolve => setTimeout(resolve, delay));

    store.setIsTyping(false);
    store.setActiveDialogue(node);
  }

  handleOptionSelect(option: DialogueOption) {
    switch (option.action) {
      case 'next_node':
        if (option.actionPayload) this.goToNode(option.actionPayload);
        break;
      case 'launch_app':
        if (option.actionPayload) {
          this.endConversation();
          AppManager.open(option.actionPayload);
        }
        break;
      case 'run_terminal':
        if (option.actionPayload) {
          this.endConversation();
          TerminalManager.open('ai-guide-terminal');
          TerminalManager.execute(option.actionPayload);
        }
        break;
      case 'end_conversation':
      default:
        this.endConversation();
        break;
    }
  }

  endConversation() {
    const store = useNpcStore.getState();
    const npcId = store.activeNpcId;
    
    store.setActiveDialogue(null);
    store.setInteractionState('idle');
    store.setActiveNpc(null);
    store.setIsTyping(false);
    
    if (npcId) {
      eventBus.emit('npc:conversationEnded', { npcId });
    }
  }
}

export const DialogueManager = new DialogueManagerClass();
