import React from 'react';

export function Tag({ children, color = '#00e5f0' }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 12px',
      backgroundColor: `${color}15`, // 15% opacity hex
      border: `1px solid ${color}40`,
      color: color,
      borderRadius: '100px',
      fontSize: '12px',
      fontWeight: 500,
      letterSpacing: '0.5px'
    }}>
      {children}
    </span>
  );
}
