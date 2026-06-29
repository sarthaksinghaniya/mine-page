/**
 * @file src/features/debug/components/MetricRow.tsx
 * @description Single display row inside the debug panel.
 */

import React from 'react';

interface MetricRowProps {
  label: string;
  value: string | number;
}

export function MetricRow({ label, value }: MetricRowProps): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '11px',
        color: '#a0a0c0',
        padding: '2px 0',
      }}
    >
      <span style={{ fontWeight: 'normal' }}>{label}:</span>
      <span style={{ fontFamily: 'monospace', color: '#00e5f0' }}>{value}</span>
    </div>
  );
}
