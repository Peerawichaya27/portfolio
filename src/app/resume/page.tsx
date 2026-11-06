import { PrintButton } from '@/components/shell';
import { experience, skills, publications, site } from '@/data/site';
export const metadata = {
  title: 'Résumé',
  description:
    'Experience, education, skills, and research publications of Peerawichaya Pholwiset.',
};
export default function Resume() {
  return (
    <div className="container reading">
      <header className="page-intro">
        <p className="eyebrow">Résumé</p>
        <h1>{site.name}</h1>
        <p>Software Engineer / Backend Engineer</p>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a> · <a href={site.github}>GitHub</a> ·{' '}
          <a href={site.linkedin}>LinkedIn</a>
        </p>
        <div className="print-controls" style={{ marginTop: 25 }}>
          <PrintButton />
          <p style={{ fontSize: 11, marginTop: 10 }}>
            Use your browser’s “Save as PDF” option for a printable copy.
          </p>
        </div>
      </header>
      <article className="page-content prose">
        <h2>Profile</h2>
        <p>
          Software engineer focused on backend development, enterprise integrations, and
          cloud-native deployment. Experience with TypeScript, Node.js, React, relational databases,
          Docker, and Kubernetes.
        </p>
        <h2>Experience</h2>
        <div className="resume-experience">
          {experience.map((e) => (
            <article key={e.period}>
              <h3>
                {e.role} · {e.company}
              </h3>
              <span className="mono">{e.period}</span>
              <p>{e.detail}</p>
            </article>
          ))}
        </div>
        <h2>Technical skills</h2>
        {Object.entries(skills).map(([name, values]) => (
          <p key={name}>
            <strong>{name}:</strong> {values.join(', ')}
          </p>
        ))}
        <h2>Education</h2>
        <h3>B.Eng. Computer Engineering · 2021–2025</h3>
        <p>
          Cloud Computing and Cybersecurity
          <br />
          Sirindhorn International Institute of Technology, Thammasat University
        </p>
        <h2>Publications</h2>
        {publications.map((p) => (
          <p key={p.title}>
            {p.title}
            <br />
            <span className="mono">
              {p.venue} · {p.year}
            </span>
          </p>
        ))}
      </article>
    </div>
  );
}
