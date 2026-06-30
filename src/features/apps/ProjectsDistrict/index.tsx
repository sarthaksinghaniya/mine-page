import React, { useEffect, useState } from 'react';
import { GitHubService, type GitHubRepo } from '@core/data/GitHubService';
import { RepoCard } from '@ui/components/RepoCard';

const GITHUB_USERNAME = 'sarthaksinghaniya';

export default function ProjectsDistrictComponent() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadRepos() {
      const data = await GitHubService.fetchRepositories(GITHUB_USERNAME);
      if (mounted) {
        setRepos(data);
        setLoading(false);
      }
    }

    loadRepos();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ padding: '24px', color: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#00e5f0' }}>Projects District</h2>
      <p style={{ marginBottom: '24px', color: 'rgba(255, 255, 255, 0.7)' }}>
        Live GitHub integration fetching repositories directly from @{GITHUB_USERNAME}.
      </p>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ height: '150px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', animation: 'pulse 1.5s infinite' }} />
          ))}
          <style>
            {`
              @keyframes pulse {
                0% { opacity: 0.5; }
                50% { opacity: 0.8; }
                100% { opacity: 0.5; }
              }
            `}
          </style>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', overflowY: 'auto', paddingRight: '8px' }}>
          {repos.map(repo => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
          {repos.length === 0 && (
            <p>No repositories found or failed to load.</p>
          )}
        </div>
      )}
    </div>
  );
}
