export type CareerMonth = { year: number; month: number };
export type Role = {
  id: string;
  company: string;
  role: string;
  start: CareerMonth;
  end: CareerMonth | null;
  summary: string;
  stack: readonly string[];
};

export const experience = [
  {
    company: 'PTT Digital',
    role: 'Developer',
    id: 'ptt-developer',
    start: { year: 2026, month: 8 },
    end: null,
    summary:
      'Build and run backend services for enterprise platforms: API design, relational data modeling, third-party integrations, containerized deployment on Kubernetes, and automated testing.',
    stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Kubernetes'],
  },
  {
    company: 'Gosoft (Thailand)',
    role: 'Developer',
    id: 'gosoft-developer',
    start: { year: 2025, month: 11 },
    end: { year: 2026, month: 7 },
    summary:
      'Full-stack development of enterprise web platforms with React and NestJS, covering backend APIs, frontend features, authentication and access control, and integrations with corporate systems.',
    stack: ['NestJS', 'React', 'PostGIS', 'AWS Cognito'],
  },
  {
    company: 'Gosoft (Thailand)',
    role: 'Intern Software Engineer',
    id: 'gosoft-intern',
    start: { year: 2025, month: 1 },
    end: { year: 2025, month: 5 },
    summary:
      'Backend development with Java and Spring Boot, including database integration and SQL optimization, cloud deployment support, and secure coding practices.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'Oracle'],
  },
] as const satisfies readonly Role[];

export type CareerRole = (typeof experience)[number];
export type RoleId = CareerRole['id'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatMonth(date: CareerMonth): string {
  return `${MONTHS[date.month - 1]} ${date.year}`;
}

export function formatPeriod(role: Pick<Role, 'start' | 'end'>): string {
  return `${formatMonth(role.start)} — ${role.end ? formatMonth(role.end) : 'Present'}`;
}

export function isoMonth(date: CareerMonth): string {
  return `${date.year}-${String(date.month).padStart(2, '0')}`;
}

export type CompanyExperience<R extends Role = Role> = {
  company: string;
  roles: readonly [R, ...R[]];
};

const monthIndex = (date: CareerMonth) => date.year * 12 + date.month;

export function chronologicalRoles<R extends Role>(roles: readonly R[]): R[] {
  return [...roles].sort((a, b) => monthIndex(a.start) - monthIndex(b.start));
}

export function groupExperience<R extends Role>(roles: readonly R[]): CompanyExperience<R>[] {
  const groups = new Map<string, CompanyExperience<R>>();
  const newestFirst = chronologicalRoles(roles).reverse();
  for (const role of newestFirst) {
    const group = groups.get(role.company);
    if (group) group.roles = [...group.roles, role];
    else groups.set(role.company, { company: role.company, roles: [role] });
  }
  return [...groups.values()];
}

export function formatCompanyPeriod(group: CompanyExperience): string {
  const start = group.roles.reduce(
    (earliest, role) => (monthIndex(role.start) < monthIndex(earliest) ? role.start : earliest),
    group.roles[0].start,
  );
  const end = group.roles.some((role) => role.end === null)
    ? null
    : group.roles.reduce<CareerMonth>(
        (latest, role) =>
          role.end && monthIndex(role.end) > monthIndex(latest) ? role.end : latest,
        group.roles[0].end!,
      );
  return formatPeriod({ start, end });
}
