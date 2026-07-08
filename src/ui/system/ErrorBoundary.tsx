/**
 * @file src/ui/system/ErrorBoundary.tsx
 * @description Global error boundary to prevent blank screens on crash.
 */

import { Component, ErrorInfo, type ReactNode } from 'react';
import { Card, Button } from './index';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    // In a real app, might want to redirect to / or clear state
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex items-center justify-center w-full h-full min-h-screen bg-[var(--color-bg-void)] p-4">
          <Card variant="default" className="max-w-xl w-full flex flex-col items-center text-center p-8 border-[#ff0055]/30 bg-[#ff0055]/5">
            <AlertTriangle size={48} className="text-[#ff0055] mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold text-[#ff0055] tracking-widest mb-4 uppercase">
              System Failure
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              A critical error occurred while rendering this module. The environment has been halted to prevent data corruption.
            </p>
            <div className="w-full text-left bg-black/50 p-4 rounded-md overflow-auto border border-[#ff0055]/20 mb-8 max-h-[200px] text-xs font-mono text-[#ff0055]/80">
              {this.state.error?.message || 'Unknown Error'}
            </div>
            <Button variant="danger" size="lg" onClick={this.handleReset} icon={<RefreshCw size={18} />}>
              REBOOT SYSTEM
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
