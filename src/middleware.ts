import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

// Supported locales
export const locales = ['en', 'pt-BR'];
export const defaultLocale = 'en';

// Paths that don't require authentication
const publicPaths = ['/', '/auth/signin', '/auth/signup', '/privacy', '/terms', '/how-it-works'];

// Combine the auth middleware with i18n handling
function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
    return NextResponse.next();
  }

  // For protected paths, we'll use the auth middleware below
  return NextResponse.next();
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