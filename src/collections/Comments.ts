import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeDeleteHook,
  CollectionConfig,
  Payload,
} from 'payload'

import { bustTag } from './hooks/revalidateTag'
import { postCommentsTag } from '../lib/cacheTags'
import { COMMENT_MAX, COMMENT_NAME_MAX } from '../lib/commentLimits'

const postIdOf = (post: unknown) =>
  post && typeof post === 'object' ? (post as { id?: number }).id : (post as number | undefined)

// Only approved comments are on the website, so only changes to/from "approved" refresh it.
// A new (pending) comment doesn't touch the cache at all.
const refreshPost = (postId: number | undefined, payload: Payload) => {
  if (postId) bustTag(postCommentsTag(postId), payload)
}

const afterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (doc.status === 'approved' || previousDoc?.status === 'approved') {
    refreshPost(postIdOf(doc.post), req.payload)
    const previousPost = postIdOf(previousDoc?.post)
    if (previousPost !== postIdOf(doc.post)) refreshPost(previousPost, req.payload)
  }
  return doc
}

// Replies to a deleted comment would lose their place: delete them too (and theirs, in turn).
// Before, not after: deleting the row clears the replies' link to it, so they'd be unfindable.
const deleteReplies: CollectionBeforeDeleteHook = async ({ id, req }) => {
  await req.payload.delete({ collection: 'comments', where: { parent: { equals: id } }, req })
}

const afterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (doc.status === 'approved') refreshPost(postIdOf(doc.post), req.payload)
  return doc
}

// Visitor comments and replies on blog posts. They arrive as "Pending" and appear on the post
// only once someone sets them to "Approved". Sent from the post page via src/lib/submitComment.ts.
export const Comments: CollectionConfig = {
  slug: 'comments',
  labels: { singular: 'Comment', plural: 'Comments' },
  admin: {
    useAsTitle: 'comment',
    group: 'Blog',
    defaultColumns: ['name', 'comment', 'parent', 'post', 'status', 'createdAt'],
    listSearchableFields: ['comment', 'name'],
    description:
      'Comments appear on the post only after their status is set to Approved. Tick several rows to approve them together (Edit → Status).',
    components: {
      beforeListTable: ['@/components/admin/CommentStatusTabs#CommentStatusTabs'],
    },
  },
  defaultSort: '-createdAt',
  access: {
    // Visitors (and the public API) only ever see approved comments. Comments are only ever
    // written by visitors through the website's server action, so nobody creates them here.
    read: ({ req: { user } }) => (user ? true : { status: { equals: 'approved' } }),
    create: () => false,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [afterChange],
    beforeDelete: [deleteReplies],
    afterDelete: [afterDelete],
  },
  fields: [
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      maxLength: COMMENT_MAX,
    },
    {
      name: 'name',
      label: 'Author',
      type: 'text',
      defaultValue: 'Anonymous',
      maxLength: COMMENT_NAME_MAX,
    },
    {
      name: 'post',
      label: 'In response to',
      type: 'relationship',
      relationTo: 'posts',
      required: true,
      index: true,
      admin: {
        // Read-only: the post's title with a "View Post" link instead of a dropdown.
        components: { Field: '@/components/admin/CommentPostField#CommentPostField' },
      },
    },
    {
      name: 'parent',
      label: 'Reply to',
      type: 'relationship',
      relationTo: 'comments',
      index: true,
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data?.parent),
        description: 'This comment is a reply to the comment above.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      index: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Spam', value: 'spam' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Only Approved comments are shown on the post.',
        // Coloured label; also marks pending rows so the list can highlight them (custom.scss).
        components: { Cell: '@/components/admin/CommentStatusCell#CommentStatusCell' },
      },
    },
  ],
}
