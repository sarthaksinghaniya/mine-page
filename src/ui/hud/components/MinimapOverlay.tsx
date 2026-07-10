/**
 * @file src/ui/hud/components/MinimapOverlay.tsx
 * @description Bottom-left circular minimap.
 */

import React from 'react';
import { useWorldStore } from '@/features/world/world.store';
import { usePlayerStore } from '@/features/player/player.store';
import { DISTRICTS_LIST } from '@/features/buildings/district.types';
import { MapPin, Sun } from 'lucide-react';

export function MinimapOverlay(): React.ReactElement {
  const focusedZoneId = useWorldStore((s) => s.focusedZoneId);
  const position = usePlayerStore((s) => s.position);
  const time = '10:30 AM';

  const currentDistrict = DISTRICTS_LIST.find(d => d.id === focusedZoneId);
  const districtName = currentDistrict ? currentDistrict.name : 'Wilderness';
  const subtitle = currentDistrict ? 'Central Hub' : 'Uncharted Territory';

  // Map 3D coordinates to 2D image offsets
  // World bounds roughly -1000 to 1000
  const mapScale = 4; // Image is 400% larger than the container
  const offsetX = (position.x / 1000) * 50; 
  const offsetY = (position.z / 1000) * 50;

  return (
    <div className="pointer-events-auto relative z-10 flex items-center gap-5">
      <div className="relative h-[182px] w-[182px] overflow-hidden rounded-full border-[5px] border-white bg-slate-900 shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
        <div 
          className="absolute inset-0 transition-transform duration-100 ease-linear"
          style={{ 
            width: `${mapScale * 100}%`, 
            height: `${mapScale * 100}%`, 
            left: `-${(mapScale - 1) * 50}%`, 
            top: `-${(mapScale - 1) * 50}%`,
            transform: `translate(${-offsetX}%, ${-offsetY}%)` 
          }}
        >
          <img
            src="/assets/ref-minimap.png"
            alt="Minimap"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
        <div className="absolute left-1/2 top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-sm border border-white bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        <div className="absolute left-1/2 top-3 -translate-x-1/2 text-[12px] font-extrabold text-white drop-shadow-md">N</div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[12px] font-extrabold text-white drop-shadow-md">S</div>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] font-extrabold text-white drop-shadow-md">W</div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-extrabold text-white drop-shadow-md">E</div>
      </div>

      {/* Location & Time */}
      <div className="mb-2 flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-2 text-white drop-shadow-md">
            <MapPin size={18} className="text-sky-400" fill="currentColor" />
            <span className="text-[18px] font-extrabold tracking-wide uppercase">{districtName}</span>
          </div>
          <div className="ml-7 text-[15px] font-semibold text-slate-200/95 uppercase tracking-wider">
            {subtitle}
          </div>
        </div>
        <div className="mt-1 flex items-center gap-2 text-white drop-shadow-md">
          <Sun size={18} className="text-yellow-400" fill="currentColor" />
          <span className="text-[18px] font-extrabold">{time}</span>
        </div>
      </div>
    </div>
  );
}
