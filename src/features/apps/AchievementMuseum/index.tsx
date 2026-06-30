import React from 'react';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'LeetCode Knight',
    category: 'Competitive Programming',
    description: 'Achieved top 5% global ranking on LeetCode.',
    icon: '🏆',
    color: '#ffaa00'
  },
  {
    id: 2,
    title: 'Codeforces Specialist',
    category: 'Algorithms',
    description: 'Reached 1400+ rating in Codeforces Div 2 rounds.',
    icon: '📊',
    color: '#00e5f0'
  },
  {
    id: 3,
    title: 'AWS Solutions Architect',
    category: 'Certification',
    description: 'Certified Associate (SAA-C03) for cloud infrastructure.',
    icon: '☁️',
    color: '#ff9900'
  },
  {
    id: 4,
    title: 'Arctic Code Vault Contributor',
    category: 'Open Source',
    description: 'Contributed to repositories preserved in the GitHub Arctic Code Vault.',
    icon: '❄️',
    color: '#00ccff'
  },
  {
    id: 5,
    title: 'React Hackathon 1st Place',
    category: 'Hackathon',
    description: 'Won best overall project using React and Three.js for data visualization.',
    icon: '🥇',
    color: '#ff0055'
  }
];

export default function AchievementMuseumComponent() {
  return (
    <div style={{ padding: '24px', color: '#fff', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#00e5f0' }}>Achievement Museum</h2>
      <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '32px' }}>
        A curated gallery of milestones, certifications, and contest rankings.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px' 
      }}>
        {ACHIEVEMENTS.map(ach => (
          <div key={ach.id} style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: `1px solid ${ach.color}40`,
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            transition: 'all 0.3s ease',
            cursor: 'default'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = `0 10px 20px ${ach.color}20`;
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
          }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '32px' }}>{ach.icon}</span>
              <span style={{ 
                fontSize: '12px', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                backgroundColor: `${ach.color}20`,
                color: ach.color,
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                {ach.category}
              </span>
            </div>
            <h3 style={{ margin: '8px 0 0 0', fontSize: '20px' }}>{ach.title}</h3>
            <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.5' }}>
              {ach.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
