import Link from 'next/link';
import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';
import { t } from 'i18next';

const ProfilePage = () => (
  <Layout title="Profile">
    <div className="md:flex md:justify-center md:items-center md:h-screen">
      <div className="profile m-3">
        <ProfileCard
          name="Obikane Yuka"
          image="/profile_one.jpg"
          position="Founder"
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
          position="Founder"
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

export default ProfilePage;
