/**
 * @file src/ui/system/Button.tsx
 * @description Core interactive button primitive with glassmorphism and neon hover states.
 */

import type { ButtonHTMLAttributes } from 'react';
import React from 'react';
import { ApplicationAudioManager } from '@features/audio/ApplicationAudioManager';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  icon,
  fullWidth = false,
  className = '',
  onClick,
  onMouseEnter,
  ...props
}: ButtonProps): React.ReactElement {
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    ApplicationAudioManager.playSfx('ui_hover');
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    ApplicationAudioManager.playSfx('ui_open'); // Default interaction sound
    if (onClick) onClick(e);
  };

  // Base styles that all buttons share
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050508] backdrop-blur-md rounded-md cursor-pointer select-none';
  
  // Size variants
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  // Theming variants based on globals.css tokens
  const variantStyles = {
    primary: 'bg-[var(--color-primary-500)] text-[#050508] hover:bg-[var(--color-primary-400)] hover:shadow-[0_0_20px_rgba(0,229,240,0.4)] border border-[var(--color-primary-300)]',
    secondary: 'bg-[rgba(26,26,36,0.6)] text-[var(--color-text-primary)] hover:bg-[rgba(40,40,60,0.8)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)]',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-primary-300)] hover:bg-[rgba(0,229,240,0.1)] border border-transparent',
    danger: 'bg-[rgba(255,0,85,0.1)] text-[#ff0055] hover:bg-[rgba(255,0,85,0.2)] hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] border border-[#ff0055]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
