// src/app/admin/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Admin() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/userinfo')
      .then((res) => {
        if (res.data.role !== 'admin') {
          router.push('/home');
        } else {
          setUser(res.data);
        }
      })
      .catch(() => router.push('/login'));
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {user && <p>Logged in as Admin: {user.username}</p>}
    </div>
  );
}