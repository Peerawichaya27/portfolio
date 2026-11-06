'use client';
import Link from 'next/link';
import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, Menu, X, Sun, Moon } from 'lucide-react';
import { site } from '@/data/site';
import { HOME, LANGS, type Lang } from '@/i18n/dictionaries';
import { useLang } from '@/i18n/use-lang';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}

/** Sections in page order; contact has its own call-to-action button. */
const SECTIONS = ['about', 'experience', 'setup', 'research'] as const;
const LANG_NAMES: Record<Lang, string> = { en: 'English', th: 'ไทย' };
const noop = () => () => {};

function LangSwitch({ lang, label, section }: { lang: Lang; label: string; section: string }) {
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {LANGS.map((code) => (
        <a
          key={code}
          href={HOME[code]}
          hrefLang={code}
          lang={code}
          aria-label={LANG_NAMES[code]}
          aria-current={code === lang ? 'true' : undefined}
          onClick={(event) => {
            if (code === lang) return event.preventDefault();
            // Keep the reader on the section they are reading, in the other language.
            if (section) event.currentTarget.href = `${HOME[code]}#${section}`;
          }}
        >
          {code.toUpperCase()}
        </a>
      ))}
    </div>
  );
}

function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const dark = !mounted || resolvedTheme !== 'light';
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      aria-label={dark ? toLight : toDark}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export function Header() {
  const { lang, t } = useLang();
  const home = HOME[lang];
  const href = (id: string) => (home === '/' ? `/#${id}` : `${home}#${id}`);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const labels: Record<(typeof SECTIONS)[number], string> = {
    about: t.nav.about,
    experience: t.nav.experience,
    setup: t.nav.skills,
    research: t.nav.research,
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Track the section under the reading line and whether the page has scrolled.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = '';
      for (const id of [...SECTIONS, 'contact']) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.4)
          current = id;
      }
      setActive(current);
      setScrolled(window.scrollY > 8);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // Slide the highlight pill under the active link.
  useEffect(() => {
    const element = nav.current;
    if (!element) return;
    const place = () => {
      const link = element.querySelector<HTMLElement>('a[aria-current]');
      element.style.setProperty('--pill-x', `${link?.offsetLeft ?? 0}px`);
      element.style.setProperty('--pill-w', `${link?.offsetWidth ?? 0}px`);
      element.toggleAttribute('data-has-active', Boolean(link));
    };
    place();
    const resize = new ResizeObserver(place);
    resize.observe(element);
    return () => resize.disconnect();
  }, [active, lang]);

  // Mobile menu: lock page scroll, close on Escape, and manage focus.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLink.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <a className="skip-link" href="#main" lang={lang}>
        {t.nav.skip}
      </a>
      <header
        className="header"
        lang={lang}
        data-scrolled={scrolled ? '' : undefined}
        data-open={open ? '' : undefined}
      >
        <div className="container header-inner">
          <Link href={home} className="logo" aria-label={t.nav.home} onClick={close}>
            tarpp<span>.dev</span>
          </Link>
          <nav ref={nav} aria-label={t.nav.main} className="nav-pill">
            <span className="nav-indicator" aria-hidden="true" />
            {SECTIONS.map((id) => (
              <Link key={id} href={href(id)} aria-current={active === id ? 'location' : undefined}>
                {labels[id]}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <LangSwitch lang={lang} label={t.nav.language} section={active} />
            <ThemeToggle toLight={t.nav.toLight} toDark={t.nav.toDark} />
            <Link
              href={href('contact')}
              className="header-cta"
              aria-current={active === 'contact' ? 'location' : undefined}
            >
              {t.nav.contact} <ArrowUpRight size={14} />
            </Link>
            <button
              ref={toggle}
              type="button"
              className="icon-button menu-toggle"
              aria-label={open ? t.nav.close : t.nav.open}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>
      <div
        id="mobile-menu"
        className="mobile-menu"
        lang={lang}
        data-open={open ? '' : undefined}
        inert={!open}
      >
        <nav aria-label={t.nav.main} className="mobile-menu-links">
          {[...SECTIONS, 'contact' as const].map((id, index) => (
            <Link
              key={id}
              ref={index === 0 ? firstLink : undefined}
              href={href(id)}
              onClick={close}
              aria-current={active === id ? 'location' : undefined}
              style={{ '--i': index } as React.CSSProperties}
            >
              <span className="mono">0{index + 1}</span>
              {id === 'contact' ? t.nav.contact : labels[id]}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <LangSwitch lang={lang} label={t.nav.language} section={active} />
          <ThemeToggle toLight={t.nav.toLight} toDark={t.nav.toDark} />
          <a href={`mailto:${site.email}`} className="mono">
            {site.email}
          </a>
        </div>
      </div>
    </>
  );
}

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="container footer" lang={lang}>
      <Link href={HOME[lang]} className="logo">
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
