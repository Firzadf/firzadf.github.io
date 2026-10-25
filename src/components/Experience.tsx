'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight, FileDown } from 'lucide-react';
import data from '@/content/experience.json';
import profile from '@/content/profile.json';

interface Job {
  role: string;
  company: string;
  period: string;
  summary: string;
  link?: string;
}

const jobs = ((data as { experience: Job[] }).experience || []).filter((j) => j && j.role);
const cvUrl = (profile as { cvUrl?: string }).cvUrl;

export const Experience: React.FC = () => {
  if (jobs.length === 0) return null;
  return (
    <section id="experience" className="px-5 py-16 md:px-10 md:py-24 max-w-[89.5rem] mx-auto">
      <div className="mb-12 border-b border-white/10 pb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="label-mono block mb-3">// WORK EXPERIENCE</span>
          <h2 className="font-serif text-[clamp(36px,4.5vw,60px)] font-light leading-[1.05] tracking-[-0.03em] text-white">
            Experience
          </h2>
        </div>
        {cvUrl && (
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            <FileDown className="h-4 w-4" /> Download CV
          </a>
        )}
      </div>

      <ol className="relative ml-2 space-y-10 border-l border-white/15 pl-8">
        {jobs.map((j, i) => (
          <motion.li
            key={`${j.company}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.05 }}
            className="relative"
          >
            <span className={`absolute -left-[41px] top-1.5 flex h-4 w-4 rounded-full border-2 bg-[#0b0d10] ${i === 0 ? 'border-emerald-400' : 'border-purple-400/70'}`} />
            <div className="grid gap-2 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-xs text-gray-400">{j.period}</span>
              </div>
              <div className="md:col-span-9">
                <h3 className="font-serif text-2xl font-light text-white">{j.role}</h3>
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-purple-300">
                  <Briefcase className="h-3.5 w-3.5" />
                  {j.link ? (
                    <a href={j.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      {j.company} <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : (
                    j.company
                  )}
                </p>
                <p className="mt-3 max-w-3xl text-[15px] leading-[1.7] text-[#B5BAC3]">{j.summary}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
};
