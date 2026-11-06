import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: 'https://tarpp.dev', th: 'https://tarpp.dev/th' };
  return [
    { url: languages.en, changeFrequency: 'monthly', priority: 1, alternates: { languages } },
    { url: languages.th, changeFrequency: 'monthly', priority: 0.9, alternates: { languages } },
  ];
}
