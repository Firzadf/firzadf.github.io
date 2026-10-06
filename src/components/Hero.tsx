'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '@/context/ProjectContext';

export const Hero: React.FC = () => {
  const { personalInfo } = useProjects();

  const photoUrl = personalInfo.portraitImage || '/images/official-profile.jpg';

  return (
    <section className="relative z-10 flex flex-col px-5 pt-32 pb-16 md:px-10 md:pt-36 max-w-[89.5rem] mx-auto min-h-[calc(100vh-5rem)] justify-between">
      {/* 2-Column Responsive Grid System (No overlap!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

        {/* Left Column: Headline & Definition List */}
        <div className="lg:col-span-7 flex flex-col justify-between min-h-[calc(100vh-14rem)]">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif font-light leading-[1.01] tracking-tight text-[clamp(40px,5.8vw,5.5rem)] text-white">
              Software Engineer based in{' '}
              <span className="italic-highlight pr-1">
                Indonesia
              </span>
              .<br />
              <span>Shaping digital products,<br /></span>
              <span>websites and scalable systems<br /></span>
              <span>with clarity and character.</span>
            </h1>
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
          className="lg:col-span-5 relative w-full"
        >
          <div className="relative h-auto w-full min-h-[28rem] md:min-h-[34rem] lg:min-h-[38rem] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            {/* Kristian Orange Vibrant Background Accent Layer */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[#FF6322] group-hover:scale-105 transition-transform duration-700"
            />

            {/* Photo Container */}
            <div className="relative overflow-hidden aspect-[3/4] w-full h-full">
              <img
                src={photoUrl}
                alt={personalInfo.name}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Radial Gradient Glow Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(140%_100%_at_50%_60%,rgba(255,99,34,0)_40%,rgba(255,99,34,0.35)_100%)]"
            />

            {/* Photo Caption Overlay Label */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white block font-sans">
                  {personalInfo.name}
                </span>
                <span className="text-[11px] text-gray-400 block font-mono">
                  {personalInfo.title}
                </span>
              </div>
              <span className="px-3 py-1 text-[10px] uppercase font-mono tracking-wider rounded-full bg-white/10 text-purple-200 border border-white/10">
                ✦ Official Photo
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
