// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  // Redirect to login if no token is present
  if (!token) {
    if (pathname === '/home' || pathname === '/admin' || pathname === '/register') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  try {
    // Verify the token with Jose
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    // Redirect if attempting to access /admin without admin role
    if (pathname === '/admin' && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/home', req.url));
    }

    // Redirect if attempting to access /register without admin role
    if (pathname === '/register' && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  } catch (error) {
    // Redirect to login if token verification fails
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/admin', '/register'],
};