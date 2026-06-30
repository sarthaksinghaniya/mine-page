/**
 * @file src/features/npc/DialogueManager.ts
 * @description Centralized engine for NPC conversation states and action routing.
 */

import { useNpcStore } from './npc.store';
import { eventBus } from '@core/events/EventBus';
import { AppManager } from '@core/apps/AppManager';
import { TerminalManager } from '@core/terminal/TerminalManager';
import type { DialogueNode, DialogueOption } from './npc.types';

import { KnowledgeBase } from './KnowledgeBase';
import { RecommendationEngine } from './RecommendationEngine';

// Mutable dictionary so we can dynamically inject responses
const DIALOGUE_TREE: Record<string, DialogueNode> = {
  'root': {
    id: 'root',
    text: 'Hello! I am the Nexus AI Guide. I can analyze the portfolio, guide you to districts, or execute terminal commands. What would you like to do?',
    options: [
      { id: 'opt_knowledge', text: 'Tell me about Sarthak (Projects, Skills...)', action: 'query_knowledge', actionPayload: 'general' },
      { id: 'opt_recommend', text: 'Give me a recommendation on where to go.', action: 'query_recommendation', actionPayload: 'general' },
      { id: 'opt_stats', text: 'Analyze Developer Stats', action: 'run_terminal', actionPayload: 'analytics' },
      { id: 'opt_leave', text: 'Goodbye.', action: 'end_conversation' }
    ]
  },
  'processing': {
    id: 'processing',
    text: 'Processing your request...',
    options: []
  },
  'dynamic_response': {
    id: 'dynamic_response',
    text: '',
    options: [
      { id: 'opt_back', text: 'Back to main menu', action: 'next_node', actionPayload: 'root' },
      { id: 'opt_leave', text: 'Goodbye.', action: 'end_conversation' }
    ]
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
    if (!node) { this.endConversation(); return; }

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
      case 'query_knowledge':
        DIALOGUE_TREE['dynamic_response'].text = KnowledgeBase.query(option.actionPayload || '');
        this.goToNode('dynamic_response');
        break;
      case 'query_recommendation':
        // Simulating a persona, in reality this could be an input field
        DIALOGUE_TREE['dynamic_response'].text = RecommendationEngine.generate(option.actionPayload || 'engineer');
        this.goToNode('dynamic_response');
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
