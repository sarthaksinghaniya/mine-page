/**
 * @file src/ui/system/Timeline.tsx
 * @description Vertical timeline visualization for experience and museum items.
 */

import React from 'react';
import { Card } from './Card';
import { motion } from 'framer-motion';

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  details: React.ReactNode;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative pl-8 md:pl-0">
      {/* Center line (hidden on mobile, centered on desktop) */}
      <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary-500)] via-[var(--color-primary-300)] to-transparent opacity-30 transform md:-translate-x-1/2" />

      {events.map((event, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative mb-12 flex flex-col md:flex-row items-center w-full ${
              isEven ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-21px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-primary-400)] shadow-[0_0_15px_var(--color-primary-500)] z-10" />

            {/* Content Container */}
            <div className="w-full md:w-[45%]">
              <Card variant="glow" interactive className="p-6">
                <div className="text-[var(--color-primary-300)] font-mono text-sm tracking-widest mb-2">
                  {event.date}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
                  {event.title}
                </h3>
                <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
                  {event.subtitle}
                </h4>
                <div className="text-[15px] text-[var(--color-text-tertiary)] leading-relaxed">
                  {event.details}
                </div>
              </Card>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
