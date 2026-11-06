import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/projects',
    '/about',
    '/resume',
    '/blog',
    ...projects.map((p) => `/projects/${p.slug}`),
  ].map((path) => ({
    url: `https://tarpp.dev${path}`,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
