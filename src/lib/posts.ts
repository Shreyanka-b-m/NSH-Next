import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { POSTS_TAG } from '@/lib/cacheTags'
import { EXCERPT_MAX } from '@/collections/Posts'
import { truncateWords } from '@/utilities/fitWords'
import { richTextToPlain } from '@/utilities/richText'

// Publish hooks bust this tag immediately; the TTL is only a safety net.
const cacheOptions = { revalidate: 600, tags: [POSTS_TAG] }

const published = { _status: { equals: 'published' } } as const

// Everything /blog shows: the newest post on its own, then the other posts grouped by
// category (in the admin's drag-and-drop order). Categories without posts are left out.
export const getBlogListing = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const [{ docs: posts }, { docs: categories }] = await Promise.all([
      payload.find({
        collection: 'posts',
        where: published,
        sort: '-publishedAt',
        depth: 1,
        // The section grouping only needs each post's category id; keep the populated copy small.
        populate: { categories: { title: true } },
        pagination: false,
        select: {
          title: true,
          slug: true,
          excerpt: true,
          featuredImage: true,
          publishedAt: true,
          readingTime: true,
          category: true,
        },
      }),
      payload.find({
        collection: 'categories',
        sort: '_order',
        depth: 0,
        pagination: false,
        select: { title: true },
      }),
    ])

    const [latest, ...rest] = posts

    // No excerpt typed in? Use the start of the post (only fetched for this one post).
    let latestExcerpt = latest?.excerpt
    if (latest && !latestExcerpt) {
      const { content } = await payload.findByID({
        collection: 'posts',
        id: latest.id,
        depth: 0,
        select: { content: true },
      })
      latestExcerpt = richTextToPlain(content)
    }

    const categoryId = (post: (typeof posts)[number]) =>
      typeof post.category === 'object' ? post.category?.id : post.category

    return {
      latest: latest ? { ...latest, excerpt: truncateWords(latestExcerpt ?? '', EXCERPT_MAX) } : null,
      sections: categories
        .map((category) => ({
          id: category.id,
          title: category.title,
          posts: rest.filter((post) => categoryId(post) === category.id),
        }))
        .filter((section) => section.posts.length > 0),
    }
  },
  ['blog-listing'],
  cacheOptions,
)

// One published post for /blog/<slug>. Depth 1 fills in the featured image, the images and
// links inside the content, and the author, of whom only the name is kept (never the email).
// `slug` is part of the cache key automatically (unstable_cache keys on arguments).
export const getPostBySlug = unstable_cache(
  async (slug: string) => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { and: [published, { slug: { equals: slug } }] },
      depth: 1,
      limit: 1,
      populate: { users: { name: true }, categories: { title: true } },
    })
    return docs[0] ?? null
  },
  ['post-by-slug'],
  cacheOptions,
)

// For /sitemap.xml: each published post's address, last change and featured image,
// except those ticked "Hide from search engines".
export const getSitemapPosts = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { and: [published, { noIndex: { not_equals: true } }] },
      depth: 1,
      pagination: false,
      select: { slug: true, updatedAt: true, featuredImage: true },
    })
    return docs
  },
  ['sitemap-posts'],
  cacheOptions,
)
