import React, { useState, ReactNode, cloneElement } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import ModalMenu from './ModalMenu';
import Image from 'next/image';

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  image?: string;
};

const Layout = ({ children, title = 'Cultural Fusion Hub' }: Props) => {
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
        <meta
          name="google-site-verification"
          content="KStqInBSo49y2ngUfeVdBP81kOYD-mq03q1M8SnXyrA"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta
          name="description"
          content="Cultural Fusion Hubは、ミックスの子供たちやその両親が情報交換やサポートを通じて共に成長するコミュニティです。情報提供やイベント、ワークショップやセミナー、交流会を定期的に行っています。ぜひご参加ください!"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={process.env.BASE_URL} />
        <meta name="twitter:title" content={title} />
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
      <div className="flex flex-col min-h-screen">
        <header className="linear-gradient w-full p-4 flex justify-between items-center">
          <button onClick={openModal} className="text-xl text-zinc-400">
            <i className="fa fa-bars"></i>
          </button>
          <div className="rounded-full overflow-hidden">
            <Image src="/CFH-logo-vector.png" alt={''} width="50" height="50" />
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

        <footer className="w-full flex justify-between items-center border-t border-grey p-4 pin-b linear-gradient2">
          <div className="rounded-full overflow-hidden">
            <Image src="/CFH-logo-vector.png" alt={''} width="50" height="50" />
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
