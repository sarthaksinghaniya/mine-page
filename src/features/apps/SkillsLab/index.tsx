import React, { useEffect, useState, useMemo } from 'react';
import { PortfolioAnalytics } from '@core/data/PortfolioAnalytics';
import { SkeletonLoader, ErrorState, StatCard } from '@ui/components/SharedComponents';

export default function SkillsLabComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function loadSkills() {
      try {
        const data = await PortfolioAnalytics.aggregateScores('sarthaksinghaniya', 'sarthaksinghaniya', 'sarthaksinghaniya');
        if (mounted) {
          setStats(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load skills data');
          setLoading(false);
        }
      }
    }
    loadSkills();
    return () => { mounted = false; };
  }, []);

  const renderContent = useMemo(() => {
    if (loading) return <SkeletonLoader count={4} height="200px" />;
    if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;
    if (!stats) return null;

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
        <StatCard label="GitHub Projects" value={stats.totalProjects} icon="📦" />
        <StatCard label="Total Stars" value={stats.totalStars} icon="⭐" />
        <StatCard label="LeetCode Solved" value={stats.leetCodeSolved} icon="🧩" />
        <StatCard label="Codeforces Rating" value={stats.codeforcesRating} icon="🏆" />
        <StatCard label="Global Activity Score" value={stats.activityScore} icon="🔥" />
      </div>
    );
  }, [loading, error, stats]);

  return (
    <div style={{ padding: '24px', color: '#fff', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#00e5f0' }}>Skills Lab</h2>
      <p style={{ marginBottom: '24px', color: 'rgba(255, 255, 255, 0.7)' }}>
        Live dynamic analysis of development metrics across GitHub, LeetCode, and Codeforces.
      </p>
      {renderContent}
    </div>
  );
}
