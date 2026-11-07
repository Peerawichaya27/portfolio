import { ArrowUpRight } from 'lucide-react';
import { CopyEmail } from './copy-email';
import { site } from '@/content/site';
import type { Dictionary } from '@/i18n/dictionaries';
import { sectionIds } from '@/navigation/sections';

export function Contact({ copy }: { copy: Dictionary['contact'] }) {
  return (
    <section className="container final-session" id={sectionIds.contact}>
      <p className="eyebrow">{copy.eyebrow}</p>
      <a href={`mailto:${site.email}`}>
        <h2 data-rotate-text="scatter">
          {copy.title[0]}
          <br />
          <span>{copy.title[1]}</span>
        </h2>
        <ArrowUpRight className="contact-arrow" />
      </a>
      <div className="final-session-bottom" data-reveal>
        <p>{copy.copy}</p>
        <div className="contact-actions">
          <CopyEmail
            email={site.email}
            labels={{
              copy: copy.copyButton,
              copied: copy.copied,
              action: copy.copyLabel,
              status: copy.copiedStatus,
            }}
          />
          <nav aria-label={copy.profiles} className="contact-links">
            <a href={site.linkedin}>
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a href={site.github}>
              GitHub <ArrowUpRight size={14} />
            </a>
            <a href={site.gitlab}>
              GitLab <ArrowUpRight size={14} />
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
