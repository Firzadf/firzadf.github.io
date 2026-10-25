import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Work', alternates: { canonical: '/work' } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
