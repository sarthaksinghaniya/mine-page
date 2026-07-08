/**
 * @file src/features/apps/ProjectsDistrict/ProjectsApp.tsx
 * @description Interactive grid of project cards with live demo and GitHub links.
 */

import { Card, Button, TechBadge } from '@/ui/system';
import { projectsData } from '@/data/projects';
import { ExternalLink, FolderGit2, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProjectsApp() {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-2xl font-bold text-[var(--color-primary-300)] mb-4 flex items-center gap-3">
          <FolderGit2 className="text-[var(--color-primary-500)]" />
          ACTIVE PROJECTS
        </h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          A collection of my most significant architectural work, technical experiments, and interactive experiences. 
          Select any project to explore the live demo or review the source code.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projectsData.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="flex h-full"
          >
            <Card variant="glow" interactive className="flex flex-col w-full h-full border-[rgba(255,255,255,0.05)] hover:border-[var(--color-primary-300)] p-6 relative group">
              {project.featured && (
                <div className="absolute -top-3 -right-3 bg-[var(--color-primary-500)] text-[#050508] font-bold text-xs px-3 py-1 rounded-full shadow-[0_0_15px_var(--color-primary-500)] z-10 animate-pulse">
                  FEATURED
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary-400)] transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-[15px] text-[var(--color-text-tertiary)] mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map(tech => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                {project.githubUrl && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => window.open(project.githubUrl, '_blank')}
                    icon={<Code size={16} />}
                  >
                    Source Code
                  </Button>
                )}
                {project.demoUrl && (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => window.open(project.demoUrl, '_blank')}
                    icon={<ExternalLink size={16} />}
                    className="ml-auto"
                  >
                    Launch Demo
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
