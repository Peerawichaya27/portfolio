import type { MetadataRoute } from 'next';
import { LANGS, localizedUrls } from '@/i18n/routing';
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = localizedUrls();
  return LANGS.map((lang) => ({
    url: languages[lang],
    changeFrequency: 'monthly',
    priority: lang === LANGS[0] ? 1 : 0.9,
    alternates: { languages },
  }));
}
