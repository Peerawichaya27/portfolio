import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  Server,
  Cloud,
  ShieldCheck,
  CornerDownRight,
} from 'lucide-react';
import { StudioSignature } from '@/components/studio-signature';
import { ProjectCard } from '@/components/project-card';
import { projects } from '@/data/projects';
import { site, experience, skills, publications } from '@/data/site';
export default function Home() {
  return (
    <>
      <section className="container hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="studio-index">Side A</span> Software engineer / Backend & cloud
          </div>
          <h1>
            A good ear for detail.
            <br />A backend engineer
            <br />
            by trade
          </h1>
          <p className="hero-intro">
            I’m <strong>Guitar</strong> — Peerawichaya Pholwiset, a developer at PTT Digital working
            on multi-tenant services and enterprise integrations.
          </p>
          <p className="hero-description">
            TypeScript, Node.js, PostgreSQL, and the deployment work that brings them together.
          </p>
          <div className="hero-buttons">
            <Link href="/projects" className="button primary">
              Explore my work <ArrowUpRight size={17} />
            </Link>
            <Link href="/resume" className="button secondary">
              View résumé <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <aside className="profile-panel studio-panel" aria-label="Guitar, software engineer">
          <StudioSignature />
          <div className="studio-role">
            <span className="mono">Currently</span>
            <div>
              <h2>Developer at PTT Digital</h2>
              <p>Multi-tenant services, enterprise integrations, and cloud deployment</p>
            </div>
          </div>
          <Link href="/resume" className="panel-bottom">
            Read my engineering background <ArrowUpRight size={16} />
          </Link>
        </aside>
      </section>
      <div className="container stack-strip">
        <span className="mono">Core technologies</span>
        <div>
          {['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Docker', 'Kubernetes'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <section className="container section expertise">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / The setup</p>
            <h2>APIs, deployment, and identity</h2>
          </div>
          <p>
            I care about what happens behind the interface.
            <br />
            And the details that keep it running.
          </p>
        </div>
        <div className="expertise-grid">
          {[
            {
              icon: Server,
              title: 'Backend engineering',
              text: 'Well-structured APIs, thoughtful data models, and business workflows built for real complexity.',
              tags: 'Node.js / NestJS / Spring Boot',
            },
            {
              icon: Cloud,
              title: 'Cloud & deployment',
              text: 'From local development to production environments, making services deployable and operable.',
              tags: 'Docker / Kubernetes / AWS',
            },
            {
              icon: ShieldCheck,
              title: 'Secure integrations',
              text: 'Connecting systems with identity, authorization, and traceability at the center.',
              tags: 'OAuth2 / OIDC / JWT / RBAC',
            },
          ].map(({ icon: Icon, title, text, tags }) => (
            <article key={title}>
              <Icon size={16} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="mono">{tags}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="work-section">
        <div className="container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / Selected tracks</p>
              <h2>
                Service platforms, maps,
                <br />
                and enterprise workflows
              </h2>
            </div>
            <Link className="text-link" href="/projects">
              All projects <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard project={p} index={i} key={p.slug} />
            ))}
          </div>
          <p className="work-note">
            <CornerDownRight size={14} /> Selected professional work, built as part of engineering
            teams.
          </p>
        </div>
      </section>
      <section className="container section" id="experience">
        <div className="experience-layout">
          <div>
            <p className="eyebrow">03 / Session history</p>
            <h2>
              From Gosoft
              <br />
              to PTT Digital
            </h2>
            <p className="section-copy">
              Enterprise software, real constraints,
              <br />
              and a curiosity to keep improving.
            </p>
            <Link href="/resume" className="text-link">
              View full résumé <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="timeline">
            {experience.map((e, i) => (
              <article key={e.period}>
                <div className={`timeline-dot ${i === 0 ? 'current' : ''}`} />
                <div className="experience-top">
                  <span className="mono">{e.period}</span>
                  {i === 0 && <span className="current-badge">Current</span>}
                </div>
                <h3>{e.company}</h3>
                <span className="role">{e.role}</span>
                <p>{e.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container section skills-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / The toolkit</p>
            <h2>Languages, frameworks, and infrastructure</h2>
          </div>
        </div>
        <div className="skills-grid">
          {Object.entries(skills).map(([name, values]) => (
            <div key={name}>
              <h3>{name}</h3>
              <div className="tags">
                {values.map((v) => (
                  <span key={v}>{v}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="container section research-section">
        <div>
          <p className="eyebrow">05 / Liner notes</p>
          <h2>
            Authentication
            <br />
            and digital trust
          </h2>
          <p className="section-copy">
            An interest in secure systems,
            <br />
            inside and outside the codebase.
          </p>
        </div>
        <div className="research-list">
          {publications.map((p) => (
            <article key={p.title}>
              <span className="mono">
                {p.venue} / {p.year}
              </span>
              <h3>{p.title}</h3>
              <span className="publication-label">Research publication</span>
            </article>
          ))}
          <Link href="/blog" className="writing-preview">
            <div>
              <span className="mono">Writing</span>
              <h3>Technical notes, coming soon</h3>
              <p>Notes on backend systems, cloud, and secure software.</p>
            </div>
            <ArrowUpRight size={21} />
          </Link>
        </div>
      </section>
      <section className="container contact">
        <p className="eyebrow">Contact</p>
        <h2>Let’s talk engineering</h2>
        <div className="contact-bottom">
          <p>
            Open to engineering opportunities and conversations
            <br />
            about backend systems, cloud, and secure software.
          </p>
          <a href={`mailto:${site.email}`} className="button primary">
            Let’s talk <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </>
  );
}
