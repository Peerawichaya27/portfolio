import { TerminalInterlude } from './terminal-interlude';
import { dictionaries } from '@/i18n/dictionaries';
import type { Lang } from '@/i18n/routing';
import { Hero } from './hero';
import { About } from './about';
import { Experience } from './experience';
import { Skills } from './skills';
import { Research } from './research';
import { Contact } from './contact';
import { Marquee } from './marquee';

export function HomePage({ lang }: { lang: Lang }) {
  const copy = dictionaries[lang];
  return (
    <div className="performance-page" lang={lang}>
      <Hero copy={copy.hero} contactLabel={copy.nav.contact} />
      <Marquee />
      <About copy={copy.about} />
      <TerminalInterlude />
      <Experience copy={copy.experience} />
      <Marquee tone="quiet" />
      <Skills copy={copy.setup} />
      <Research copy={copy.research} />
      <Contact copy={copy.contact} />
    </div>
  );
}
