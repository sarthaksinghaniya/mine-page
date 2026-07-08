/**
 * @file src/ui/apps/stubs/MuseumApp.tsx
 * @description Dynamic Museum display panel stub.
 */

import React from 'react';
import { PortfolioDataService } from '@/core/data/PortfolioDataService';
import { GlassCard } from '@/ui/components/GlassCard';

export function MuseumApp(): React.ReactElement {
  const achievements = PortfolioDataService.getAchievements();
  const hackathons = PortfolioDataService.getHackathons();

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h2 className="neon-text-primary" style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, letterSpacing: '2px' }}>
          ACHIEVEMENT MUSEUM HALL
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px', fontSize: '15px' }}>
          Hall of fame displaying significant milestones and hackathon records.
        </p>
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--color-primary-300)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>🏆</span> Trophy Cases
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {achievements.map((ach, idx) => (
            <GlassCard key={ach.title} delay={idx * 0.1} hoverable style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ color: 'var(--color-text-primary)', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
                  {ach.title}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                  {ach.description}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-secondary-500)', marginTop: '16px', fontWeight: '500', padding: '4px 12px', backgroundColor: 'rgba(255, 0, 144, 0.1)', borderRadius: '12px', width: 'fit-content' }}>
                Date Awarded: {ach.date}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '16px 0' }} />

      <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--color-primary-300)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>⚡</span> Hackathon Records
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {hackathons.map((h, idx) => (
            <GlassCard key={h.name} delay={0.2 + idx * 0.1} hoverable style={{ borderLeft: '4px solid var(--color-primary-400)' }}>
              <div style={{ color: 'var(--color-text-primary)', fontWeight: 'bold', fontSize: '18px' }}>
                {h.name}
              </div>
              <div style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-primary-300)' }}>Award:</span> {h.award}
              </div>
              <div style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-primary-300)' }}>Project:</span> {h.project}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
export default MuseumApp;
