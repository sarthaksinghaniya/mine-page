import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  hoverable?: boolean;
}

export function GlassCard({ children, delay = 0, hoverable = false, className = '', style, ...rest }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power4.out', delay }
    );
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className={`glass-panel ${hoverable ? 'glass-panel-interactive cursor-pointer' : ''} ${className}`}
      style={{
        borderRadius: '16px',
        padding: '24px',
        color: 'var(--color-text-primary)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {/* Subtle inner highlight to simulate glass edge */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
          pointerEvents: 'none'
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
