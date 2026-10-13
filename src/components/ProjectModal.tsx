'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Tag, UserCheck } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
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
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-950 w-full max-w-3xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] md:max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#1B1E23] p-4 pt-12 sm:p-6 sm:pt-16 md:p-8 md:pt-20 shadow-2xl text-white scrollbar-thin"
        >
          {/* Close Button - positioned inside the container flow to avoid overlap issues */}
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/10 bg-[#1B1E23]/95 text-gray-300 shadow-lg hover:text-white hover:bg-white/10 transition-colors"
              data-cursor="pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media Header */}
          <div className="relative w-full max-h-[50vh] md:max-h-[45vh] overflow-hidden rounded-xl bg-black/40 mb-5 md:mb-6 border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
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

            <p className="text-gray-300 leading-relaxed text-base">
              {project.longDescription || project.description}
            </p>

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
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
