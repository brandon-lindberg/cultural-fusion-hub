const nextConfig = require('./next.config');

const i18n = nextConfig?.i18n || {};
const locales = i18n.locales || ['ja', 'en'];
const defaultLocale = i18n.defaultLocale || 'ja';

module.exports = {
  siteUrl: 'https://culturalfusionhub.com',
  changefreq: 'daily',
  priority: 0.7,
  generateRobotsTxt: false,
  exclude: ['/api/*', '/users', '/users/*'],
  transform: async (config, path) => {
    const debug = process.env.SITEMAP_DEBUG === 'true';
    const baseUrl = config.siteUrl.replace(/\/$/, '');
    const segments = path.split('/').filter(Boolean);
    const pathLocale = segments.length > 0 && locales.includes(segments[0]) ? segments[0] : defaultLocale;
    const pathWithoutLocale =
      pathLocale === defaultLocale ? path : `/${segments.slice(1).join('/') || ''}`;
    const pathSuffix = pathWithoutLocale === '/' ? '' : pathWithoutLocale;

    const alternateRefs = [
      ...locales.map((lng) => ({
        href: `${baseUrl}${lng === defaultLocale ? '' : `/${lng}`}${pathSuffix}`,
        hreflang: lng,
      })),
      { href: `${baseUrl}${pathSuffix}`, hreflang: 'x-default' },
    ];

    if (debug) {
      console.log('sitemap: path', path, { pathLocale, pathSuffix, alternateRefs });
    }

    return {
      loc: `${baseUrl}${path}`,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs,
    };
  },
};
