/**
 * @file src/ui/hud/components/PlayerProfile.tsx
 * @description Top-left player profile showing avatar, name, level, and XP.
 */

import React from 'react';
import { useGameplayStore } from '@/features/gameplay/gameplay.store';
import { BadgeCheck } from 'lucide-react';

export function PlayerProfile(): React.ReactElement {
  const level = useGameplayStore((s) => s.level);
  const xp = useGameplayStore((s) => s.xp);
  const maxXp = 18000;
  const progress = (xp / maxXp) * 100;

  return (
    <div className="bg-[rgba(20,25,35,0.7)] backdrop-blur-md rounded-2xl p-3 flex items-center gap-4 shadow-lg border border-white/10 pointer-events-auto">
      {/* Avatar (Placeholder for Steve/Skin) */}
      <div className="w-16 h-16 rounded-xl bg-blue-800 border-2 border-blue-400 overflow-hidden flex items-center justify-center">
        <div className="text-4xl">👨‍💻</div>
      </div>
      
      <div className="flex flex-col min-w-[200px]">
        {/* Name & Badge */}
        <div className="flex items-center gap-1">
          <span className="text-white font-bold text-lg tracking-wide">Sarthak Dev</span>
          <BadgeCheck size={16} className="text-blue-400" />
        </div>
        
        {/* Title */}
        <span className="text-gray-400 text-xs font-medium mt-0.5 mb-2">
          AI/ML Engineer & Full Stack Developer
        </span>
        
        {/* Level & XP Bar */}
        <div className="flex items-center gap-2">
          <span className="text-white text-xs font-bold">Lv. {level}</span>
          <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-white text-[10px] whitespace-nowrap">
            {xp.toLocaleString()} / {maxXp.toLocaleString()} XP
          </span>
        </div>
      </div>
    </div>
  );
}
