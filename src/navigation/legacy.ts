import { sectionIds, sectionHref } from './sections';

export const legacyDestinations = {
  about: sectionHref('en', sectionIds.about),
  blog: sectionHref('en', sectionIds.research),
  resume: sectionHref('en', sectionIds.experience),
  projects: sectionHref('en', sectionIds.experience),
} as const;

export const legacyProjectSlugs = ['aegis-core', 'allmap', 'timeline-integration'] as const;
export function isLegacyProject(slug: string): boolean {
  return legacyProjectSlugs.some((known) => known === slug);
}
