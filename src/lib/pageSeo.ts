import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PAGE_SEO_TAG } from '@/lib/cacheTags'
import { getSiteSettings } from '@/lib/siteSettings'
import { STATIC_PAGES, type StaticPage, type StaticPageKey } from '@/lib/staticPages'
import { DEFAULT_DESCRIPTION, DEFAULT_SITE_NAME } from '@/globals/SiteSettings'
import type { Media } from '@/payload-types'

// Saving a Page SEO entry busts this tag immediately; the TTL is only a safety net.
// `page` is part of the cache key automatically (unstable_cache keys on arguments).
const getCachedPageSeo = unstable_cache(
  async (page: StaticPageKey) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'page-seo',
      where: { page: { equals: page } },
      depth: 1,
      limit: 1,
    })
    return docs[0] ?? null
  },
  ['page-seo'],
  { revalidate: 600, tags: [PAGE_SEO_TAG] },
)

// For /sitemap.xml: the fixed pages ticked "Hide from search engines".
export const getHiddenPageKeys = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'page-seo',
      where: { noIndex: { equals: true } },
      depth: 0,
      limit: 100,
      select: { page: true },
    })
    return docs.map((doc) => doc.page)
  },
  ['page-seo-hidden'],
  { revalidate: 600, tags: [PAGE_SEO_TAG] },
)

// Same as getSiteSettings: the build has no database, so prerendered pages start with defaults.
const getPageSeo = async (page: StaticPageKey) =>
  process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD ? null : getCachedPageSeo(page)

const imageUrl = (image: number | Media | null | undefined) =>
  typeof image === 'object' ? image?.url || undefined : undefined

// Metadata for a fixed page: its Page SEO entry, else its built-in defaults, else Site Settings.
// Open Graph is built in full because Next.js replaces (not merges) the layout's `openGraph`.
export async function pageMetadata(key: StaticPageKey): Promise<Metadata> {
  const page: StaticPage = STATIC_PAGES[key]
  const [seo, settings] = await Promise.all([getPageSeo(key), getSiteSettings()])

  const siteName = settings?.siteName || DEFAULT_SITE_NAME
  const metaTitle = seo?.meta?.title
  const shareTitle =
    metaTitle || (page.title ? `${page.title} | ${siteName}` : settings?.meta?.title || siteName)
  const description =
    seo?.meta?.description || page.description || settings?.meta?.description || DEFAULT_DESCRIPTION
  const image = imageUrl(seo?.meta?.image) || imageUrl(settings?.meta?.image)

  // An SEO-tab title is used exactly as typed (matches the admin preview). The page's own name
  // gets " | <site name>" from the layout template.
  const title = metaTitle ? { absolute: metaTitle } : page.title

  return {
    // No title → leave the key out: even `title: undefined` would replace the layout's default.
    ...(title && { title }),
    description,
    alternates: { canonical: page.path },
    ...(seo?.noIndex && { robots: { index: false, follow: true } }),
    openGraph: {
      siteName,
      title: shareTitle,
      description,
      url: page.path,
      type: 'website',
      images: image ? [image] : undefined,
    },
  }
}
