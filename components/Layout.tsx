import React, { useState, ReactNode, cloneElement } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  image?: string;
};

Modal.setAppElement('#__next'); // Important for accessibility

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [calendarKey, setCalendarKey] = useState(0);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCalendarKey((prevKey) => prevKey + 1);
  };

  const customStyles = {
    content: {
      top: '10px',
      left: 'auto',
      right: '10px',
      bottom: 'auto',
    },
  };

  const { t, i18n } = useTranslation();

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="linear-gradient w-full p-4 flex justify-between items-center">
          <button onClick={openModal} className="text-xl text-zinc-400">
            <i className="fa fa-bars"></i>
          </button>
          <h3 className="text-zinc-400 pl-1">{t('CFH')}</h3>
        </header>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Menu Modal"
          style={customStyles}
          className="w-40 h-auto bg-white rounded-lg p-4 space-y-4 text-center"
        >
          <nav>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link href="/">{t('home')}</Link>
              </li>
              <li>
                <Link href="/about">{t('about')}</Link>
              </li>
              <li>
                <Link href="/profile">{t('profile')}</Link>
              </li>
              <li>
                <Link href="/contact">{t('contact')}</Link>
              </li>
            </ul>
            <div className="flex justify-evenly mt-4">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className="focus:outline-none mr-2 bg-subGreen text-zinc-400 px-1 py-1 rounded"
              >
                ENG
              </button>
              <button
                onClick={() => i18n.changeLanguage('ja')}
                className="focus:outline-none ml-2 bg-subGreen text-zinc-400 px-1 py-1 rounded"
              >
                日本語
              </button>
            </div>
          </nav>
          <button
            onClick={closeModal}
            className="mt-4 bg-buttonColor2 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </Modal>

        <main className="flex-grow">
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { key: calendarKey })
              : child,
          )}
        </main>

        <footer className="w-full flex justify-between items-center border-t border-grey p-4 pin-b linear-gradient2">
          <span className="text-zinc-400">{t('CFH')}</span>
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
