// src/app/layout.js
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
        <main>{children}</main>
      </body>
    </html>
  );
}
