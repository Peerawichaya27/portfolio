'use client';

import { usePathname } from 'next/navigation';
import { dictionaries, langFromPath, type Lang } from './dictionaries';

/** Language of the current route, for client components rendered in the shared layout. */
export function useLang(): { lang: Lang; t: (typeof dictionaries)[Lang] } {
  const lang = langFromPath(usePathname());
  return { lang, t: dictionaries[lang] };
}
