import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get the 'isLoggedIn' cookie
  const isLoggedIn = request.cookies.get('isLoggedIn');
  
  // 2. Check if the current URL starts with /services
  // Note: it is "startsWith" (with an 's'), not "startWith"
  const isProtectedPath = request.nextUrl.pathname.startsWith('/services');

  // 3. Logic: If path is protected and user NOT logged in, redirect to sign-in
  if (isProtectedPath && !isLoggedIn) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // 4. Otherwise, continue as normal
  return NextResponse.next();
}

// Ensure the middleware only runs on specific routes to save performance
export const config = {
  matcher: ['/services/:path*'],
};