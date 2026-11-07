'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/content/site';
import { homeHref } from '@/i18n/routing';
import { useLang } from '@/i18n/use-lang';

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="container footer" lang={lang}>
      <Link href={homeHref(lang)} className="logo">
        {site.wordmark.name}
        <span>{site.wordmark.suffix}</span>
      </Link>
      <p>
        © {new Date().getFullYear()} {site.name}
      </p>
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
