/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Desabilita warnings de hidratação em desenvolvimento
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'm.media-amazon.com',
      'images-na.ssl-images-amazon.com',
      'images-americas.ssl-images-amazon.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pertussatti.com',
        port: '',
        pathname: '/**',
      }
    ],
    unoptimized: true
  },
  // Permitir origens de desenvolvimento para evitar warnings de CORS
  experimental: {
    allowedDevOrigins: ['localhost', '127.0.0.1', '0.0.0.0', '10.0.0.147']
  },
  // Configurações adicionais de performance
  poweredByHeader: false,
  compress: true,
  // Regras de cabeçalhos para segurança e performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXTAUTH_URL || 'http://localhost:3000',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  // i18n configuration removed as it's not compatible with App Router
}

module.exports = nextConfig 