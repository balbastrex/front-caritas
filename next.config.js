const { version } = require('./package.json');
/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  publicRuntimeConfig: {
    version,
  }
};

module.exports = config;
