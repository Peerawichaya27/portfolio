import type { Metadata } from 'next';
import { Providers, Header, Footer } from '@/components/shell';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Noto_Sans_Thai } from 'next/font/google';
import { StudioMotion } from '@/components/studio-motion';
import { FilmIntro } from '@/components/film-intro';
import { filmIntroScript } from '@/lib/film-intro-script';
import './globals.css';
import './cinema.css';
// Geist has no Thai glyphs; the browser falls back to this font per character.
const thai = Noto_Sans_Thai({ subsets: ['thai'], variable: '--font-thai', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://tarpp.dev'),
  title: {
    default: 'Peerawichaya Pholwiset — Full-Stack Engineer | tarpp.dev',
    template: '%s | tarpp.dev',
  },
  description:
    'Full-stack engineer building React interfaces, backend APIs, enterprise integrations, and cloud-native deployments.',
  openGraph: { type: 'website', locale: 'en_US', siteName: 'tarpp.dev' },
  twitter: { card: 'summary_large_image' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: filmIntroScript }} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${thai.variable}`}>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <StudioMotion />
          <FilmIntro />
          <div className="page-grain" aria-hidden="true" />
        </Providers>
      </body>
    </html>
  );
}
