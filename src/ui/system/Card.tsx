/**
 * @file src/ui/system/Card.tsx
 * @description Core container primitive enforcing strict glassmorphism rules.
 */

import React, { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'hologram';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  className = '',
  ...props
}: CardProps): React.ReactElement {
  
  // Base styles: Frost glass effect
  const baseStyles = 'relative rounded-xl border border-[rgba(255,255,255,0.05)] backdrop-blur-xl overflow-hidden';
  
  // Padding map
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Variants
  const variantStyles = {
    default: 'bg-[rgba(10,10,15,0.7)]',
    glow: 'bg-[rgba(10,10,20,0.6)] shadow-[0_8px_32px_rgba(0,229,240,0.1)] border-[rgba(0,229,240,0.2)]',
    hologram: 'bg-gradient-to-br from-[rgba(0,229,240,0.05)] to-[rgba(128,0,255,0.05)] border-[rgba(128,0,255,0.3)]',
  };

  // Interactive hover effects
  const interactiveStyles = interactive 
    ? 'transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,229,240,0.2)] hover:border-[rgba(0,229,240,0.4)]'
    : '';

  return (
    <div
      className={`${baseStyles} ${paddingStyles[padding]} ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {/* Optional diagonal gloss line */}
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.03)] to-transparent pointer-events-none" />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
