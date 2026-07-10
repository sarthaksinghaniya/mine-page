/**
 * @file src/ui/hud/components/WorldTitleBanner.tsx
 * @description Floating world title banner centered under the compass.
 */

import React from 'react';

export function WorldTitleBanner(): React.ReactElement {
  return (
    <div className="pointer-events-none select-none">
      <div className="rounded-full border border-white/12 bg-slate-900/65 px-10 py-4 shadow-[0_14px_40px_rgba(0,0,0,0.28)] backdrop-blur-md">
        <div className="text-center">
          <div className="text-[20px] font-extrabold tracking-[0.18em] text-cyan-50 drop-shadow-[0_0_14px_rgba(125,211,252,0.45)] sm:text-[30px]">
            GENESIS CENTRAL OBELISK
          </div>
        </div>
      </div>
    </div>
  );
}
