import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WishLink - Create and share your wishlists',
  description: 'Create, manage and share your wishlists with family and friends.',
  keywords: ['wishlist', 'gift registry', 'shopping', 'gifts'],
  metadataBase: new URL('http://localhost:3001'),
  openGraph: {
    title: 'WishLink - Create and share your wishlists',
    description: 'Create, manage and share your wishlists with family and friends.',
    url: 'http://localhost:3001',
    siteName: 'WishLink',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WishLink - Create and share your wishlists',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WishLink - Create and share your wishlists',
    description: 'Create, manage and share your wishlists with family and friends.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
}; 