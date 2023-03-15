/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://assets.coingecko.com'],
  },
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
