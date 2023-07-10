import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Image from 'next/image';
import Calendar from '../components/Calendar';
import ImageCarousel from '../components/Carousel';
import { useTranslation } from 'react-i18next';

const IndexPage = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url === '/') {
        window.location.reload();
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup function
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <Layout title="Cultural Fusion Hub">
      <header>
        <div
          style={{ maxHeight: '600px', overflow: 'hidden' }}
          className="relative w-full"
        >
          <ImageCarousel />
          <div className="absolute bottom-1/4 right-1/2 transform translate-x-1/2">
            {/* <h1 className="text-white text-4xl">Welcome to The Cultural Fusion Hub</h1> */}
          </div>
        </div>
      </header>
      <main className="height-30vh">
        <div className="p-4">
          <article className=" p-5 text-justify text-zinc-400">
          {t('greeting')}
          </article>
        </div>
      </main>
      <div className="p-3">
        <div className="p-3">
          <Calendar />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
