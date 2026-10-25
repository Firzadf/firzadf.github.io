'use client';

import React, { createContext, useContext } from 'react';
import { MotionConfig } from 'framer-motion';
import { Project, PersonalInfo } from '@/types/project';
import profileData from '@/content/profile.json';
import projectsData from '@/content/projects.json';

// Content lives in src/content/*.json and is edited through /admin (Sveltia CMS),
// which commits changes to the repo. GitHub Actions rebuilds the site on every commit.

interface ProjectContextType {
  projects: Project[];
  personalInfo: PersonalInfo;
}

const value: ProjectContextType = {
  projects: (projectsData.projects as Project[]).filter((p) => p && p.title),
  personalInfo: profileData as PersonalInfo,
};

const ProjectContext = createContext<ProjectContextType>(value);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProjectContext.Provider value={value}>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </ProjectContext.Provider>
);

export const useProjects = () => useContext(ProjectContext);

export const whatsappLink = (num: string, text = 'Hello Firza!') =>
  `https://wa.me/${num.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;

export const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
