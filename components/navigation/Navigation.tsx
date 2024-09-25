import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/profile', label: t('profile') },
    { href: '/blog', label: t('blogMenu') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav className="relative">
      <button
        className="text-gray-500 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {isMenuOpen && (
        <div className="absolute top-full left-0 bg-white shadow-md z-10">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={`block py-2 px-4 text-sm text-gray-500 hover:bg-gray-100 ${
                router.pathname === item.href ? 'text-green-500' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex justify-evenly mt-4">
            <button
              onClick={() => i18n.changeLanguage('en')}
              className="focus:outline-none mr-2 px-1 py-1"
            >
              <span className="flag-icon flag-icon-gb"></span>
            </button>
            <button
              onClick={() => i18n.changeLanguage('ja')}
              className="focus:outline-none ml-2 px-1 py-1"
            >
              <span className="flag-icon flag-icon-jp"></span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;