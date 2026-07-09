/**
 * @file src/ui/hud/HUDOverlay.tsx
 * @description AAA-style HUD overlay combining minimap, compass, and basic quest tracker.
 */

import React, { useEffect, useState } from 'react';
import { usePlayerStore } from '@/features/player/player.store';
import { useWorldStore } from '@/features/world/world.store';
import { Compass, Map as MapIcon, Crosshair } from 'lucide-react';

export function HUDOverlay(): React.ReactElement {
  const position = usePlayerStore((s) => s.position);
  const focusedZoneId = useWorldStore((s) => s.focusedZoneId);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        {/* Top Left: Mini Map / Zone Info */}
        <div className="bg-[var(--color-bg-glass)] backdrop-blur-md rounded-2xl p-4 shadow-[var(--glow-primary)] border border-[var(--color-border)] pointer-events-auto flex flex-col gap-2 w-64 transition-transform hover:scale-105">
          <div className="flex justify-between items-center text-[var(--color-text-primary)]">
            <span className="font-bold text-sm tracking-wide">
              {focusedZoneId ? focusedZoneId.toUpperCase() : 'WILDERNESS'}
            </span>
            <MapIcon size={16} />
          </div>
          <div className="text-xs text-[var(--color-text-secondary)] font-mono">
            {time} • {Math.round(position.x)}, {Math.round(position.y)}, {Math.round(position.z)}
          </div>
          
          <div className="mt-2 text-xs">
            <div className="text-[var(--color-primary-500)] font-semibold mb-1 flex items-center gap-1">
              <Crosshair size={12} /> Current Objective
            </div>
            <div className="text-[var(--color-text-primary)]">Explore the AI Research Lab</div>
          </div>
        </div>

        {/* Top Right: Compass */}
        <div className="bg-[var(--color-bg-glass)] backdrop-blur-md rounded-full px-6 py-2 shadow-[var(--glow-primary)] border border-[var(--color-border)] flex items-center gap-4 text-[var(--color-text-primary)] font-bold tracking-widest text-sm pointer-events-auto">
          <span>W</span>
          <span className="text-[var(--color-primary-500)]">N</span>
          <span>E</span>
          <Compass size={18} className="text-[var(--color-text-secondary)]" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-end">
        {/* Bottom Left: Player Stats */}
        <div className="flex gap-4">
          <div className="bg-[var(--color-bg-glass)] backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-[var(--color-border)] flex items-center gap-2 pointer-events-auto">
            <div className="w-6 h-6 rounded-full bg-[var(--color-accent-500)] flex items-center justify-center text-white text-xs font-bold">
              14
            </div>
            <span className="text-sm font-bold text-[var(--color-text-primary)]">Developer LVL</span>
          </div>
        </div>
        
        {/* Bottom Right: Hints */}
        <div className="bg-[var(--color-bg-glass)] backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] font-medium pointer-events-auto">
          Press <kbd className="bg-white/20 px-2 py-1 rounded text-xs">M</kbd> for World Map
        </div>
      </div>
    </div>
  );
}
