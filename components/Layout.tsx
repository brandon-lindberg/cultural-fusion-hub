import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navigation from './navigation/Navigation';
import SocialMetaTags from './SocialMetaTags';

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
};

const Layout = ({
  children,
  title = 'Cultural Fusion Hub',
  description =
    'Cultural Fusion Hubは、ミックスの子供たちやその両親が情報交換やサポートを通じて共に成長するコミュニティです。情報提供やイベント、ワークショップやセミナー、交流会を定期的に行っています。ぜひご参加ください!',
  image = 'https://www.culturalfusionhub.com/CFH-logo-vector.png',
  canonicalUrl = 'https://culturalfusionhub.com',
}: Props) => {
  const router = useRouter();
  const { asPath, locale, locales, defaultLocale } = router;
  const { i18n } = useTranslation();

  const brandName = 'Cultural Fusion Hub';
  const normalizedTitle = (title ?? '').trim();
  const titleHasBrand = normalizedTitle.toLowerCase().includes(brandName.toLowerCase());
  const documentTitle = normalizedTitle
    ? titleHasBrand
      ? normalizedTitle
      : `${normalizedTitle} | ${brandName}`
    : brandName;

  const activeLocale = locale || defaultLocale || 'en';

  useEffect(() => {
    if (i18n.language !== activeLocale) {
      i18n.changeLanguage(activeLocale);
    }
  }, [i18n, activeLocale]);

  const changeLanguage = (lng: string) => {
    if (router.locale !== lng) {
      void router.push(router.asPath, undefined, { locale: lng });
    }
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  };

  const currentLanguage = activeLocale.split('-')[0];
  const canonicalBase = (canonicalUrl ?? '').replace(/\/$/, '') || 'https://culturalfusionhub.com';
  const pathSuffix = asPath === '/' ? '' : asPath || '';
  const localizedPath =
    locale && defaultLocale && locale !== defaultLocale
      ? `/${locale}${pathSuffix}`
      : pathSuffix;
  const canonicalHref = `${canonicalBase}${localizedPath}`;
  const buildAlternateHref = (lng: string) =>
    `${canonicalBase}${lng === defaultLocale ? '' : `/${lng}`}${pathSuffix}`;

  return (
    <div key={activeLocale} className="page-shell">
      <Head>
        <title>{documentTitle}</title>
        <link rel="canonical" href={canonicalHref} />
        <meta
          name="google-site-verification"
          content="-EhP3-SW3r_T1NAGxrnMTt5IgD-pmHbfg3WDPP1Y2qM"
        />
        {locales?.map((lng) => (
          <link
            key={lng}
            rel="alternate"
            hrefLang={lng}
            href={buildAlternateHref(lng)}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={canonicalBase} />
        <meta name="robots" content="all" />
        <meta name="googlebot" content="all" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="../public/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SocialMetaTags
        title={documentTitle}
        description={description}
        image={image}
        url={canonicalHref}
      />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-full border border-black/10 bg-white/90 p-1 shadow-sm overflow-hidden">
                <Image
                  src="/CFH-logo-vector.png"
                  alt="logo"
                  width={44}
                  height={44}
                  className="rounded-full object-contain"
                />
              </div>
              <div className="leading-tight">
                <span className="text-[11px] uppercase tracking-[0.3em] text-muted">
                  Community
                </span>
                <p className="font-display text-lg text-ink">Cultural Fusion Hub</p>
              </div>
            </Link>
            <Navigation />
            <div className="hidden items-center gap-2 sm:flex">
              {currentLanguage === 'ja' ? (
                <div className="relative group">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="h-10 w-10 rounded-full border border-black/10 bg-white/80 text-lg text-muted shadow-sm transition hover:text-accent"
                    aria-label="Change language to English"
                  >
                    <span className="flag-icon flag-icon-gb"></span>
                  </button>
                  <span className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 w-max -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Change language to English
                  </span>
                </div>
              ) : (
                <div className="relative group">
                  <button
                    onClick={() => changeLanguage('ja')}
                    className="h-10 w-10 rounded-full border border-black/10 bg-white/80 text-lg text-muted shadow-sm transition hover:text-accent"
                    aria-label="言語を日本語に変更"
                  >
                    <span className="flag-icon flag-icon-jp"></span>
                  </button>
                  <span className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 w-max -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    言語を日本語に変更
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="border-t border-black/5 bg-white/70">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full border border-black/10 bg-white/90 p-1 shadow-sm overflow-hidden">
                <Image
                  src="/CFH-logo-vector.png"
                  alt="logo"
                  width={44}
                  height={44}
                  className="rounded-full object-contain"
                />
              </div>
              <div>
                <p className="font-display text-lg text-ink">Cultural Fusion Hub</p>
                <p className="text-sm text-muted">Growing together across cultures.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {currentLanguage === 'ja' ? (
                <button
                  onClick={() => changeLanguage('en')}
                  className="btn-ghost border border-black/10 text-sm"
                >
                  English
                </button>
              ) : (
                <button
                  onClick={() => changeLanguage('ja')}
                  className="btn-ghost border border-black/10 text-sm"
                >
                  日本語
                </button>
              )}
              <a
                href="https://www.instagram.com/culturalfusionhub/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                <i className="fa fa-instagram mr-2"></i>
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
