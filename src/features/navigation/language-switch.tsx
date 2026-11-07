import { LANGS, homeHref, languageNames, type Lang } from '@/i18n/routing';
import type { SectionId } from '@/navigation/sections';

export function LangSwitch({
  lang,
  label,
  section,
}: {
  lang: Lang;
  label: string;
  section: SectionId | '';
}) {
  return (
    <div className="lang-switch" role="group" aria-label={label}>
      {LANGS.map((code) => (
        <a
          key={code}
          href={homeHref(code, section || undefined)}
          hrefLang={code}
          lang={code}
          aria-label={languageNames[code]}
          aria-current={code === lang ? 'true' : undefined}
          onClick={(event) => {
            if (code === lang) event.preventDefault();
          }}
        >
          {code.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
