/**
 * @file src/app/main.tsx
 * @description Application entry point.
 *
 * Bootstraps the React application. Keeps this file minimal —
 * all provider setup lives in AppProviders.tsx.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/globals.css';
import '../styles/animations.css';
import { App } from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    '[main] Root element #root not found. Ensure index.html has <div id="root"></div>.',
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
