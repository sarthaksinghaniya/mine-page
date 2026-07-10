/**
 * @file src/ui/hud/components/ControlsHelp.tsx
 * @description Bottom-right controls overlay.
 */

import React from 'react';
import { MousePointer2 } from 'lucide-react';

export function ControlsHelp(): React.ReactElement {
  const Kbd = ({ children }: { children: React.ReactNode }) => (
    <kbd className="rounded-md border border-white/10 bg-black/55 px-3 py-2 text-[16px] font-extrabold tracking-wider text-white shadow-[0_8px_18px_rgba(0,0,0,0.22)]">
      {children}
    </kbd>
  );

  return (
    <div className="pointer-events-auto flex flex-col items-end gap-4">
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <Kbd>W</Kbd>
          <Kbd>A</Kbd>
          <Kbd>S</Kbd>
          <Kbd>D</Kbd>
        </div>
        <span className="text-[19px] font-bold text-white drop-shadow-md">Move</span>
      </div>

      <div className="flex items-center gap-3">
        <Kbd>SPACE</Kbd>
        <span className="text-[19px] font-bold text-white drop-shadow-md">Jump</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-md border border-white/10 bg-black/55 px-3 py-2 shadow-[0_8px_18px_rgba(0,0,0,0.22)]">
          <MousePointer2 size={16} className="text-white" fill="white" />
        </div>
        <span className="text-[19px] font-bold text-white drop-shadow-md">Interact</span>
      </div>

      <div className="flex items-center gap-3">
        <Kbd>SHIFT</Kbd>
        <span className="text-[19px] font-bold text-white drop-shadow-md">Sprint</span>
      </div>

      <div className="flex items-center gap-3">
        <Kbd>M</Kbd>
        <span className="text-[19px] font-bold text-white drop-shadow-md">Map</span>
      </div>
    </div>
  );
}
