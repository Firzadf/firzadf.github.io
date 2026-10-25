'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Tag, UserCheck } from 'lucide-react';
import { Project } from '@/types/project';
import { ProjectCover } from './ProjectCover';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[900] flex items-center justify-center p-3 sm:p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-950 w-full max-w-3xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] md:max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#1B1E23] p-4 sm:p-6 md:p-8 shadow-2xl text-white scrollbar-thin"
        >
          {/* Close Button - positioned inside the container flow to avoid overlap issues */}
          <div className="sticky top-0 z-10 flex justify-end -mb-12 pointer-events-none">
            <button
              onClick={onClose}
              autoFocus
              style={{ pointerEvents: 'auto' }}
              aria-label="Close case study"
              className="p-2 rounded-full border border-white/10 bg-[#1B1E23]/95 text-gray-300 shadow-lg hover:text-white hover:bg-white/10 transition-colors"
              data-cursor="pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media Header */}
          <div className="relative w-full aspect-[16/10] max-h-[50vh] md:max-h-[45vh] overflow-hidden rounded-xl bg-black/40 mb-5 md:mb-6 border border-white/10">
            <ProjectCover project={project} eager />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-black/70 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 border-b border-white/10 pb-4">
              <h2 className="font-serif text-3xl md:text-4xl font-light text-white">
                {project.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {project.year}
                </span>
                {project.role && (
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" /> {project.role}
                  </span>
                )}
              </div>
            </div>

            {project.event && <p className="text-sm font-mono text-amber-300/90">{project.event}</p>}

            <p className="text-gray-300 leading-relaxed text-base">
              {project.longDescription || project.description}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-gray-200">
                    <span className="text-violet-300">✓</span>{h}
                  </li>
                ))}
              </ul>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {project.gallery.map((g) => (
                  <img key={g} src={g} alt={`${project.title} screenshot`} loading="lazy" className="w-full rounded-xl border border-white/10 object-cover" />
                ))}
              </div>
            )}

            {/* Tech Stack Pills */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-400" /> Technologies &amp; Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider transition-all hover:bg-purple-300 hover:text-black"
                  data-cursor="pointer"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-xs uppercase tracking-wider transition-all hover:bg-white/10"
                  data-cursor="pointer"
                >
                  <Github className="w-4 h-4" /> Repository
                </a>
              )}
              {project.extraUrl && (
                <a
                  href={project.extraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-xs uppercase tracking-wider transition-all hover:bg-white/10"
                >
                  <ExternalLink className="w-4 h-4" /> {project.extraLabel || 'More'}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
