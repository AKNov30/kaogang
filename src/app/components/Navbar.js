'use client';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Image from 'next/image';
import logo from '../../../public/logo.svg'
import rice from '../../../public/rice.svg'
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Disclosure, Menu } from '@headlessui/react';
import { HiMenu, HiX } from 'react-icons/hi';

const navigation = [
  { name: 'รายการสินค้า', href: '/home' },
  { name: 'บิล', href: '#' },
  { name: 'บิลเสีย', href: '#' },
  { name: 'ตัวช่วยคีย์', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/userinfo')
      .then((res) => setUser(res.data))
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <Disclosure as="nav" className="bg-white-800 border-b border">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black-400 hover:bg-black-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* Logo Section */}
                <Link href="/home">
                  <Image src={logo} alt="Logo" width={100} className="mr-4" />
                </Link>
                <div className="hidden sm:flex space-x-4">
                  {user && navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={pathname === item.href ? 'page' : undefined}
                      className={classNames(
                        pathname === item.href ? 'bg-gray-900 text-white' : 'text-black-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* ตรวจสอบสถานะการล็อกอินก่อนแสดง dropdown */}
                {user && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-1">
                        <span className="sr-only">Open user menu</span>
                        <a className='text-white pe-1 pt-1'>{user.username}</a>
                        <Image
                          alt="Profile"
                          src={ rice }
                          className="h-8 w-8 rounded-full filter invert"
                        />
                      </Menu.Button>
                    </div>
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* แสดง admin-zone เฉพาะเมื่อ user เป็น admin */}
                      {user.role === 'admin' && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/admin" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              admin-zone
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {user.role === 'admin' && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/register" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              register
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={handleLogout} className={classNames(active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700')}>
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={classNames(
                    pathname === item.href ? 'bg-gray-900 text-white' : 'text-black-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}