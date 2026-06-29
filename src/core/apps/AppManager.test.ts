/**
 * @file src/core/apps/AppManager.test.ts
 * @description Unit tests for AppManager and application overlays.
 */

import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AppManager } from './AppManager';

describe('AppManager', () => {
  beforeEach(() => {
    AppManager.close();
  });

  it('correctly registers apps and reports defaults', () => {
    expect(AppManager.isOpen()).toBe(false);
    expect(AppManager.getActiveAppId()).toBeNull();
  });

  it('opens and closes registered applications', () => {
    AppManager.register({
      id: 'test-app',
      title: 'Test App',
      mount: () => React.createElement('div', null, 'hello'),
    });

    expect(AppManager.getApps().length).toBeGreaterThan(0);
    AppManager.open('test-app');
    expect(AppManager.isOpen()).toBe(true);
    expect(AppManager.getActiveAppId()).toBe('test-app');

    AppManager.close();
    expect(AppManager.isOpen()).toBe(false);
  });
});
