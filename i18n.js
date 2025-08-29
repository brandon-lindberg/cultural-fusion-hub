import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
  // Apply browser language detection only on the client
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'ja',
    detection: { order: ['path', 'navigator'], lookupFromPathIndex: 0 },
    interpolation: { escapeValue: false },
  });
// Note: on server, the detector will noop, fallbackLng used

export default i18n;
