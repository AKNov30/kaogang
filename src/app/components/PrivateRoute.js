// src/components/PrivateRoute.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    // Skip authentication if user is on the login page
    if (pathname === '/login') {
      setLoading(false);
      return;
    }

    // Check authentication for other pages
    axios.get('/api/userinfo')
      .then((res) => {
        if (res.data) {
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        // Redirect to login if not authenticated
        router.push('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pathname, router]);

  if (loading) {
    // Show a loading state until authentication is verified
    return <div>Loading...</div>;
  }

  // Render children if authenticated or if on the login page
  return isAuthenticated || pathname === '/login' ? children : null;
}
