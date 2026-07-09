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
    <div className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-4 flex items-center gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 pointer-events-auto transition-transform hover:scale-[1.02] cursor-default">
      {/* Avatar */}
      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border-2 border-cyan-400/50 overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
        <div className="text-4xl drop-shadow-md">👨‍💻</div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </div>
      
      <div className="flex flex-col min-w-[200px]">
        {/* Name & Badge */}
        <div className="flex items-center gap-1.5">
          <span className="text-white font-bold text-lg tracking-wide drop-shadow-sm">Sarthak Dev</span>
          <BadgeCheck size={18} className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
        </div>
        
        {/* Title */}
        <span className="text-cyan-100/70 text-xs font-semibold tracking-wider mt-0.5 mb-2.5 uppercase">
          AI/ML Engineer & Full Stack Developer
        </span>
        
        {/* Level & XP Bar */}
        <div className="flex items-center gap-3">
          <span className="text-white text-xs font-black bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            Lv. {level}
          </span>
          <div className="flex-1 h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner relative">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] relative overflow-hidden" 
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
          </div>
          <span className="text-slate-300 text-[10px] whitespace-nowrap font-medium tracking-wide">
            {xp.toLocaleString()} <span className="text-slate-500">/</span> {maxXp.toLocaleString()} XP
          </span>
        </div>
      </div>
    </div>
  );
}
