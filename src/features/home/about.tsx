import Image from 'next/image';
import type { Dictionary } from '@/i18n/dictionaries';
import { sectionIds } from '@/navigation/sections';

export function About({ copy }: { copy: Dictionary['about'] }) {
  return (
    <section className="container studio-manifesto section" id={sectionIds.about}>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2 data-rotate-text>
        {copy.title[0]}
        <br />
        <span>{copy.title[1]}</span>
      </h2>
      <div className="manifesto-bottom">
        <figure className="film-still">
          <div className="film-still-frame">
            <div className="film-still-window">
              <Image
                src="/images/new-york.jpg"
                alt={copy.photoAlt}
                width={768}
                height={1024}
                sizes="(max-width: 760px) 80vw, 420px"
                className="film-still-image"
              />
            </div>
            <span className="film-still-mark" aria-hidden="true" />
          </div>
          <figcaption className="mono">
            <span>{copy.photoScene}</span>
            <span>{copy.photoPlace}</span>
          </figcaption>
        </figure>
        <div className="manifesto-copy">
          <span className="mono">{copy.tag}</span>
          <p className="manifesto-statement" data-word-reveal>
            {copy.statement}
          </p>
        </div>
      </div>
    </section>
  );
}
