// src/app/components/Navbar.js
'use client';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้จาก API เพื่อตรวจสอบ role
    axios.get('/api/userinfo')
      .then((res) => setUser(res.data))
      .catch(() => {
        // ถ้าไม่ได้ล็อกอิน จะ redirect ไปหน้า login
        router.push('/login');
      });
  }, [router]);

  const handleLogout = () => {
    // เคลียร์ token ออกจาก cookies และไปที่หน้า login
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <nav className="bg-white-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <h1 className="text-lg font-bold">My App</h1>
        <div className="flex space-x-4">
          <Link href="/home" className="hover:underline">Home</Link>
          {user?.role === 'admin' && (
            <Link href="/admin" className="hover:underline">Admin</Link>
          )}
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        </div>
        </div>
      </div>
    </nav>
  );
}
