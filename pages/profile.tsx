import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';
import { useTranslation } from 'react-i18next';
import StructuredData from '../components/StructuredData';
import { GetStaticProps } from 'next';
import ensureLocale from '../utils/ensureLocale';

const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <Layout title={t('profile')}>
      <StructuredData
        type="WebPage"
        data={{
          name: "Cultural Fusion Hub Profiles",
          description: "Profiles of Cultural Fusion Hub facilitators",
        }}
      />
      {/* JSON-LD for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Cultural Fusion Hub Profiles",
          "description": "Profiles of Cultural Fusion Hub facilitators",
          "url": "https://culturalfusionhub.com/profile",
          "mainEntity": [
            {
              "@type": "Person",
              "name": "Obikane Yuka",
              "image": "https://culturalfusionhub.com/profile_one.jpg",
              "jobTitle": "ファシリテーター",
              "sameAs": "https://www.instagram.com/culturalfusionhub/"
            },
            {
              "@type": "Person",
              "name": "Saho Petersen",
              "image": "https://culturalfusionhub.com/profile_three.jpg",
              "jobTitle": "ファシリテーター",
              "sameAs": "https://www.instagram.com/culturalfusionhub/"
            }
          ]
        })}
      </script>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">
            {t('profile-tagline')}
          </p>
          <h1 className="font-display text-4xl text-ink mt-3">{t('profile')}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {t('profile-intro')}
          </p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <ProfileCard
            name="Obikane Yuka"
            image="/profile_one.jpg"
            position={<strong>ファシリテーター</strong>}
            description={t('yuka-description')}
            instagram="https://www.instagram.com/culturalfusionhub/"
          />
          <ProfileCard
            name="Saho Petersen"
            image="/profile_three.jpg"
            position={<strong>ファシリテーター</strong>}
            description={t('saho-description')}
            instagram="https://www.instagram.com/culturalfusionhub/"
          />
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  await ensureLocale(locale, defaultLocale);
  return { props: {} };
};
