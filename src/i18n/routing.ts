import { site } from '@/content/site';

export const LANGS = ['en', 'th'] as const;
export type Lang = (typeof LANGS)[number];
export const HOME: Record<Lang, string> = { en: '/', th: '/th' };
export const languageNames: Record<Lang, string> = { en: 'English', th: 'ไทย' };

export const langFromPath = (pathname: string | null): Lang =>
  LANGS.find((lang) => pathname === HOME[lang] || pathname?.startsWith(`${HOME[lang]}/`)) ??
  LANGS[0];

export function homeHref(lang: Lang, section?: string): string {
  return section ? `${HOME[lang]}#${section}` : HOME[lang];
}

export function localizedUrls(): Record<Lang, string> {
  return Object.fromEntries(
    LANGS.map((lang) => [lang, new URL(HOME[lang], site.origin).href.replace(/\/$/, '')]),
  ) as Record<Lang, string>;
}
