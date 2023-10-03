const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['flag-icon-css'] = path.join(
      __dirname,
      'node_modules/flag-icon-css/css/flag-icon.min.css',
    );

    return config;
  },
};
