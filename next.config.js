/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,    
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.vans.com',
      },
    ],
  }
}

module.exports = nextConfig
