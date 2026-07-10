import React, { useEffect, useState } from 'react';
import { useNpcStore } from '@/features/npc/npc.store';
import { DialogueManager } from '@/features/npc/DialogueManager';
import { MessageSquare, Terminal } from 'lucide-react';

export function DialogueOverlay(): React.ReactElement | null {
  const { interactionState, activeDialogue, isTyping } = useNpcStore();
  const [displayedText, setDisplayedText] = useState('');

  // Typewriter effect
  useEffect(() => {
    if (!activeDialogue || isTyping) {
      setDisplayedText('');
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(activeDialogue.text.substring(0, i));
      i++;
      if (i > activeDialogue.text.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [activeDialogue, isTyping]);

  if (interactionState !== 'talking') return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-12 pointer-events-none">
      <div className="w-[90%] max-w-3xl pointer-events-auto">
        <div className="bg-[rgba(5,5,15,0.85)] backdrop-blur-xl border border-[var(--color-primary-500)] rounded-2xl shadow-[0_0_40px_rgba(2,132,199,0.4)] overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="px-6 py-3 border-b border-[var(--color-primary-800)] bg-[rgba(255,255,255,0.05)] flex items-center gap-3">
            <MessageSquare size={18} className="text-[var(--color-primary-400)]" />
            <h3 className="font-bold text-[var(--color-text-primary)] tracking-widest uppercase">Nexus AI Guide</h3>
            {isTyping && (
              <span className="ml-auto text-[10px] text-[var(--color-primary-400)] animate-pulse tracking-widest">
                ANALYZING...
              </span>
            )}
          </div>

          {/* Dialogue Text */}
          <div className="p-6 min-h-[120px]">
            {isTyping ? (
              <div className="flex gap-2 items-center text-[var(--color-primary-400)] opacity-50 h-full">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            ) : (
              <p className="text-lg text-slate-200 leading-relaxed font-medium">
                {displayedText}
              </p>
            )}
          </div>

          {/* Options */}
          {activeDialogue && !isTyping && activeDialogue.options.length > 0 && (
            <div className="p-4 bg-[rgba(0,0,0,0.4)] border-t border-[rgba(255,255,255,0.1)] flex flex-col gap-2">
              {activeDialogue.options.map((option, idx) => (
                <button
                  key={option.id}
                  onClick={() => DialogueManager.handleOptionSelect(option)}
                  className="text-left px-4 py-3 rounded-lg border border-transparent hover:border-[var(--color-primary-500)] hover:bg-[rgba(2,132,199,0.2)] transition-all flex items-center gap-3 text-slate-300 hover:text-white group"
                >
                  <span className="text-[var(--color-primary-500)] text-sm font-bold opacity-70 group-hover:opacity-100">
                    [{idx + 1}]
                  </span>
                  {option.action === 'run_terminal' && <Terminal size={14} className="text-[var(--color-primary-400)]" />}
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
