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
    <div className="flex flex-col items-center gap-3 pointer-events-auto mb-2 transition-transform hover:-translate-y-1">
      {/* Stats Row */}
      <div className="flex items-center justify-between w-[400px]">
        {/* Hearts */}
        <div className="flex">{renderHearts()}</div>
        
        {/* Level */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full" />
          <div className="text-cyan-400 font-black text-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] z-10">
            {level}
          </div>
        </div>
        
        {/* Hunger */}
        <div className="flex">{renderHunger().reverse()}</div>
      </div>

      {/* Hotbar */}
      <div className="flex gap-1.5 p-2 bg-slate-900/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {hotbar.map((item, index) => (
          <div 
            key={index}
            className={`relative w-14 h-14 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200 overflow-hidden ${
              activeSlot === index 
                ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400 shadow-[inset_0_0_20px_rgba(34,211,238,0.3)] scale-110 z-10' 
                : 'bg-black/40 border border-white/5 hover:bg-white/10 hover:border-white/20'
            }`}
            onClick={() => useGameplayStore.getState().setActiveSlot(index)}
          >
            {/* Slot Number */}
            <span className={`absolute top-1 left-1.5 text-[10px] font-bold ${activeSlot === index ? 'text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,1)]' : 'text-slate-400'}`}>
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
