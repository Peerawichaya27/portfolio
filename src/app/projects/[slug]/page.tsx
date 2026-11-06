import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return { title: p?.title ?? 'Project not found', description: p?.summary };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <div className="container reading">
      <header className="page-intro">
        <Link href="/projects" className="back-link">
          <ArrowLeft size={15} />
          All projects
        </Link>
        <p className="eyebrow">{p.category}</p>
        <h1>{p.title}</h1>
        <p>{p.subtitle}</p>
        <div className="detail-meta">
          {p.organization} · Developer · {p.period}
        </div>
      </header>
      <article className="page-content prose">
        <div className="tags">
          {p.technologies.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <h2>Context</h2>
        <p>{p.context}</p>
        <h2>Contribution & scope</h2>
        <p>
          This summary describes professional work contributed to as part of the engineering team at{' '}
          {p.organization}. The platform is employer work; the descriptions below do not imply sole
          ownership of its design or delivery.
        </p>
        <ul>
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <h2>A high-level view</h2>
        <p>
          A conceptual view of the platform’s main concerns. This diagram illustrates the public
          summary rather than an internal deployment topology.
        </p>
        <div className="architecture" aria-label={p.nodes.join(' to ')}>
          {p.nodes.map((n, i) => (
            <span key={n} style={{ display: 'contents' }}>
              {i > 0 && <ArrowRight size={22} />}
              <span>{n}</span>
            </span>
          ))}
        </div>
        <h2>Engineering considerations</h2>
        <ul>
          {p.considerations.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <h2>Further discussion</h2>
        <p>
          For a conversation about my experience with the technologies and workflows above,{' '}
          <a className="text-link" href="mailto:pprw.27@gmail.com">
            get in touch →
          </a>
          .
        </p>
      </article>
    </div>
  );
}
