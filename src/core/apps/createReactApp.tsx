/**
 * @file src/core/apps/createReactApp.tsx
 * @description Helper to create a PortfolioApp from a lazily loaded React component.
 */

import React, { Suspense } from 'react';
import { createRoot, Root } from 'react-dom/client';
import type { PortfolioApp } from './app.types';
import { ApplicationLoader } from '@ui/apps/ApplicationLoader';

export function createReactApp(
  id: string,
  title: string,
  importFn: () => Promise<{ default: React.ComponentType<any> }>,
  icon?: string
): PortfolioApp {
  let root: Root | null = null;
  const LazyComponent = React.lazy(importFn);

  return {
    id,
    title,
    icon,
    load: async () => {
      // Preload the chunk if possible
      await importFn();
    },
    mount: (container: HTMLElement) => {
      if (!root) {
        root = createRoot(container);
      }
      root.render(
        <Suspense fallback={<ApplicationLoader appId={id} />}>
          <LazyComponent />
        </Suspense>
      );
    },
    unmount: (container: HTMLElement) => {
      if (root) {
        root.unmount();
        root = null;
      }
    },
    dispose: () => {
      if (root) {
        root.unmount();
        root = null;
      }
    },
    onOpen: async () => {
      console.log(`[AppLifecycle] onOpen: ${title}`);
    },
    onClose: async () => {
      console.log(`[AppLifecycle] onClose: ${title}`);
    }
  };
}
