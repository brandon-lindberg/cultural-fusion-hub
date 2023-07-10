import React, { useState, ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Modal from 'react-modal';

type Props = {
  children?: ReactNode;
  title?: string;
};

Modal.setAppElement('#__next'); // Important for accessibility

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: '10px',
      left: 'auto',
      right: '10px',
      bottom: 'auto',
    },
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="linear-gradient w-full p-4 flex justify-between items-center">
          <button onClick={openModal} className="text-xl text-zinc-400">
            <i className="fa fa-bars"></i>
          </button>
          <h3 className="text-zinc-400 pl-1">Cultural Fusion Hub</h3>
        </header>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Menu Modal"
          style={customStyles}
          className="w-36 h-48 bg-white rounded-lg p-4 space-y-4 text-center"
        >
          <nav>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <Link href="/">ホーム</Link>
              </li>
              <li>
                <Link href="/about">アバウト</Link>
              </li>
              <li>
                <Link href="/contact">コンタクト</Link>
              </li>
            </ul>
          </nav>
          <button
            onClick={closeModal}
            className="mt-4 bg-buttonColor2 text-white px-4 py-2 rounded"
          >
            クローズ
          </button>
        </Modal>

        <main className="flex-grow">{children}</main>

        <footer className="w-full flex justify-between items-center border-t border-grey p-4 pin-b linear-gradient2">
          <span className="text-zinc-400">Cultural Fusion Hub</span>
          <a
            href="https://www.instagram.com/culturalfusionhub/"
            target="_blank"
          >
            <i className="fa fa-instagram text-mainGreen"></i>
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
