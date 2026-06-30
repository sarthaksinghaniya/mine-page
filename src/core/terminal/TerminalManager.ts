import { generateUUID } from '@shared/utils/uuid';
import { eventBus } from '@core/events/EventBus';
import type { TerminalCommand, TerminalOutputLine, TerminalState } from './terminal.types';
import { helpCommand } from './commands/help';
import { projectsCommand } from './commands/projects';
import { skillsCommand } from './commands/skills';
import { GitHubService } from '@core/data/GitHubService';
import { LeetCodeService } from '@core/data/LeetCodeService';
import { CodeforcesService } from '@core/data/CodeforcesService';
import { PortfolioAnalytics } from '@core/data/PortfolioAnalytics';

class TerminalManagerClass {
  private readonly commands = new Map<string, TerminalCommand>();
  private readonly state: TerminalState = {
    isOpen: false,
    activeId: null,
    history: [],
    lines: [],
  };

  // UI state change callback listener hooks
  private onStateChange: ((state: TerminalState) => void) | null = null;

  constructor() {
    this.registerDefaults();
  }

  register(cmd: TerminalCommand): void {
    this.commands.set(cmd.keyword, cmd);
  }

  unregister(keyword: string): void {
    this.commands.delete(keyword);
  }

  getCommands(): TerminalCommand[] {
    return Array.from(this.commands.values());
  }

  private registerDefaults(): void {
    this.register(helpCommand);
    this.register(projectsCommand);
    this.register(skillsCommand);

    this.register({
      keyword: 'clear',
      description: 'Clear the terminal output screen',
      execute: () => {
        this.state.lines = [];
        this.notify();
        return '';
      },
    });

    this.register({
      keyword: 'exit',
      description: 'Close the interactive terminal window',
      execute: () => {
        this.close();
        return 'Closing terminal...';
      },
    });

    this.register({
      keyword: 'github',
      description: 'Fetch live GitHub stats. Usage: github [username]',
      execute: async (args) => {
        const username = args[0] || 'sarthaksinghaniya';
        const profile = await GitHubService.fetchProfile(username);
        if (!profile) return `Failed to load GitHub data for ${username}`;
        return `GitHub: ${profile.login}\nRepos: ${profile.public_repos}\nFollowers: ${profile.followers}`;
      }
    });

    this.register({
      keyword: 'leetcode',
      description: 'Fetch live LeetCode stats. Usage: leetcode [username]',
      execute: async (args) => {
        const username = args[0] || 'sarthaksinghaniya';
        const profile = await LeetCodeService.fetchProfile(username);
        if (!profile) return `Failed to load LeetCode data for ${username}`;
        return `LeetCode Solved: ${profile.totalSolved} (E: ${profile.easySolved}, M: ${profile.mediumSolved}, H: ${profile.hardSolved})`;
      }
    });

    this.register({
      keyword: 'codeforces',
      description: 'Fetch live Codeforces stats. Usage: codeforces [username]',
      execute: async (args) => {
        const username = args[0] || 'sarthaksinghaniya';
        const profile = await CodeforcesService.fetchProfile(username);
        if (!profile) return `Failed to load Codeforces data for ${username}`;
        return `Codeforces: ${profile.handle} | Rating: ${profile.rating} | Rank: ${profile.rank}`;
      }
    });

    this.register({
      keyword: 'analytics',
      description: 'View aggregated developer score',
      execute: async () => {
        const stats = await PortfolioAnalytics.aggregateScores('sarthaksinghaniya', 'sarthaksinghaniya', 'sarthaksinghaniya');
        return `DEVELOPER SCORE: ${stats.activityScore}\nTotal Projects: ${stats.totalProjects}\nTotal Stars: ${stats.totalStars}\nTotal Forks: ${stats.totalForks}`;
      }
    });
  }

  open(terminalId: string): void {
    this.state.isOpen = true;
    this.state.activeId = terminalId;
    this.state.lines = [
      {
        id: generateUUID(),
        text: `Initializing terminal interface... [ID: ${terminalId}]`,
        type: 'success',
      },
      { id: generateUUID(), text: 'Type "help" for a list of available commands.', type: 'output' },
    ];
    this.notify();
    eventBus.emit('ui:menuOpened', { menuId: `terminal-${terminalId}` });
  }

  close(): void {
    this.state.isOpen = false;
    this.state.activeId = null;
    this.notify();
    eventBus.emit('ui:menuClosed', { menuId: 'terminal-window' });
  }

  async execute(inputLine: string): Promise<void> {
    const raw = inputLine.trim();
    if (!raw) return;

    // Record history
    this.state.history.push(raw);
    this.state.lines.push({ id: generateUUID(), text: `> ${raw}`, type: 'input' });
    this.notify();

    const tokens = raw.split(/\s+/);
    const keyword = tokens[0]!.toLowerCase();
    const args = tokens.slice(1);

    const cmd = this.commands.get(keyword);
    if (!cmd) {
      this.state.lines.push({
        id: generateUUID(),
        text: `Error: command not found "${keyword}". Type "help" to list commands.`,
        type: 'error',
      });
      this.notify();
      return;
    }

    try {
      const output = await cmd.execute(args);
      if (output) {
        this.state.lines.push({ id: generateUUID(), text: output, type: 'output' });
        this.notify();
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      this.state.lines.push({ id: generateUUID(), text: `Error: ${errorMsg}`, type: 'error' });
      this.notify();
    }
  }

  subscribe(listener: (state: TerminalState) => void): () => void {
    this.onStateChange = listener;
    // Initial sync
    listener({ ...this.state });
    return () => {
      this.onStateChange = null;
    };
  }

  private notify(): void {
    this.onStateChange?.({ ...this.state });
  }

  isOpen(): boolean {
    return this.state.isOpen;
  }
}

export const TerminalManager = new TerminalManagerClass();
