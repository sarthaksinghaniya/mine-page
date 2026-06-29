/**
 * @file src/core/terminal/commands/projects.ts
 * @description Projects catalog query command.
 */

import type { TerminalCommand } from '../terminal.types';
import { PortfolioDataService } from '@/core/data/PortfolioDataService';

export const projectsCommand: TerminalCommand = {
  keyword: 'projects',
  description: 'List portfolio projects or inspect a specific project details (e.g. projects ecosphere-ai)',
  execute: (args) => {
    const service = PortfolioDataService;
    const targetId = args[0];

    if (!targetId) {
      const list = service.getProjects().map(
        (p) => `${p.id.padEnd(16)} - ${p.title} (${p.summary})`
      );
      return [
        'Portfolio Projects:',
        ...list,
        '\nType "projects <project-id>" to inspect full technical details.',
      ].join('\n');
    }

    const proj = service.getProject(targetId);
    if (!proj) {
      return `Error: Project "${targetId}" not found. Type "projects" to list all ids.`;
    }

    return [
      `TITLE:        ${proj.title}`,
      `ROLE:         ${proj.role}`,
      `SUMMARY:      ${proj.summary}`,
      `DESCRIPTION:  ${proj.description}`,
      `STACK:        ${proj.technologies.join(', ')}`,
    ].join('\n');
  },
};
export default projectsCommand;
