'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '@/context/ProjectContext';
import { Project, ProjectCategory } from '@/types/project';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, Code2, Layers, Terminal, Boxes, Github, ExternalLink } from 'lucide-react';
import { ProjectCover } from './ProjectCover';

export const ProjectGrid: React.FC = () => {
  const { projects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: { key: ProjectCategory; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All Showcase', icon: <Layers className="w-3.5 h-3.5 text-purple-300" /> },
    { key: 'web3', label: 'Web3 & Tooling', icon: <Boxes className="w-3.5 h-3.5 text-violet-300" /> },
    { key: 'web', label: 'Web', icon: <Terminal className="w-3.5 h-3.5 text-sky-300" /> },
    { key: 'fullstack', label: 'Full-Stack', icon: <Code2 className="w-3.5 h-3.5 text-emerald-300" /> },
  ];

  const featuredHeroProject = projects.find((p) => p.featured) || projects[0];
  const showFeatured = selectedCategory === 'all' && !!featuredHeroProject;

  const filteredProjects = projects.filter((project) => {
    if (showFeatured && project.id === featuredHeroProject.id) return false;
    return selectedCategory === 'all' || project.category === selectedCategory;
  });

  return (
    <section id="work" className="px-5 py-16 md:px-10 md:py-28 max-w-[89.5rem] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
        <div>
          <span className="label-mono block mb-3">
            // SELECTED WORK SHOWCASE
          </span>
          <h2 className="font-serif text-[clamp(36px,4.5vw,64px)] font-light leading-[1.05] tracking-[-0.03em] text-white mb-4">
            Selected work
          </h2>
          <p className="text-[#9CA3AF] text-[15px] md:text-[16px] leading-[1.65] max-w-lg font-sans">
            Web3 developer tooling, full-stack systems, and websites. Real screenshots, real repos, live demos where they exist.
          </p>
        </div>

      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2.5 mb-10" role="group" aria-label="Filter projects">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            aria-pressed={selectedCategory === cat.key}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
              selectedCategory === cat.key
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105 font-semibold'
                : 'bg-[#13161c] text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
            data-cursor="pointer"
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Asymmetric Hero Banner Card */}
      {showFeatured && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7 }}
          onClick={() => setActiveProject(featuredHeroProject)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setActiveProject(featuredHeroProject))}
          role="button"
          tabIndex={0}
          aria-label={`Open case study: ${featuredHeroProject.title}`}
          className="group cursor-pointer mb-16 rounded-3xl overflow-hidden border border-white/10 bg-[#13161c] hover:border-purple-500/40 transition-all duration-500 shadow-2xl"
          data-cursor="pointer"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Container */}
            <div className="lg:col-span-7 relative overflow-hidden aspect-[16/10] lg:aspect-auto min-h-[22rem]">
              <ProjectCover project={featuredHeroProject} className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  ✦ Featured
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-[#13161c] to-[#0b0d10]">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-4">
                  <span>// 01 FEATURED</span>
                  <span>{featuredHeroProject.year}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif font-light text-white group-hover:text-purple-300 transition-colors mb-4 leading-tight">
                  {featuredHeroProject.title}
                </h3>
                {featuredHeroProject.event && (
                  <p className="text-xs font-mono text-amber-300/90 mb-3">{featuredHeroProject.event}</p>
                )}
                <p className="text-[15px] text-[#D1D5DB] leading-[1.65] mb-5 font-sans">
                  {featuredHeroProject.description}
                </p>
                {featuredHeroProject.highlights && (
                  <ul className="mb-6 space-y-1.5 text-[13px] text-gray-300">
                    {featuredHeroProject.highlights.slice(0, 4).map((h) => (
                      <li key={h} className="flex gap-2"><span className="text-violet-300">→</span>{h}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredHeroProject.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 text-[11px] rounded-full bg-white/5 text-gray-300 border border-white/10 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black">
                    Case study <ArrowUpRight className="w-4 h-4" />
                  </span>
                  {featuredHeroProject.demoUrl && (
                    <a href={featuredHeroProject.demoUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10">
                      <ExternalLink className="w-3.5 h-3.5" /> Live
                    </a>
                  )}
                  {featuredHeroProject.githubUrl && (
                    <a href={featuredHeroProject.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10">
                      <Github className="w-3.5 h-3.5" /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Projects Showcase Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <p className="text-gray-400 text-sm">No projects found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project, idx) => {
            const formattedIndex = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: Math.min(idx, 3) * 0.06 }}
                onClick={() => setActiveProject(project)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setActiveProject(project))}
                role="button"
                tabIndex={0}
                aria-label={`Open case study: ${project.title}`}
                className="group cursor-pointer flex flex-col p-6 rounded-3xl border border-white/10 bg-[#13161c]/80 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-500 shadow-xl"
                data-cursor="pointer"
              >
                {/* Thumbnail Container */}
                <div className="relative overflow-hidden rounded-2xl bg-black/40 aspect-[16/10] mb-6 border border-white/10">
                  <ProjectCover project={project} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                    <span className="text-xs text-white font-semibold uppercase tracking-wider font-sans">
                      View Case Study
                    </span>
                    <div className="p-2.5 rounded-full bg-white text-black">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-black/70 text-purple-300 backdrop-blur-md border border-white/10">
                      {project.category === 'web3' ? 'web3' : project.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-mono text-gray-400 bg-black/70 px-2.5 py-1 rounded-full border border-white/10">
                      //{formattedIndex}
                    </span>
                  </div>
                </div>

                {/* Content Typography */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="text-xl md:text-2xl font-serif font-light text-white group-hover:text-purple-300 transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <span className="text-xs text-gray-500 font-mono shrink-0">
                        {project.year}
                      </span>
                    </div>

                    <p className="text-[14px] text-[#9CA3AF] line-clamp-2 leading-[1.6] mb-4 font-sans">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 font-mono">
                    {project.tags.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-white/5 text-gray-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2.5 py-1 text-[10px] rounded-full bg-white/5 text-gray-500">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
