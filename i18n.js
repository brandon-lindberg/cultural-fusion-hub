import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './public/locales/en/translation.json';
import translationJA from './public/locales/ja/translation.json';

const safeTranslationEN =
  translationEN && typeof translationEN === 'object' ? translationEN : {};
const safeTranslationJA =
  translationJA && typeof translationJA === 'object' ? translationJA : {};

const resources = {
  en: {
    translation: safeTranslationEN,
  },
  ja: {
    translation: safeTranslationJA,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ja',
  fallbackLng: ['ja', 'en'],
  supportedLngs: ['en', 'ja'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
