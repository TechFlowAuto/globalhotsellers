/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // 基础路径配置（如果使用自定义域名则不需要）
  // basePath: process.env.NODE_ENV === 'production' ? '/globalhotsellers' : '',
}

module.exports = nextConfig