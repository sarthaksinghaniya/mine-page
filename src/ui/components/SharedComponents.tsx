/**
 * @file src/ui/components/SkeletonLoader.tsx
 * @description A generic, reusable loading skeleton matching the glassmorphism theme.
 */

import React from 'react';

export function SkeletonLoader({ count = 1, height = '150px' }: { count?: number; height?: string }) {
  return (
    <>
      <style>
        {`
          @keyframes pulse-skeleton {
            0% { opacity: 0.3; background-color: rgba(255,255,255,0.02); }
            50% { opacity: 0.7; background-color: rgba(0,229,240,0.05); }
            100% { opacity: 0.3; background-color: rgba(255,255,255,0.02); }
          }
        `}
      </style>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', width: '100%' }}>
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            style={{
              height,
              borderRadius: '8px',
              border: '1px solid rgba(0, 229, 240, 0.1)',
              animation: 'pulse-skeleton 2s infinite ease-in-out',
            }}
          />
        ))}
      </div>
    </>
  );
}

/**
 * @file src/ui/components/ErrorState.tsx
 * @description A generic error state component.
 */
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div style={{ padding: '24px', textAlign: 'center', color: '#ff4d4d', border: '1px solid rgba(255, 77, 77, 0.3)', borderRadius: '8px', backgroundColor: 'rgba(255, 77, 77, 0.05)' }}>
      <h3>Data Retrieval Error</h3>
      <p>{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          style={{ marginTop: '12px', padding: '8px 16px', backgroundColor: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', color: '#ff4d4d', borderRadius: '4px', cursor: 'pointer' }}
        >
          Retry Connection
        </button>
      )}
    </div>
  );
}

/**
 * @file src/ui/components/StatCard.tsx
 * @description A generic stat card for displaying analytics.
 */
export function StatCard({ label, value, icon }: { label: string; value: string | number; icon?: string }) {
  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(0, 229, 240, 0.2)',
      borderRadius: '8px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '150px'
    }}>
      {icon && <span style={{ fontSize: '24px' }}>{icon}</span>}
      <h4 style={{ margin: 0, fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</h4>
      <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#00e5f0' }}>{value}</span>
    </div>
  );
}
