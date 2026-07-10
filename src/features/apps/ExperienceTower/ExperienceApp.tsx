/**
 * @file src/features/apps/ExperienceTower/ExperienceApp.tsx
 * @description Experience timeline displaying work history.
 */

import type { TimelineEvent } from '@/ui/system';
import { Timeline } from '@/ui/system';
import { experienceData } from '@/data/experience';
import { Briefcase } from 'lucide-react';

export function ExperienceApp() {
  const events: TimelineEvent[] = experienceData.map(exp => ({
    id: exp.id,
    date: `${exp.startDate} - ${exp.endDate}`,
    title: exp.company,
    subtitle: exp.role,
    details: (
      <ul className="list-disc pl-5 space-y-2 mt-2">
        {exp.description.map((desc, idx) => (
          <li key={idx}>{desc}</li>
        ))}
      </ul>
    )
  }));

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-12 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[var(--color-primary-300)] mb-4 flex items-center justify-center gap-3">
          <Briefcase className="text-[var(--color-primary-500)]" size={28} />
          EXPERIENCE LOG
        </h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          Chronological record of professional deployments, architectural achievements, and team leadership.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Timeline events={events} />
      </div>
    </div>
  );
}
