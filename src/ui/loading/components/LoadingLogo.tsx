/**
 * @file src/ui/loading/components/LoadingLogo.tsx
 * @description Animated SVG logo using GSAP for the cinematic loading screen.
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function LoadingLogo(): React.ReactElement {
  const logoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    // Pulse animation for the logo
    gsap.fromTo(
      logoRef.current,
      { opacity: 0.3, scale: 0.95 },
      {
        opacity: 0.9,
        scale: 1.05,
        duration: 2.0,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      },
    );
  }, []);

  return (
    <svg
      ref={logoRef}
      width="200"
      height="80"
      viewBox="0 0 200 80"
      style={{ display: 'block', margin: '0 auto 24px auto' }}
    >
      <defs>
        <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e5f0" />
          <stop offset="100%" stopColor="#8000ff" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="url(#cyberGrad)"
        fontSize="28"
        fontFamily="sans-serif"
        fontWeight="800"
        letterSpacing="6"
        style={{ textShadow: '0 0 10px rgba(0, 229, 240, 0.5)' }}
      >
        PORTFOLIO
      </text>
      <text
        x="50%"
        y="75%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#f0f0ff"
        fontSize="10"
        fontFamily="monospace"
        letterSpacing="8"
        opacity="0.6"
      >
        3D open world
      </text>
    </svg>
  );
}
