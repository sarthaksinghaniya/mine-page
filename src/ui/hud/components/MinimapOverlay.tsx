/**
 * @file src/ui/hud/components/MinimapOverlay.tsx
 * @description Bottom-left circular minimap.
 */

import React, { useEffect, useState } from 'react';
import { usePlayerStore } from '@/features/player/player.store';
import { useWorldStore } from '@/features/world/world.store';
import { MapPin, Sun } from 'lucide-react';

export function MinimapOverlay(): React.ReactElement {
  const position = usePlayerStore((s) => s.position);
  const focusedZoneId = useWorldStore((s) => s.focusedZoneId);
  const [time, setTime] = useState('10:30 AM'); // Hardcoded to match reference for now

  return (
    <div className="flex flex-col gap-3 pointer-events-auto">
      {/* Circular Map */}
      <div className="w-44 h-44 rounded-full border-4 border-slate-700/80 shadow-[0_0_20px_rgba(34,211,238,0.2)] overflow-hidden relative bg-slate-900/60 backdrop-blur-2xl transition-transform hover:scale-105 cursor-default group">
        
        {/* Radar Ring Glow */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(34,211,238,0.15)]" />
        
        {/* Radar Grid Lines */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,transparent_20%,#0f172a_20%,#0f172a_80%,transparent_80%,transparent)] bg-[length:24px_24px] mix-blend-screen" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/20" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-cyan-500/20" />

        {/* Player Cursor */}
        <div className="absolute w-3.5 h-3.5 bg-cyan-400 rounded-sm border border-white z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 shadow-[0_0_12px_rgba(34,211,238,1)]" />
        
        {/* Radar Ping Animation */}
        <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 border border-cyan-400/30 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />

        {/* N / S / E / W indicators */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-cyan-200 text-[10px] font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">N</div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-slate-400 text-[10px] font-bold group-hover:text-cyan-200 transition-colors">S</div>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 text-[10px] font-bold group-hover:text-cyan-200 transition-colors">W</div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 text-[10px] font-bold group-hover:text-cyan-200 transition-colors">E</div>
      </div>

      {/* Location & Time */}
      <div className="flex flex-col gap-1 ml-2">
        <div className="flex items-center gap-2 text-white">
          <div className="p-1.5 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
            <MapPin size={14} className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
          </div>
          <span className="font-bold text-sm tracking-wide drop-shadow-md">Developer Land</span>
        </div>
        <div className="text-cyan-100/60 text-xs font-semibold ml-9 uppercase tracking-wider">
          {focusedZoneId ? focusedZoneId : 'Central Plaza'}
        </div>
        <div className="flex items-center gap-2 text-white mt-1">
          <div className="p-1.5 bg-yellow-500/10 rounded-lg border border-yellow-500/20 ml-0.5">
            <Sun size={14} className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
          </div>
          <span className="font-bold text-sm drop-shadow-md">{time}</span>
        </div>
      </div>
    </div>
  );
}
