import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routes } from '~/constants/routes';
import { env } from '~/constants/variables';

export const middleware = (req: NextRequest): NextResponse => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(env.refresh_token);

  const headers = new Headers(req.headers);
  headers.set('x-pathname', pathname);

  if (pathname.startsWith(`/${routes.auth}`)) {
    if (token) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = `/${routes.auth}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request: { headers } });
};

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.ico|apple-icon.ico|static|data:image|api).*)',
  ],
};
