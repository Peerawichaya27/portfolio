import { notFound, permanentRedirect } from 'next/navigation';
import { legacyProjectSlugs, isLegacyProject, legacyDestinations } from '@/navigation/legacy';

export function generateStaticParams() {
  return legacyProjectSlugs.map((slug) => ({ slug }));
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isLegacyProject(slug)) notFound();
  permanentRedirect(legacyDestinations.projects);
}
