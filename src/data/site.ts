// Source of truth: the résumé dated 2026-11-06. Keep in sync with it.
export const site = {
  name: 'Peerawichaya Pholwiset',
  brand: 'tarpp.dev',
  email: 'pprw.27@gmail.com',
  github: 'https://github.com/Peerawichaya27',
  gitlab: 'https://gitlab.com/Peerawichaya27',
  linkedin: 'https://linkedin.com/in/peerawichaya',
};

export type Role = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  /** What the job is overall; project specifics live in data/projects. */
  summary: string;
  stack: string[];
  /** Project slugs from data/projects. */
  projects: string[];
  /** Bullets for roles without a named project. */
  bullets?: string[];
};

export const experience: Role[] = [
  {
    company: 'PTT Digital',
    role: 'Developer',
    period: 'Aug 2026 — Present',
    current: true,
    summary:
      'Build and run backend services for enterprise platforms: API design, relational data modeling, third-party integrations, containerized deployment on Kubernetes, and automated testing.',
    stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Kubernetes'],
    projects: ['aegis-core'],
  },
  {
    company: 'Gosoft (Thailand)',
    role: 'Developer',
    period: 'Nov 2025 — Jul 2026',
    summary:
      'Full-stack development of enterprise web platforms with React and NestJS, covering backend APIs, frontend features, authentication and access control, and integrations with corporate systems.',
    stack: ['NestJS', 'React', 'PostGIS', 'AWS Cognito'],
    projects: ['allmap', 'timeline-integration'],
  },
  {
    company: 'Gosoft (Thailand)',
    role: 'Intern Software Engineer',
    period: 'Jan 2025 — May 2025',
    summary:
      'Backend development with Java and Spring Boot, including database integration and SQL optimization, cloud deployment support, and secure coding practices.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'Oracle'],
    projects: [],
    bullets: [
      'Developed Java Spring Boot backend modules using layered architecture to separate API handling, business logic, and database access.',
      'Integrated MySQL and Oracle databases and optimized SQL queries.',
      'Supported AWS deployment and environment configuration.',
      'Used static code analysis to identify and remediate security vulnerabilities, including SQL injection.',
    ],
  },
];

export const education = {
  school: 'Sirindhorn International Institute of Technology (Thammasat University)',
  degree: 'Bachelor of Engineering in Computer Engineering',
  track: 'Cloud Computing and Cybersecurity',
  period: '2021 — 2025',
};

export const skills = {
  Programming: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL'],
  Backend: ['Node.js', 'Express.js', 'NestJS', 'Spring Boot'],
  Frontend: ['React', 'Tailwind CSS', 'Zustand', 'TanStack Query'],
  Databases: ['PostgreSQL', 'PostGIS', 'MySQL'],
  'Cloud & DevOps': ['Docker', 'Kubernetes', 'Bash', 'GitLab', 'Elasticsearch', 'AWS'],
  'Testing & API Tooling': ['Jest', 'Mocha', 'Postman', 'OpenAPI', 'Zod'],
};

export type Publication = {
  title: string;
  venue: string;
  year: string;
  /** The paper's own page (e.g. its IEEE Xplore or DOI link). Until set, we link to a title search. */
  url?: string;
};

export const publicationHref = (publication: Publication) =>
  publication.url ??
  `https://ieeexplore.ieee.org/search/searchresult.jsp?queryText=${encodeURIComponent(
    `"${publication.title}"`,
  )}`;

export const publications: Publication[] = [
  {
    title:
      'FPRESSO: Fast and Privacy-Preserving SSO Authentication With Dynamic Load Balancing for Multi-Cloud-Based Web Applications',
    venue: 'IEEE Access',
    year: '2024',
    url: 'https://ieeexplore.ieee.org/document/10734102',
  },
  {
    title:
      'A Verifiable and Secure E-Transcript System Using Self-Sovereign Identity and Blockchain',
    venue: 'KST',
    year: '2025',
    url: 'https://ieeexplore.ieee.org/document/11003307',
  },
];
