import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';
import { useTranslation } from 'react-i18next';
import StructuredData from '../components/StructuredData';
import { GetStaticProps } from 'next';
import ensureLocale from '../utils/ensureLocale';

const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <Layout title="Profile">
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
      <div className="md:flex md:justify-center md:items-center md:h-screen">
        <div className="profile m-3">
          <ProfileCard
            name="Obikane Yuka"
            image="/profile_one.jpg"
            position={<strong>ファシリテーター</strong>}
            description={t('yuka-description')}
            instagram="https://www.instagram.com/culturalfusionhub/"
            // twitter="https://twitter.com/"
            // linkedin="https://www.linkedin.com/"
            // facebook="https://www.facebook.com/"
          />
        </div>
        <div className="profile m-3">
          <ProfileCard
            name="Saho Petersen"
            image="/profile_three.jpg"
            position={<strong>ファシリテーター</strong>}
            description={t('saho-description')}
            instagram="https://www.instagram.com/culturalfusionhub/"
            // twitter="https://twitter.com/"
            // linkedin="https://www.linkedin.com/"
            // facebook="https://www.facebook.com/"
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  await ensureLocale(locale, defaultLocale);
  return { props: {} };
};
