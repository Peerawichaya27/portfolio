export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  organization: string;
  period: string;
  category: string;
  summary: string;
  technologies: string[];
  highlights: string[];
  context: string;
  considerations: string[];
  nodes: string[];
};
export const projects: Project[] = [
  {
    slug: 'aegis-core',
    title: 'Aegis Core',
    subtitle: 'Multi-Tenant Service Management',
    organization: 'PTT Digital',
    period: 'Aug 2026 — Present',
    category: 'Backend & Cloud',
    summary:
      'Connecting service workflows, enterprise integrations, and tenant-scoped data in one platform.',
    technologies: [
      'TypeScript',
      'Express',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
      'TypeORM',
      'Elasticsearch',
    ],
    context:
      'A service management platform supporting tickets and tasks, SLA/OLA tracking, dashboards, and reporting across tenants.',
    highlights: [
      'REST APIs for ticket and task workflows, SLA/OLA tracking, dashboards, and reporting.',
      'Tenant-scoped PostgreSQL access using TypeORM.',
      'Enterprise and telephony integrations alongside S3-compatible storage.',
      'Kubernetes deployment, logging, and testing.',
    ],
    considerations: [
      'Tenant boundaries are a central concern for data access.',
      'Logging and testing support the operation of integrated services.',
      'Deployment configuration connects application behavior to its runtime environment.',
    ],
    nodes: ['Service workflows', 'REST APIs', 'Tenant-scoped data'],
  },
  {
    slug: 'allmap',
    title: 'AllMap',
    subtitle: 'Enterprise Geospatial Analytics',
    organization: 'Gosoft (Thailand)',
    period: 'Nov 2025 — Jul 2026',
    category: 'Full-stack',
    summary:
      'Bringing location data into focus through spatial APIs and interactive map experiences.',
    technologies: ['React', 'NestJS', 'TypeScript', 'PostgreSQL', 'PostGIS', 'OpenLayers', 'AWS'],
    context:
      'An enterprise geospatial analytics platform combining location operations with map-based interfaces.',
    highlights: [
      'Geospatial analysis APIs in a modular NestJS backend.',
      'Hexagonal architecture for organizing backend responsibilities.',
      'PostGIS-powered location operations.',
      'React and OpenLayers map features.',
    ],
    considerations: [
      'Spatial operations need a database model suited to location data.',
      'Backend boundaries help organize domain logic and integrations.',
      'Map interactions connect backend analysis to a usable interface.',
    ],
    nodes: ['Interactive maps', 'Geospatial APIs', 'PostGIS operations'],
  },
  {
    slug: 'timeline-integration',
    title: 'Timeline',
    subtitle: 'Information & Integration Platform',
    organization: 'Gosoft (Thailand)',
    period: 'Nov 2025 — Jul 2026',
    category: 'Secure Integrations',
    summary:
      'Supporting enterprise user lifecycles with identity, approvals, and traceable workflows.',
    technologies: [
      'React',
      'NestJS',
      'TypeScript',
      'MySQL',
      'AWS Cognito',
      'Active Directory',
      'Docker',
    ],
    context:
      'An enterprise information system connecting user lifecycle management, approvals, and identity integrations.',
    highlights: [
      'User lifecycle and approval workflows with an internal React admin interface.',
      'Audit history for enterprise workflows.',
      'AWS Cognito OIDC, JWT, and role-based access control.',
      'Active Directory, enterprise information integrations, and email notifications.',
    ],
    considerations: [
      'Authentication and role-based authorization address different access concerns.',
      'Audit history supports traceability across approval workflows.',
      'Identity integrations connect application workflows to enterprise systems.',
    ],
    nodes: ['Admin & approvals', 'Identity & APIs', 'Enterprise systems'],
  },
];
