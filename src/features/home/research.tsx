import { ArrowUpRight } from 'lucide-react';
import { publications } from '@/content/publications';
import type { Dictionary } from '@/i18n/dictionaries';
import { sectionIds } from '@/navigation/sections';

export function Research({ copy }: { copy: Dictionary['research'] }) {
  return (
    <section className="container section notes-section" id={sectionIds.research}>
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 data-rotate-text>
          {copy.title[0]}
          <br />
          <span>{copy.title[1]}</span>
        </h2>
        <p className="section-copy">
          {copy.copy[0]}
          <br />
          {copy.copy[1]}
        </p>
      </div>
      <div className="notes-list">
        {publications.map((publication) => (
          <a
            key={publication.title}
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="paper-card"
            data-reveal
          >
            <p className="mono">
              {publication.venue} · {publication.year}
            </p>
            {/* Paper titles are published in English. */}
            <h3 lang="en">{publication.title}</h3>
            <span className="paper-link mono">
              {copy.view} <ArrowUpRight size={14} />
              <span className="sr-only">{copy.newTab}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
