/**
 * @file src/ui/hud/components/CompassBar.tsx
 * @description Top-center compass ribbon showing player rotation.
 */

import React from 'react';

export function CompassBar(): React.ReactElement {
  // In a real app we'd map playerStore.rotation to degrees. 
  // For the HUD mock, we'll use a static array representing the tape.
  const tape = ['NE', '60', '75', 'E', '105', '120', 'SE', '150', '165', 'S'];

  return (
    <div className="pointer-events-auto flex flex-col items-center">
      <div className="mb-[-1px] border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]" />
      <div className="flex h-[54px] min-w-[720px] items-center justify-center rounded-full border border-white/10 bg-slate-900/72 px-8 shadow-[0_14px_35px_rgba(0,0,0,0.22)] backdrop-blur-md">
        <div className="flex w-full items-center justify-between gap-6 overflow-hidden text-white/75">
          {tape.map((mark) => (
            <span
              key={mark}
              className={`text-[20px] font-semibold tracking-[0.18em] ${
                mark === '105'
                  ? 'scale-110 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]'
                  : 'text-white/70'
              }`}
            >
              {mark}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
