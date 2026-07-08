/**
 * @file src/features/apps/ResumeCenter/ResumeApp.tsx
 * @description Professional resume viewer.
 */

import React from 'react';
import { Card, Button, Badge } from '@/ui/system';
import { resumeData } from '@/data/resume';
import { Download, Printer, FileText, MapPin, Mail, Phone, Globe } from 'lucide-react';

export function ResumeApp() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8 h-full overflow-y-auto bg-[rgba(5,5,10,0.8)]">
      {/* Top Actions Bar */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--color-primary-300)] flex items-center gap-3">
          <FileText className="text-[var(--color-primary-500)]" />
          RESUME.PDF
        </h2>
        <div className="flex gap-4">
          <Button variant="secondary" size="sm" onClick={handlePrint} icon={<Printer size={16} />}>
            Print
          </Button>
          <Button variant="primary" size="sm" icon={<Download size={16} />}>
            Download ATS
          </Button>
        </div>
      </div>

      {/* Resume Document Wrapper */}
      <div className="max-w-4xl mx-auto">
        <Card variant="default" padding="lg" className="bg-[#0f0f15] border-[rgba(255,255,255,0.1)] print:shadow-none print:border-none print:bg-white print:text-black">
          {/* Header */}
          <div className="border-b border-[rgba(255,255,255,0.1)] pb-8 mb-8 print:border-black/20">
            <h1 className="text-5xl font-bold text-[var(--color-text-primary)] tracking-tight mb-2 print:text-black">
              {resumeData.basics.name.toUpperCase()}
            </h1>
            <h2 className="text-xl text-[var(--color-primary-400)] font-semibold tracking-widest uppercase mb-6 print:text-gray-600">
              {resumeData.basics.label}
            </h2>
            
            <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)] font-mono print:text-gray-500">
              <span className="flex items-center gap-2"><MapPin size={14}/> {resumeData.basics.location.city}, {resumeData.basics.location.region}</span>
              <span className="flex items-center gap-2"><Mail size={14}/> {resumeData.basics.email}</span>
              <span className="flex items-center gap-2"><Phone size={14}/> {resumeData.basics.phone}</span>
              <span className="flex items-center gap-2"><Globe size={14}/> {resumeData.basics.url.replace('https://', '')}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-10">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-[0.2em] mb-4 print:text-black">Summary</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed print:text-gray-700">
              {resumeData.basics.summary}
            </p>
          </div>

          {/* Education */}
          <div className="mb-10">
            <h3 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-[0.2em] mb-4 print:text-black">Education</h3>
            <div className="space-y-6">
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start group">
                  <div>
                    <h4 className="text-lg font-bold text-[var(--color-text-primary)] print:text-black">
                      {edu.institution}
                    </h4>
                    <p className="text-[var(--color-text-secondary)] font-semibold print:text-gray-600">
                      {edu.studyType} in {edu.area}
                    </p>
                    <div className="mt-2 flex gap-2">
                      {edu.courses.map(course => (
                        <Badge key={course} variant="outline" className="print:border-gray-300 print:text-gray-500">{course}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[var(--color-primary-300)] font-mono text-sm print:text-gray-500">
                      {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                    </div>
                    <div className="text-[var(--color-text-tertiary)] text-sm mt-1 print:text-gray-400">
                      Score: {edu.score}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
