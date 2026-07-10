/**
 * @file src/ui/hud/components/PlayerProfile.tsx
 * @description Top-left player profile showing avatar, name, level, and XP.
 */

import React from 'react';
import { useGameplayStore } from '@/features/gameplay/gameplay.store';
import { BadgeCheck } from 'lucide-react';
import { profile } from '../../../../data/content';

export function PlayerProfile(): React.ReactElement {
  const level = useGameplayStore((s) => s.level);
  const xp = useGameplayStore((s) => s.xp);
  const maxXp = 18000;
  const progress = (xp / maxXp) * 100;

  return (
    <div className="pointer-events-auto cursor-default w-[410px] rounded-[22px] border border-white/10 bg-slate-900/78 px-4 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.33)] backdrop-blur-md">
      <div className="flex items-start gap-4">
        <div className="relative h-[82px] w-[82px] overflow-hidden rounded-2xl border border-white/15 bg-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          <img
            src="/assets/ref-avatar.png"
            alt={`${profile.name} avatar`}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <div className="flex min-w-[260px] flex-col pt-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[27px] font-extrabold leading-none tracking-tight text-white">
              {profile.name}
            </span>
            <BadgeCheck size={19} className="text-sky-400 drop-shadow-sm" fill="currentColor" />
          </div>

          <span className="mt-2 whitespace-nowrap text-[14px] font-medium text-slate-300 overflow-hidden text-ellipsis w-[240px]" title={profile.tagline}>
            {profile.tagline}
          </span>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-[14px] font-bold text-white">
              Lv. {level}
            </span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-black/35 ring-1 ring-white/5">
              <div
                className="h-full rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.55)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="whitespace-nowrap text-[13px] font-semibold text-slate-100">
              {xp.toLocaleString()} <span className="text-slate-400">/</span> {maxXp.toLocaleString()} XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
