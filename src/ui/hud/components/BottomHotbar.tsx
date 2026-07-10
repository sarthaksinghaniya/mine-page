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
    <div className="pointer-events-auto flex flex-col items-center gap-2">
      {/* Stats Row */}
      <div className="flex w-[840px] items-center justify-between">
        <div className="flex items-center gap-0.5">{renderHearts()}</div>
        <div className="text-[34px] font-black leading-none text-lime-400 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
          {level}
        </div>
        <div className="flex items-center gap-0.5">{renderHunger().reverse()}</div>
      </div>

      <div className="relative mt-[-2px] h-[12px] w-[760px] overflow-hidden rounded-full border border-black/80 bg-slate-900/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600" />
        <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
      </div>

      {/* Hotbar */}
      <div className="mt-1 flex border-[3px] border-black/70 bg-black/35 p-[2px] shadow-[0_16px_35px_rgba(0,0,0,0.35)]">
        {hotbar.map((item, index) => (
          <div 
            key={index}
            className={`relative flex h-[58px] w-[58px] items-center justify-center overflow-hidden border-r border-white/15 transition-all duration-75 last:border-r-0 ${
              activeSlot === index 
                ? 'z-10 border-[3px] border-white bg-black/45 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]'
                : 'border-[1px] border-white/10 bg-black/20 hover:bg-white/10'
            }`}
            onClick={() => { useGameplayStore.getState().setActiveSlot(index); }}
          >
            {/* Slot Number */}
            <span className={`absolute top-1 left-1 text-[12px] font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)] ${activeSlot === index ? 'text-white' : 'text-slate-200'}`}>
              {index + 1}
            </span>
            
            {/* Item Icon */}
            {item && getIcon(item.id)}
            
            {/* Item Count */}
            {item && item.count > 1 && (
              <span className="absolute bottom-0.5 right-1 text-[12px] font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                {item.count}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
