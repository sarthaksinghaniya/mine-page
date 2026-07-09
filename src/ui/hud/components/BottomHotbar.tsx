/**
 * @file src/ui/hud/components/BottomHotbar.tsx
 * @description Bottom-center health, hunger, and inventory hotbar.
 */

import React from 'react';
import { useGameplayStore } from '@/features/gameplay/gameplay.store';
import { Heart, Drumstick, Pickaxe, Sword, Diamond, Book, Map, Box, Briefcase, User, Flame } from 'lucide-react';

export function BottomHotbar(): React.ReactElement {
  const health = useGameplayStore((s) => s.health); // Max 20
  const hunger = useGameplayStore((s) => s.hunger); // Max 20
  const level = useGameplayStore((s) => s.level);
  const hotbar = useGameplayStore((s) => s.hotbar);
  const activeSlot = useGameplayStore((s) => s.activeSlot);

  // Helper to render Minecraft-style hearts
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 10; i++) {
      const isFull = health >= (i + 1) * 2;
      const isHalf = health === (i * 2) + 1;
      hearts.push(
        <div key={`heart-${i}`} className="relative w-4 h-4 mr-0.5">
          <Heart size={16} fill={isFull ? '#ef4444' : (isHalf ? '#ef4444' : '#000000')} color={isFull || isHalf ? '#7f1d1d' : '#333333'} className={!isFull && !isHalf ? 'opacity-50' : ''} />
          {/* We'd do a half heart clip in CSS, but this is a rough approximation */}
        </div>
      );
    }
    return hearts;
  };

  // Helper to render hunger icons
  const renderHunger = () => {
    const foods = [];
    for (let i = 0; i < 10; i++) {
      const isFull = hunger >= (i + 1) * 2;
      foods.push(
        <div key={`food-${i}`} className="relative w-4 h-4 ml-0.5 transform -scale-x-100">
          <Drumstick size={16} fill={isFull ? '#c2410c' : '#000000'} color={isFull ? '#7c2d12' : '#333333'} className={!isFull ? 'opacity-50' : ''} />
        </div>
      );
    }
    return foods;
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'pickaxe': return <Pickaxe size={24} className="text-gray-300" />;
      case 'sword': return <Sword size={24} className="text-gray-300" />;
      case 'diamond': return <Diamond size={24} className="text-cyan-400" />;
      case 'book': return <Book size={24} className="text-amber-600" />;
      case 'map': return <Map size={24} className="text-green-500" />;
      case 'chest': return <Box size={24} className="text-amber-800" fill="#92400e" />;
      case 'backpack': return <Briefcase size={24} className="text-amber-700" />;
      case 'steve': return <User size={24} className="text-blue-500" />;
      case 'torch': return <Flame size={24} className="text-orange-500" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 pointer-events-auto">
      {/* Stats Row */}
      <div className="flex items-center justify-between w-[400px]">
        {/* Hearts */}
        <div className="flex">{renderHearts()}</div>
        
        {/* Level */}
        <div className="text-green-400 font-bold text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {level}
        </div>
        
        {/* Hunger */}
        <div className="flex">{renderHunger().reverse()}</div>
      </div>

      {/* Hotbar */}
      <div className="flex gap-1 p-1 bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {hotbar.map((item, index) => (
          <div 
            key={index}
            className={`relative w-12 h-12 flex items-center justify-center rounded cursor-pointer ${
              activeSlot === index 
                ? 'bg-white/20 border-2 border-white shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]' 
                : 'bg-black/40 border border-white/5 hover:bg-white/10'
            }`}
            onClick={() => useGameplayStore.getState().setActiveSlot(index)}
          >
            {/* Slot Number */}
            <span className="absolute top-0.5 left-1 text-white/70 text-[10px] font-bold drop-shadow-md">
              {index + 1}
            </span>
            
            {/* Item Icon */}
            {item && getIcon(item.id)}
            
            {/* Item Count */}
            {item && item.count > 1 && (
              <span className="absolute bottom-0.5 right-1 text-white text-[10px] font-bold drop-shadow-md">
                {item.count}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
