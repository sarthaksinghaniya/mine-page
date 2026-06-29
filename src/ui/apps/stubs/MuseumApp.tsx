/**
 * @file src/ui/apps/stubs/MuseumApp.tsx
 * @description Dynamic Museum display panel stub.
 */

import React from 'react';
import { PortfolioDataService } from '@/core/data/PortfolioDataService';

export function MuseumApp(): React.ReactElement {
  const achievements = PortfolioDataService.getAchievements();
  const hackathons = PortfolioDataService.getHackathons();

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        style={{
          fontSize: '20px',
          color: '#00e5f0',
          borderBottom: '1px solid rgba(0, 229, 240, 0.3)',
          paddingBottom: '8px',
          fontWeight: 'bold',
        }}
      >
        ACHIEVEMENT MUSEUM HALL
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '16px', color: '#ff5500', fontWeight: 'bold' }}>Trophy Cases</div>
        {achievements.map((ach) => (
          <div
            key={ach.title}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              padding: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '6px',
            }}
          >
            <div style={{ color: '#f0f0ff', fontWeight: 'bold' }}>{ach.title}</div>
            <div style={{ fontSize: '13px', color: '#a0a0c0', marginTop: '4px' }}>
              {ach.description}
            </div>
            <div style={{ fontSize: '11px', color: '#ff5500', marginTop: '4px' }}>
              Date Awarded: {ach.date}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
        <div style={{ fontSize: '16px', color: '#ff5500', fontWeight: 'bold' }}>
          Hackathon Records
        </div>
        {hackathons.map((h) => (
          <div
            key={h.name}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              padding: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '6px',
            }}
          >
            <div style={{ color: '#f0f0ff', fontWeight: 'bold' }}>{h.name}</div>
            <div style={{ fontSize: '13px', color: '#a0a0c0', marginTop: '4px' }}>
              Award: {h.award}
            </div>
            <div style={{ fontSize: '13px', color: '#00e5f0', marginTop: '4px' }}>
              Project: {h.project}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MuseumApp;
