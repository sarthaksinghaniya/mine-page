/**
 * @file src/ui/hud/components/CompassBar.tsx
 * @description Top-center compass ribbon showing player rotation.
 */

import React, { useEffect, useState } from 'react';
import { usePlayerStore } from '@/features/player/player.store';

export function CompassBar(): React.ReactElement {
  // In a real app we'd map playerStore.rotation to degrees. 
  // For the HUD mock, we'll use a static array representing the tape.
  const tape = ['NE', '60', '75', 'E', '105', '120', 'SE', '150', '165', 'S'];

  return (
    <div className="flex flex-col items-center pointer-events-auto">
      {/* Down arrow indicator */}
      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-yellow-500 mb-1 drop-shadow-md"></div>
      
      {/* Compass Ribbon */}
      <div className="bg-[rgba(20,25,35,0.5)] backdrop-blur-sm rounded-full px-8 py-1.5 shadow-lg border border-white/5 flex items-center gap-6 overflow-hidden">
        {tape.map((mark, i) => (
          <span 
            key={i} 
            className={`text-sm font-bold tracking-widest ${
              mark === '105' || mark === 'E' 
                ? 'text-yellow-500 scale-110 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]' 
                : 'text-white/70'
            }`}
          >
            {mark}
          </span>
        ))}
      </div>
    </div>
  );
}
