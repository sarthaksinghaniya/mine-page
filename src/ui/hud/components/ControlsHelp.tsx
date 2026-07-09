/**
 * @file src/ui/hud/components/ControlsHelp.tsx
 * @description Bottom-right controls overlay.
 */

import React from 'react';
import { MousePointer2 } from 'lucide-react';

export function ControlsHelp(): React.ReactElement {
  const Kbd = ({ children }: { children: React.ReactNode }) => (
    <kbd className="bg-black/60 border border-white/20 text-white px-2 py-1 rounded shadow-sm text-xs font-bold tracking-wider">
      {children}
    </kbd>
  );

  return (
    <div className="flex flex-col gap-3 items-end pointer-events-auto">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <Kbd>W</Kbd>
          <Kbd>A</Kbd>
          <Kbd>S</Kbd>
          <Kbd>D</Kbd>
        </div>
        <span className="text-white text-sm font-bold drop-shadow-md">Move</span>
      </div>

      <div className="flex items-center gap-3">
        <Kbd>SPACE</Kbd>
        <span className="text-white text-sm font-bold drop-shadow-md">Jump</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-black/60 border border-white/20 rounded px-2 py-1 shadow-sm">
          <MousePointer2 size={14} className="text-white" fill="white" />
        </div>
        <span className="text-white text-sm font-bold drop-shadow-md">Interact</span>
      </div>

      <div className="flex items-center gap-3">
        <Kbd>SHIFT</Kbd>
        <span className="text-white text-sm font-bold drop-shadow-md">Sprint</span>
      </div>

      <div className="flex items-center gap-3">
        <Kbd>M</Kbd>
        <span className="text-white text-sm font-bold drop-shadow-md">Map</span>
      </div>
    </div>
  );
}
