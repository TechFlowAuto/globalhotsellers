/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // GitHub Pages需要basePath
  basePath: '/globalhotsellers',
}

module.exports = nextConfig