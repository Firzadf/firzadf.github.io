'use client';

import React from 'react';
import { ProjectProvider } from '@/context/ProjectContext';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Header } from '@/components/Header';
import { ProjectGrid } from '@/components/ProjectGrid';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';

export default function WorkPage() {
  return (
    <ProjectProvider>
      <div className="relative min-h-screen bg-[#0B0D10] text-white selection:bg-[#AEA8FE] selection:text-[#0B0D10] overflow-x-hidden">
        <CosmicBackground />
        <Header />
        <main id="main" className="relative z-10 pt-20">
          <PageTransition>
            <div className="px-5 pt-12 pb-6 md:px-10 max-w-[89.5rem] mx-auto">
              <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2 block font-mono">
                // Portfolio Showcase
              </span>
              <h1 className="font-serif text-[clamp(40px,6vw,72px)] font-light leading-none tracking-tight text-white mb-4">
                Selected Work &amp; Case Studies
              </h1>
              <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
                Explore web applications, design systems, and full-stack software projects engineered with modern JavaScript, Next.js, and clean UI architecture.
              </p>
            </div>
            <ProjectGrid />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </ProjectProvider>
  );
}
