import Image from 'next/image'
import Link from 'next/link'

import ChevronsRight from '@/components/common/ChevronsRight'
import type { Post } from '@/payload-types'
import { mediaAlt } from '@/utilities/mediaAlt'
import { formatPostDate, formatReadingTime } from '@/utilities/postMeta'

type Props = {
  post: Pick<Post, 'title' | 'slug' | 'featuredImage' | 'publishedAt' | 'readingTime'>
}

// A post in a category section on /blog: image, title, then "Read More" and date / reading time.
// The whole card is one link. h3 uses `!` to beat the global heading rules in styles.css.
export default function BlogCard({ post }: Props) {
  const image = typeof post.featuredImage === 'object' ? post.featuredImage : null

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col">
      <div className="relative aspect-[16/7] overflow-hidden min-[977px]:aspect-[7/2]">
        {image?.url && (
          <Image
            src={image.url}
            alt={mediaAlt(image, post.title)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 976px) 50vw, 440px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <h3 className="mt-4 text-[15px]! leading-[1.5]! font-medium [font-family:var(--font-body)]!">
        {post.title}
      </h3>

      <div className="mt-3 flex items-end justify-between gap-4">
        <span className="inline-flex items-center gap-1.5 text-[13px] transition-colors duration-300 group-hover:text-[var(--color-brown)]">
          Read More
          <ChevronsRight className="h-2.5 w-3.5" />
        </span>

        <div className="flex flex-col items-end text-[12px] leading-[1.6] text-[#888]">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          )}
          <span>{formatReadingTime(post.readingTime)}</span>
        </div>
      </div>
    </Link>
  )
}
