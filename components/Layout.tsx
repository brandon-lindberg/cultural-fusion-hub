import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="flex flex-col min-h-screen">
      <header className="w-full p-4 flex justify-between items-center">
        <h3 className="text-black pl-1">Cultural Fusion Hub</h3>
        <nav>
          <Link href="/">Home</Link> | <Link href="/about">About</Link>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="w-full text-center border-t border-grey p-4 pin-b bg-gray-100">
        <span >Cultural Fusion Hub</span>
      </footer>
    </div>
  </div>
);

export default Layout;
