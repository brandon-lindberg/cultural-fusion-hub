import '../styles/globals.scss';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../i18n';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DatePickerOverride.scss';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope,
            );
          },
          (err) => {
            console.log('Service Worker registration failed: ', err);
          },
        );
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
