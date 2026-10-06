'use client';

import React from 'react';
import Link from 'next/link';
import { ProjectProvider } from '@/context/ProjectContext';
import { LoadingScreen } from '@/components/LoadingScreen';
import { CosmicCursor } from '@/components/CosmicCursor';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProjectGrid } from '@/components/ProjectGrid';
import { AboutEducation } from '@/components/AboutEducation';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <ProjectProvider>
      <LoadingScreen />
      <div className="relative min-h-screen bg-[#0B0D10] text-white selection:bg-[#AEA8FE] selection:text-[#0B0D10] overflow-x-hidden">
        <CosmicBackground />
        <CosmicCursor />
        <Header />
        <main className="relative z-10">
          <PageTransition>
            <Hero />
            <ProjectGrid />

            {/* Link to Full Work Page */}
            <div className="text-center py-10">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all shadow-xl"
                data-cursor="pointer"
              >
                View Full Work Gallery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <AboutEducation />
            <Contact />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </ProjectProvider>
  );
}
