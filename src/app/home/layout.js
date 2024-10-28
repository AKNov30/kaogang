// src/app/home/layout.js
import PrivateRoute from '@/app/components/PrivateRoute';

export default function HomeLayout({ children }) {
  return <PrivateRoute>{children}</PrivateRoute>;
}