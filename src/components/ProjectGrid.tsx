'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '@/context/ProjectContext';
import { Project, ProjectCategory } from '@/types/project';
import { ProjectModal } from './ProjectModal';
import { Search, ArrowUpRight, Sparkles, Code2, Palette, Layers, Terminal } from 'lucide-react';

export const ProjectGrid: React.FC = () => {
  const { projects } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: { key: ProjectCategory; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All Showcase', icon: <Layers className="w-3.5 h-3.5 text-purple-300" /> },
    { key: 'web', label: 'Web Engineering', icon: <Terminal className="w-3.5 h-3.5 text-blue-300" /> },
    { key: 'design', label: 'UI/UX Design', icon: <Palette className="w-3.5 h-3.5 text-amber-300" /> },
    { key: 'fullstack', label: 'Full-Stack Systems', icon: <Code2 className="w-3.5 h-3.5 text-emerald-300" /> },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredHeroProject = projects.find((p) => p.featured) || projects[0];

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
            Web applications, digital products, and UI/UX design systems executed with clarity, character, and practical engineering.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-white/10 bg-[#13161c]/80 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors shadow-inner font-mono"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2.5 mb-14">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
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
      {selectedCategory === 'all' && !searchQuery && featuredHeroProject && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onClick={() => setActiveProject(featuredHeroProject)}
          className="group cursor-pointer mb-16 rounded-3xl overflow-hidden border border-white/10 bg-[#13161c] hover:border-purple-500/40 transition-all duration-500 shadow-2xl"
          data-cursor="pointer"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Container */}
            <div className="lg:col-span-7 relative overflow-hidden aspect-[16/10] lg:aspect-auto min-h-[22rem]">
              <img
                src={featuredHeroProject.image}
                alt={featuredHeroProject.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  ✦ Featured Highlight
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
                <p className="text-[15px] text-[#D1D5DB] leading-[1.65] mb-6 font-sans">
                  {featuredHeroProject.description}
                </p>
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

                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-purple-300 transition-colors">
                  Explore Case Study
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                onClick={() => setActiveProject(project)}
                className="group cursor-pointer flex flex-col p-6 rounded-3xl border border-white/10 bg-[#13161c]/80 backdrop-blur-xl hover:border-purple-500/40 transition-all duration-500 shadow-xl"
                data-cursor="pointer"
              >
                {/* Thumbnail Container */}
                <div className="relative overflow-hidden rounded-2xl bg-black/40 aspect-[16/10] mb-6 border border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
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
                      {project.category}
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
