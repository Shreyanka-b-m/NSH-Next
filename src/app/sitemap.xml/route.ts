import { getSitemapProperties } from '@/lib/properties'
import { SERVER_URL } from '@/lib/serverURL'
import { STATIC_PAGES } from '@/lib/staticPages'
import type { Media } from '@/payload-types'

// Built per request so new properties appear straight away (the build has no database).
// Only search engines fetch this, and the property list comes from the shared cache.
export const dynamic = 'force-dynamic'

type Entry = { url: string; lastModified?: string; images: string[] }

const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`)

const absolute = (url: string) => (url.startsWith('http') ? url : `${SERVER_URL}${url}`)

const imageUrl = (image: number | Media | null | undefined) =>
  typeof image === 'object' && image?.url ? absolute(image.url) : undefined

const toXml = (entry: Entry) =>
  [
    '<url>',
    `<loc>${escapeXml(entry.url)}</loc>`,
    entry.lastModified && `<lastmod>${escapeXml(entry.lastModified)}</lastmod>`,
    ...entry.images.map(
      (src) => `<image:image><image:loc>${escapeXml(src)}</image:loc></image:image>`,
    ),
    '</url>',
  ]
    .filter(Boolean)
    .join('')

// /sitemap.xml: every page search engines should find, with property images for Google Images.
// Written by hand (not app/sitemap.ts) to link the stylesheet that makes it readable in a browser.
export async function GET() {
  const properties = await getSitemapProperties()

  const entries: Entry[] = [
    ...Object.values(STATIC_PAGES).map((page) => ({
      url: `${SERVER_URL}${page.path}`,
      images: [],
    })),
    ...properties.map((property) => ({
      url: `${SERVER_URL}/properties/${property.slug}`,
      lastModified: property.updatedAt,
      images: [
        ...new Set(
          [
            imageUrl(property.cardImage),
            ...(property.gallery ?? []).map((item) => imageUrl(item.image)),
          ].filter((src): src is string => Boolean(src)),
        ),
      ],
    })),
  ]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries.map(toXml),
    '</urlset>',
  ].join('\n')

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
