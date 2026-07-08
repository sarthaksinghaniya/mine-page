/**
 * @file src/ui/apps/ApplicationTransition.tsx
 * @description GSAP transition wrapper for applications.
 */

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';


interface Props {
  isOpen: boolean;
  onClosed: () => void;
  children: React.ReactNode;
}

export function ApplicationTransition({ isOpen, onClosed, children }: Props): React.ReactElement | null {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!shouldRender || !containerRef.current) return;

    const el = containerRef.current;
    
    if (isOpen) {
      // Open animation
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      // Close animation
      gsap.to(el, {
        opacity: 0,
        scale: 0.98,
        y: 10,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setShouldRender(false);
          onClosed();
        },
      });
    }
  }, [isOpen, shouldRender, onClosed]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
      }}
    >
      {children}
    </div>
  );
}
