import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get cookie values safely (checking .value)
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true'; 
  const isAdmin = request.cookies.get('role')?.value === 'admin';
  
  const { pathname } = request.nextUrl;

  // 2. Protect /services routes
  if (pathname.startsWith('/services') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // 3. Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn || !isAdmin) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // 4. Otherwise, continue normal execution
  return NextResponse.next();
}

export const config = {
  matcher: ['/services/:path*', '/admin/:path*'],
};