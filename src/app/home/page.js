// src/app/home/page.js
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // เรียกข้อมูลจาก /api/userinfo เพื่อดึงข้อมูลผู้ใช้
    axios.get('/api/userinfo')
      .then((res) => setUser(res.data))
      .catch(() => {
        // ถ้า token ไม่ถูกต้องหรือหมดอายุ ให้ redirect ไปหน้า login
        window.location.href = '/login';
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Home Page</h1>
      {user ? (
        <p>Logged in as: {user.username}<br /> role: {user.role}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
