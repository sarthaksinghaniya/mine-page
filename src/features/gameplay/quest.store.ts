/**
 * @file src/features/gameplay/quest.store.ts
 * @description State management for quests and collectibles.
 */

import { create } from 'zustand';

export interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  tasks: { id: string; description: string; completed: boolean }[];
}

export interface Collectible {
  id: string;
  type: 'coin' | 'book' | 'crystal' | 'scroll';
  name: string;
  collected: boolean;
  position: [number, number, number];
}

interface QuestState {
  quests: Quest[];
  collectibles: Collectible[];
  activeQuestId: string | null;
  completeTask: (questId: string, taskId: string) => void;
  collectItem: (collectibleId: string) => void;
  setActiveQuest: (questId: string) => void;
}

export const useQuestStore = create<QuestState>((set) => ({
  quests: [
    {
      id: 'main-tour',
      title: 'Portfolio Tour',
      description: 'Explore the different districts of the portfolio.',
      completed: false,
      tasks: [
        { id: 'talk-guide', description: 'Talk to the Guide NPC', completed: false },
        { id: 'visit-ai', description: 'Visit the AI Research District', completed: false },
        { id: 'visit-projects', description: 'Visit the Projects District', completed: false },
      ],
    },
  ],
  collectibles: [
    { id: 'coin-1', type: 'coin', name: 'Achievement Coin', collected: false, position: [10, 1, 10] },
    { id: 'book-1', type: 'book', name: 'Skill Book: React', collected: false, position: [-10, 1, -20] },
    { id: 'crystal-1', type: 'crystal', name: 'Project Crystal', collected: false, position: [400, 1, 400] },
  ],
  activeQuestId: 'main-tour',

  completeTask: (questId, taskId) => { set((state) => {
    const quests = state.quests.map(q => {
      if (q.id === questId) {
        const tasks = q.tasks.map(t => t.id === taskId ? { ...t, completed: true } : t);
        const completed = tasks.every(t => t.completed);
        return { ...q, tasks, completed };
      }
      return q;
    });
    return { quests };
  }); },

  collectItem: (collectibleId) => { set((state) => ({
    collectibles: state.collectibles.map(c => 
      c.id === collectibleId ? { ...c, collected: true } : c
    )
  })); },

  setActiveQuest: (questId) => { set({ activeQuestId: questId }); },
}));
