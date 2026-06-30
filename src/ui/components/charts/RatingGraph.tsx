/**
 * @file src/ui/components/charts/RatingGraph.tsx
 * @description SVG line chart for plotting competitive ratings over time.
 */

import React, { useMemo } from 'react';

export interface RatingData {
  label: string;
  rating: number;
}

export const RatingGraph = React.memo(({ data }: { data: RatingData[] }) => {
  const width = 400;
  const height = 150;
  const padding = 20;

  const points = useMemo(() => {
    if (!data || data.length === 0) return '';
    
    const maxRating = Math.max(...data.map(d => d.rating), 100);
    const minRating = Math.min(...data.map(d => d.rating), 0);
    const range = maxRating - minRating || 1;

    return data.map((d, i) => {
      const x = padding + (i / (data.length - 1 || 1)) * (width - padding * 2);
      const y = height - padding - ((d.rating - minRating) / range) * (height - padding * 2);
      return `${x},${y}`;
    }).join(' ');
  }, [data]);

  if (!data || data.length === 0) return <div style={{ color: 'rgba(255,255,255,0.5)' }}>No rating data</div>;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00e5f0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00e5f0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke="#00e5f0"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 4px rgba(0,229,240,0.5))' }}
      />
      {/* Area under the curve */}
      <polygon
        points={`${padding},${height - padding} ${points} ${width - padding},${height - padding}`}
        fill="url(#lineGrad)"
      />
    </svg>
  );
});

RatingGraph.displayName = 'RatingGraph';
