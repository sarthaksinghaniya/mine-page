import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AppManager } from '@core/apps/AppManager';
import { Button } from '@/ui/system';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  breadcrumbs?: string[];
}

export function AppHeader({ title, subtitle, onBack, breadcrumbs }: AppHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      void AppManager.close();
    }
  };

  return (
    <div className="mb-8 flex flex-col gap-3">
      {/* Breadcrumbs & Back */}
      <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBack} 
          icon={<ArrowLeft size={16} />}
          className="uppercase tracking-widest font-bold !text-[var(--color-primary-300)]"
        >
          Back
        </Button>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 text-[13px] uppercase tracking-widest">
            <span className="opacity-50">/</span>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb}>
                <span className={idx === breadcrumbs.length - 1 ? 'text-[var(--color-text-primary)]' : 'inherit'}>
                  {crumb}
                </span>
                {idx < breadcrumbs.length - 1 && <span className="opacity-50">/</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Titles */}
      <div>
        <h1 className="neon-text-primary m-0 mb-2 text-3xl font-bold tracking-wide">{title}</h1>
        {subtitle && <p className="m-0 text-[15px] text-[var(--color-text-secondary)]">{subtitle}</p>}
      </div>
      
      {/* Cyberpunk Divider */}
      <div className="h-px w-full bg-gradient-to-r from-[var(--color-border-neon)] to-transparent mt-3" />
    </div>
  );
}
export default AppHeader;
