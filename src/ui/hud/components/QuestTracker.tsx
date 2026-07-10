/**
 * @file src/ui/hud/components/QuestTracker.tsx
 * @description Middle-right quest tracker overlay.
 */

import React from 'react';
import { X, CheckSquare } from 'lucide-react';
import { useGameplayStore } from '@/features/gameplay/gameplay.store';

export function QuestTracker(): React.ReactElement {
  const visitedDistricts = useGameplayStore((s) => s.visitedDistricts);
  const totalDistricts = 8;
  const isComplete = visitedDistricts.length >= totalDistricts;

  return (
    <div className="pointer-events-auto cursor-default rounded-[22px] border border-white/10 bg-slate-900/78 px-6 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.3)] backdrop-blur-md w-[420px]">
      <div className="mb-3 flex items-start justify-between">
        <span className="text-[16px] font-bold tracking-wide text-white/75">CURRENT QUEST</span>
        <button className="text-white/40 transition-colors hover:text-white/80">
          <X size={18} />
        </button>
      </div>

      <h3 className="mb-5 text-[22px] font-extrabold text-amber-400">Explore the world</h3>

      <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
        <span className="text-[20px] font-medium text-slate-100">Visit all districts</span>
        <div className="flex items-center gap-3 text-slate-200">
          <span className="text-[20px] font-semibold">{visitedDistricts.length}/{totalDistricts}</span>
          <div className={`flex h-8 w-8 items-center justify-center rounded-md border ${isComplete ? 'border-emerald-500 bg-emerald-500/20' : 'border-white/25 bg-black/15'}`}>
            <CheckSquare size={16} className={isComplete ? 'text-emerald-400' : 'text-white/10'} />
          </div>
        </div>
      </div>
    </div>
  );
}
