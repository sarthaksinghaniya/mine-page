/**
 * @file src/ui/system/Badge.tsx
 * @description Small indicator pill for metadata and statuses.
 */

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps): React.ReactElement {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors border';
  
  const variantStyles = {
    default: 'bg-[rgba(0,229,240,0.1)] text-[var(--color-primary-300)] border-[rgba(0,229,240,0.2)]',
    success: 'bg-[rgba(0,255,102,0.1)] text-[#00ff66] border-[rgba(0,255,102,0.2)]',
    warning: 'bg-[rgba(255,204,0,0.1)] text-[#ffcc00] border-[rgba(255,204,0,0.2)]',
    error: 'bg-[rgba(255,0,85,0.1)] text-[#ff0055] border-[rgba(255,0,85,0.2)]',
    outline: 'bg-transparent text-[var(--color-text-secondary)] border-[rgba(255,255,255,0.2)]',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
