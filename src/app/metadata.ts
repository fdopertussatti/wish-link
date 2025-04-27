import { Metadata } from 'next';

const appName = 'WishLink';
const appDescription = 'Create personalized wish lists, share with your loved ones, and avoid duplicate or unwanted gifts.';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: `${appName} - Create, Share and Organize Your Wish Lists`,
    template: `%s | ${appName}`
  },
  description: appDescription,
  keywords: ['wish list', 'gift registry', 'wishlist', 'gifts', 'presents'],
  authors: [{ name: 'Pertussatti', url: 'https://pertussatti.com' }],
  creator: 'Pertussatti',
  publisher: 'Pertussatti',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: appName,
    title: `${appName} - Create, Share and Organize Your Wish Lists`,
    description: appDescription,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${appName} - Wish List Manager`
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${appName} - Create, Share and Organize Your Wish Lists`,
    description: appDescription,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

// Helper para criar metadados específicos para cada página
export function createMetadata({
  title,
  description,
  images = ['/og-image.png'],
  noIndex = false
}: {
  title?: string;
  description?: string;
  images?: string[];
  noIndex?: boolean;
}): Metadata {
  return {
    ...defaultMetadata,
    title: title,
    description: description || defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: title || defaultMetadata.openGraph?.title,
      description: description || defaultMetadata.openGraph?.description,
      images: images.map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: title || defaultMetadata.openGraph?.title as string
      }))
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title || defaultMetadata.twitter?.title,
      description: description || defaultMetadata.twitter?.description,
      images: images,
    },
    robots: noIndex ? { index: false, follow: false } : defaultMetadata.robots,
  };
} 