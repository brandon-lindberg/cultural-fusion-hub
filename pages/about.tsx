import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';
import StructuredData from '../components/StructuredData';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import ensureLocale from '../utils/ensureLocale';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <Layout title="About">
      <StructuredData
        type="WebPage"
        data={{
          name: 'About Cultural Fusion Hub',
          description: t('CFHmission'),
        }}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'About Cultural Fusion Hub',
          description: t('CFHmission'),
          url: 'https://culturalfusionhub.com/about',
        })}
      </script>
      <div>
        <div className="relative w-full h-[300px]">
          <Image
            src="/about-banner.jpg"
            alt="Cultural Fusion Hub About Banner"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="md-p-9">
          <div className="p-5 text-justify md-p-9 bg-gray-50">
            <h1 className="p-3 font-bold">{t('CFHmission')}</h1>
            <article>
              <ul className="p-1">
                <li className="p-3">{t('mission-statement-one')}</li>
              </ul>
            </article>
          </div>
          <div className="p-5 text-justify md-p-9 bg-gray-50">
            <h1 className="p-2 text-lg font-bold">{t('mission')}</h1>
            <article>
              <ul className="p-2">
                <li className="p-3">
                  <li className="m-2">
                    <strong>{t('mission-statment-two-head')}</strong>
                  </li>
                  {t('mission-statment-two')}
                </li>
                <li className="p-3">
                  <li className="m-2">
                    <strong>{t('mission-statment-three-head')}</strong>
                  </li>
                  {t('mission-statment-three')}
                </li>
                <li className="p-3">
                  <li className="m-2">
                    <strong>{t('mission-statment-four-head')}</strong>
                  </li>
                  {t('mission-statment-four')}
                </li>
                <li className="p-3">
                  <li className="m-2">
                    <strong>{t('mission-statment-five-head')}</strong>
                  </li>
                  {t('mission-statment-five')}
                </li>
                <li className="p-3">
                  <li className="m-2">
                    <strong>{t('mission-statment-six-head')}</strong>
                  </li>
                  {t('mission-statment-six')}
                </li>
                <li className="p-3">
                  <li className="m-2">
                    <strong>{t('mission-statment-seven-head')}</strong>
                  </li>
                  {t('mission-statment-seven')}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  await ensureLocale(locale, defaultLocale);
  return { props: {} };
};
