import type { MetadataRoute } from 'next'

import { SERVER_URL } from '@/lib/serverURL'

// /robots.txt: keeps the admin and API out of search results, but still allows uploaded
// images (/api/media/file/...) because pages use them as share and search images.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/media/file/'],
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${SERVER_URL}/sitemap.xml`,
  }
}
