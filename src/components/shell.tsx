'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeProvider, useTheme } from 'next-themes';
import { useState } from 'react';
import { ArrowUpRight, Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { site } from '@/data/site';
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
const themeOptions = [
  { mode: 'light', Icon: Sun },
  { mode: 'dark', Icon: Moon },
  { mode: 'system', Icon: Monitor },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const path = usePathname();
  const links = [
    ['Projects', '/projects'],
    ['Experience', '/#experience'],
    ['Writing', '/blog'],
    ['About', '/about'],
  ];
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          tarpp<span>.dev</span>
        </Link>
        <nav aria-label="Main navigation" className={open ? 'nav open' : 'nav'}>
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              aria-current={
                (href === '/projects' ? path.startsWith(href) : path === href) ? 'page' : undefined
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <details className="theme-picker">
            <summary aria-label="Choose color theme" className="icon-button theme-trigger">
              <Sun size={16} />
            </summary>
            <div className="theme-options" aria-label="Color theme">
              {themeOptions.map(({ mode, Icon }) => (
                <button key={mode} onClick={() => setTheme(mode)} aria-label={`${mode} theme`}>
                  <Icon size={15} />
                  {mode}
                </button>
              ))}
            </div>
          </details>
          <Link href="/resume" className="resume-link">
            Résumé <ArrowUpRight size={14} />
          </Link>
          <button
            className="icon-button mobile-toggle"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="container footer">
      <Link href="/" className="logo">
        tarpp<span>.dev</span>
      </Link>
      <p>© {new Date().getFullYear()} Peerawichaya Pholwiset</p>
      <div>
        <a href={site.github}>
          GitHub <ArrowUpRight size={12} />
        </a>
        <a href={site.gitlab}>
          GitLab <ArrowUpRight size={12} />
        </a>
        <a href={site.linkedin}>
          LinkedIn <ArrowUpRight size={12} />
        </a>
      </div>
    </footer>
  );
}
export function PrintButton() {
  return (
    <button className="button primary" onClick={() => window.print()}>
      Print / save as PDF <ArrowUpRight size={16} />
    </button>
  );
}
