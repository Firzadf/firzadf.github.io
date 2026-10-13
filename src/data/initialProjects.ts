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
    title: 'Koloni Cafe — Website',
    category: 'web',
    description:
      'A modern and visually appealing cafe website built with Next.js and TypeScript. Features elegant UI design, smooth animations, and responsive layout for showcasing the cafe\'s menu, ambiance, and brand identity.',
    longDescription:
      'Koloni Cafe is a professionally crafted website designed to elevate the online presence of a local cafe. Built with Next.js and TypeScript for robust type safety, styled with SCSS for maintainable and modular CSS architecture. The site features responsive design across all devices, smooth page transitions, and an inviting visual aesthetic that matches the cafe\'s warm atmosphere. Deployed live on Vercel for optimal performance.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'TypeScript', 'SCSS', 'HTML', 'CSS', 'Vercel'],
    demoUrl: 'https://koloni-cafe.vercel.app',
    githubUrl: 'https://github.com/Firzadf/koloni-cafe',
    year: '2026',
    featured: true,
  },
  {
    id: '2',
    title: 'Posyandu Admin Dashboard',
    category: 'fullstack',
    description:
      'A comprehensive community health center (Posyandu) administration system built with Laravel PHP. Manages patient records, health monitoring data, and community health reporting.',
    longDescription:
      'A full-stack web application designed to digitalize and streamline the administrative processes of Posyandu (Pos Pelayanan Terpadu) — Indonesia\'s community-based health service centers. Built with Laravel PHP framework and Blade templating engine, this system provides complete CRUD operations for managing patient data, health check records, vaccination schedules, and nutritional monitoring. Features role-based authentication, data export capabilities, and a clean admin dashboard interface.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Laravel', 'PHP', 'Blade', 'MySQL', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/Firzadf/posyandu',
    year: '2025',
    featured: true,
  },
  {
    id: '3',
    title: 'Inventory Management System',
    category: 'fullstack',
    description:
      'A robust inventory management system built with Laravel 10. Features product tracking, stock management, supplier records, and comprehensive reporting dashboard with Docker support.',
    longDescription:
      'An enterprise-grade inventory management system engineered with Laravel 10 framework. The application provides complete inventory lifecycle management including product cataloging, stock level monitoring, purchase order tracking, and automated low-stock alerts. Built with a modern tech stack featuring Blade templating for the frontend, JavaScript for interactive UI elements, and SCSS for styling. Containerized with Docker for consistent deployment environments. Includes comprehensive reporting dashboards with data visualization.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Laravel 10', 'PHP', 'JavaScript', 'Blade', 'Docker', 'CSS'],
    githubUrl: 'https://github.com/Firzadf/inventory-management-system',
    year: '2025',
    featured: false,
  },
  {
    id: '4',
    title: 'Duta Airdrop Platform',
    category: 'web',
    description:
      'A crypto airdrop information and management platform built with JavaScript. Features real-time data updates, modern UI, and responsive design deployed on Vercel.',
    longDescription:
      'Duta Airdrop is a web-based platform designed to aggregate and manage cryptocurrency airdrop opportunities. Built primarily with JavaScript and modern CSS for a polished user experience. The platform features a clean, intuitive interface for browsing active airdrops, tracking participation status, and receiving updates. Deployed on Vercel for fast global access and reliable uptime.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    tags: ['JavaScript', 'CSS', 'HTML', 'Vercel', 'Web3'],
    demoUrl: 'https://duta-airdrop-bmvb.vercel.app',
    githubUrl: 'https://github.com/Firzadf/duta-airdrop',
    year: '2025',
    featured: false,
  },
  {
    id: '5',
    title: 'GrassRDP Automation',
    category: 'web',
    description:
      'An automation script project for Grass network node management via RDP environments. Streamlines setup and operational tasks for efficient node deployment.',
    longDescription:
      'GrassRDP is a utility project focused on automating the setup and management of Grass network nodes within Remote Desktop Protocol (RDP) environments. The project provides streamlined scripts and configurations to simplify node deployment, monitoring, and maintenance tasks. Designed for users looking to efficiently manage their Grass network participation with minimal manual intervention.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    tags: ['Automation', 'Scripting', 'RDP', 'DevOps'],
    githubUrl: 'https://github.com/Firzadf/GrassRDP',
    year: '2024',
    featured: false,
  },
];
