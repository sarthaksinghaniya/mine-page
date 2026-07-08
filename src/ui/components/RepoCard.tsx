/**
 * @file src/ui/components/RepoCard.tsx
 * @description Card component to display a GitHub repository.
 */

import type { GitHubRepo } from '@core/data/GitHubService';

export function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(0, 229, 240, 0.2)',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0, 229, 240, 0.05)';
        e.currentTarget.style.borderColor = 'rgba(0, 229, 240, 0.5)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(0, 229, 240, 0.2)';
        e.currentTarget.style.transform = 'none';
      }}
      onClick={() => window.open(repo.html_url, '_blank')}
    >
      <h3 style={{ margin: 0, fontSize: '18px', color: '#00e5f0' }}>{repo.name}</h3>
      <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', flex: 1 }}>
        {repo.description || 'No description provided.'}
      </p>
      
      <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
        {repo.language && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00e5f0' }} />
            {repo.language}
          </span>
        )}
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
      </div>
    </div>
  );
}
