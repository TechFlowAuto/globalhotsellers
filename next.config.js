/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // 对于自定义域名，不使用basePath
  // basePath: '/globalhotsellers',
}

module.exports = nextConfig