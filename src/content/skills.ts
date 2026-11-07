export const skills = {
  Programming: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL'],
  Backend: ['Node.js', 'Express.js', 'NestJS', 'Spring Boot'],
  Frontend: ['React', 'Tailwind CSS', 'Zustand', 'TanStack Query'],
  Databases: ['PostgreSQL', 'PostGIS', 'MySQL'],
  'Cloud & DevOps': ['Docker', 'Kubernetes', 'Bash', 'GitLab', 'Elasticsearch', 'AWS'],
  'Testing & API Tooling': ['Jest', 'Mocha', 'Postman', 'OpenAPI', 'Zod'],
} as const;

export type SkillCategory = keyof typeof skills;
export const skillEntries = Object.entries(skills) as [SkillCategory, readonly string[]][];
export const skillDrum = skillEntries.flatMap(([category, values]) =>
  values.map((value) => ({ value, category })),
);
