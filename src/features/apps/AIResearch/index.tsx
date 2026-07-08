import { useMemo } from 'react';
import { PortfolioDataService } from '@core/data/PortfolioDataService';
import { GlassCard } from '@ui/components/GlassCard';
import { AppHeader } from '@ui/components/AppHeader';
import { Tag } from '@ui/components/Tag';

export default function AIResearchComponent() {
  // Dynamically fetch and filter AI/ML related projects from the central service
  const aiProjects = useMemo(() => {
    return PortfolioDataService.getProjects().filter(p => 
      p.technologies.some(t => ['Python', 'OpenAI', 'LangChain', 'TensorFlow', 'PyTorch', 'LLM'].includes(t)) ||
      p.summary.toLowerCase().includes('ai') || 
      p.summary.toLowerCase().includes('machine learning')
    );
  }, []);

  return (
    <div style={{ padding: '24px', height: '100%', overflowY: 'auto' }}>
      <AppHeader 
        title="AI Research Facility" 
        subtitle="Exploring the boundaries of Neural Networks, Agentic Systems, and LLMs." 
        breadcrumbs={['Districts', 'AI Research']}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        {aiProjects.length > 0 ? (
          aiProjects.map((proj, idx) => (
            <GlassCard key={proj.id} delay={idx * 0.1} hoverable style={{ borderLeft: '4px solid #8000ff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#fff' }}>{proj.title}</h3>
                <Tag color="#8000ff">Research</Tag>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '24px' }}>
                {proj.summary}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {proj.technologies.map(tech => (
                  <Tag key={tech} color="#00e5f0">{tech}</Tag>
                ))}
              </div>
            </GlassCard>
          ))
        ) : (
          <GlassCard delay={0.2} style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              No AI specific research projects found in the current PortfolioDataService payload.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
