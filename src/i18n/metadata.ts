import type { Metadata } from 'next';
import { HOME, dictionaries, type Lang } from './dictionaries';

export function homeMetadata(lang: Lang): Metadata {
  const t = dictionaries[lang];
  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    alternates: {
      canonical: HOME[lang],
      languages: { en: HOME.en, th: HOME.th, 'x-default': HOME.en },
    },
    openGraph: { locale: t.meta.locale, title: t.meta.title, description: t.meta.description },
  };
}
