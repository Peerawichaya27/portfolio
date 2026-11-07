import { homeHref, type Lang } from '@/i18n/routing';

export const sections = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'setup', label: 'skills' },
  { id: 'research', label: 'research' },
  { id: 'contact', label: 'contact' },
] as const;

export type SectionId = (typeof sections)[number]['id'];
export const sectionIds = Object.fromEntries(
  sections.map((section) => [section.id, section.id]),
) as { [Id in SectionId]: Id };
export const primarySections = sections.filter((section) => section.id !== 'contact');
export const sectionHref = (lang: Lang, id: SectionId) => homeHref(lang, id);
