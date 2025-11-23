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
  const resolvedLocale = locale || defaultLocale || 'ja';

  // Ensure i18n is on the requested locale before first render (server + client)
  if (i18n.language !== resolvedLocale) {
    i18n.changeLanguage(resolvedLocale);
  }

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

  // Align i18n language on the server before render (for correct SSR content)
  if (typeof window === 'undefined' && i18n.language !== resolvedLocale) {
    void i18n.changeLanguage(resolvedLocale);
  }

  useEffect(() => {
    if (i18n.language !== resolvedLocale) {
      void i18n.changeLanguage(resolvedLocale);
    }
  }, [resolvedLocale, i18n]);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
