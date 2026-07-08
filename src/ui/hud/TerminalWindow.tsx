/**
 * @file src/ui/hud/TerminalWindow.tsx
 * @description 2D overlay console UI rendering input streams and typewriter print lines.
 */

import React, { useEffect, useState, useRef } from 'react';
import { TerminalManager } from '@core/terminal/TerminalManager';
import type { TerminalState, TerminalOutputLine } from '@core/terminal/terminal.types';
import { Card, Input, Button, Badge } from '@/ui/system';
import { X, Terminal as TerminalIcon } from 'lucide-react';

export function TerminalWindow(): React.ReactElement | null {
  const [state, setState] = useState<TerminalState | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subscribe to TerminalManager state updates
    const unsub = TerminalManager.subscribe((next) => {
      setState(next);
      setHistoryIndex(-1);
    });

    return () => {
      unsub();
    };
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state?.lines.length]);

  // Focus input automatically on open
  useEffect(() => {
    if (state?.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state?.isOpen]);

  if (!state?.isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    if (!cmd) return;

    setInputValue('');
    await TerminalManager.execute(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      TerminalManager.close();
      return;
    }

    // Command autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const currentInput = inputValue.trim().toLowerCase();
      if (!currentInput) return;

      const matched = TerminalManager.getCommands().find((c) => c.keyword.startsWith(currentInput));
      if (matched) {
        setInputValue(matched.keyword);
      }
      return;
    }

    // Command history traversal
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIdx = historyIndex + 1;
      const history = state.history;
      if (nextIdx < history.length) {
        setHistoryIndex(nextIdx);
        setInputValue(history[history.length - 1 - nextIdx] ?? '');
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const prevIdx = historyIndex - 1;
      const history = state.history;
      if (prevIdx >= 0) {
        setHistoryIndex(prevIdx);
        setInputValue(history[history.length - 1 - prevIdx] ?? '');
      } else {
        setHistoryIndex(-1);
        setInputValue('');
      }
      return;
    }
  };

  const getColor = (type: TerminalOutputLine['type']) => {
    if (type === 'error') return '#ff3b30';
    if (type === 'success') return '#34c759';
    if (type === 'input') return '#00e5f0';
    return '#a0a0c0';
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '10%',
        left: '10%',
        width: '80%',
        height: '80%',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Card variant="glow" padding="none" className="h-full flex flex-col font-mono shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
        {/* Header bar */}
        <div
          style={{
            borderBottom: '1px solid var(--color-border)',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <span className="flex items-center gap-2 text-xs text-[var(--color-primary-400)] tracking-widest font-bold">
            <Badge variant="default" className="!px-1.5 !py-0.5"><TerminalIcon size={12} className="inline mr-1"/> SHELL</Badge>
            NEXUS_TERMINAL_SESSION
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => { TerminalManager.close(); }} 
            icon={<X size={16} />} 
            className="!p-1 hover:!text-[#ff3b30] hover:!bg-[rgba(255,59,48,0.1)]" 
          />
        </div>

      {/* Output scroll box */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '14px',
          lineHeight: '1.6',
        }}
      >
        {state.lines.map((line) => (
          <div key={line.id} style={{ color: getColor(line.type), whiteSpace: 'pre-wrap', textShadow: '0 0 10px rgba(255,255,255,0.1)' }}>
            {line.text}
          </div>
        ))}
      </div>

      {/* Input console line */}
      <form
        onSubmit={handleSubmit}
        style={{
          borderTop: '1px solid var(--color-border)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        <span className="neon-text-primary" style={{ fontWeight: 'bold' }}>❯</span>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder="Enter command..."
          autoComplete="off"
          spellCheck="false"
          fullWidth
          className="!bg-transparent !border-none !px-0 !text-[15px] !font-mono !text-[var(--color-primary-300)] !shadow-none focus:!shadow-none focus:!ring-0 placeholder-[rgba(0,229,240,0.3)]"
        />
      </form>
      </Card>
    </div>
  );
}
export default TerminalWindow;
