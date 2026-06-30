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
    const matrix: (number | null)[][] = Array.from({ length: 7 }, () => Array(52).fill(null));
    
    // Simplistic fill logic for demonstration (assuming data is sorted newest to oldest)
    // In production, this would map exactly to DayOfWeek and WeekOfYear
    let dataIdx = 0;
    for (let col = 51; col >= 0; col--) {
      for (let row = 6; row >= 0; row--) {
        if (dataIdx < data.length) {
          matrix[row][col] = data[dataIdx].count;
          dataIdx++;
        }
      }
    }
    return matrix;
  }, [data]);

  const getColor = (count: number | null) => {
    if (count === null) return 'transparent';
    if (count === 0) return 'rgba(255, 255, 255, 0.05)';
    if (count < 3) return '#005555';
    if (count < 6) return '#009999';
    if (count < 10) return '#00e5f0';
    return '#ffffff';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 12px)', gridAutoColumns: '12px', gridAutoFlow: 'column', gap: '4px' }}>
        {grid.map((row, r) => 
          row.map((cell, c) => (
            <div 
              key={`${r}-${c}`} 
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: getColor(cell),
                borderRadius: '2px',
                border: cell === null ? 'none' : '1px solid rgba(255, 255, 255, 0.05)'
              }} 
              title={cell !== null ? `${cell} contributions` : ''}
            />
          ))
        )}
      </div>
    </div>
  );
});

ContributionHeatmap.displayName = 'ContributionHeatmap';
