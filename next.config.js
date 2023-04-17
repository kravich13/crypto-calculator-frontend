/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://assets.coingecko.com'],
  },
  experimental: {
    appDir: false,
    forceSwcTransforms: true,
  },
  env: {
    CRYPTO_API_URL: process.env.CRYPTO_API_URL,
  },
};

module.exports = nextConfig;
