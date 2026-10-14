import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getAuthorPosts } from '@/lib/posts'
import { getTimeZone } from '@/lib/siteSettings'
import BlogCard from '@/components/blog/BlogCard'
import SectionDivider from '@/components/common/SectionDivider'
import { authorPath } from '@/utilities/authorPath'

type PageProps = {
  params: Promise<{ author: string }>
}

// Like the posts: rendered on first visit, then static until a post or the author's name changes.
export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { author } = await params
  const data = await getAuthorPosts(author)
  if (!data) return {}

  return {
    title: `Blogs by ${data.name}`,
    description: `All articles written by ${data.name} on luxury homes and living in Houston and Texas.`,
    alternates: { canonical: authorPath(data.name) },
  }
}

// /blog/author/<name>: every published post by one author, newest first.
export default async function AuthorPage({ params }: PageProps) {
  const { author } = await params
  const [data, timeZone] = await Promise.all([getAuthorPosts(author), getTimeZone()])

  if (!data) notFound()

  return (
    <>
      <section className="hero-top-gap container-custom pt-[90px]! pb-12! max-[768px]:pt-10! max-[768px]:pb-8!">
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
            <li aria-current="page" className="font-semibold">
              {data.name}
            </li>
          </ol>
        </nav>

        <div className="mt-10 flex items-center gap-5 max-[768px]:mt-8 max-[768px]:gap-4">
          <span
            aria-hidden="true"
            className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d6d6d6] max-[768px]:h-16 max-[768px]:w-16"
          >
            <svg viewBox="0 0 24 24" className="mt-3 h-full w-full" fill="#fff">
              <circle cx="12" cy="8" r="4.5" />
              <path d="M2.5 23c0-5.5 4.3-8.5 9.5-8.5s9.5 3 9.5 8.5z" />
            </svg>
          </span>
          <div>
            <p className="text-[14px]! leading-normal! [font-family:var(--font-heading)] text-[#555]">
              Author name:
            </p>
            <h1 className="text-[40px]! leading-[1.15]! max-[768px]:text-[30px]!">{data.name}</h1>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="container-custom py-[60px]! max-[768px]:py-10!">
        <h2 className="section-heading mb-10 text-[36px]! max-[976px]:text-[32px]! max-[768px]:mb-8 max-[768px]:text-[28px]!">
          More Blogs by {data.name}
        </h2>

        <div className="grid grid-cols-1 gap-x-3 gap-y-10 min-[769px]:grid-cols-2 min-[977px]:grid-cols-3">
          {data.posts.map((post) => (
            <BlogCard key={post.id} post={post} timeZone={timeZone} />
          ))}
        </div>
      </section>
    </>
  )
}
