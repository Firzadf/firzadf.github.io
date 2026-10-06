'use client';

import React from 'react';
import { useProjects } from '@/context/ProjectContext';
import { Mail, MessageSquare, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const { personalInfo } = useProjects();

  return (
    <section id="contact" className="px-5 py-20 md:px-10 md:py-32 max-w-[89.5rem] mx-auto border-t border-white/10">
      <div className="flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
        {/* Main Contact Headline */}
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-3 block">
            Get In Touch
          </span>
          <h2 className="font-serif text-[clamp(40px,5.5vw,72px)] font-light leading-[1.05] tracking-tight text-white mb-6">
            Have a project or job role in mind?<br />
            <span className="font-serif italic font-light text-gradient">Let&apos;s build it.</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            I am currently actively open for full-time Software Engineer positions, web development contracts, and freelance projects. Feel free to send a message!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          <a
            href={`https://api.whatsapp.com/send?phone=${personalInfo.whatsapp}&text=Hello%20Firza!`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white bg-white px-8 text-sm font-semibold uppercase tracking-wider text-black transition-all hover:bg-purple-300 active:scale-95"
            data-cursor="pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Chat on WhatsApp
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/10 active:scale-95"
            data-cursor="pointer"
          >
            <Mail className="w-4 h-4" />
            Email Me
          </a>
        </div>
      </div>

      {/* Direct Links Grid */}
      <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href={`mailto:${personalInfo.email}`}
          className="p-6 rounded-2xl border border-white/10 bg-[#1B1E23] hover:border-purple-400/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <Mail className="w-6 h-6 text-purple-400" />
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Direct Email</span>
          <span className="text-lg font-serif text-white truncate block">{personalInfo.email}</span>
        </a>

        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-2xl border border-white/10 bg-[#1B1E23] hover:border-purple-400/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <Github className="w-6 h-6 text-white" />
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">GitHub Repositories</span>
          <span className="text-lg font-serif text-white block">github.com/firzadf</span>
        </a>

        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-2xl border border-white/10 bg-[#1B1E23] hover:border-purple-400/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <Linkedin className="w-6 h-6 text-blue-400" />
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">LinkedIn Network</span>
          <span className="text-lg font-serif text-white block">linkedin.com/in/firzadf</span>
        </a>
      </div>
    </section>
  );
};
