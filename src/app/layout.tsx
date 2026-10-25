import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE = 'https://firzadf.github.io';
const TITLE = 'Firza Duta Fauzan — Software Engineer & Web3 Tooling';
const DESC =
  'Portfolio of Firza Duta Fauzan, a software engineer from Bogor, Indonesia building full-stack web apps and Web3 developer tooling like NodeScope.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: '%s — Firza Duta Fauzan' },
  description: DESC,
  keywords: ['Firza Duta Fauzan', 'Software Engineer', 'Web Developer', 'Web3', 'NodeScope', 'Portaldot', 'Next.js', 'React', 'Laravel', 'Indonesia', 'Bogor'],
  authors: [{ name: 'Firza Duta Fauzan', url: SITE }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Firza Duta Fauzan',
    title: TITLE,
    description: DESC,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Firza Duta Fauzan — Software Engineer' }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/og.jpg'] },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { themeColor: '#0b0d10', width: 'device-width', initialScale: 1 };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Firza Duta Fauzan',
  jobTitle: 'Software Engineer',
  url: SITE,
  address: { '@type': 'PostalAddress', addressLocality: 'Bogor', addressCountry: 'ID' },
  alumniOf: 'Universitas Bina Sarana Informatika',
  sameAs: ['https://github.com/Firzadf'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0b0d10] text-white antialiased selection:bg-[#AEA8FE] selection:text-[#121417]">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
