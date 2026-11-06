import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';

const diagrams: Record<string, { label: string; parts: string[]; caption: string }> = {
  'aegis-core': {
    label: 'Tenant-scoped services',
    parts: ['Tickets & tasks', 'REST APIs', 'Tenant-scoped data'],
    caption: 'Service workflows / PostgreSQL / Kubernetes',
  },
  allmap: {
    label: 'Spatial analysis',
    parts: ['Map interface', 'Geospatial APIs', 'PostGIS'],
    caption: 'React / OpenLayers / NestJS',
  },
  'timeline-integration': {
    label: 'Enterprise identity',
    parts: ['User lifecycle', 'Approvals', 'Identity integration'],
    caption: 'OIDC / Role-based access / Audit history',
  },
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const diagram = diagrams[project.slug];
  const reference = `Track / ${String(index + 1).padStart(2, '0')}`;

  return (
    <Link href={`/projects/${project.slug}`} className={`project-card project-${project.slug}`}>
      <div className="project-body">
        <div className="project-meta">
          <span className="document-ref">{reference}</span>
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </div>
        <p className="project-employer">
          {project.organization} · {project.period}
        </p>
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p>{project.summary}</p>
        <div className="tags">
          {project.technologies.slice(0, 4).map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>
      {diagram && (
        <div className="project-visual" aria-hidden="true">
          <div className="visual-label">
            <span>{diagram.label}</span>
            <span>Conceptual view</span>
          </div>
          <div className="system-diagram">
            <svg viewBox="0 0 480 160" preserveAspectRatio="none" focusable="false">
              {project.slug === 'aegis-core' ? (
                <>
                  <path d="M80 38V80H240M80 122V80M240 80H400M400 38V122" />
                  <circle cx="240" cy="80" r="5" />
                </>
              ) : project.slug === 'allmap' ? (
                <>
                  <path
                    d="M0 130L145 30L280 118L480 25M0 40L170 145L330 30L480 120"
                    className="map-lines"
                  />
                  <path d="M80 80H400" />
                  <circle cx="240" cy="80" r="42" className="map-ring" />
                </>
              ) : (
                <>
                  <path d="M80 80H400" />
                  <path d="M80 110V140H400V110" className="audit-line" />
                </>
              )}
            </svg>
            {diagram.parts.map((part, partIndex) => (
              <span key={part} className={`system-node node-${partIndex}`}>
                {part}
              </span>
            ))}
          </div>
          <p className="visual-caption">{diagram.caption}</p>
        </div>
      )}
    </Link>
  );
}
