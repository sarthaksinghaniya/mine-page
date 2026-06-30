import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AppManager } from '@core/apps/AppManager';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  breadcrumbs?: string[];
}

export function AppHeader({ title, subtitle, onBack, breadcrumbs }: AppHeaderProps) {
  const handleBack = () => {
    if (onBack) onBack();
    else AppManager.close(AppManager.getState().activeAppId || '');
  };

  return (
    <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Breadcrumbs & Back */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.6)' }}>
        <button 
          onClick={handleBack}
          style={{ 
            background: 'none', border: 'none', color: '#00e5f0', cursor: 'pointer', 
            display: 'flex', alignItems: 'center', gap: '8px', padding: 0 
          }}
          aria-label="Go Back"
        >
          <ArrowLeft size={16} />
          <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Back</span>
        </button>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <span>/</span>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb}>
                <span style={{ color: idx === breadcrumbs.length - 1 ? '#fff' : 'inherit' }}>{crumb}</span>
                {idx < breadcrumbs.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Titles */}
      <div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', color: '#fff', fontWeight: 600 }}>{title}</h1>
        {subtitle && <p style={{ margin: 0, fontSize: '16px', color: 'rgba(0, 229, 240, 0.8)' }}>{subtitle}</p>}
      </div>
      
      {/* Cyberpunk Divider */}
      <div style={{ height: '1px', width: '100%', background: 'linear-gradient(90deg, rgba(0,229,240,0.5) 0%, rgba(0,0,0,0) 100%)', marginTop: '8px' }} />
    </div>
  );
}
