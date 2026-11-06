import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { GuitarScene } from '@/components/guitar-scene';
import { FlyingCode } from '@/components/flying-code';
import { CodeEditor, ReplayOpening } from '@/components/code-editor';
import { TerminalInterlude } from '@/components/terminal-interlude';
import { CopyEmail } from '@/components/copy-email';
import { site, experience, skills, publications, publicationHref, type Role } from '@/data/site';
import { dictionaries, type Lang } from '@/i18n/dictionaries';
import '@/app/performance.css';

const MARQUEE = [
  'Full-stack engineering',
  'Cloud & deployment',
  'Secure integrations',
  'TypeScript',
  'React',
  'Kubernetes',
];
const MARQUEE_ALT = [
  'Interfaces',
  'APIs',
  'Identity',
  'Infrastructure',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'Docker',
];
// Consecutive roles at one company form a single stop on the timeline (newest first).
const COMPANIES = experience.reduce<{ company: string; roles: Role[] }[]>((groups, role) => {
  const last = groups.at(-1);
  if (last?.company === role.company) last.roles.push(role);
  else groups.push({ company: role.company, roles: [role] });
  return groups;
}, []);

const DRUM = Object.entries(skills).flatMap(([category, values]) =>
  values.map((value) => ({ value, category })),
);

