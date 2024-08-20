import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/profile', label: t('profile') },
    { href: '/blog', label: t('blogMenu') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">Cultural Fusion Hub</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 ${
                    router.pathname === item.href ? 'text-green-500 border-b-4 border-green-500' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;