import Image from 'next/image'
import Link from 'next/link'

import ChevronsRight from '@/components/common/ChevronsRight'
import type { Post } from '@/payload-types'
import { mediaAlt } from '@/utilities/mediaAlt'
import { formatReadingTime } from '@/utilities/postMeta'

type Props = {
  post: Pick<Post, 'title' | 'slug' | 'excerpt' | 'featuredImage' | 'readingTime'>
}

// The newest post at the top of /blog: image on the left 40%, text on the right.
// The whole card is one link. Text sizes use `!` to beat the global h2/p rules in styles.css.
export default function BlogHeroCard({ post }: Props) {
  const image = typeof post.featuredImage === 'object' ? post.featuredImage : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-center gap-[30px] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-5"
    >
      <div className="relative aspect-[3/2] w-[40%] shrink-0 overflow-hidden max-[768px]:w-full">
        {image?.url && (
          <Image
            src={image.url}
            alt={mediaAlt(image, post.title)}
            fill
            // Above the fold on every screen size: it's the page's main image.
            preload
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-col items-start">
        <p className="text-[15px]! leading-normal! font-medium">Latest</p>
        <p className="mt-1 text-[13px]! leading-normal! text-[#555]">
          {formatReadingTime(post.readingTime)}
        </p>

        <h2 className="mt-3 text-[34px]! leading-[1.2]! max-[976px]:text-[30px]! max-[768px]:text-[26px]!">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="mt-5 text-[14px]! leading-[1.9]! font-light text-[#333] max-[768px]:text-[13px]!">
            {post.excerpt}
          </p>
        )}

        <span className="mt-6 inline-flex items-center gap-2 bg-black px-5 py-2.5 text-[14px] text-white transition-opacity duration-300 group-hover:opacity-80">
          Read More
          <ChevronsRight />
        </span>
      </div>
    </Link>
  )
}
