/**
 * @file src/features/apps/SkillsLab/SkillsApp.tsx
 * @description Interactive skill matrix and radar chart.
 */

import { Card } from '@/ui/system';
import { skillsData } from '@/data/skills';
import { Network } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion } from 'framer-motion';

export function SkillsApp() {
  // Flatten skills for the radar chart
  const radarData = skillsData.flatMap(category => 
    category.skills.map(skill => ({
      subject: skill.name,
      A: skill.level,
      fullMark: 100,
    }))
  ).slice(0, 8); // Top 8 skills for the radar

  return (
    <div className="p-8 h-full flex flex-col xl:flex-row gap-8 overflow-y-auto">
      {/* Left Column: Radar Chart */}
      <div className="w-full xl:w-1/2 flex flex-col gap-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[var(--color-primary-300)] mb-2 flex items-center gap-3">
            <Network className="text-[var(--color-primary-500)]" />
            SKILLS MATRIX
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Neural mapping of technical proficiencies and core competencies.
          </p>
        </div>

        <Card variant="hologram" padding="lg" className="flex-1 min-h-[400px] flex items-center justify-center relative overflow-hidden">
          {/* Decorative background grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMWgydjJIMUMxeiIgZmlsbD0icmdiYSgwLCAyMjksIDI0MCwgMC4wNSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-50 pointer-events-none" />
          
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="rgba(0, 229, 240, 0.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-primary-400)', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Proficiency"
                dataKey="A"
                stroke="var(--color-primary-500)"
                fill="var(--color-primary-500)"
                fillOpacity={0.4}
                isAnimationActive={true}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Right Column: Progress Bars */}
      <div className="w-full xl:w-1/2 flex flex-col gap-8">
        {skillsData.map((category, catIdx) => (
          <motion.div 
            key={category.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: catIdx * 0.15, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 tracking-widest uppercase border-b border-[rgba(255,255,255,0.05)] pb-2">
              {category.name}
            </h3>
            <div className="flex flex-col gap-4">
              {category.skills.map((skill, skillIdx) => (
                <div key={skill.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-[var(--color-text-secondary)]">{skill.name}</span>
                    <span className="text-[var(--color-primary-300)] font-mono">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden border border-[rgba(255,255,255,0.02)]">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-300)] shadow-[0_0_10px_var(--color-primary-500)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: (catIdx * 0.15) + (skillIdx * 0.1), duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
