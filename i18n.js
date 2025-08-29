import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './public/locales/en/translation.json';
import translationJA from './public/locales/ja/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ja: {
    translation: translationJA,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ja',
    interpolation: { escapeValue: false },
  });
// Note: on server, the detector will noop, fallbackLng used

export default i18n;
