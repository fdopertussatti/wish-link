import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware para autenticação e internacionalização
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Verificar se a rota precisa de autenticação
  const isAuthRoute = [
    '/listas',
    '/compartilhado',
    '/perfil',
    '/configuracoes'
  ].some(route => pathname.startsWith(route));

  // Verificar autenticação para rotas protegidas
  if (isAuthRoute) {
    const token = await getToken({ req: request });
    
    if (!token) {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Verificar internacionalização
  const pathnameIsMissingLocale = ['en', 'pt-BR', 'es', 'fr', 'zh'].every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirecionar se não houver locale na URL
  if (pathnameIsMissingLocale) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Rotas que precisam de autenticação
    '/listas/:path*',
    '/compartilhado/:path*',
    '/perfil/:path*',
    '/configuracoes/:path*',
    // Rotas que precisam de internacionalização
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 