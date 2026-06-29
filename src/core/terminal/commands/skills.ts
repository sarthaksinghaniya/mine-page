/**
 * @file src/core/terminal/commands/skills.ts
 * @description Skills catalog query command.
 */

import type { TerminalCommand } from '../terminal.types';
import { PortfolioDataService } from '@/core/data/PortfolioDataService';

export const skillsCommand: TerminalCommand = {
  keyword: 'skills',
  description: 'List skill categories or show details for a specific skill (e.g. skills web)',
  execute: (args) => {
    const service = PortfolioDataService;
    const filter = args.join(' ').toLowerCase().trim();

    if (!filter) {
      const list = service.getSkills().map((cat) => {
        const itemNames = cat.items.map((i) => i.name).join(', ');
        return `[${cat.category}]: ${itemNames}`;
      });
      return ['Technical Skills Stack:', ...list, '\nType "skills <category-substring>" to filter details.'].join('\n');
    }

    const matched = service.getSkills().filter((cat) =>
      cat.category.toLowerCase().includes(filter)
    );

    if (matched.length === 0) {
      return `No skill categories match filter: "${filter}"`;
    }

    const lines: string[] = [];
    matched.forEach((cat) => {
      lines.push(`--- ${cat.category.toUpperCase()} ---`);
      cat.items.forEach((item) => {
        lines.push(`${item.name.padEnd(28)} [Level: ${item.level}]`);
      });
    });

    return lines.join('\n');
  },
};
export default skillsCommand;
