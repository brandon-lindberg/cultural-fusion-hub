const path = require('path');

module.exports = {
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
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
};
