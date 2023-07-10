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
        <header className="bg-slate-50 w-full p-4 flex justify-between items-center">
          <button onClick={openModal} className="text-xl">
            <i className="fa fa-bars"></i>
          </button>
          <h3 className="text-black pl-1">Cultural Fusion Hub</h3>
        </header>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Menu Modal"
          style={customStyles}
          className="w-36 h-48 bg-white rounded-lg p-4 space-y-4 text-center"
        >
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <button
            onClick={closeModal}
            className="mt-4 bg-buttonColor2 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </Modal>

        <main className="flex-grow">{children}</main>

        <footer className="w-full text-center border-t border-grey p-4 pin-b bg-gray-100">
          <span>Cultural Fusion Hub</span>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
