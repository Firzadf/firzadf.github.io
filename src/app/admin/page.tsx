'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProjectProvider, useProjects } from '@/context/ProjectContext';
import { CosmicCursor } from '@/components/CosmicCursor';
import { AdminLoginForm } from '@/components/AdminLoginForm';
import { Project } from '@/types/project';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  Github,
  X,
  CheckCircle,
  User,
  Image as ImageIcon,
  LogOut,
  Database,
  ShieldCheck,
} from 'lucide-react';

function AdminContent() {
  const {
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
  } = useProjects();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Project Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'web' as 'web' | 'design' | 'fullstack',
    description: '',
    longDescription: '',
    image: '',
    tags: '',
    year: new Date().getFullYear().toString(),
    featured: false,
    demoUrl: '',
    githubUrl: '',
    role: '',
  });

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: personalInfo.name,
    title: personalInfo.title,
    location: personalInfo.location,
    email: personalInfo.email,
    whatsapp: personalInfo.whatsapp,
    portraitImage: personalInfo.portraitImage || '',
    bio: personalInfo.bio,
  });

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // If user is not authenticated, render Login Form Gate
  if (!isAuthenticated) {
    return <AdminLoginForm onLoginSuccess={() => login('admin', 'firza2026')} />;
  }

  const openAddForm = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'web',
      description: '',
      longDescription: '',
      image: '',
      tags: '',
      year: new Date().getFullYear().toString(),
      featured: false,
      demoUrl: '',
      githubUrl: '',
      role: '',
    });
    setIsFormOpen(true);
  };

  const openEditForm = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      longDescription: project.longDescription || '',
      image: project.image,
      tags: project.tags.join(', '),
      year: project.year,
      featured: project.featured,
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      role: project.role || '',
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please fill in title and description.');
      return;
    }

    const parsedTags = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectPayload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      longDescription: formData.longDescription,
      image: formData.image || 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
      tags: parsedTags.length > 0 ? parsedTags : ['Web Development'],
      year: formData.year,
      featured: formData.featured,
      demoUrl: formData.demoUrl,
      githubUrl: formData.githubUrl,
      role: formData.role,
    };

    if (editingProject) {
      await updateProject(editingProject.id, projectPayload);
      showNotify(`Project "${formData.title}" updated successfully!`);
    } else {
      await addProject(projectPayload);
      showNotify(`New Project "${formData.title}" added to portfolio!`);
    }

    setIsFormOpen(false);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePersonalInfo(profileData);
    showNotify('Profile information & photo updated successfully!');
    setIsProfileModalOpen(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteProject(id);
      showNotify(`Project "${title}" deleted.`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importProjectsJSON(content);
        if (success) {
          showNotify('Portfolio projects imported successfully!');
        } else {
          alert('Failed to parse JSON file.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white p-6 md:p-10 max-w-[89.5rem] mx-auto">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-[10000] flex items-center gap-2 rounded-xl bg-emerald-500 text-black font-semibold px-4 py-3 shadow-xl font-sans">
          <CheckCircle className="w-5 h-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Live Site
            </Link>
            <span className="text-gray-600 font-mono">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <Database className="w-3 h-3" /> IndexedDB Active
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-light text-white">
            Admin Management Portal
          </h1>
          <p className="text-gray-400 text-xs font-mono mt-1">
            Logged in as <span className="text-purple-300 font-semibold">admin</span> • Full-stack client database ready.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setProfileData({
                name: personalInfo.name,
                title: personalInfo.title,
                location: personalInfo.location,
                email: personalInfo.email,
                whatsapp: personalInfo.whatsapp,
                portraitImage: personalInfo.portraitImage || '',
                bio: personalInfo.bio,
              });
              setIsProfileModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-semibold text-xs uppercase tracking-wider hover:bg-purple-500/20 transition-all font-mono"
            data-cursor="pointer"
          >
            <User className="w-3.5 h-3.5" /> Profile &amp; Photo
          </button>

          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-purple-300 transition-all shadow-lg font-mono"
            data-cursor="pointer"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>

          <button
            onClick={exportProjectsJSON}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-gray-300 font-semibold text-xs uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all font-mono"
            data-cursor="pointer"
          >
            <Download className="w-3.5 h-3.5" /> Backup DB
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 text-gray-300 font-semibold text-xs uppercase tracking-wider hover:bg-white/10 hover:text-white transition-all cursor-pointer font-mono" data-cursor="pointer">
            <Upload className="w-3.5 h-3.5" /> Import
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-red-500/30 bg-red-500/15 text-red-300 font-semibold text-xs uppercase tracking-wider hover:bg-red-500/25 transition-all font-mono"
            data-cursor="pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Projects List Table / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-gray-400 px-4 pb-2 border-b border-white/5">
          <span>Database Projects ({projects.length})</span>
          <span>Actions</span>
        </div>

        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-white/10 bg-[#13161c] hover:border-purple-500/30 transition-all gap-4 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-20 h-14 object-cover rounded-xl border border-white/10 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-xl font-light text-white">
                      {project.title}
                    </h3>
                    <span className="px-2.5 py-0.5 text-[10px] uppercase font-semibold font-mono tracking-wider rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-0.5 text-[10px] uppercase font-semibold font-mono tracking-wider rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1 max-w-xl font-sans">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] text-gray-500 font-mono">Year: {project.year}</span>
                    <span className="text-[11px] text-gray-500">|</span>
                    <span className="text-[11px] text-gray-500 font-mono">Tags: {project.tags.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Live Demo"
                    data-cursor="pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="GitHub"
                    data-cursor="pointer"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => openEditForm(project)}
                  className="p-2 rounded-full border border-white/10 bg-white/5 text-purple-300 hover:text-white hover:bg-purple-500/20 transition-colors"
                  title="Edit Project"
                  data-cursor="pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id, project.title)}
                  className="p-2 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 hover:text-red-200 hover:bg-red-500/20 transition-colors"
                  title="Delete Project"
                  data-cursor="pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile & Photo Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsProfileModalOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#13161c] p-6 md:p-8 shadow-2xl text-white">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-light text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              Edit Profile Information &amp; Photo
            </h2>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" /> Photo Profile Image URL
                </label>
                <input
                  type="text"
                  value={profileData.portraitImage}
                  onChange={(e) => setProfileData({ ...profileData, portraitImage: e.target.value })}
                  placeholder="/images/official-profile.jpg"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Title &amp; Role Subtitle
                </label>
                <input
                  type="text"
                  value={profileData.title}
                  onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Bio / Summary
                </label>
                <textarea
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-sans"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3 font-mono">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 font-semibold uppercase tracking-wider hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-purple-300 transition-colors"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Project Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsFormOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#13161c] p-6 md:p-8 shadow-2xl text-white">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-light text-white mb-6 border-b border-white/10 pb-4">
              {editingProject ? 'Edit Project' : 'Add New Portfolio Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Next.js E-Commerce Platform"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-sans"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'web' | 'design' | 'fullstack',
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#13161c] text-sm text-white focus:outline-none focus:border-purple-400 font-mono"
                  >
                    <option value="web">Web Application</option>
                    <option value="design">UI/UX Design</option>
                    <option value="fullstack">Full-Stack System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Short Description (Card Overview) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of what this project achieves..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Detailed Case Study (Modal View)
                </label>
                <textarea
                  rows={4}
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  placeholder="In-depth explanation of features, architecture, problems solved..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Image Thumbnail URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/... or image path"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                  Tech Stack / Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    placeholder="https://your-demo.vercel.app"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/firzadf/repo"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-400"
                />
                <label htmlFor="featuredCheck" className="text-xs text-gray-300 cursor-pointer font-sans">
                  Mark as Featured Project (Highlights on top)
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3 font-mono">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 font-semibold uppercase tracking-wider hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-purple-300 transition-colors"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProjectProvider>
      <CosmicCursor />
      <AdminContent />
    </ProjectProvider>
  );
}
