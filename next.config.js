/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,

  distDir: 'dist',

  images: {
    unoptimized: true,
    domains: [
      'res.cloudinary.com',
      'dev.obensourcing.com',
      'basf.obens.so',
      'images.unsplash.com',
      'cdn.obensourcing.com',
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // time...
  },
};
module.exports = nextConfig;
