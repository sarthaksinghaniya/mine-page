/**
 * @file src/ui/system/Input.tsx
 * @description Standardized input fields with cyberpunk styling.
 */

import type { InputHTMLAttributes} from 'react';
import React, { forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, fullWidth = false, className = '', ...props }, ref) => {
    const widthStyle = fullWidth ? 'w-full' : '';
    const errorStyle = error 
      ? 'border-[#ff0055] focus:border-[#ff0055] focus:shadow-[0_0_10px_rgba(255,0,85,0.3)]' 
      : 'border-[rgba(255,255,255,0.1)] focus:border-[var(--color-primary-400)] focus:shadow-[0_0_15px_rgba(0,229,240,0.2)]';

    return (
      <div className={`relative ${widthStyle}`}>
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-secondary)]">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            bg-[rgba(5,5,10,0.6)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)]
            rounded-md px-4 py-2 text-sm transition-all duration-300 outline-none border
            ${icon ? 'pl-10' : ''}
            ${errorStyle}
            ${widthStyle}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-[#ff0055] text-left">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
