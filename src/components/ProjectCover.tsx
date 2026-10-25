import React from 'react';
import { Project } from '@/types/project';

const palettes: Record<Project['category'], string> = {
  web3: 'from-[#1b1446] via-[#2a1f6b] to-[#0b0d10]',
  web: 'from-[#0f2a2a] via-[#123b3a] to-[#0b0d10]',
  fullstack: 'from-[#2b1a0e] via-[#3d2612] to-[#0b0d10]',
};

/** Real screenshot when one exists; otherwise a clean typographic cover (never stock photos). */
export const ProjectCover: React.FC<{ project: Project; className?: string; eager?: boolean }> = ({
  project,
  className = '',
  eager = false,
}) => {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        loading={eager ? 'eager' : 'lazy'}
        className={`h-full w-full object-cover object-top ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${project.title} cover`}
      className={`relative h-full w-full bg-gradient-to-br ${palettes[project.category]} flex flex-col justify-end p-6 md:p-8 overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <span aria-hidden="true" className="relative font-serif italic text-6xl md:text-7xl font-light text-white/90 leading-none mb-3">
        {project.title
          .split(/[\s—-]+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((w) => w[0])
          .join('')}
      </span>
      <span className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
        {project.tags.slice(0, 3).join(' · ')}
      </span>
    </div>
  );
};
