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
    <div className="flex flex-col h-full justify-center pointer-events-auto mt-16">
      <div className="bg-[rgba(20,25,35,0.7)] backdrop-blur-md rounded-r-2xl py-3 shadow-lg border border-l-0 border-white/10 w-48">
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-3 px-4 py-2.5 w-full text-left transition-colors relative ${
                item.active 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.active && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] rounded-r-full" />
              )}
              <span className={item.active ? 'text-green-400' : ''}>{item.icon}</span>
              <span className="font-semibold text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pl-4 flex items-center gap-2">
        <kbd className="bg-black/50 border border-white/20 text-white px-2 py-1 rounded text-[10px] font-bold tracking-wider">TAB</kbd>
        <span className="text-white text-xs font-bold drop-shadow-md">Open Menu</span>
      </div>
    </div>
  );
}
