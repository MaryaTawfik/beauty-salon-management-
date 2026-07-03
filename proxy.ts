import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rename the function to proxy
export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true'; 
  const isAdmin = request.cookies.get('role')?.value === 'admin';
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/services') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn || !isAdmin) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

// Keep your specific matcher
export const config = {
  matcher: ['/services/:path*', '/admin/:path*'],
};