import React, { useState, ReactNode, cloneElement } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import ModalMenu from './ModalMenu';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Navigation from './navigation/Navigation';

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
  image = '/path-to-default-image.jpg',
  canonicalUrl
}: Props) => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [calendarKey, setCalendarKey] = useState(0);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { t } = useTranslation();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <link rel="canonical" href={canonicalUrl || `https://stupendous-longma-517c11.netlify.app${router.asPath}`} />
        <meta
          name="google-site-verification"
          content="KStqInBSo49y2ngUfeVdBP81kOYD-mq03q1M8SnXyrA"
        />
        <meta name="robots" content="all" />
        <meta name="googlebot" content="all" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Cultural Fusion Hubは、ミックスの子供たちやその両親が情報交換やサポートを通じて共に成長するコミュニティです。情報提供やイベント、ワークショップやセミナー、交流会を定期的に行っています。ぜひご参加ください!"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="../public/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Navigation />
      <div className="flex flex-col min-h-screen">
        <header className="linear-gradient w-full p-4 flex justify-between items-center">
          <div className="space-x-2 flex items-center">
            <button onClick={openModal} className="text-xl text-zinc-400">
              <i className="fa fa-bars"></i>
            </button>
            <h1 className="text-zinc-400">{t('CFH')}</h1>
          </div>
          <div className="rounded-full overflow-hidden">
            <Image
              src="/CFH-logo-vector.png"
              alt={'logo'}
              width="50"
              height="50"
            />
          </div>
        </header>

        <ModalMenu isOpen={modalIsOpen} onRequestClose={closeModal} t={t} />

        <main className="flex-grow">
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { key: calendarKey })
              : child,
          )}
        </main>

        <footer className="w-full flex justify-between items-center p-4 pin-b linear-gradient2">
          <div className="rounded-full overflow-hidden">
            <Image
              src="/CFH-logo-vector.png"
              alt={'logo'}
              width="50"
              height="50"
            />
          </div>
          <a
            href="https://www.instagram.com/culturalfusionhub/"
            target="_blank"
          >
            <i className="fa fa-instagram text-zinc-400"> Instagram</i>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Layout;