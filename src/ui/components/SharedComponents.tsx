/**
 * @file src/ui/components/SharedComponents.tsx
 * @description Shared UI components (loaders, error states, stat cards).
 */


import { Card, Button } from '@/ui/system';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function SkeletonLoader({ count = 1, height = '150px' }: { count?: number; height?: string }) {
  return (
    <>
      <style>
        {`
          @keyframes pulse-skeleton {
            0% { opacity: 0.3; background-color: rgba(255,255,255,0.05); }
            50% { opacity: 0.7; background-color: rgba(0,229,240,0.1); }
            100% { opacity: 0.3; background-color: rgba(255,255,255,0.05); }
          }
        `}
      </style>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 w-full">
        {[...Array(count)].map((_, i) => (
          <Card
            key={i}
            variant="default"
            padding="none"
            className="w-full border-none"
            style={{
              height,
              animation: 'pulse-skeleton 2s infinite ease-in-out',
            }}
          />
        ))}
      </div>
    </>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Card variant="default" className="flex flex-col items-center justify-center p-8 text-center !bg-[rgba(255,0,85,0.05)] !border-[rgba(255,0,85,0.2)]">
      <AlertTriangle size={32} className="text-[#ff0055] mb-4" />
      <h3 className="m-0 mb-4 text-xl font-bold text-[#ff0055]">SYSTEM_ERROR</h3>
      <p className="text-[var(--color-text-secondary)] mb-6">{message}</p>
      {onRetry && (
        <Button variant="danger" onClick={onRetry} icon={<RefreshCw size={16} />}>
          REINITIALIZE_CONNECTION
        </Button>
      )}
    </Card>
  );
}

export function StatCard({ label, value, icon }: { label: string; value: string | number; icon?: string }) {
  return (
    <Card variant="glow" interactive className="flex flex-col items-center justify-center gap-3 text-center min-w-[150px]">
      {icon && <span className="text-3xl drop-shadow-[0_0_10px_rgba(0,229,240,0.5)]">{icon}</span>}
      <span className="neon-text-primary text-4xl font-bold leading-none">{value}</span>
      <h4 className="m-0 text-[13px] text-[var(--color-text-secondary)] uppercase tracking-widest font-semibold">{label}</h4>
    </Card>
  );
}
