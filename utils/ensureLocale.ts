import i18n from '../i18n';

/**
 * Ensure i18next is using the locale that matches the Next.js locale for SSR/SSG.
 * This keeps server-rendered HTML and meta tags in the right language for SEO.
 */
export async function ensureLocale(locale?: string, defaultLocale?: string) {
  const targetLocale = locale || defaultLocale || 'ja';

  if (i18n.language !== targetLocale) {
    await i18n.changeLanguage(targetLocale);
  }

  return targetLocale;
}

export default ensureLocale;
