import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './public/locales/en/translation.json';
import translationJA from './public/locales/ja/translation.json';

// Ensure translation files are objects
const safeTranslationEN = typeof translationEN === 'object' && translationEN !== null ? translationEN : {};
const safeTranslationJA = typeof translationJA === 'object' && translationJA !== null ? translationJA : {};

const resources = {
  en: {
    translation: safeTranslationEN,
  },
  ja: {
    translation: safeTranslationJA,
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
