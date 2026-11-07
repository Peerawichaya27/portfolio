'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { site } from '@/content/site';
import { homeHref } from '@/i18n/routing';
import { useLang } from '@/i18n/use-lang';
import { sections, primarySections, sectionHref, type SectionId } from '@/navigation/sections';
import { LangSwitch } from './language-switch';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  const { lang, t } = useLang();
  const home = homeHref(lang);
  const href = (id: SectionId) => sectionHref(lang, id);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId | ''>('');
  const [scrolled, setScrolled] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: SectionId | '' = '';
      for (const { id } of sections) {
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
      if (toggle.current && getComputedStyle(toggle.current).display === 'none') setOpen(false);
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
            {site.wordmark.name}
            <span>{site.wordmark.suffix}</span>
          </Link>
          <nav ref={nav} aria-label={t.nav.main} className="nav-pill">
            <span className="nav-indicator" aria-hidden="true" />
            {primarySections.map(({ id, label }) => (
              <Link key={id} href={href(id)} aria-current={active === id ? 'location' : undefined}>
                {t.nav[label]}
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
          {sections.map(({ id, label }, index) => (
            <Link
              key={id}
              ref={index === 0 ? firstLink : undefined}
              href={href(id)}
              onClick={close}
              aria-current={active === id ? 'location' : undefined}
              style={{ '--i': index } as React.CSSProperties}
            >
              <span className="mono">0{index + 1}</span>
              {t.nav[label]}
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
