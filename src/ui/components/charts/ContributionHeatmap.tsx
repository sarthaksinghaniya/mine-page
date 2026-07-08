/**
 * @file src/ui/components/charts/ContributionHeatmap.tsx
 * @description CSS Grid based heatmap for activity timelines.
 */

import React, { useMemo } from 'react';

export interface HeatmapData {
  date: string;
  count: number;
}

export const ContributionHeatmap = React.memo(({ data }: { data: HeatmapData[] }) => {
  // Normalize dates into a 52x7 grid (1 year roughly)
  const grid = useMemo(() => {
    // Fix TypeScript 'any' issues by typing the fill array explicitly
    const matrix: (number | null)[][] = Array.from({ length: 7 }, () => {
      const arr = new Array<number | null>(52);
      for (let i = 0; i < 52; i++) arr[i] = null;
      return arr;
    });
    
    // Simplistic fill logic for demonstration (assuming data is sorted newest to oldest)
    // In production, this would map exactly to DayOfWeek and WeekOfYear
    let dataIdx = 0;
    for (let col = 51; col >= 0; col--) {
      for (let row = 6; row >= 0; row--) {
        if (dataIdx < data.length) {
          const targetRow = matrix[row];
          if (targetRow) {
            targetRow[col] = data[dataIdx]?.count ?? 0;
          }
          dataIdx++;
        }
      }
    }
    return matrix;
  }, [data]);

  const getColor = (count: number | null) => {
    if (count === null) return 'transparent';
    if (count === 0) return 'rgba(255, 255, 255, 0.03)';
    if (count < 3) return 'var(--color-primary-800)';
    if (count < 6) return 'var(--color-primary-600)';
    if (count < 10) return 'var(--color-primary-400)';
    return 'var(--color-primary-300)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 12px)', gridAutoColumns: '12px', gridAutoFlow: 'column', gap: '4px' }}>
        {grid.map((row, r) => 
          row.map((cell, c) => (
            <div 
              key={`r${r.toString()}-c${c.toString()}`} 
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: getColor(cell),
                borderRadius: '3px',
                border: cell === null ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all var(--transition-fast)'
              }} 
              title={cell !== null ? `${cell.toString()} contributions` : ''}
              onMouseEnter={(e) => {
                if (cell !== null && cell > 0) {
                  e.currentTarget.style.transform = 'scale(1.2)';
                  e.currentTarget.style.boxShadow = '0 0 8px var(--color-primary-300)';
                }
              }}
              onMouseLeave={(e) => {
                if (cell !== null && cell > 0) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            />
          ))
        )}
      </div>
    </div>
  );
});

ContributionHeatmap.displayName = 'ContributionHeatmap';
