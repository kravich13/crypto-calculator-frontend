const path = require('path');
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  profiler: true,
  images: {
    domains: ['https://assets.coingecko.com'],
  },
  experimental: {
    appDir: false,
    forceSwcTransforms: true,
  },
  env: {
    CRYPTO_API_URL: process.env.CRYPTO_API_URL,
    FILLED_SLICES: process.env.FILLED_SLICES,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n,
};

module.exports = nextConfig;
