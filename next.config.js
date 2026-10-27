/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/scheme_finder',
  trailingSlash: true,
}

module.exports = nextConfig
