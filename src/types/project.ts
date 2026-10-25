export type ProjectCategory = 'all' | 'web3' | 'web' | 'fullstack';

export interface Project {
  id: string;
  title: string;
  category: 'web3' | 'web' | 'fullstack';
  description: string;
  longDescription?: string;
  highlights?: string[];
  image?: string;
  gallery?: string[];
  tags: string[];
  year: string;
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  extraUrl?: string;
  extraLabel?: string;
  role?: string;
  event?: string;
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
