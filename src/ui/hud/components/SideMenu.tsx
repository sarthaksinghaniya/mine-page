/**
 * @file src/ui/hud/components/SideMenu.tsx
 * @description Left sidebar navigation menu.
 */

import React from 'react';
import { Map as MapIcon, Terminal, Lightbulb, FolderKanban, Trophy, Briefcase, FileText, Mail } from 'lucide-react';

export function SideMenu(): React.ReactElement {
  const items = [
    { id: 'map', icon: <MapIcon size={18} />, label: 'Map' },
    { id: 'terminal', icon: <Terminal size={18} />, label: 'Terminal' },
    { id: 'skills', icon: <Lightbulb size={18} />, label: 'Skills', active: true },
    { id: 'projects', icon: <FolderKanban size={18} />, label: 'Projects' },
    { id: 'achievements', icon: <Trophy size={18} />, label: 'Achievements' },
    { id: 'experience', icon: <Briefcase size={18} />, label: 'Experience' },
    { id: 'resume', icon: <FileText size={18} />, label: 'Resume' },
    { id: 'contact', icon: <Mail size={18} />, label: 'Contact' },
  ];

  return (
    <div className="flex flex-col h-full justify-center pointer-events-auto mt-16 pl-4">
      <div className="bg-slate-900/40 backdrop-blur-2xl rounded-2xl py-4 px-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 w-56 transition-all duration-300">
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-4 px-4 py-3 w-full rounded-xl text-left transition-all duration-300 relative group overflow-hidden ${
                item.active 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-white shadow-[inset_0_0_20px_rgba(6,182,212,0.15)] border border-cyan-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {item.active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-3/4 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] rounded-r-full" />
              )}
              <span className={`transition-transform duration-300 group-hover:scale-110 ${item.active ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}>
                {item.icon}
              </span>
              <span className={`font-medium text-sm tracking-wide ${item.active ? 'drop-shadow-md font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 pl-4 flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
        <kbd className="bg-slate-800/80 border border-slate-600 text-slate-200 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest shadow-[0_2px_4px_rgba(0,0,0,0.5)]">TAB</kbd>
        <span className="text-slate-300 text-xs font-medium tracking-wide">Toggle Menu</span>
      </div>
    </div>
  );
}
