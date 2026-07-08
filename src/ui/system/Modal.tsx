/**
 * @file src/ui/system/Modal.tsx
 * @description Centralized modal/dialog wrapper with frosted glass backdrops.
 */

import React, { useEffect } from 'react';
import { ApplicationAudioManager } from '@features/audio/ApplicationAudioManager';
import { Card } from './Card';
import { Button } from './Button';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  width?: string;
}

export function Modal({ isOpen, onClose, title, children, width = 'max-w-2xl' }: ModalProps): React.ReactElement | null {
  // Play sounds on mount/unmount if needed (already handled by eventBus in some places, but good fallback)
  useEffect(() => {
    if (isOpen) {
      ApplicationAudioManager.playSfx('ui_open');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content container */}
      <div 
        role="dialog" 
        aria-modal="true"
        className={`relative w-full ${width} z-10 animate-in fade-in zoom-in-95 duration-200`}
      >
        <Card variant="glow" padding="none" className="shadow-[0_0_50px_rgba(0,0,0,0.8)] border-[rgba(255,255,255,0.1)]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.2)]">
            <div className="text-lg font-bold text-[var(--color-text-primary)] tracking-wide">
              {title}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} icon={<X size={18} />} className="!p-1">
            </Button>
          </div>
          
          {/* Body */}
          <div className="p-6">
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
}
