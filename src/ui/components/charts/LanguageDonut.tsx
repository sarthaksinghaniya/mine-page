/**
 * @file src/ui/components/charts/LanguageDonut.tsx
 * @description Native SVG donut chart for displaying repository language distribution.
 */

import React, { useMemo } from 'react';

interface LanguageStat {
  language: string;
  count: number;
}

const COLORS = ['#00e5f0', '#ff0055', '#9900ff', '#00ff66', '#ffaa00', '#4444ff'];

export const LanguageDonut = React.memo(({ data }: { data: LanguageStat[] }) => {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.count, 0), [data]);

  const segments = useMemo(() => {
    let currentAngle = 0;
    return data.map((item, i) => {
      const percentage = (item.count / total) * 100;
      const strokeDasharray = `${percentage.toString()} 100`;
      const strokeDashoffset = -currentAngle;
      currentAngle += percentage;
      return {
        ...item,
        percentage,
        color: COLORS[i % COLORS.length],
        strokeDasharray,
        strokeDashoffset
      };
    });
  }, [data, total]);

  if (total === 0) return <div style={{ color: 'rgba(255,255,255,0.5)' }}>No data available</div>;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <svg width="150" height="150" viewBox="0 0 32 32" style={{ transform: 'rotate(-90deg)' }}>
        {segments.map((seg) => (
          <circle
            key={seg.language}
            r="16"
            cx="16"
            cy="16"
            fill="none"
            stroke={seg.color}
            strokeWidth="4"
            strokeDasharray={seg.strokeDasharray}
            strokeDashoffset={seg.strokeDashoffset}
            style={{ transition: 'all 1s ease-out' }}
          />
        ))}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {segments.map(seg => (
          <div key={seg.language} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: seg.color, boxShadow: `0 0 8px ${seg.color ?? 'rgba(255,255,255,0.5)'}` }} />
            <span style={{ color: 'var(--color-text-primary)' }}>{seg.language}</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>({seg.percentage.toFixed(1)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
});

LanguageDonut.displayName = 'LanguageDonut';
