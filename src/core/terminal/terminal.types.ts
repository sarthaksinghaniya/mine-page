/**
 * @file src/core/terminal/terminal.types.ts
 * @description Command schemas, line outputs, history, and console types.
 */

export interface TerminalOutputLine {
  id: string;
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export interface TerminalCommand {
  keyword: string;
  description: string;
  execute: (args: string[]) => Promise<string> | string;
}

export interface TerminalState {
  isOpen: boolean;
  activeId: string | null;
  history: string[];
  lines: TerminalOutputLine[];
}
