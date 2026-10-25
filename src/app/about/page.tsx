'use client';

import React from 'react';
import { ProjectProvider, useProjects } from '@/context/ProjectContext';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { AboutEducation } from '@/components/AboutEducation';
import { Certificates } from '@/components/Certificates';
import { Code2, Cpu, FileCode2, Layers, CheckCircle2, Sparkles, Terminal, Flame, Zap } from 'lucide-react';

function AboutContent() {
  const { personalInfo } = useProjects();

  const jsSkills = [
    {
      title: 'Modern JavaScript (ES6+)',
      description: 'Solid grasp of ES6+ syntax, Arrow functions, Destructuring, Spread/Rest operators, ES Modules, and clean functional programming patterns.',
      icon: <FileCode2 className="w-5 h-5 text-amber-300" />,
      tag: 'LANGUAGE CORE',
    },
    {
      title: 'Async JS & Web APIs',
      description: 'Comfortable with Promises, Async/Await, Fetch API, Axios, WebSockets, RESTful endpoints, and asynchronous event-driven JavaScript architecture.',
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      tag: 'ASYNC & APIS',
    },
    {
      title: 'React 19 & Next.js Ecosystem',
      description: 'Building modern server-rendered and static web applications with React 19, Next.js App Router, custom hooks, state management, and Framer Motion animations.',
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      tag: 'FRONTEND ENGINE',
    },
    {
      title: 'Node.js & Backend Architecture',
      description: 'Developing scalable server-side APIs with Node.js, Express, middleware architecture, database ORMs, and secure JWT authentication.',
      icon: <Terminal className="w-5 h-5 text-emerald-400" />,
      tag: 'BACKEND SYSTEMS',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0B0D10] text-white selection:bg-[#AEA8FE] selection:text-[#0B0D10] overflow-x-hidden">
      <CosmicBackground />
      <Header />
      <main id="main" className="relative z-10 pt-28 pb-20">
        <PageTransition>
          {/* Header Banner */}
          <div className="px-5 pt-12 pb-12 md:px-10 max-w-[89.5rem] mx-auto border-b border-white/10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono text-purple-300 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>// ABOUT &amp; SKILLS</span>
            </div>
            <h1 className="font-serif text-[clamp(42px,6.2vw,76px)] font-light leading-none tracking-tight text-white mb-6">
              Passionate Developer &amp; JavaScript Specialist
            </h1>
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* JavaScript & Technical Expertise Showcase Section */}
          <section className="px-5 py-16 md:px-10 md:py-24 max-w-[89.5rem] mx-auto border-b border-white/10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 mb-3">
                  <Flame className="w-3.5 h-3.5 text-amber-300" />
                  <span>CORE SPECIALIZATION</span>
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-white">
                  JavaScript Engineering
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
              {jsSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl border border-white/10 bg-[#13161c]/80 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-300 shadow-xl group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-amber-500/10 border border-purple-500/30 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      {skill.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-light text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Complete Skills Badge Cloud */}
            <div className="p-8 rounded-3xl border border-white/10 bg-[#13161c]/50 backdrop-blur-xl">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4 font-mono">
                // Complete Stack &amp; Tools
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {[
                  'JavaScript (ES6+)',
                  'TypeScript',
                  'React.js 19',
                  'Next.js 15',
                  'Tailwind CSS',
                  'HTML5 & CSS3',
                  'PHP / Laravel',
                  'MySQL',
                  'REST / JSON-RPC',
                  'Solidity & EVM',
                  'Substrate / WebSocket',
                  'Vitest',
                  'Figma UI/UX',
                  'Git & GitHub',
                ].map((stack, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-200 hover:border-purple-400 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Academic Background Component */}
          <AboutEducation />
          <Certificates />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

export default function AboutPage() {
  return (
    <ProjectProvider>
      <AboutContent />
    </ProjectProvider>
  );
}
