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
  },
  // Configuração para o App Router
  output: 'standalone',
  // Removendo a configuração i18n que não é compatível com o App Router
}

module.exports = nextConfig 