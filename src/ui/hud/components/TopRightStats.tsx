/**
 * @file src/ui/hud/components/TopRightStats.tsx
 * @description Top-right currency and settings display.
 */

import React from 'react';
import { useGameplayStore } from '@/features/gameplay/gameplay.store';
import { Star, Diamond, Zap, Plus, Settings } from 'lucide-react';

export function TopRightStats(): React.ReactElement {
  const stars = useGameplayStore((s) => s.stars);
  const diamonds = useGameplayStore((s) => s.diamonds);
  const energy = useGameplayStore((s) => s.energy);
  const maxEnergy = useGameplayStore((s) => s.maxEnergy);

  const Badge = ({ icon, value, colorClass, barProgress }: any) => (
    <div className={`flex items-center bg-[rgba(20,25,35,0.7)] backdrop-blur-md rounded-lg p-1.5 shadow-lg border border-white/10 pointer-events-auto`}>
      <div className={`flex items-center gap-2 pl-2 pr-3 relative overflow-hidden ${barProgress ? 'w-32' : ''}`}>
        {barProgress && (
          <div 
            className={`absolute left-0 top-0 bottom-0 opacity-20 ${colorClass}`} 
            style={{ width: `${barProgress}%` }} 
          />
        )}
        <span className={`drop-shadow-md z-10 ${colorClass}`}>{icon}</span>
        <span className="text-white font-bold text-sm tracking-wide z-10">{value}</span>
      </div>
      <button className="bg-white/10 hover:bg-white/20 p-1 rounded transition-colors ml-1 z-10">
        <Plus size={14} className="text-white" />
      </button>
    </div>
  );

  return (
    <div className="flex items-center gap-3">
      <Badge 
        icon={<Star size={16} fill="currentColor" />} 
        value={stars.toLocaleString()} 
        colorClass="text-yellow-400" 
      />
      <Badge 
        icon={<Diamond size={16} fill="currentColor" />} 
        value={diamonds.toLocaleString()} 
        colorClass="text-cyan-400" 
      />
      <Badge 
        icon={<Zap size={16} fill="currentColor" />} 
        value={`${energy}/${maxEnergy}`} 
        colorClass="text-emerald-400 bg-emerald-500/20" 
        barProgress={(energy / maxEnergy) * 100}
      />
      <button className="bg-[rgba(20,25,35,0.7)] hover:bg-[rgba(30,35,45,0.8)] backdrop-blur-md p-2.5 rounded-lg border border-white/10 transition-colors pointer-events-auto shadow-lg ml-2">
        <Settings size={20} className="text-white" />
      </button>
    </div>
  );
}
