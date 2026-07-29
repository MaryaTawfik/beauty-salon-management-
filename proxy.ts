import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Get cookies
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const role = request.cookies.get('role')?.value;

  // 2. Define Protected Paths
  const isServicePage = pathname.startsWith('/services');
  const isAdminPage = pathname.startsWith('/admin');
  const isProfilePage = pathname.startsWith('/profile');

  // 3. Logic: Redirect if not logged in
  if ((isServicePage || isAdminPage || isProfilePage) && !isLoggedIn) {
    const loginUrl = new URL('/sign-in', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Role Logic: Block non-admins from /admin
  if (isAdminPage && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Exclude static files, images, and api routes from running the proxy
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};