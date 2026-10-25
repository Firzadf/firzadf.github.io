'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '@/context/ProjectContext';

export const Hero: React.FC = () => {
  const { personalInfo } = useProjects();

  const photoUrl = personalInfo.portraitImage || '/images/official-profile.jpg';

  return (
    <section className="relative z-10 flex flex-col px-5 pt-28 pb-16 md:px-10 md:pt-36 max-w-[89.5rem] mx-auto min-h-[calc(100vh-5rem)] justify-between">
      {/* 2-Column Responsive Grid System (No overlap!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column: Headline & Definition List */}
        <div className="lg:col-span-7 flex flex-col justify-between lg:min-h-[calc(100vh-14rem)]">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-mono mb-6 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Software Engineer · Web3 Tooling
            </span>
            <h1 className="font-serif font-light leading-[1.02] tracking-tight text-[clamp(44px,6.2vw,6rem)] text-white">
              I build web apps
              <br className="hidden sm:block" /> and{' '}
              <span className="italic-highlight pr-1">Web3 tools</span>
              <br className="hidden sm:block" /> people can trust.
            </h1>
            <p className="mt-6 max-w-xl text-[16px] md:text-[17px] leading-[1.7] text-[#B5BAC3] font-sans">
              {personalInfo.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-purple-200"
              >
                See my work
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact me
              </a>
              {personalInfo.cvUrl && (
                <a
                  href={personalInfo.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-gray-300 underline-offset-4 transition hover:text-white hover:underline"
                >
                  Download CV ↓
                </a>
              )}
            </div>
          </motion.div>

          {/* Definition List Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 lg:mt-auto pt-8 border-t border-white/10"
          >
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 text-sm">
              <div>
                <dt className="label-mono">
                  Based
                </dt>
                <dd className="mt-1.5 text-white text-[15px] font-sans font-medium">
                  {personalInfo.location}
                </dd>
              </div>

              <div>
                <dt className="label-mono">
                  Focus
                </dt>
                <dd className="mt-1.5 text-white text-[15px] font-sans font-medium">
                  Software Engineering &amp; Web UI
                </dd>
              </div>

              <div>
                <dt className="label-mono">
                  Languages
                </dt>
                <dd className="mt-1.5 text-white text-[15px] font-sans font-medium">
                  Indonesian, English
                </dd>
              </div>

              <div>
                <dt className="label-mono">
                  Open For
                </dt>
                <dd className="mt-1.5 text-emerald-400 text-[15px] font-sans font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Full-time &amp; Freelance
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>

        {/* Right Column: Hero Portrait Photo Card (Kristian Ulrych Style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full order-first lg:order-none max-w-[13rem] sm:max-w-xs lg:max-w-none"
        >
          <div className="relative h-auto w-full lg:min-h-[38rem] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            {/* Kristian Orange Vibrant Background Accent Layer */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[#FF6322] group-hover:scale-105 transition-transform duration-700"
            />

            {/* Photo Container */}
            <div className="relative overflow-hidden aspect-[3/4] w-full h-full">
              <img
                src={photoUrl}
                alt={`Portrait of ${personalInfo.name}`}
                fetchPriority="high"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Radial Gradient Glow Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(140%_100%_at_50%_60%,rgba(255,99,34,0)_40%,rgba(255,99,34,0.35)_100%)]"
            />

            {/* Photo Caption Overlay Label */}
            <div className="hidden lg:flex absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white block font-sans">
                  {personalInfo.name}
                </span>
                <span className="text-[11px] text-gray-400 block font-mono">
                  {personalInfo.title}
                </span>
              </div>
              <span className="px-3 py-1 text-[10px] uppercase font-mono tracking-wider rounded-full bg-white/10 text-purple-200 border border-white/10">
                ✦ Bogor, ID
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
