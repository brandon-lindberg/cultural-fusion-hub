import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
  description = "Cultural Fusion Hubは、ミックスの子供たちやその両親が情報交換やサポートを通じて共に成長するコミュニティです。情報提供やイベント、ワークショップやセミナー、交流会を定期的に行っています。ぜひご参加ください!",
  image = 'https://www.culturalfusionhub.com/CFH-logo-vector.png', // Ensure this is an absolute URL
  canonicalUrl = 'https://culturalfusionhub.com',
}: Props) => {
  const router = useRouter();
  const { asPath, locale, locales, defaultLocale } = router;
  const activeLocale = locale || defaultLocale || 'ja';
  const { i18n } = useTranslation();
  // Sync i18n when locale changes
  useEffect(() => {
    i18n.changeLanguage(activeLocale);
  }, [activeLocale]);
  
  const changeLanguage = (lng: string) => {
    router.push({ pathname: router.pathname, query: router.query }, undefined, { locale: lng });
  };
  
  const currentLanguage = activeLocale;  // use router locale with fallback

  return (
    <div key={activeLocale}>
      <Head>
        <link rel="canonical" href={`${canonicalUrl}${asPath}`} />
        <meta name="google-site-verification" content="-EhP3-SW3r_T1NAGxrnMTt5IgD-pmHbfg3WDPP1Y2qM" />
        {/* Hreflang alternate links for SEO */}
        {Array.isArray(locales) && locales.map((lng) => (
          <link
            key={lng}
            rel="alternate"
            hrefLang={lng}
            href={`${canonicalUrl}/${lng === defaultLocale ? '' : lng}${asPath}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        <meta name="robots" content="all" />
        <meta name="googlebot" content="all" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="../public/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SocialMetaTags title={title} description={description} image={image} url={canonicalUrl || `https://culturalfusionhub.com${asPath}`} />
      <div className="flex flex-col min-h-screen">
        <header className="linear-gradient w-full p-4">
          <div className="flex justify-between items-center">
            <Navigation />
            <div className="flex-1 text-center">
              <span className="font-semibold text-gray-500 text-lg">Cultural Fusion Hub</span>
            </div>
            <div className="hidden sm:flex mr-2">
              {currentLanguage === 'ja' ? (
                <div className="relative group">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="mr-2 text-gray-500 hover:text-green-500 p-2 text-lg"
                  >
                    <span className="flag-icon flag-icon-gb"></span>
                  </button>
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    Change language to English
                  </span>
                </div>
              ) : (
                <div className="relative group">
                  <button
                    onClick={() => changeLanguage('ja')}
                    className="text-gray-500 hover:text-green-500 p-2 text-lg"
                  >
                    <span className="flag-icon flag-icon-jp"></span>
                  </button>
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    言語を日本語に変更
                  </span>
                </div>
              )}
            </div>
            <div className="rounded-full overflow-hidden">
              <Image
                src="/CFH-logo-vector.png"
                alt={'logo'}
                width="50"
                height="50"
              />
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>

        <footer className="w-full flex justify-between items-center p-4 pin-b linear-gradient2">
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden mr-4">
              <Image
                src="/CFH-logo-vector.png"
                alt={'logo'}
                width="50"
                height="50"
              />
            </div>
            <div className="flex">
              {currentLanguage === 'ja' ? (
                <div className="relative group">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="mr-2 text-gray-500 hover:text-green-500 p-2 text-lg"
                  >
                    <span className="flag-icon flag-icon-gb"></span>
                  </button>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    Change language to English
                  </span>
                </div>
              ) : (
                <div className="relative group">
                  <button
                    onClick={() => changeLanguage('ja')}
                    className="text-gray-500 hover:text-green-500 p-2 text-lg"
                  >
                    <span className="flag-icon flag-icon-jp"></span>
                  </button>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    言語を日本語に変更
                  </span>
                </div>
              )}
            </div>
          </div>
          <a
            href="https://www.instagram.com/culturalfusionhub/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-instagram text-zinc-400"> Instagram</i>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
