import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Remove 'export' to enable API routes on Vercel
  // basePath removed - Vercel handles domain directly
  images: {
    unoptimized: true,
  },
}

export default nextConfig
