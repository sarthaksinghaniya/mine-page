/**
 * @file src/ui/hud/TerminalWindow.tsx
 * @description 2D overlay console UI rendering input streams and typewriter print lines.
 */

import React, { useEffect, useState, useRef } from 'react';
import { TerminalManager } from '@core/terminal/TerminalManager';
import type { TerminalState, TerminalOutputLine } from '@core/terminal/terminal.types';

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

  if (!state || !state.isOpen) return null;

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
        backgroundColor: 'rgba(5, 5, 8, 0.95)',
        border: '1px solid #00e5f0',
        boxShadow: '0 0 30px rgba(0, 229, 240, 0.25)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'monospace',
        zIndex: 40, // Z_MENU
        color: '#f0f0ff',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          borderBottom: '1px solid rgba(0, 229, 240, 0.3)',
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '13px',
          color: '#00e5f0',
        }}
      >
        <span>TERMINAL SHELL INTERFACE (ESC TO CLOSE)</span>
        <button
          onClick={() => TerminalManager.close()}
          style={{
            background: 'none',
            border: 'none',
            color: '#ff3b30',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          ✖
        </button>
      </div>

      {/* Output scroll box */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          fontSize: '14px',
          lineHeight: '1.4',
        }}
      >
        {state.lines.map((line) => (
          <div key={line.id} style={{ color: getColor(line.type), whiteSpace: 'pre-wrap' }}>
            {line.text}
          </div>
        ))}
      </div>

      {/* Input console line */}
      <form
        onSubmit={handleSubmit}
        style={{
          borderTop: '1px solid rgba(0, 229, 240, 0.2)',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ color: '#00e5f0', fontWeight: 'bold' }}>&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            color: '#00e5f0',
            fontFamily: 'monospace',
            fontSize: '14px',
            outline: 'none',
          }}
          placeholder="Type commands..."
        />
      </form>
    </div>
  );
}
export default TerminalWindow;
