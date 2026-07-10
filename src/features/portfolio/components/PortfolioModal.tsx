import React from 'react';
import { usePortfolioStore } from '../portfolio.store';

export function PortfolioModal(): React.ReactElement | null {
  const activeItem = usePortfolioStore((s) => s.activeItem);
  const setActiveItem = usePortfolioStore((s) => s.setActiveItem);

  if (!activeItem) return null;

  const { type, data, categoryName } = activeItem;

  const handleClose = () => setActiveItem(null);

  // Esc key to close
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-slate-900/90 border border-white/20 rounded-2xl shadow-[0_0_50px_rgba(124,77,255,0.3)] p-8 custom-scrollbar">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {type === 'project' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full border ${data.rarity === 'Legendary' ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'bg-blue-500/20 text-blue-400 border-blue-500/50'}`}>
                {data.rarity} Project
              </span>
              <h2 className="text-4xl font-black text-white">{data.title}</h2>
              <p className="text-xl text-white/70">{data.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-black/50 p-4 rounded-xl border border-white/10">
                <h4 className="text-white/50 uppercase tracking-widest text-xs mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {data.tech.map((t: string) => (
                    <span key={t} className="px-2 py-1 bg-white/5 rounded text-white">{t}</span>
                  ))}
                </div>
              </div>
              <div className="bg-black/50 p-4 rounded-xl border border-white/10">
                <h4 className="text-white/50 uppercase tracking-widest text-xs mb-2">Architecture</h4>
                <p className="text-white/90">{data.architecture}</p>
              </div>
            </div>

            <div className="bg-black/50 p-4 rounded-xl border border-white/10">
              <h4 className="text-white/50 uppercase tracking-widest text-xs mb-2">Highlights</h4>
              <ul className="list-disc list-inside text-white/90 space-y-1">
                {data.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          </div>
        )}

        {type === 'experience' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-full border bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
                Work Experience
              </span>
              <h2 className="text-4xl font-black text-white">{data.role}</h2>
              <h3 className="text-2xl text-emerald-400 font-bold">@ {data.company}</h3>
              <p className="text-lg text-white/50 uppercase tracking-widest">{data.period}</p>
            </div>
            <p className="text-xl text-white/80">{data.description}</p>
            
            <div className="bg-black/50 p-6 rounded-xl border border-white/10">
              <h4 className="text-white/50 uppercase tracking-widest text-xs mb-4">Key Contributions</h4>
              <ul className="list-disc list-inside text-white/90 space-y-2">
                {data.points.map((p: string, i: number) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>
        )}

        {type === 'skill_category' && (
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-white">{categoryName} Core</h2>
            <p className="text-xl text-white/70">Datacenter Matrix containing {data.length} synchronized nodes.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.map((skill: any) => (
                <div key={skill.id} className="bg-black/50 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors">
                  <span className={`text-2xl mb-2 ${skill.rarity === 'Legendary' ? 'text-yellow-400' : 'text-blue-400'}`}>
                    {/* Placeholder for icon, just use name initials if no actual icon component is imported */}
                    {skill.name.substring(0, 2).toUpperCase()}
                  </span>
                  <h4 className="text-white font-bold">{skill.name}</h4>
                  <span className="text-xs text-white/50">{skill.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
