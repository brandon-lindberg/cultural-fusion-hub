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
      <div className="hidden items-center gap-6 text-sm font-semibold md:flex">
        {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Link
              href={item.href}
              key={item.href}
              className={`transition ${
                isActive ? 'text-accent' : 'text-muted hover:text-ink'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <button
        className="rounded-full border border-black/10 bg-white/80 p-2 text-muted shadow-sm transition hover:text-ink md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
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
        <div
          id="mobile-menu"
          className="absolute right-0 top-full z-20 mt-3 w-64 rounded-2xl border border-black/10 bg-white/95 p-4 shadow-xl backdrop-blur"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-accent/10 text-accent' : 'text-muted hover:bg-black/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => {
                if (router.locale !== 'en') {
                  void router.push(router.asPath, undefined, { locale: 'en' });
                }
                if (i18n.language !== 'en') {
                  i18n.changeLanguage('en');
                }
                setIsMenuOpen(false);
              }}
              className="btn-ghost flex-1 border border-black/10 text-sm"
            >
              English
            </button>
            <button
              onClick={() => {
                if (router.locale !== 'ja') {
                  void router.push(router.asPath, undefined, { locale: 'ja' });
                }
                if (i18n.language !== 'ja') {
                  i18n.changeLanguage('ja');
                }
                setIsMenuOpen(false);
              }}
              className="btn-ghost flex-1 border border-black/10 text-sm"
            >
              日本語
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