function Marquee({ tone = 'accent' }: { tone?: 'accent' | 'quiet' }) {
  return (
    <div className={`marquee-zone marquee-zone-${tone}`} aria-hidden="true">
      {[
        { items: MARQUEE, direction: 'left', className: 'marquee-band marquee-band-main' },
        { items: MARQUEE_ALT, direction: 'right', className: 'marquee-band marquee-band-cross' },
      ].map((band) => (
        <div key={band.direction} className={band.className} data-direction={band.direction}>
          <div className="marquee-track">
            {[0, 1, 2, 3].map((copy) =>
              band.items.map((item) => <span key={`${copy}-${item}`}>{item}</span>),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function SpinBadge() {
  return (
    <div className="spin-badge" aria-hidden="true">
      <div className="spin-badge-ring">
        <div className="badge-disc">
          <div className="badge-label">
            <span>tarpp.dev</span>
            <i />
          </div>
        </div>
      </div>
      <div className="badge-shine" />
      <div className="badge-spindle" />
    </div>
  );
}

/** Two lines with a line break, the second one accented. */
function TwoLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines[0]}
      <br />
      <span>{lines[1]}</span>
    </>
  );
}

export function HomePage({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  const category = (name: string) => t.setup.categories[name] ?? name;
  return (
    <div className="performance-page" lang={lang}>
      <div className="performance-scene">
        <section className="performance-stage" aria-label={t.hero.label}>
          <div className="stage-glow" aria-hidden="true" />
          <div className="stage-word" aria-hidden="true">
            {/* The guitar is a component now: the musician lives inside the code. */}
            {'<Guitar/>'.split('').map((letter, index) => (
              <span className="stage-letter" key={index}>
                <span>{letter}</span>
              </span>
            ))}
          </div>
          <div className="stage-vignette" aria-hidden="true" />
          <div className="editor-wrap">
            <CodeEditor>
              <GuitarScene />
            </CodeEditor>
            <SpinBadge />
          </div>
          <FlyingCode />
          <ReplayOpening />
          <div className="stage-intro container">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>
              {t.hero.title}
              <br />
              <span>{t.hero.accent}</span>
            </h1>
            <p>{t.hero.pitch}</p>
            <div className="stage-actions">
              <Link href="#experience" className="stage-button primary">
                {t.hero.primary} <ArrowDown size={16} />
              </Link>
              <Link href="#contact" className="stage-button ghost">
                {t.hero.secondary} <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className="stage-outro container">
            <p className="eyebrow">{t.hero.outroEyebrow}</p>
            <h2>
              {t.hero.outroTitle[0]}
              <br />
              {t.hero.outroTitle[1]}
            </h2>
            <p>
              {t.hero.outroLines[0]}
              <br />
              {t.hero.outroLines[1]}
            </p>
          </div>
          <div className="stage-bottom container">
            <span>{t.hero.bottom}</span>
            <span className="scroll-cue">
              {t.hero.scroll} <ArrowDown size={16} />
            </span>
            <Link href="#contact">
              {t.nav.contact} <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </div>

      <Marquee />

      <section className="container studio-manifesto section" id="about">
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2 data-rotate-text>
          <TwoLines lines={t.about.title} />
        </h2>
        <div className="manifesto-bottom">
          <figure className="film-still">
            <div className="film-still-frame">
              <div className="film-still-window">
                <Image
                  src="/images/new-york.jpg"
                  alt={t.about.photoAlt}
                  width={768}
                  height={1024}
                  sizes="(max-width: 760px) 80vw, 420px"
                  className="film-still-image"
                />
              </div>
              <span className="film-still-mark" aria-hidden="true" />
            </div>
            <figcaption className="mono">
              <span>{t.about.photoScene}</span>
              <span>{t.about.photoPlace}</span>
            </figcaption>
          </figure>
          <div className="manifesto-copy">
            <span className="mono">{t.about.tag}</span>
            <p className="manifesto-statement" data-word-reveal>
              {t.about.statement}
            </p>
          </div>
        </div>
      </section>

      <TerminalInterlude />

      <section className="container section session-section" id="experience">
        <div className="session-title">
          <p className="eyebrow">{t.experience.eyebrow}</p>
          <h2 data-rotate-text>
            <TwoLines lines={t.experience.title} />
          </h2>
        </div>
        <ol className="timeline">
          <span className="timeline-rail" aria-hidden="true">
            <span className="timeline-progress" />
          </span>
          {COMPANIES.map(({ company, roles }) => (
            <li
              key={company}
              className="timeline-company"
              data-current={roles[0].current ? '' : undefined}
            >
              <span className="timeline-node" aria-hidden="true" />
              <header className="timeline-company-head">
                <h3>{company}</h3>
                <span className="mono">
                  {roles.at(-1)!.period.split(' — ')[0]} — {roles[0].period.split(' — ')[1]}
                </span>
                {roles[0].current && (
                  <span className="mono session-current">{t.experience.current}</span>
                )}
                {roles.length > 1 && (
                  <span className="mono timeline-growth">
                    {roles.at(-1)!.role} → {roles[0].role}
                  </span>
                )}
              </header>
              <ol className="timeline-roles">
                {roles.map((item) => (
                  <li key={item.period} className="timeline-role">
                    <span className="timeline-dot" aria-hidden="true" />
                    <div className="timeline-role-head">
                      <h4>{item.role}</h4>
                      <span className="mono">{item.period}</span>
                    </div>
                    <p>{t.experience.summaries[item.period] ?? item.summary}</p>
                    <div className="session-foot">
                      <div className="tags">
                        {item.stack.map((tool) => (
                          <span key={tool}>{tool}</span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </section>

      <Marquee tone="quiet" />

      <section className="equipment-section" id="setup">
        <div className="drum-track">
          <div className="drum-sticky container">
            <div className="drum-copy">
              <p className="eyebrow">{t.setup.eyebrow}</p>
              <h2 data-rotate-text>
                {t.setup.title[0]}
                <br />
                {t.setup.title[1]}
              </h2>
              <p>
                {t.setup.copy[0]}
                <br />
                {t.setup.copy[1]}
              </p>
              <p className="drum-category mono" aria-hidden="true">
                <span>{t.setup.nowPlaying}</span>
                <span data-drum-category>{category(DRUM[0].category)}</span>
              </p>
            </div>
            <div className="drum-viewport" aria-hidden="true">
              <div className="drum-axis" style={{ '--n': DRUM.length } as React.CSSProperties}>
                <ul className="skill-drum">
                  {DRUM.map((item, index) => (
                    <li
                      key={`${item.category}-${item.value}`}
                      data-category={category(item.category)}
                      style={{ '--i': index } as React.CSSProperties}
                    >
                      <span>{item.value}</span>
                      <small>{String(index + 1).padStart(2, '0')}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container equipment-list">
          {Object.entries(skills).map(([name, values]) => (
            <div key={name} data-reveal>
              <h3>{category(name)}</h3>
              <p>{values.join(' / ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section notes-section" id="research">
        <div>
          <p className="eyebrow">{t.research.eyebrow}</p>
          <h2 data-rotate-text>
            <TwoLines lines={t.research.title} />
          </h2>
          <p className="section-copy">
            {t.research.copy[0]}
            <br />
            {t.research.copy[1]}
          </p>
        </div>
        <div className="notes-list">
          {publications.map((publication) => (
            <a
              key={publication.title}
              href={publicationHref(publication)}
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
                {t.research.view} <ArrowUpRight size={14} />
                <span className="sr-only">{t.research.newTab}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="container final-session" id="contact">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <a href={`mailto:${site.email}`}>
          <h2 data-rotate-text="scatter">
            <TwoLines lines={t.contact.title} />
          </h2>
          <ArrowUpRight className="contact-arrow" />
        </a>
        <div className="final-session-bottom" data-reveal>
          <p>{t.contact.copy}</p>
          <div className="contact-actions">
            <CopyEmail
              email={site.email}
              labels={{
                copy: t.contact.copyButton,
                copied: t.contact.copied,
                action: t.contact.copyLabel,
                status: t.contact.copiedStatus,
              }}
            />
            <nav aria-label={t.contact.profiles} className="contact-links">
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
    </div>
  );
}
