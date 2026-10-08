import { Fragment } from 'react'

import { pageMetadata } from '@/lib/pageSeo'
import { getBlogListing } from '@/lib/posts'
import BlogHeroCard from '@/components/blog/BlogHeroCard'
import BlogCard from '@/components/blog/BlogCard'
import ListingsSection from '@/components/home/ListingsSection'
import SectionDivider from '@/components/common/SectionDivider'

// Queries Payload/Postgres; render at request time so the Docker build needs no database.
// The posts come from a shared cache, so a request doesn't hit the database.
export const dynamic = 'force-dynamic'

export const generateMetadata = () => pageMetadata('blog')

export default async function BlogPage() {
  const { latest, sections } = await getBlogListing()

  return (
    <>
      <section className="hero-top-gap container-custom pb-10! max-[768px]:pb-6!">
        <h1 className="section-heading">Blogs</h1>
      </section>

      {/****************** Latest Post ******************/}
      {latest ? (
        <section className="shadow-[0_0_14px_rgba(0,0,0,0.08)]">
          <div className="container-custom py-5! max-[768px]:py-6!">
            <BlogHeroCard post={latest} />
          </div>
        </section>
      ) : (
        <section className="container-custom pt-0!">
          <p>New articles are on their way. Please check back soon.</p>
        </section>
      )}

      {/****************** Posts By Category ******************/}
      {sections.map((section, index) => (
        <Fragment key={section.id}>
          {index > 0 && <SectionDivider />}
          <section className="container-custom py-[60px]! max-[768px]:py-10!">
            <h2 className="section-heading mb-10 text-[36px]! max-[976px]:text-[32px]! max-[768px]:mb-8 max-[768px]:text-[28px]!">
              {section.title}
            </h2>

            <div className="grid grid-cols-1 gap-x-3 gap-y-10 min-[769px]:grid-cols-2 min-[977px]:grid-cols-3">
              {section.posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </Fragment>
      ))}

      {/****************** Properties For You ******************/}
      <ListingsSection
        heading={
          <>
            <span className="text-[var(--color-brown)]">Properties</span> For You
          </>
        }
        showViewAll
        className="white-pattern-bg"
      />
    </>
  )
}
