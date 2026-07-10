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

  const Badge = ({
    icon,
    value,
    textColor,
    bgColor,
    barProgress,
  }: {
    icon: React.ReactNode;
    value: string;
    textColor: string;
    bgColor: string;
    barProgress?: number;
  }) => (
    <div
      className={`pointer-events-auto flex items-center overflow-hidden rounded-2xl border border-white/10 ${bgColor} shadow-[0_14px_30px_rgba(0,0,0,0.25)] backdrop-blur-md`}
    >
      <div className={`relative flex h-[50px] min-w-[104px] items-center gap-2 px-4 ${barProgress ? 'pr-3' : 'pr-3'}`}>
        {barProgress ? (
          <div
            className="absolute inset-y-0 left-0 bg-white/15"
            style={{ width: `${barProgress}%` }}
          />
        ) : null}
        <span className={`relative z-10 ${textColor}`}>{icon}</span>
        <span className="relative z-10 text-[20px] font-extrabold tracking-tight text-white">
          {value}
        </span>
      </div>
      <button className="flex h-[50px] w-[42px] items-center justify-center border-l border-white/10 bg-black/15 transition-colors hover:bg-black/30">
        <Plus size={18} className="text-white" />
      </button>
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      <Badge 
        icon={<Star size={18} fill="currentColor" />} 
        value={stars.toLocaleString()} 
        textColor="text-yellow-400"
        bgColor="bg-slate-900/78"
      />
      <Badge 
        icon={<Diamond size={18} fill="currentColor" />} 
        value={diamonds.toLocaleString()} 
        textColor="text-cyan-400"
        bgColor="bg-slate-900/78"
      />
      <Badge 
        icon={<Zap size={18} fill="currentColor" />} 
        value={`${energy}/${maxEnergy}`} 
        textColor="text-white" 
        bgColor="bg-emerald-500/90" 
        barProgress={(energy / maxEnergy) * 100}
      />
      <button className="pointer-events-auto flex h-[50px] w-[46px] items-center justify-center rounded-2xl border border-white/10 bg-slate-900/78 shadow-[0_14px_30px_rgba(0,0,0,0.25)] backdrop-blur-md transition-colors hover:bg-slate-800/90">
        <Settings size={20} className="text-white" />
      </button>
    </div>
  );
}
