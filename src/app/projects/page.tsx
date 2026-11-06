import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/project-card';
export const metadata = {
  title: 'Projects',
  description:
    'Track list / Professional work in backend engineering, geospatial analytics, and enterprise integrations.',
};
export default function Projects() {
  return (
    <div className="container">
      <header className="page-intro">
        <p className="eyebrow">Track list / Professional work</p>
        <h1>
          Service management,
          <br />
          maps, and integrations
        </h1>
        <p>
          A closer look at the platforms I’ve contributed to as part of engineering teams at PTT
          Digital and Gosoft (Thailand).
        </p>
      </header>
      <section className="page-content">
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
        <p className="work-note">
          Employer projects · Public summaries · No proprietary source code
        </p>
      </section>
    </div>
  );
}
