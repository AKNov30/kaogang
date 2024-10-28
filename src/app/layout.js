// src/app/layout.js
import PrivateRoute from '@/app/components/PrivateRoute';
import Navbar from './components/Navbar';
import './globals.css';

export const metadata = {
  title: 'kaogang',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          <PrivateRoute>
            {children}
          </PrivateRoute>
        </main>
      </body>
    </html>
  );
}
