/**
 * @file src/ui/hud/components/QuestTracker.tsx
 * @description Middle-right quest tracker overlay.
 */

import React from 'react';
import { X, CheckSquare } from 'lucide-react';

export function QuestTracker(): React.ReactElement {
  return (
    <div className="bg-slate-900/40 backdrop-blur-2xl rounded-2xl p-5 w-72 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 pointer-events-auto transition-transform hover:-translate-x-1 cursor-default">
      <div className="flex justify-between items-start mb-1">
        <span className="text-[10px] font-bold text-gray-300 tracking-wider">CURRENT QUEST</span>
        <button className="text-gray-400 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>
      
      <h3 className="text-cyan-400 font-bold text-[15px] mb-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">Explore the world</h3>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-200 font-medium tracking-wide">Visit all districts</span>
        <div className="flex items-center gap-2 text-cyan-300">
          <span className="text-xs font-bold drop-shadow-sm">0/8</span>
          <div className="w-5 h-5 rounded border border-cyan-500/50 flex items-center justify-center bg-cyan-950/30 shadow-[inset_0_0_8px_rgba(34,211,238,0.2)]"></div>
        </div>
      </div>
    </div>
  );
}
