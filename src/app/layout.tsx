import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Firza Duta Fauzan — Software Engineer & Web Developer',
  description:
    'Personal portfolio of Firza Duta Fauzan. Software Engineer based in Indonesia, specializing in full-stack web applications, frontend design systems, and robust APIs.',
  keywords: [
    'Firza Duta Fauzan',
    'Software Engineer',
    'Web Developer',
    'Indonesia',
    'UBSI Bogor',
    'Next.js',
    'React',
    'Full Stack',
  ],
  authors: [{ name: 'Firza Duta Fauzan' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#121417] text-white antialiased selection:bg-[#AEA8FE] selection:text-[#121417]">
        {children}
      </body>
    </html>
  );
}
