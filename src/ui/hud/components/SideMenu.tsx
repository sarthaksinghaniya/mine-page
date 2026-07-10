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
    <div className="pointer-events-auto relative z-20 flex h-full flex-col justify-center pl-4">
      <div className="w-[290px] rounded-[24px] border border-white/10 bg-slate-900/78 px-4 py-5 shadow-[0_18px_45px_rgba(0,0,0,0.3)] backdrop-blur-md">
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl px-4 py-4 text-left transition-all duration-300 ${
                item.active 
                  ? 'border border-sky-400/55 bg-sky-500/20 text-white shadow-[0_0_0_1px_rgba(56,189,248,0.18),inset_0_0_20px_rgba(56,189,248,0.12)]'
                  : 'border border-transparent text-slate-200 hover:border-white/5 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.active && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
              )}
              <span className={`transition-transform duration-300 group-hover:scale-110 ${item.active ? 'text-sky-300' : 'text-slate-300'}`}>
                {item.icon}
              </span>
              <span className={`text-[16px] tracking-wide ${item.active ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-3 flex items-center gap-3 pl-4 opacity-90 transition-opacity hover:opacity-100">
        <kbd className="rounded-md border border-white/10 bg-slate-800 px-2.5 py-1 text-[12px] font-bold text-slate-100 shadow-md">TAB</kbd>
        <span className="text-[18px] font-semibold tracking-wide text-white">Open Menu</span>
      </div>
    </div>
  );
}
