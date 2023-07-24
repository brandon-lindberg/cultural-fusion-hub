import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import '../i18n';
import 'react-datepicker/dist/react-datepicker.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
