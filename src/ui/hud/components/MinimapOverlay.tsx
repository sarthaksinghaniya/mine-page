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
      <div className="w-40 h-40 rounded-full border-[3px] border-white/80 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden relative bg-[#5e8b4e]">
        {/* Fake Map Texture Overlay */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(circle, #7cb342 20%, transparent 20%), radial-gradient(circle, #7cb342 20%, transparent 20%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }}
        />
        {/* Player Cursor */}
        <div 
          className="absolute w-3 h-3 bg-red-500 rounded border border-white z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
        />
        {/* N / S / E / W indicators */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-white/80 text-[10px] font-bold">N</div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-white/80 text-[10px] font-bold">S</div>
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white/80 text-[10px] font-bold">W</div>
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white/80 text-[10px] font-bold">E</div>
      </div>

      {/* Location & Time */}
      <div className="flex flex-col gap-1 ml-2 drop-shadow-md">
        <div className="flex items-center gap-1.5 text-white">
          <MapPin size={14} className="text-cyan-400" />
          <span className="font-bold text-sm tracking-wide">Developer Land</span>
        </div>
        <div className="text-gray-300 text-xs font-medium ml-5">
          {focusedZoneId ? focusedZoneId : 'Central Plaza'}
        </div>
        <div className="flex items-center gap-1.5 text-white mt-1">
          <Sun size={14} className="text-yellow-400" />
          <span className="font-bold text-sm">{time}</span>
        </div>
      </div>
    </div>
  );
}
