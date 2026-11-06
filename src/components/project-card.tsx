import Link from 'next/link';
import { ArrowUpRight, Layers3, Map, Workflow } from 'lucide-react';
import type { Project } from '@/data/projects';
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = [Layers3, Map, Workflow][index % 3];
  return (
    <Link href={`/projects/${project.slug}`} className={`project-card project-${index}`}>
      <div className="project-visual" aria-hidden="true">
        <span className="visual-label">
          {['SERVICE ARCHITECTURE', 'SPATIAL INTELLIGENCE', 'CONNECTED WORKFLOWS'][index]}
        </span>
        <div className="visual-diagram">
          <span className="diagram-small">{['API', 'GEO', 'OIDC'][index]}</span>
          <span className="diagram-line" />
          <span className="diagram-main">
            <Icon size={35} strokeWidth={1.3} />
          </span>
          <span className="diagram-line" />
          <div className="diagram-stack">
            <i />
            <i />
            <i />
          </div>
        </div>
        <span className="visual-bottom">
          {project.technologies[1]}
          <span> / </span>
          {project.technologies[3]}
        </span>
        <span className="project-number">0{index + 1}</span>
      </div>
      <div className="project-body">
        <div className="project-meta">
          {project.organization}
          <ArrowUpRight size={19} />
        </div>
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p>{project.summary}</p>
        <div className="tags">
          {project.technologies.slice(0, 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
