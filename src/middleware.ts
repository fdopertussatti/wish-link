import { NextRequest, NextResponse } from 'next/server';

// Supported locales
export const locales = ['en', 'pt-BR'];
export const defaultLocale = 'en';

// Flag para desabilitar autenticação durante o desenvolvimento
// Pode ser controlado pela variável de ambiente DISABLE_AUTH=true
const isAuthDisabled = process.env.DISABLE_AUTH === 'true';

// Paths that don't require authentication (without locale prefix)
// Rotas públicas atualizadas para combinar com a estrutura real
const publicPaths = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/como-funciona',    // Caminho real da pasta da página "Como Funciona"
  '/privacidade',      // Caminho real da pasta da página de privacidade
  '/termos',           // Caminho real da pasta da página de termos
  '/privacy',          // Caminhos alternativos para URLs em inglês
  '/terms',
  '/how-it-works'
];

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

// Verificar se um caminho está na lista de caminhos públicos
function isPathPublic(pathname: string): boolean {
  // Se a autenticação estiver desabilitada, todos os caminhos são considerados públicos
  if (isAuthDisabled) {
    console.log(`Auth is disabled. Treating ${pathname} as public.`);
    return true;
  }

  // Primeiro, remover o prefixo de localidade se existir
  let pathWithoutLocale = pathname;
  
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`)) {
      pathWithoutLocale = pathname.replace(`/${locale}`, '');
      break;
    } else if (pathname === `/${locale}`) {
      pathWithoutLocale = '/';
      break;
    }
  }
  
  // Debug para ajudar na solução de problemas (remover em produção)
  console.log(`Original path: ${pathname}, Without locale: ${pathWithoutLocale}`);
  
  // Verificar caminho exato primeiro
  if (publicPaths.includes(pathWithoutLocale)) {
    return true;
  }
  
  // Depois verificar caminhos que começam com o padrão público
  return publicPaths.some(path => 
    pathWithoutLocale.startsWith(`${path}/`)
  );
}

// Adicionar cabeçalhos de segurança à resposta
function addSecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// Middleware principal
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Para depuração: logar todos os caminhos
  console.log(`Middleware processing path: ${pathname}`);
  
  // Verificar se o caminho atual é público
  const isPublic = isPathPublic(pathname);
  console.log(`Path ${pathname} is public: ${isPublic}`);
  
  // Aplicar cabeçalhos de segurança em todas as respostas
  let response = NextResponse.next();
  response = addSecurityHeaders(response);

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

  // Se o caminho for público e não tiver localidade, não redirecionar
  // Isso permite acessar caminhos públicos sem o prefixo de idioma
  if (!pathnameHasLocale && !isPublic) {
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

  // Se o caminho for público, não verificar autenticação
  if (isPublic) {
    return response;
  }

  // Se chegou aqui, o caminho requer autenticação
  
  // Verificar token JWT nas cookies
  const authToken = request.cookies.get('next-auth.session-token')?.value || 
                     request.cookies.get('__Secure-next-auth.session-token')?.value;
  
  if (!authToken) {
    // Redirecionar para login se não houver token
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(signInUrl);
  }
  
  // Token existe, permitir acesso
  return response;
}

export const config = {
  // Match all routes except for
  // - API routes (/api)
  // - Static files (/_next, /images, /favicon.ico, etc)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}; 