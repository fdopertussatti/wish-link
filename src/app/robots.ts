import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/*',
        '/auth/error',
        '/_next/*',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 