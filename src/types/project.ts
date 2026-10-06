export type ProjectCategory = 'all' | 'web' | 'design' | 'fullstack';

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'design' | 'fullstack';
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  year: string;
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  client?: string;
  role?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  educationD3: string;
  educationS1: string;
  status: string;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  bio: string;
  portraitImage?: string;
  focus: string[];
  languages: string[];
}
