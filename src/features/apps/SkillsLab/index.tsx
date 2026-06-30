import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { PortfolioAnalytics } from '@core/data/PortfolioAnalytics';
import { GitHubService, type GitHubContribution } from '@core/data/GitHubService';
import { UnstopService, type UnstopProfile } from '@core/data/UnstopService';
import { SkeletonLoader, ErrorState, StatCard } from '@ui/components/SharedComponents';
import { PrintWrapper } from '@ui/components/PrintWrapper';

// Lazy load charting components
const ContributionHeatmap = React.lazy(() => import('@ui/components/charts/ContributionHeatmap').then(m => ({ default: m.ContributionHeatmap })));
const RatingGraph = React.lazy(() => import('@ui/components/charts/RatingGraph').then(m => ({ default: m.RatingGraph })));
const LanguageDonut = React.lazy(() => import('@ui/components/charts/LanguageDonut').then(m => ({ default: m.LanguageDonut })));

export default function SkillsLabComponent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [unstopProfile, setUnstopProfile] = useState<UnstopProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'competitive'>('overview');

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const [portfolioData, githubData, unstopData] = await Promise.all([
          PortfolioAnalytics.aggregateScores('sarthaksinghaniya', 'sarthaksinghaniya', 'sarthaksinghaniya'),
          GitHubService.fetchContributions('sarthaksinghaniya'),
          UnstopService.fetchProfile('sarthsin39721')
        ]);
        
        if (mounted) {
          setStats(portfolioData);
          setContributions(githubData);
          setUnstopProfile(unstopData);
          setLoading(false);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load dashboard data');
          setLoading(false);
        }
      }
    }
    loadData();
    return () => { mounted = false; };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const renderContent = useMemo(() => {
    if (loading) return <SkeletonLoader count={4} height="200px" />;
    if (error) return <ErrorState message={error} onRetry={() => { window.location.reload(); }} />;
    if (!stats) return null;

    if (activeTab === 'overview') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <StatCard label="GitHub Projects" value={stats.totalProjects} icon="📦" />
          <StatCard label="Total Stars" value={stats.totalStars} icon="⭐" />
          <StatCard label="LeetCode Solved" value={stats.leetCodeSolved} icon="🧩" />
          <StatCard label="Codeforces Rating" value={stats.codeforcesRating} icon="🏆" />
          <StatCard label="Global Activity Score" value={stats.activityScore} icon="🔥" />
        </div>
      );
    }

    if (activeTab === 'activity') {
      return (
        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ marginBottom: '16px', color: '#00e5f0' }}>GitHub Contribution Heatmap</h3>
          <Suspense fallback={<SkeletonLoader count={1} height="150px" />}>
            <ContributionHeatmap data={contributions} />
          </Suspense>
          <h3 style={{ marginTop: '32px', marginBottom: '16px', color: '#00e5f0' }}>Language Distribution</h3>
          <Suspense fallback={<SkeletonLoader count={1} height="150px" />}>
            <LanguageDonut data={[
              { language: 'TypeScript', count: 45 },
              { language: 'Python', count: 25 },
              { language: 'C++', count: 15 },
              { language: 'Rust', count: 10 },
            ]} />
          </Suspense>
        </div>
      );
    }

    if (activeTab === 'competitive') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {unstopProfile && (
            <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #00ff66' }}>
              <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#00ff66' }}>Unstop Hacker Profile</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                <StatCard label="Global Rank" value={`#${unstopProfile.globalRank}`} icon="🌍" />
                <StatCard label="Certificates" value={unstopProfile.totalCertificates} icon="📜" />
                <StatCard label="Competitions Won" value={unstopProfile.competitionsWon} icon="🥇" />
              </div>
            </div>
          )}
          <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '16px', color: '#00e5f0' }}>Contest Rating Trajectory (LeetCode & Codeforces)</h3>
            <Suspense fallback={<SkeletonLoader count={1} height="200px" />}>
              <RatingGraph data={[
                { label: 'Jan', rating: 1200 },
                { label: 'Feb', rating: 1350 },
                { label: 'Mar', rating: 1300 },
                { label: 'Apr', rating: 1550 },
                { label: 'May', rating: 1800 },
              ]} />
            </Suspense>
          </div>
        </div>
      );
    }

    return null;
  }, [loading, error, stats, activeTab]);

  return (
    <PrintWrapper>
      <div style={{ padding: '24px', color: '#fff', height: '100%', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#00e5f0' }}>Portfolio Analytics</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Dynamic analysis of development metrics across GitHub, LeetCode, and Codeforces.</p>
          </div>
          <button onClick={handlePrint} style={{ 
            padding: '8px 16px', 
            backgroundColor: 'rgba(0, 229, 240, 0.1)', 
            border: '1px solid #00e5f0', 
            color: '#00e5f0', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Export Dashboard
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
          {(['overview', 'activity', 'competitive'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); }}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === tab ? '#00e5f0' : 'rgba(255,255,255,0.5)',
                fontSize: '16px',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                borderBottom: activeTab === tab ? '2px solid #00e5f0' : 'none',
                paddingBottom: '8px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderContent}
      </div>
    </PrintWrapper>
  );
}
