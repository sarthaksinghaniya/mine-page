import React from 'react';

const TIMELINE_DATA = [
  {
    year: '2027',
    title: 'B.Tech in Computer Science',
    org: 'Indian Institute of Information Technology, Nagpur',
    description: 'Expected graduation. Specialized in Distributed Systems and AI.',
    type: 'education'
  },
  {
    year: '2026',
    title: 'Software Engineer Intern',
    org: 'Tech Corp',
    description: 'Engineered a highly concurrent CacheManager reducing network latency by 60%. Integrated 3D portfolio environments with live API feeds.',
    type: 'internship'
  },
  {
    year: '2025',
    title: 'Hackathon Winner',
    org: 'Global Web3 Summit',
    description: 'Built a decentralized portfolio tracking system using React, Ethers.js, and Solidity.',
    type: 'achievement'
  },
  {
    year: '2024',
    title: 'Open Source Contributor',
    org: 'React Three Fiber',
    description: 'Submitted PRs improving camera controller physics for mobile devices.',
    type: 'milestone'
  }
];

export default function ExperienceTowerComponent() {
  return (
    <div style={{ padding: '24px', color: '#fff', height: '100%', overflowY: 'auto', position: 'relative' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#00e5f0', textAlign: 'center' }}>Experience Tower</h2>
      <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', marginBottom: '40px' }}>
        A chronological breakdown of my technical journey.
      </p>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
        {/* Central Axis */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '2px',
          backgroundColor: 'rgba(0, 229, 240, 0.3)',
          transform: 'translateX(-50%)'
        }} />

        {TIMELINE_DATA.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={index} style={{
              display: 'flex',
              justifyContent: isLeft ? 'flex-start' : 'flex-end',
              width: '100%',
              marginBottom: '40px',
              position: 'relative'
            }}>
              {/* Node Marker */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '20px',
                width: '12px',
                height: '12px',
                backgroundColor: '#00e5f0',
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 10px #00e5f0'
              }} />

              {/* Content Card */}
              <div style={{
                width: '45%',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(0, 229, 240, 0.2)',
                borderRadius: '8px',
                padding: '24px',
                textAlign: isLeft ? 'right' : 'left',
                position: 'relative',
                transition: 'transform 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ color: '#00e5f0', fontWeight: 'bold', marginBottom: '8px' }}>{item.year}</div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>{item.title}</h3>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{item.org}</h4>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.5' }}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
