/**
 * @file src/core/terminal/TerminalManager.test.ts
 * @description Unit tests for command parser and registry loops.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { TerminalManager } from './TerminalManager';

describe('TerminalManager', () => {
  beforeEach(() => {
    TerminalManager.close();
  });

  it('correctly reports initial state indices', () => {
    expect(TerminalManager.isOpen()).toBe(false);
  });

  it('opens and registers custom commands correctly', async () => {
    let called = false;
    TerminalManager.register({
      keyword: 'testcmd',
      description: 'Test command description',
      execute: () => {
        called = true;
        return 'success';
      },
    });

    TerminalManager.open('test-console');
    expect(TerminalManager.isOpen()).toBe(true);

    await TerminalManager.execute('testcmd');
    expect(called).toBe(true);

    TerminalManager.unregister('testcmd');
  });
});
