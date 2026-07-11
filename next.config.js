const path = require('path');

module.exports = {
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias['flag-icon-css'] = path.join(
      __dirname,
      'node_modules/flag-icon-css/css/flag-icon.min.css',
    );

    return config;
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</llms.txt>; rel="describedby"; type="text/plain"',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
          {
            key: 'Content-Signal',
            value: 'ai-train=no, search=yes, ai-input=yes',
          },
        ],
      },
    ];
  },
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
    localeDetection: false,
  },
};
