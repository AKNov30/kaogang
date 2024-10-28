// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('token')?.value;

  // ตรวจสอบว่ามี token หรือไม่ (ถ้าไม่มีจะ redirect ไปที่หน้า login)
  if (!token) {
    if (pathname === '/home' || pathname === '/admin' || pathname === '/register') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  try {
    // ตรวจสอบ token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ถ้าผู้ใช้พยายามเข้าถึงหน้า /admin แต่ role ไม่ใช่ admin จะ redirect ไปที่ /home
    if (pathname === '/admin' && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/home', req.url));
    }

    // ถ้าผู้ใช้พยายามเข้าถึงหน้า /register แต่ role ไม่ใช่ admin จะ redirect ไปที่ /dashboard
    if (pathname === '/register' && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/admin', '/register'],
};