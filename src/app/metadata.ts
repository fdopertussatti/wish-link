import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WishLink - Sua Lista de Desejos',
  description: 'Crie e compartilhe suas listas de presentes de forma fácil e organizada.',
  keywords: ['lista de presentes', 'desejos', 'presentes', 'aniversário', 'natal'],
  authors: [{ name: 'WishLink Team' }],
  creator: 'WishLink',
  publisher: 'WishLink',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#7C3AED',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}; 