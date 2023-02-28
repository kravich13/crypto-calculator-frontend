/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://assets.coingecko.com'],
  },
  experimental: {
    appDir: true,
  },

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:5001/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
