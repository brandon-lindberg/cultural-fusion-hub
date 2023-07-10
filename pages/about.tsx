import Link from 'next/link';
import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';

const AboutPage = () => (
  <Layout title="About">
    <div>
      <div className="profile m-3">
        <ProfileCard
          name="Obikane Yuka"
          image="/profile_one.jpg"
          position="Founder"
          description="I am Yuka and this is my description"
          instagram="https://www.instagram.com/culturalfusionhub/"
          // twitter="https://twitter.com/"
          // linkedin="https://www.linkedin.com/"
          // facebook="https://www.facebook.com/"
        />
      </div>
      <div className="profile m-3">
        <ProfileCard
          name="Saho Petersen"
          image="/profile_two.jpg"
          position="Founder"
          description="I am Saho and this is my description"
          instagram="https://www.instagram.com/culturalfusionhub/"
          // twitter="https://twitter.com/"
          // linkedin="https://www.linkedin.com/"
          // facebook="https://www.facebook.com/"
        />
      </div>
    </div>
    <br />
  </Layout>
);

export default AboutPage;
