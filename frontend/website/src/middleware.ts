import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// import { getAuthenticationToken } from '@/utils/get-token';

export async function middleware(_request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // let response: Response;

  // // Specify the protected route
  // const protectedRoutes = ['/profile', '/checkout'];

  // // Check if the user is authenticated
  // const token = getAuthenticationToken(request);

  // // Check if the current pathname matches any protected route
  // if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
  //   // Redirect to the login page
  //   const loginUrl = new URL('/users/login', request.url);
  //   response = NextResponse.redirect(loginUrl);
  // } else {
  //   response = NextResponse.next();
  // }

  // return response;

  return NextResponse.next();
}

export const config = {
  // matcher: ['/checkout/:path*', '/profile/:path*'],
  matcher: ['/disable'],
};
