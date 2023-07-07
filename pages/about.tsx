import Link from 'next/link';
import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <div>
      <div className="profile m-3">
        <ProfileCard
          name="Obikane Yuka"
          image="/profile_one.jpg"
          position="Founder"
          description="I am Yuka and this is my description"
          instagram="https://www.instagram.com/"
          twitter="https://twitter.com/"
          linkedin="https://www.linkedin.com/"
          facebook="https://www.facebook.com/"
        />
      </div>
      <div className="profile m-3">
        <ProfileCard
          name="Saho Petersen"
          image="/profile_two.jpg"
          position="Founder"
          description="I am Saho and this is my description"
          instagram="https://www.instagram.com/"
          twitter="https://twitter.com/"
          linkedin="https://www.linkedin.com/"
          facebook="https://www.facebook.com/"
        />
      </div>
    </div>
    <br />
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
);

export default AboutPage;
