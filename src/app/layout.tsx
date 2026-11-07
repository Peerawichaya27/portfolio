import type { Metadata } from 'next';
import { Providers } from '@/features/navigation/providers';
import { Header } from '@/features/navigation/header';
import { Footer } from '@/features/navigation/footer';
import { StudioProvider } from '@/features/studio/provider';
import { site } from '@/content/site';
import { dictionaries } from '@/i18n/dictionaries';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Noto_Sans_Thai } from 'next/font/google';
import { StudioMotion } from '@/features/studio/studio-motion';
import { FilmIntro } from '@/features/studio/film-intro';
import { filmIntroScript } from '@/features/studio/opening-bootstrap';
import '@/styles/index.css';
// Geist has no Thai glyphs; the browser falls back to this font per character.
const thai = Noto_Sans_Thai({ subsets: ['thai'], variable: '--font-thai', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: dictionaries.en.meta.title,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  openGraph: { type: 'website', locale: 'en_US', siteName: site.brand },
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
          <StudioProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <StudioMotion />
            <FilmIntro />
          </StudioProvider>
        </Providers>
      </body>
    </html>
  );
}
