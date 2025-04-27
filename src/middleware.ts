import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

// Supported locales
export const locales = ['en', 'pt-BR'];
export const defaultLocale = 'en';

// Paths that don't require authentication
const publicPaths = ['/', '/auth/signin', '/auth/signup', '/privacy', '/terms', '/how-it-works'];

// Lista de cabeçalhos de segurança
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.app",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://images.unsplash.com https://*.amazonaws.com",
    "font-src 'self' data:",
    "connect-src 'self' https://vercel.live https://*.vercel.app",
    "frame-src 'self'",
  ].join('; '),
};

// Combine the auth middleware with i18n handling
function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();

  // Aplicar cabeçalhos de segurança em todas as respostas
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Proteção básica contra ataques de CSRF
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const requestOrigin = request.headers.get('origin');
    const allowedOrigins = [process.env.NEXTAUTH_URL || ''].filter(Boolean);
    
    // Em desenvolvimento, aceitar localhost
    if (process.env.NODE_ENV === 'development') {
      allowedOrigins.push('http://localhost:3000');
    }
    
    if (requestOrigin && !allowedOrigins.includes(requestOrigin)) {
      return new NextResponse(null, {
        status: 403,
        statusText: 'Forbidden',
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  }

  // Check if the pathname is missing a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Public paths don't need auth, only locale handling
  const isPublicPath = publicPaths.some(path => 
    pathname === path || 
    pathname.startsWith(path + '/')
  );

  if (!pathnameHasLocale) {
    // Determine locale from various sources
    let locale = defaultLocale;
    
    // Check Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      const browserLocale = acceptLanguage.split(',')[0].trim().split('-')[0];
      if (locales.some(l => l.startsWith(browserLocale))) {
        // Find an exact or partial match (e.g., 'pt-BR' for 'pt')
        locale = locales.find(l => l.startsWith(browserLocale)) || defaultLocale;
      }
    }

    // Redirect to the same URL but with locale
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  if (isPublicPath) {
    // Public paths just pass through after locale handling
    return response;
  }

  // For protected paths, we'll use the auth middleware below
  return response;
}

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  // Match all routes except for
  // - API routes (/api)
  // - Static files (/_next, /images, /favicon.ico, etc)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}; 