import type { Metadata } from 'next';
import { Providers, Header, Footer } from '@/components/shell';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://tarpp.dev'),
  title: {
    default: 'Peerawichaya Pholwiset — Software Engineer | tarpp.dev',
    template: '%s | tarpp.dev',
  },
  description:
    'Software engineer focused on backend systems, enterprise integrations, and cloud-native deployment.',
  openGraph: { type: 'website', locale: 'en_US', siteName: 'tarpp.dev' },
  twitter: { card: 'summary_large_image' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
