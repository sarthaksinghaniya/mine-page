/**
 * @file src/features/gameplay/gameplay.store.ts
 * @description Stores XP, Levels, Health, Hunger, Currency, and Inventory for RPG mechanics.
 */

import { create } from 'zustand';

interface InventoryItem {
  id: string;
  type: string; // 'tool', 'block', 'item'
  count: number;
}

interface GameplayState {
  xp: number;
  level: number;
  
  // Currency
  stars: number;
  diamonds: number;
  energy: number;
  maxEnergy: number;

  // Survival Stats
  health: number; // Max 20 (10 hearts)
  hunger: number; // Max 20 (10 food items)

  // Inventory (9 hotbar slots)
  hotbar: (InventoryItem | null)[];
  activeSlot: number;

  // Actions
  addXp: (amount: number) => void;
  addStars: (amount: number) => void;
  addDiamonds: (amount: number) => void;
  setActiveSlot: (index: number) => void;
}

export const useGameplayStore = create<GameplayState>((set) => ({
  xp: 12850,
  level: 28,
  
  stars: 2450,
  diamonds: 860,
  energy: 100,
  maxEnergy: 100,

  health: 20, // Full
  hunger: 18, // Almost full

  hotbar: [
    { id: 'pickaxe', type: 'tool', count: 1 },
    { id: 'sword', type: 'tool', count: 1 },
    { id: 'diamond', type: 'item', count: 3 },
    { id: 'book', type: 'item', count: 4 },
    { id: 'map', type: 'item', count: 1 },
    { id: 'chest', type: 'block', count: 1 },
    { id: 'backpack', type: 'item', count: 1 },
    { id: 'steve', type: 'item', count: 1 },
    { id: 'torch', type: 'block', count: 64 },
  ],
  activeSlot: 0,
  
  addXp: (amount: number) => set((state) => {
    const nextXp = state.xp + amount;
    const levelUpThreshold = 18000; // static for now based on image (12,850 / 18,000)
    
    if (nextXp >= levelUpThreshold) {
      return { xp: nextXp - levelUpThreshold, level: state.level + 1 };
    }
    return { xp: nextXp };
  }),
  
  addStars: (amount: number) => set((state) => ({ stars: state.stars + amount })),
  addDiamonds: (amount: number) => set((state) => ({ diamonds: state.diamonds + amount })),
  setActiveSlot: (index: number) => set({ activeSlot: index }),
}));
