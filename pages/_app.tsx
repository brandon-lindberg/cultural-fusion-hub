import '../styles/globals.scss';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../i18n';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DatePickerOverride.scss';
import '../public/flag-icon-css/css/flag-icons.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  const { locale, defaultLocale } = useRouter();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const register = () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('Service Worker registration successful with scope: ', registration.scope);
          },
          (err) => {
            console.log('Service Worker registration failed: ', err);
          },
        );
      };

      window.addEventListener('load', register);
      return () => window.removeEventListener('load', register);
    }
  }, []);

  useEffect(() => {
    const nextLocale = locale || defaultLocale || 'en';
    if (i18n.language !== nextLocale) {
      i18n.changeLanguage(nextLocale);
    }
  }, [locale, defaultLocale, i18n]);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
