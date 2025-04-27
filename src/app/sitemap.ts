import { MetadataRoute } from 'next';
import { locales } from '@/middleware';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  // Páginas estáticas (sem dados dinâmicos)
  const staticPages = [
    '',
    '/auth/signin',
    '/privacy',
    '/terms',
    '/how-it-works',
  ];

  // Gerar entradas para cada página estática em cada idioma
  const entries = locales.flatMap(locale => 
    staticPages.map(route => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  return entries;
} 