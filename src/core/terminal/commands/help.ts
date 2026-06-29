/**
 * @file src/core/terminal/commands/help.ts
 * @description Help catalog command.
 */

import type { TerminalCommand } from '../terminal.types';
import { TerminalManager } from '../TerminalManager';

export const helpCommand: TerminalCommand = {
  keyword: 'help',
  description: 'Show list of all available commands',
  execute: () => {
    const lines = TerminalManager.getCommands().map(
      (c) => `${c.keyword.padEnd(12)} - ${c.description}`
    );
    return ['Available commands:', ...lines].join('\n');
  },
};
