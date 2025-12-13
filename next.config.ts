import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/gohf',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
