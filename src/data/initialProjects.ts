import { Project, PersonalInfo } from '../types/project';

export const initialPersonalInfo: PersonalInfo = {
  name: 'Firza Duta Fauzan',
  title: 'Software Engineer & Web Developer',
  location: 'Bogor, Indonesia',
  educationD3: 'D3 Information Systems — UBSI Bogor (Graduated 2024)',
  educationS1: 'S1 Information Technology — UBSI Bogor (Currently Pursuing)',
  status: 'Open for Full-time & Freelance Roles',
  bio: 'Software Engineer & D3 Information Systems graduate from UBSI Bogor, currently pursuing S1 Information Technology. Passionate about building modern, high-performance web applications and sleek digital experiences.',
  email: 'firzadutafauzan@gmail.com',
  github: 'https://github.com/firzadf',
  linkedin: 'https://linkedin.com/in/firzadutafauzan',
  whatsapp: '6281234567890',
  portraitImage: '/images/official-profile.jpg',
  focus: ['Frontend Engineering', 'Next.js & React 19', 'Full-Stack Systems', 'UI/UX Design Systems'],
  languages: ['Indonesian (Native)', 'English (Professional)'],
};

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Minimalist E-Commerce Platform',
    category: 'web',
    description:
      'High-performance online store built with Next.js 15, Tailwind CSS, and Stripe integration. Features instant filtering, dynamic cart management, and seamless guest checkout.',
    longDescription:
      'A full-fledged modern e-commerce storefront engineered for speed and aesthetic perfection. Built from the ground up using Next.js App Router, Tailwind CSS, Zustand state management, and serverless API handlers for order processing.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Zustand'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/firzadf',
    year: '2026',
    featured: true,
  },
  {
    id: '2',
    title: 'Fintech Dashboard & Analytics',
    category: 'fullstack',
    description:
      'Real-time financial management platform with interactive chart visualizations, currency conversion algorithms, and multi-tenant security architecture.',
    longDescription:
      'Designed and engineered for financial teams to track revenue metrics, monthly cash flow, and automated expense reporting with microsecond real-time web socket updates.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['React 19', 'Node.js', 'Express', 'PostgreSQL', 'Recharts'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/firzadf',
    year: '2025',
    featured: true,
  },
  {
    id: '3',
    title: 'Cosmic UI Component Library',
    category: 'design',
    description:
      'An accessible, dark-themed UI system created in Figma and exported as React 19 components with Framer Motion animations.',
    longDescription:
      'Comprehensive design system including 40+ production-ready components, design tokens, dark mode guidelines, and full WCAG AAA accessibility compliance.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    tags: ['Figma', 'React 19', 'Tailwind CSS', 'Framer Motion'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/firzadf',
    year: '2025',
    featured: false,
  },
  {
    id: '4',
    title: 'UBSI Academic Portal Redesign',
    category: 'web',
    description:
      'Concept redesign of student academic management portal focusing on mobile responsiveness, fast schedule checks, and intuitive grade tracking.',
    longDescription:
      'A student-first web portal overhaul crafted during D3 studies at UBSI Bogor. Provides quick access to course schedules, GPA calculators, and lecturer contacts.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'Tailwind CSS', 'Laravel API', 'MySQL'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/firzadf',
    year: '2024',
    featured: false,
  },
];
