'use client';

import React from 'react';
import { motion } from 'framer-motion';
import profile from '@/content/profile.json';
import { GraduationCap, Award, BookOpen, Sparkles, Code2, Server, Layout, Boxes } from 'lucide-react';

type Edu = { degree: string; school: string; period: string; current?: boolean };
const education: Edu[] = (profile as { education?: Edu[] }).education || [];

export const AboutEducation: React.FC = () => {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24 max-w-[89.5rem] mx-auto">
      {/* Section Header */}
      <div className="mb-16 border-b border-white/10 pb-8">
        <span className="label-mono block mb-3">
          // ACADEMIC JOURNEY &amp; PHILOSOPHY
        </span>
        <h2 className="font-serif text-[clamp(36px,4.5vw,60px)] font-light leading-[1.05] tracking-[-0.03em] text-white">
          Background &amp; Expertise
        </h2>
      </div>

      {/* Dual Photo Gallery Showcase Card Grid (Kristian Ulrych Editorial Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        
        {/* Photo 1: Reading Focus Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-white/10 bg-[#13161c] group shadow-2xl"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <img
              src="/images/about-reading.jpg"
              alt="Firza Duta Fauzan Reading"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>// CONSTANT LEARNING</span>
            </div>
            <h3 className="text-xl font-serif font-light text-white mb-2">
              Deep Technical Focus &amp; Curiosity
            </h3>
            <p className="text-sm text-[#9CA3AF] leading-[1.65]">
              Driven by continuous learning across modern frontend architecture, JavaScript runtime engines, and clean code practices.
            </p>
          </div>
        </motion.div>

        {/* Photo 2: Workspace & Creative Process Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-white/10 bg-[#13161c] group shadow-2xl"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <img
              src="/images/about-workspace.jpg"
              alt="Firza Duta Fauzan Workspace"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>// DESIGN &amp; CODE HARMONY</span>
            </div>
            <h3 className="text-xl font-serif font-light text-white mb-2">
              Thoughtful Digital Craftsmanship
            </h3>
            <p className="text-sm text-[#9CA3AF] leading-[1.65]">
              Blending aesthetic UI design with robust backend engineering to build intuitive web products that users love.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Grid: Academic Timeline & Technical Services */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: UBSI Academic Timeline */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-amber-500/10 border border-purple-500/30 text-purple-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="label-mono block">Education</span>
              <h3 className="text-2xl font-serif font-light text-white">
                Studies
              </h3>
            </div>
          </div>

          <div className="relative border-l border-white/15 pl-6 space-y-10 ml-4">
            {education.map((e, i) => (
              <motion.div
                key={e.degree}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#0b0d10] border-2 ${e.current ? 'border-emerald-400' : 'border-purple-400'}`} />
                <div className="flex items-center gap-3 mb-1">
                  {e.current && (
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Currently Studying
                    </span>
                  )}
                  <span className="text-xs font-mono text-gray-400">{e.period}</span>
                </div>
                <h4 className="text-lg font-medium text-white">{e.degree}</h4>
                <p className="text-xs text-gray-400 mt-1 font-sans">{e.school}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Key Technical Offerings */}
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-purple-500/10 border border-amber-500/30 text-amber-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="label-mono block">Capabilities</span>
              <h3 className="text-2xl font-serif font-light text-white">
                What I build
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-white/10 bg-[#13161c]/80 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Boxes className="w-4 h-4 text-violet-400" />
                <h4 className="text-sm font-semibold text-white">Web3 Developer Tooling</h4>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed font-sans">EVM JSON-RPC, Substrate/WSS, Solidity, and verifiable reports.</p>
              <p className="mt-2 text-[11px] font-mono text-gray-500">Proof: NodeScope</p>
            </div>
            <div className="p-5 rounded-2xl border border-white/10 bg-[#13161c]/80 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Layout className="w-4 h-4 text-purple-400" />
                <h4 className="text-sm font-semibold text-white">Frontend &amp; Web UI</h4>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed font-sans">React, Next.js, TypeScript, Tailwind, and responsive, accessible interfaces.</p>
              <p className="mt-2 text-[11px] font-mono text-gray-500">Proof: NodeScope · Koloni Cafe · this site</p>
            </div>
            <div className="p-5 rounded-2xl border border-white/10 bg-[#13161c]/80 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-semibold text-white">Backend &amp; Databases</h4>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed font-sans">Laravel, native PHP, MySQL, auth, admin dashboards, and internal company systems.</p>
              <p className="mt-2 text-[11px] font-mono text-gray-500">Proof: CLC Attendance System · Posyandu Dashboard</p>
            </div>
            <div className="p-5 rounded-2xl border border-white/10 bg-[#13161c]/80 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-semibold text-white">Automation &amp; DevOps</h4>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed font-sans">Node setup scripts, Vercel and GitHub Actions deployments.</p>
              <p className="mt-2 text-[11px] font-mono text-gray-500">Proof: GrassRDP · CI for this site</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
