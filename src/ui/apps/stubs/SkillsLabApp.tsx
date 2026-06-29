/**
 * @file src/ui/apps/stubs/SkillsLabApp.tsx
 * @description Dynamic Skills display panel stub.
 */

import React from 'react';
import { PortfolioDataService } from '@/core/data/PortfolioDataService';

export function SkillsLabApp(): React.ReactElement {
  const categories = PortfolioDataService.getSkills();

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
        SKILLS TECHNOLOGY TREE
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {categories.map((cat) => (
          <div
            key={cat.category}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              padding: '16px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <div
              style={{
                fontSize: '15px',
                color: '#ff5500',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              {cat.category}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {cat.items.map((skill) => (
                <div
                  key={skill.name}
                  style={{
                    backgroundColor: 'rgba(0, 229, 240, 0.06)',
                    padding: '6px 12px',
                    border: '1px solid rgba(0, 229, 240, 0.15)',
                    borderRadius: '4px',
                    fontSize: '13px',
                  }}
                >
                  {skill.name} <span style={{ opacity: 0.5 }}>[{skill.level}]</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SkillsLabApp;
