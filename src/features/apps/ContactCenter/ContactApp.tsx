/**
 * @file src/features/apps/ContactCenter/ContactApp.tsx
 * @description Contact form and social media links.
 */

import React from 'react';
import { Card, Input, Button } from '@/ui/system';
import { Mail, Send, Github, Twitter, Linkedin, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export function ContactApp() {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-[#ff00ff] mb-4 flex items-center justify-center gap-3">
          <MessageSquare className="text-[#ff00ff]" size={28} />
          SECURE COMM-LINK
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          Establish a direct connection. End-to-end encrypted transmission channel for inquiries, proposals, and greetings.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Contact Form */}
        <div className="lg:col-span-3">
          <Card variant="glow" padding="lg" className="border-[#ff00ff]/20">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Transmitter ID</label>
                  <Input placeholder="Your Name" fullWidth className="focus:!border-[#ff00ff] focus:!shadow-[0_0_15px_rgba(255,0,255,0.2)]" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Return Vector</label>
                  <Input type="email" placeholder="Email Address" fullWidth className="focus:!border-[#ff00ff] focus:!shadow-[0_0_15px_rgba(255,0,255,0.2)]" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Subject Payload</label>
                <Input placeholder="Message Subject" fullWidth className="focus:!border-[#ff00ff] focus:!shadow-[0_0_15px_rgba(255,0,255,0.2)]" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Transmission Body</label>
                <textarea 
                  className="w-full bg-[rgba(5,5,10,0.6)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] rounded-md px-4 py-3 text-sm transition-all duration-300 outline-none border border-[rgba(255,255,255,0.1)] focus:border-[#ff00ff] focus:shadow-[0_0_15px_rgba(255,0,255,0.2)] resize-none"
                  rows={6}
                  placeholder="Enter message contents..."
                />
              </div>

              <div className="mt-4 flex justify-end">
                <Button variant="primary" size="lg" icon={<Send size={18} />} className="!bg-[#ff00ff] !border-[#ff00ff] hover:!bg-[#cc00cc] hover:!shadow-[0_0_20px_rgba(255,0,255,0.5)] !text-white w-full md:w-auto">
                  TRANSMIT DATA
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Socials & Info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="default" padding="lg" className="h-full flex flex-col justify-center">
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-widest mb-6 border-b border-[rgba(255,255,255,0.1)] pb-2">
                External Networks
              </h3>
              
              <div className="flex flex-col gap-4">
                <a href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors border border-transparent hover:border-[rgba(255,255,255,0.1)] group cursor-pointer text-decoration-none">
                  <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-[var(--color-text-primary)] group-hover:bg-white group-hover:text-black transition-colors">
                    <Github size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-[var(--color-text-primary)]">GitHub</div>
                    <div className="text-xs text-[var(--color-text-secondary)]">@janedoe</div>
                  </div>
                </a>

                <a href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-[rgba(29,161,242,0.1)] transition-colors border border-transparent hover:border-[rgba(29,161,242,0.2)] group cursor-pointer text-decoration-none">
                  <div className="w-10 h-10 rounded-full bg-[rgba(29,161,242,0.1)] flex items-center justify-center text-[#1DA1F2] group-hover:bg-[#1DA1F2] group-hover:text-white transition-colors">
                    <Twitter size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-[var(--color-text-primary)]">Twitter / X</div>
                    <div className="text-xs text-[var(--color-text-secondary)]">@janedoe</div>
                  </div>
                </a>

                <a href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-[rgba(10,102,194,0.1)] transition-colors border border-transparent hover:border-[rgba(10,102,194,0.2)] group cursor-pointer text-decoration-none">
                  <div className="w-10 h-10 rounded-full bg-[rgba(10,102,194,0.1)] flex items-center justify-center text-[#0A66C2] group-hover:bg-[#0A66C2] group-hover:text-white transition-colors">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-[var(--color-text-primary)]">LinkedIn</div>
                    <div className="text-xs text-[var(--color-text-secondary)]">in/janedoe</div>
                  </div>
                </a>
              </div>
            </Card>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
