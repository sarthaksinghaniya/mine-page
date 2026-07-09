/**
 * @file src/ui/hud/components/QuestTracker.tsx
 * @description Middle-right quest tracker overlay.
 */

import React from 'react';
import { X, CheckSquare } from 'lucide-react';

export function QuestTracker(): React.ReactElement {
  return (
    <div className="bg-[rgba(40,55,75,0.8)] backdrop-blur-md rounded-xl p-4 w-64 shadow-lg border border-white/10 pointer-events-auto">
      <div className="flex justify-between items-start mb-1">
        <span className="text-[10px] font-bold text-gray-300 tracking-wider">CURRENT QUEST</span>
        <button className="text-gray-400 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>
      
      <h3 className="text-yellow-400 font-bold text-sm mb-3 drop-shadow-sm">Explore the world</h3>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-white/90">Visit all districts</span>
        <div className="flex items-center gap-1.5 text-gray-300">
          <span className="text-xs">0/8</span>
          <div className="w-4 h-4 rounded border border-gray-400 flex items-center justify-center bg-black/20"></div>
        </div>
      </div>
    </div>
  );
}
