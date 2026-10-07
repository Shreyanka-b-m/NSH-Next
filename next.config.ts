import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    // Custom 404 for unknown URLs across both root layouts: src/app/global-not-found.tsx
    globalNotFound: true,
  },
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/assets/images/**',
      },
    ],
  },
  // Cloudflare's edge cache doesn't reliably serve byte-range responses for cached static
  // files (confirmed: origin returns correct 206/Content-Range, Cloudflare strips both even
  // on a fresh MISS). WebKit (every browser on iOS, not just Safari) refuses to play <video>
  // at all without working Range support, so the hero video silently never plays on iOS.
  // no-store tells Cloudflare not to cache this path, so it proxies Range requests straight
  // through to origin instead of trying to serve/slice them from its cache.
  async headers() {
    return [
      {
        source: '/assets/videos/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
