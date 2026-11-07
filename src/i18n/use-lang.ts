'use client';

import { usePathname } from 'next/navigation';
import { dictionaries } from './dictionaries';
import { langFromPath, type Lang } from './routing';

export function useLang(): { lang: Lang; t: (typeof dictionaries)[Lang] } {
  const lang = langFromPath(usePathname());
  return { lang, t: dictionaries[lang] };
}
