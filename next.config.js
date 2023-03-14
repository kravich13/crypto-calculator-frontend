/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://assets.coingecko.com'],
  },
  experimental: {
    appDir: false,
  },

  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: 'http://localhost:5001/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig;
