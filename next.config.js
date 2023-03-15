/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://assets.coingecko.com'],
  },
  experimental: {
    appDir: false,
  },
  env: {
    CRYPTO_API_URL: 'http://0.0.0.0:5001',
  },
};

module.exports = nextConfig;
