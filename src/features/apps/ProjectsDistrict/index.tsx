import React, { useEffect, useState, useMemo } from 'react';
import { GitHubService, type GitHubRepo } from '@core/data/GitHubService';
import { RepoCard } from '@ui/components/RepoCard';
import { SkeletonLoader, ErrorState } from '@ui/components/SharedComponents';

const GITHUB_USERNAME = 'sarthaksinghaniya';

export default function ProjectsDistrictComponent() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterLang, setFilterLang] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'stars' | 'updated'>('stars');

  useEffect(() => {
    let mounted = true;
    async function loadRepos() {
      try {
        const data = await GitHubService.fetchRepositories(GITHUB_USERNAME);
        if (mounted) {
          setRepos(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to fetch repositories');
          setLoading(false);
        }
      }
    }
    loadRepos();
    return () => { mounted = false; };
  }, []);

  const languages = useMemo(() => {
    const langs = new Set(repos.map(r => r.language).filter(Boolean));
    return ['All', ...Array.from(langs)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos
      .filter(repo => repo.name.toLowerCase().includes(search.toLowerCase()) || (repo.description && repo.description.toLowerCase().includes(search.toLowerCase())))
      .filter(repo => filterLang === 'All' || repo.language === filterLang)
      .sort((a, b) => {
        if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
  }, [repos, search, filterLang, sortBy]);

  return (
    <div style={{ padding: '24px', color: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#00e5f0' }}>Projects District</h2>
          <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)' }}>
            Live GitHub integration fetching repositories directly from @{GITHUB_USERNAME}.
          </p>
        </div>
        
        {/* Controls */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,229,240,0.3)', color: '#fff', borderRadius: '4px' }}
          />
          <select 
            value={filterLang} 
            onChange={(e) => setFilterLang(e.target.value)}
            style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,229,240,0.3)', color: '#fff', borderRadius: '4px' }}
          >
            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as 'stars' | 'updated')}
            style={{ padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,229,240,0.3)', color: '#fff', borderRadius: '4px' }}
          >
            <option value="stars">Most Stars</option>
            <option value="updated">Recently Updated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <SkeletonLoader count={6} height="150px" />
      ) : error ? (
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', overflowY: 'auto', paddingRight: '8px' }}>
          {filteredRepos.map(repo => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
          {filteredRepos.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.5)' }}>
              No repositories match your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
