import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PROPERTIES_TAG } from '@/lib/cacheTags'

// Publish hooks bust this tag immediately; the TTL is only a safety net.
const cacheOptions = { revalidate: 600, tags: [PROPERTIES_TAG] }

export const getFeaturedProperties = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'properties',
      where: { isFeatured: { equals: true } },
      depth: 1,
      limit: 20,
      select: { name: true, slug: true, bedrooms: true, acArea: true, featuredImage: true },
    })
    return docs
  },
  ['featured-properties'],
  cacheOptions,
)

export const getListedProperties = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'properties',
      where: { isFeatured: { not_equals: true } },
      depth: 1,
      limit: 100,
      select: {
        name: true,
        slug: true,
        status: true,
        address: true,
        bedrooms: true,
        bathrooms: true,
        acArea: true,
        cardImage: true,
      },
    })
    return docs
  },
  ['listed-properties'],
  cacheOptions,
)

export const getPropertyIndex = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'properties',
      depth: 0,
      limit: 100,
      select: { name: true, slug: true },
    })
    return docs
  },
  ['property-index'],
  cacheOptions,
)

// `slug` is part of the cache key automatically (unstable_cache keys on arguments).
export const getPropertyBySlug = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'properties',
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    })
    return docs[0] ?? null
  },
  ['property-by-slug'],
  cacheOptions,
)
