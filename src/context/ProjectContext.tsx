'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, PersonalInfo } from '@/types/project';
import { initialProjects, initialPersonalInfo } from '@/data/initialProjects';
import { PortfolioDB } from '@/lib/db';

interface ProjectContextType {
  projects: Project[];
  personalInfo: PersonalInfo;
  isAuthenticated: boolean;
  login: (username: string, pass: string) => boolean;
  logout: () => void;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, updatedFields: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  updatePersonalInfo: (updated: Partial<PersonalInfo>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  exportProjectsJSON: () => void;
  importProjectsJSON: (jsonString: string) => boolean;
}

const AUTH_KEY = 'firza_admin_auth_session';

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from IndexedDB / LocalStorage & Session state on mount
  useEffect(() => {
    async function initData() {
      try {
        const dbProjects = await PortfolioDB.getProjects();
        if (dbProjects && dbProjects.length > 0) {
          setProjects(dbProjects);
        }

        const dbInfo = await PortfolioDB.getPersonalInfo();
        if (dbInfo) {
          setPersonalInfo(dbInfo);
        }

        const savedAuth = sessionStorage.getItem(AUTH_KEY);
        if (savedAuth === 'true') {
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error('Error loading database:', e);
      } finally {
        setIsLoaded(true);
      }
    }
    initData();
  }, []);

  const login = (username: string, pass: string): boolean => {
    if (username.trim() === 'admin' && pass.trim() === 'firza2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  };

  const addProject = async (newProjectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...newProjectData,
      id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    const updated = [newProject, ...projects];
    setProjects(updated);
    await PortfolioDB.saveAllProjects(updated);
  };

  const updateProject = async (id: string, updatedFields: Partial<Project>) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProjects(updated);
    await PortfolioDB.saveAllProjects(updated);
  };

  const deleteProject = async (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    await PortfolioDB.saveAllProjects(updated);
  };

  const updatePersonalInfo = async (updated: Partial<PersonalInfo>) => {
    const newInfo = { ...personalInfo, ...updated };
    setPersonalInfo(newInfo);
    await PortfolioDB.savePersonalInfo(newInfo);
  };

  const resetToDefaults = async () => {
    setProjects(initialProjects);
    setPersonalInfo(initialPersonalInfo);
    await PortfolioDB.saveAllProjects(initialProjects);
    await PortfolioDB.savePersonalInfo(initialPersonalInfo);
  };

  const exportProjectsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `firza_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importProjectsJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        setProjects(parsed);
        PortfolioDB.saveAllProjects(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        personalInfo,
        isAuthenticated,
        login,
        logout,
        addProject,
        updateProject,
        deleteProject,
        updatePersonalInfo,
        resetToDefaults,
        exportProjectsJSON,
        importProjectsJSON,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
