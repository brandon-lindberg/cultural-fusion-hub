import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';
import StructuredData from '../components/StructuredData';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import ensureLocale from '../utils/ensureLocale';

const AboutPage = () => {
  const { t } = useTranslation();
  const missionItems = [
    {
      title: t('mission-statment-two-head'),
      body: t('mission-statment-two'),
    },
    {
      title: t('mission-statment-three-head'),
      body: t('mission-statment-three'),
    },
    {
      title: t('mission-statment-four-head'),
      body: t('mission-statment-four'),
    },
    {
      title: t('mission-statment-five-head'),
      body: t('mission-statment-five'),
    },
    {
      title: t('mission-statment-six-head'),
      body: t('mission-statment-six'),
    },
    {
      title: t('mission-statment-seven-head'),
      body: t('mission-statment-seven'),
    },
  ];

  return (
    <Layout title={t('about')}>
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
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="/about-banner.jpg"
            alt="Cultural Fusion Hub About Banner"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-3 px-4 py-20 text-white sm:px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">
            {t('about-tagline')}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl">
            {t('CFHmission')}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="card-surface rounded-3xl p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            {t('mission')}
          </p>
          <h2 className="font-display text-3xl text-ink mt-2">
            {t('CFHmission')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {t('mission-statement-one')}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {missionItems.map((item, index) => (
            <div
              key={item.title}
              className="card-surface reveal rounded-3xl p-6"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-xl text-ink">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  await ensureLocale(locale, defaultLocale);
  return { props: {} };
};
