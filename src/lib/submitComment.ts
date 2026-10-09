'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { COMMENT_MAX, COMMENT_NAME_MAX } from '@/lib/commentLimits'

export type CommentState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  /** Changes on every successful post, so the "Posted" message replays each time. */
  postedAt?: number
}

const COMMENT_MIN = 2

// Saves a visitor's comment (or reply to an approved comment) as "Pending". It shows on the post only after it's approved in
// Admin → Comments, so nothing on the website changes (or re-renders) here.
export async function submitComment(_prev: CommentState, formData: FormData): Promise<CommentState> {
  // Honeypot: real visitors never see this field, bots tend to fill it. Pretend it worked.
  if (formData.get('website')) return { status: 'success', postedAt: Date.now() }

  const postId = Number(formData.get('postId'))
  const parentRaw = formData.get('parentId')
  const parentId = parentRaw ? Number(parentRaw) : undefined
  const comment = String(formData.get('comment') ?? '').trim()
  const name = String(formData.get('name') ?? '').trim().replace(/\s+/g, ' ')

  if (!Number.isInteger(postId) || postId <= 0)
    return { status: 'error', message: 'This post is not taking comments. Please refresh.' }
  if (parentId !== undefined && (!Number.isInteger(parentId) || parentId <= 0))
    return { status: 'error', message: 'That comment can no longer be replied to.' }
  if (comment.length < COMMENT_MIN) return { status: 'error', message: 'Please write a comment.' }
  if (comment.length > COMMENT_MAX)
    return { status: 'error', message: `Comments can be up to ${COMMENT_MAX} characters.` }
  if (name.length > COMMENT_NAME_MAX)
    return { status: 'error', message: `Names can be up to ${COMMENT_NAME_MAX} characters.` }

  try {
    const payload = await getPayload({ config })

    // Only published posts take comments (also rejects made-up post IDs).
    const { totalDocs } = await payload.count({
      collection: 'posts',
      where: { and: [{ id: { equals: postId } }, { _status: { equals: 'published' } }] },
    })
    if (totalDocs === 0) {
      return { status: 'error', message: 'This post is not taking comments. Please refresh.' }
    }

    // A reply must answer an approved comment on the same post.
    if (parentId !== undefined) {
      const { totalDocs: parentOk } = await payload.count({
        collection: 'comments',
        where: {
          and: [
            { id: { equals: parentId } },
            { post: { equals: postId } },
            { status: { equals: 'approved' } },
          ],
        },
      })
      if (parentOk === 0)
        return { status: 'error', message: 'That comment can no longer be replied to.' }
    }

    // Trusted server write: values are checked above and the status is always "pending",
    // so the admin-only create access on Comments is intentionally bypassed.
    await payload.create({
      collection: 'comments',
      data: {
        post: postId,
        parent: parentId,
        comment,
        name: name || 'Anonymous',
        status: 'pending',
      },
    })
    return { status: 'success', postedAt: Date.now() }
  } catch (error) {
    const payload = await getPayload({ config })
    payload.logger.error({ err: error }, 'Saving a blog comment failed')
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }
}
