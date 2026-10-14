import { getPostCards } from '@/lib/posts'
import { getTimeZone } from '@/lib/siteSettings'
import BlogCard from './BlogCard'
import ExploreMoreGrid from './ExploreMoreGrid'

// How many cards show before "Show all blogs".
const INITIAL_COUNT = 6

// Under a post: every other published post, newest first, not grouped by category.
export default async function ExploreMore({ currentPostId }: { currentPostId: number }) {
  const [allPosts, timeZone] = await Promise.all([getPostCards(), getTimeZone()])
  const posts = allPosts.filter((post) => post.id !== currentPostId)

  if (posts.length === 0) return null

  const cards = posts.map((post) => <BlogCard key={post.id} post={post} timeZone={timeZone} />)

  return (
    <section
      aria-labelledby="explore-more"
      className="container-custom py-[60px]! max-[768px]:py-10!"
    >
      <h2
        id="explore-more"
        className="section-heading mb-10 text-[36px]! max-[976px]:text-[32px]! max-[768px]:mb-8 max-[768px]:text-[28px]!"
      >
        Explore More
      </h2>

      <ExploreMoreGrid first={cards.slice(0, INITIAL_COUNT)} rest={cards.slice(INITIAL_COUNT)} />
    </section>
  )
}
