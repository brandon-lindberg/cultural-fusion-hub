import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';
import { useTranslation } from 'react-i18next';
import StructuredData from '../components/StructuredData';
import { GetStaticProps } from 'next';
import ensureLocale from '../utils/ensureLocale';

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title="Contact">
      <StructuredData
        type="WebPage"
        data={{
          name: "Contact Cultural Fusion Hub",
          description: "Contact form for Cultural Fusion Hub",
        }}
      />
      <div className="p-5 pb-0">
        <h1 className="text-center">{t('contact-form')}</h1>
        <div className="flex items-center justify-center p-5">
          <ContactForm />
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  await ensureLocale(locale, defaultLocale);
  return { props: {} };
};
