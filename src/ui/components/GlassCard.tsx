import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  hoverable?: boolean;
}

export function GlassCard({ children, delay = 0, hoverable = false, style, ...rest }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', delay }
    );
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 229, 240, 0.1)',
        borderRadius: '12px',
        padding: '24px',
        color: '#fff',
        transition: hoverable ? 'all 0.3s ease' : 'none',
        cursor: hoverable ? 'pointer' : 'default',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.borderColor = 'rgba(0, 229, 240, 0.4)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 229, 240, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'rgba(0, 229, 240, 0.1)';
          e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        }
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
