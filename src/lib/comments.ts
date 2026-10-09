import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { COMMENTS_TAG, postCommentsTag } from '@/lib/cacheTags'

// Approved comments and replies of one post, oldest first. Cached per post: approving a comment busts only
// that post's tag (see src/collections/Comments.ts), so other post pages stay cached.
export const getApprovedComments = (postId: number) =>
  unstable_cache(
    async () => {
      const payload = await getPayload({ config })
      const { docs } = await payload.find({
        collection: 'comments',
        where: { and: [{ post: { equals: postId } }, { status: { equals: 'approved' } }] },
        sort: 'createdAt',
        depth: 0,
        limit: 500,
        select: { name: true, comment: true, createdAt: true, parent: true },
      })
      return docs
    },
    ['post-comments', String(postId)],
    { revalidate: 3600, tags: [COMMENTS_TAG, postCommentsTag(postId)] },
  )()
