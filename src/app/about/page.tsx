import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export const metadata = {
  title: 'About',
  description:
    'About Peerawichaya Pholwiset, a software engineer focused on backend systems, cloud platforms, and secure integrations.',
};
export default function About() {
  return (
    <div className="container">
      <header className="page-intro">
        <p className="eyebrow">About</p>
        <h1>
          Backend engineering,
          <br />
          with a security foundation
        </h1>
        <p>
          I’m Peerawichaya Pholwiset, a software engineer focused on backend development, enterprise
          integrations, and cloud-native deployment.
        </p>
      </header>
      <div className="page-content about-grid">
        <article className="prose">
          <h2>From foundations to production</h2>
          <p>
            My background in computer engineering, cloud computing, and cybersecurity informs how I
            approach software: understanding the system, making boundaries clear, and treating
            security as part of the work.
          </p>
          <p>
            I started at Gosoft (Thailand) as an intern software engineer, working with Spring Boot,
            databases, and AWS. As a developer, I contributed to geospatial analytics and enterprise
            information platforms using React and NestJS.
          </p>
          <p>
            I’m now a Developer at PTT Digital, working on multi-tenant services, API integrations,
            Kubernetes deployment, and operational tooling.
          </p>
          <h2>What interests me</h2>
          <p>
            APIs that make complex workflows easier to reason about. Data models that respect tenant
            boundaries. Integrations that connect systems securely. The deployment and testing
            practices that help software hold up beyond local development.
          </p>
          <Link href="/resume" className="button secondary">
            Explore my experience <ArrowUpRight size={16} />
          </Link>
        </article>
        <aside className="education">
          <span className="eyebrow">Education / 2021–2025</span>
          <h3>B.Eng. Computer Engineering</h3>
          <p>Cloud Computing and Cybersecurity</p>
          <p>
            Sirindhorn International Institute of Technology
            <br />
            Thammasat University
          </p>
        </aside>
      </div>
    </div>
  );
}
