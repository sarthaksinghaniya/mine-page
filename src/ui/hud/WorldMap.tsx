/**
 * @file src/ui/hud/WorldMap.tsx
 * @description Fullscreen animated AAA World Map.
 */

import React, { useEffect, useState } from 'react';
import { usePlayerStore } from '@/features/player/player.store';

export function WorldMap(): React.ReactElement | null {
  const [isOpen, setIsOpen] = useState(false);
  const position = usePlayerStore((s) => s.position);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyM') {
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-11/12 max-w-5xl h-[80vh] bg-[var(--color-bg-surface)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--color-border-strong)] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg-elevated)]">
          <h2 className="text-xl font-bold tracking-widest text-[var(--color-text-primary)]">WORLD MAP</h2>
          <button 
            onClick={() => { setIsOpen(false); }}
            className="w-8 h-8 rounded-full bg-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-primary-500)] text-[var(--color-text-primary)] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Map Body */}
        <div className="flex-1 relative bg-[#e0f2fe] overflow-hidden cursor-crosshair">
          {/* Fake Grid lines */}
          <div className="absolute inset-0 border-[var(--color-primary-200)] border-[0.5px] opacity-20" style={{ backgroundImage: 'linear-gradient(var(--color-primary-300) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary-300) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
          
          {/* Player Indicator (mock mapped coordinates) */}
          <div 
            className="absolute w-4 h-4 bg-[var(--color-primary-500)] rounded-full shadow-[0_0_15px_rgba(2,132,199,0.8)] border-2 border-white z-10 animate-pulse"
            style={{
              left: `calc(50% + ${position.x * 2}px)`,
              top: `calc(50% + ${position.z * 2}px)`,
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
