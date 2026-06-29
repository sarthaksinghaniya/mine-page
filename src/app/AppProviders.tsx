/**
 * @file src/app/AppProviders.tsx
 * @description Root provider tree for the application.
 *
 * All global context providers are composed here in the correct order.
 * This keeps App.tsx clean and makes provider order explicit and testable.
 *
 * Provider order matters — dependencies must wrap their consumers:
 *  1. React.Suspense (lazy chunk loading boundary)
 *  2. ErrorBoundary (catches render errors)
 *
 * Note: Zustand stores are singletons and do not require React context.
 * The R3F Canvas creates its own GL context — it does NOT go here.
 */

import React, { type ReactNode } from 'react';

// ── Error Boundary ────────────────────────────────────────────────────────────

interface ErrorBoundaryState {
  hasError:  boolean;
  errorMessage: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class RootErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('[RootErrorBoundary] Uncaught error:', error, info);
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display:         'flex',
            flexDirection:   'column',
            alignItems:      'center',
            justifyContent:  'center',
            height:          '100vh',
            background:      '#050508',
            color:           '#f0f0ff',
            fontFamily:      'monospace',
            gap:             '16px',
            padding:         '24px',
          }}
        >
          <h1 style={{ color: '#ff0090', margin: 0 }}>System Failure</h1>
          <p style={{ color: '#a0a0c0', maxWidth: '480px', textAlign: 'center' }}>
            {this.state.errorMessage}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, errorMessage: '' })}
            style={{
              background: 'transparent',
              border:     '1px solid #00adc0',
              color:      '#00adc0',
              padding:    '8px 24px',
              cursor:     'pointer',
              fontFamily: 'monospace',
            }}
          >
            Reboot
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// ── AppProviders ──────────────────────────────────────────────────────────────

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Composes all application-level providers.
 * Add new providers here — never in App.tsx or feature components.
 */
export function AppProviders({ children }: AppProvidersProps): React.ReactElement {
  return (
    <RootErrorBoundary>
      <React.Suspense fallback={null}>
        {children}
      </React.Suspense>
    </RootErrorBoundary>
  );
}
