import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Remove 'export' to enable API routes on Vercel
  // basePath removed - Vercel handles domain directly
  images: {
    unoptimized: true,
  },
  // Enable static export for Capacitor mobile builds
  ...(process.env.CAPACITOR_BUILD && {
    output: 'export',
    distDir: 'out',
  }),
}

export default nextConfig
