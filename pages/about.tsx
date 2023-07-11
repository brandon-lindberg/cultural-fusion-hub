import Layout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <Layout title="About">
      <div>
        <div>
          <img src="/about-banner.jpg" alt="banner" />
        </div>
        <div className="md-p-9">
          <div className="p-5 text-center text-justify md-p-9 bg-gray-50">
            <h1 className="p-3 font-bold">{t('CFHmission')}</h1>
            <article>
              <ul className="p-1">
                <li className="p-3">{t('mission-statement-one')}</li>
              </ul>
            </article>
          </div>
          <div className="p-5 text-center text-justify md-p-9 bg-gray-50">
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
