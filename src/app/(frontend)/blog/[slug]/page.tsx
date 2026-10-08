import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPostBySlug } from '@/lib/posts'
import { redirectIfListed } from '@/lib/redirects'
import { postStructuredData } from '@/lib/structuredData'
import { SERVER_URL } from '@/lib/serverURL'
import { JsonLd } from '@/components/seo/JsonLd'
import BlogContent from '@/components/blog/BlogContent'
import ShareSection from '@/components/blog/ShareSection'
import { formatLongDate, formatReadingTime } from '@/utilities/postMeta'
import { richTextToPlain } from '@/utilities/richText'
import { fitWords, truncateWords } from '@/utilities/fitWords'

type PageProps = {
  params: Promise<{ slug: string }>
}

// No posts are built during `next build` (it has no database). Each post is rendered on its
// first visit, then served as a static page until the post (or an image in it) is saved again.
export async function generateStaticParams() {
  return []
}

// The author's display name; the email is never fetched.
const authorName = (author: unknown) =>
  (author && typeof author === 'object' && 'name' in author && typeof author.name === 'string'
    ? author.name.trim()
    : '') || undefined

// Uses the SEO tab values from the admin, falling back to the post's own content.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return {}

  const title = post.meta?.title || post.title
  const description =
    post.meta?.description || fitWords(post.excerpt || richTextToPlain(post.content), 160)
  const image =
    (typeof post.meta?.image === 'object' && post.meta.image?.url) ||
    (typeof post.featuredImage === 'object' && post.featuredImage?.url) ||
    undefined

  return {
    // The SEO tab title is used exactly as typed; the post title gets " | <site name>".
    title: post.meta?.title ? { absolute: post.meta.title } : post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    ...(post.noIndex && { robots: { index: false, follow: true } }),
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      images: image ? [image] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    // An old or renamed post address may be listed in Admin → Redirects.
    await redirectIfListed(`/blog/${slug}`)
    notFound()
  }

  const author = authorName(post.author)
  const url = `${SERVER_URL}/blog/${post.slug}`

  return (
    <>
      <JsonLd data={postStructuredData(post, author)} />

      <article className="hero-top-gap container-custom pt-[90px]! max-[768px]:pt-10!">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[15px] max-[768px]:text-[13px]">
          <ol className="flex flex-wrap items-center gap-x-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-[var(--color-brown)]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">»</li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-[var(--color-brown)]">
                Blogs
              </Link>
            </li>
            <li aria-hidden="true">»</li>
            <li aria-current="page" className="font-semibold" title={post.title}>
              {truncateWords(post.title, 20)}
            </li>
          </ol>
        </nav>

        <header className="mt-8 max-[768px]:mt-6">
          <h1 className="text-[46px]! leading-[1.15]! max-[976px]:text-[40px]! max-[768px]:text-[32px]!">
            {post.title}
          </h1>

          <p className="mt-4 text-[14px]! leading-normal! font-medium max-[768px]:text-[13px]!">
            By {author ?? 'Novel Signature Homes'}
            {post.publishedAt && (
              <>
                <span className="mx-2">/</span>
                <time dateTime={post.publishedAt}>{formatLongDate(post.publishedAt)}</time>
              </>
            )}
            <span className="mx-2">/</span>
            {formatReadingTime(post.readingTime)}
          </p>
        </header>

        <div className="mt-10 max-[768px]:mt-8">
          <BlogContent data={post.content} />
        </div>

        <footer className="mt-14 max-[768px]:mt-10">
          <ShareSection url={url} title={post.title} />
        </footer>
      </article>
    </>
  )
}
