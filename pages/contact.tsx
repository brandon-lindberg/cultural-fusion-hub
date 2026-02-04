import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';
import { useTranslation } from 'react-i18next';
import StructuredData from '../components/StructuredData';
import { GetStaticProps } from 'next';
import ensureLocale from '../utils/ensureLocale';

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t('contact')}>
      <StructuredData
        type="WebPage"
        data={{
          name: "Contact Cultural Fusion Hub",
          description: "Contact form for Cultural Fusion Hub",
        }}
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-muted">
              {t('contact-tagline')}
            </p>
            <h1 className="font-display text-4xl text-ink">{t('contact')}</h1>
            <p className="text-sm leading-relaxed text-muted">{t('contact-intro')}</p>
            <div className="card-surface rounded-3xl p-6">
              <h2 className="font-display text-2xl text-ink">{t('contact-details')}</h2>
              <div className="mt-4 space-y-3 text-sm text-muted">
                <p>
                  <span className="font-semibold text-ink">{t('email')}:</span>{' '}
                  culturalfusionhub@gmail.com
                </p>
                <p>
                  <span className="font-semibold text-ink">{t('follow-us')}:</span>{' '}
                  Instagram @culturalfusionhub
                </p>
              </div>
            </div>
          </div>
          <div className="card-surface rounded-3xl p-6 md:p-8">
            <h2 className="font-display text-2xl text-ink">{t('contact-form')}</h2>
            <p className="mt-2 text-sm text-muted">{t('contact-form-intro')}</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
  await ensureLocale(locale, defaultLocale);
  return { props: {} };
};
