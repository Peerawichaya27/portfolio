export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  organization: string;
  role: string;
  period: string;
  category: string;
  summary: string;
  context: string;
  technologies: string[];
  /** Taken from the résumé dated 2026-11-06; keep in sync with it. */
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: 'aegis-core',
    title: 'Aegis Core',
    subtitle: 'Multi-Tenant Service Management Platform',
    organization: 'PTT Digital',
    role: 'Developer',
    period: 'Aug 2026 — Present',
    category: 'Backend & Cloud',
    summary:
      'REST APIs, tenant-scoped data, enterprise and telephony integrations, and Kubernetes deployment for a multi-tenant service management platform.',
    context:
      'A service management platform covering ticket and task workflows, SLA/OLA tracking, operational dashboards, and Excel reporting across tenants.',
    technologies: [
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'TypeORM',
      'Docker',
      'Kubernetes',
      'GitLab',
      'Elasticsearch',
    ],
    highlights: [
      'Developed REST APIs for multi-tenant ticket and task workflows, SLA/OLA tracking, operational dashboards, and Excel reporting.',
      'Designed PostgreSQL relational models with tenant-scoped access control, relationship constraints, and transactional updates to maintain data integrity.',
      'Integrated enterprise and telephony platforms through APIs and callbacks, implementing OAuth2 authentication, JWT-signed payloads, idempotency, and timeout handling.',
      'Containerized and independently deployed the backend to Kubernetes using Bash automation, with environment-based configuration and scheduled CronJobs for SLA alerts and data cleanup.',
      'Implemented S3-compatible attachment storage with presigned upload/download URLs, file validation, and coordinated object-storage and database retention.',
      'Maintained OpenAPI documentation for frontend integration, added structured logging with Elasticsearch delivery, and wrote unit, integration, and API contract tests.',
    ],
  },
  {
    slug: 'allmap',
    title: 'AllMap',
    subtitle: 'Enterprise Geospatial Analytics Platform',
    organization: 'Gosoft (Thailand)',
    role: 'Developer',
    period: 'Nov 2025 — Jul 2026',
    category: 'Full-stack',
    summary:
      'Geospatial APIs and interactive map features that support retail site-planning decisions.',
    context:
      'An enterprise geospatial analytics platform for proximity analysis, transit intersections, and location filtering.',
    technologies: [
      'React',
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'PostGIS',
      'OpenLayers',
      'AWS',
      'Docker',
    ],
    highlights: [
      'Developed backend APIs for proximity analysis, transit intersections, and location filtering to support retail site-planning decisions.',
      'Extended a modular NestJS backend using Hexagonal Architecture, separating business logic from database access and infrastructure integrations.',
      'Built interactive React mapping features with OpenLayers, Zustand, and TanStack Query for exploring geospatial data.',
      'Validated geospatial APIs, file-ingestion workflows, and authenticated requests using Postman.',
    ],
  },
  {
    slug: 'timeline-integration',
    title: 'Timeline',
    subtitle: 'Information System & Integration Platform',
    organization: 'Gosoft (Thailand)',
    role: 'Developer',
    period: 'Nov 2025 — Jul 2026',
    category: 'Secure Integrations',
    summary:
      'Identity-aware APIs and an admin application for user lifecycles, access approvals, and audit history.',
    context:
      'An information system and integration platform that lets corporate systems retrieve timeline, licensing, and user-status information.',
    technologies: [
      'React',
      'NestJS',
      'TypeScript',
      'MySQL',
      'AWS Cognito',
      'Active Directory',
      'Docker',
    ],
    highlights: [
      'Developed backend APIs and an internal React administration application for user lifecycle management, access approvals, and audit history.',
      'Implemented authentication and authorization using AWS Cognito OIDC, JWT, role-based access control, Active Directory integration, and API keys.',
      'Built integration services enabling corporate systems to retrieve timeline, licensing, and user-status information.',
      'Automated SMTP email notifications and validated protected APIs and cross-system integration workflows using Postman.',
    ],
  },
];
