import { notFound, permanentRedirect } from 'next/navigation';
import { projects } from '@/data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!projects.some((project) => project.slug === slug)) notFound();
  permanentRedirect('/#experience');
}
