/**
 * @file src/ui/apps/stubs/SkillsLabApp.tsx
 * @description Dynamic Skills display panel stub.
 */

import React from 'react';
import { PortfolioDataService } from '@/core/data/PortfolioDataService';
import { GlassCard } from '@/ui/components/GlassCard';

export function SkillsLabApp(): React.ReactElement {
  const categories = PortfolioDataService.getSkills();

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h2 className="neon-text-primary" style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, letterSpacing: '2px' }}>
          SKILLS TECHNOLOGY TREE
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px', fontSize: '15px' }}>
          Neural-linked skill matrix and technology proficiencies.
        </p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {categories.map((cat, idx) => (
          <GlassCard key={cat.category} delay={idx * 0.1} hoverable>
            <h3 style={{
              fontSize: '18px',
              color: 'var(--color-secondary-500)',
              fontWeight: 'bold',
              marginBottom: '16px',
              borderBottom: '1px solid var(--color-border)',
              paddingBottom: '8px'
            }}>
              {cat.category}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {cat.items.map((skill) => (
                <div
                  key={skill.name}
                  className="glass-panel-interactive"
                  style={{
                    backgroundColor: 'rgba(0, 229, 240, 0.05)',
                    padding: '8px 14px',
                    border: '1px solid var(--color-border-neon)',
                    borderRadius: '6px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  <span style={{ fontWeight: '500' }}>{skill.name}</span>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-secondary-500)' }} />
                  <span style={{ opacity: 0.6, fontSize: '12px' }}>{skill.level}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
export default SkillsLabApp;
