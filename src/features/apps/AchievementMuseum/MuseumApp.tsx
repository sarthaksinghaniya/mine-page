/**
 * @file src/features/apps/AchievementMuseum/MuseumApp.tsx
 * @description Gallery view of certifications and awards.
 */

import React from 'react';
import { Card } from '@/ui/system';
import { resumeData } from '@/data/resume';
import { Trophy, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export function MuseumApp() {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-[#ffcc00] mb-4 flex items-center justify-center gap-3">
          <Trophy className="text-[#ffaa00]" size={28} />
          HALL OF ACHIEVEMENTS
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          Certifications, awards, and major milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {resumeData.awards.map((award, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
          >
            <Card variant="glow" interactive className="h-full flex flex-col items-center text-center p-8 border-[rgba(255,204,0,0.2)] hover:border-[rgba(255,204,0,0.5)] hover:shadow-[0_12px_40px_rgba(255,204,0,0.15)] group">
              <div className="w-16 h-16 rounded-full bg-[rgba(255,204,0,0.1)] flex items-center justify-center mb-6 text-[#ffcc00] group-hover:scale-110 transition-transform duration-300">
                <Award size={32} />
              </div>
              <div className="text-[rgba(255,204,0,0.8)] font-mono text-sm tracking-widest mb-2">
                {award.date}
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[#ffcc00] transition-colors">
                {award.title}
              </h3>
              <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-4">
                {award.awarder}
              </h4>
              <p className="text-[15px] text-[var(--color-text-tertiary)] leading-relaxed mt-auto">
                {award.summary}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
