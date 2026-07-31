import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dvz5kmwqx/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'image.gramedia.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.gramedia.com',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        pathname: '/**',
      },

      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
