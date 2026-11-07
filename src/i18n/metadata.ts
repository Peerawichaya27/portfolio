import type { Metadata } from 'next';
import { dictionaries } from './dictionaries';
import { HOME, LANGS, type Lang } from './routing';

export function homeMetadata(lang: Lang): Metadata {
  const t = dictionaries[lang];
  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    alternates: {
      canonical: HOME[lang],
      languages: { ...HOME, 'x-default': HOME[LANGS[0]] },
    },
    openGraph: { locale: t.meta.locale, title: t.meta.title, description: t.meta.description },
  };
}
