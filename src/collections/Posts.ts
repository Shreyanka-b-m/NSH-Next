import type { CollectionBeforeDeleteHook, CollectionConfig } from 'payload'
import { slugify } from 'payload/shared'

import { redirectOnSlugChange } from './hooks/redirectOnSlugChange'
import { revalidatePostsAfterChange, revalidatePostsAfterDelete } from './hooks/revalidatePosts'
import { noIndexField } from '../fields/noIndex'
import { readingMinutes } from '../utilities/richText'

// The blog page shows at most this many characters of the excerpt, then "…".
export const EXCERPT_MAX = 300

// A deleted post's comments would point at nothing: remove them too (same transaction).
// Before, not after: deleting the post clears the comments' link to it, so they'd be unfindable.
const deleteComments: CollectionBeforeDeleteHook = async ({ id, req }) => {
  await req.payload.delete({ collection: 'comments', where: { post: { equals: id } }, req })
}

// Blog posts, modelled on the Posts collection of Payload's official website template.
// Drafts: "Save Draft" keeps changes private; only published posts appear on the website.
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
    defaultColumns: ['title', 'author', 'category', 'comments', 'publishedAt', '_status'],
  },
  defaultSort: '-publishedAt',
  versions: {
    drafts: true,
  },
  access: {
    // Visitors (and the public API) only see published posts; logged-in editors see drafts too.
    read: ({ req: { user } }) => (user ? true : { _status: { equals: 'published' } }),
  },
  hooks: {
    afterChange: [revalidatePostsAfterChange, redirectOnSlugChange('posts', '/blog')],
    beforeDelete: [deleteComments],
    afterDelete: [revalidatePostsAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Used on the blog cards and as the picture when the post is shared.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: `Short summary shown when this is the latest post on the blog page. Any length: the page shows the first ${EXCERPT_MAX} characters, then "…". Leave empty to use the start of the post.`,
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },

    // Sidebar
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'The page address: /blog/<slug>. Leave empty to make one from the title. Saved in lowercase with hyphens.',
      },
      hooks: {
        // Clean the slug before validation, so the unique check compares the final URL.
        beforeValidate: [
          ({ value, data }) => {
            const source = typeof value === 'string' && value.trim() ? value : data?.title
            return typeof source === 'string' ? slugify(source) : value
          },
        ],
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      // Whoever creates the post. The website shows the user's Name, never the email.
      defaultValue: ({ user }) => user?.id,
      admin: {
        position: 'sidebar',
        description: 'Filled in with whoever creates the post. Shown on the post as "By <name>".',
      },
      hooks: {
        // Never blank: a save without an author (e.g. via the API) uses the logged-in user.
        beforeValidate: [({ value, req }) => value || req.user?.id || value],
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'The blog page section this post is listed in.',
      },
    },
    {
      name: 'publishedAt',
      label: 'Published Date',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'MM/dd/yyyy' },
        description: 'Shown on the post cards. Filled in automatically when first published.',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) =>
            !value && siblingData._status === 'published' ? new Date().toISOString() : value,
        ],
      },
    },
    {
      name: 'readingTime',
      label: 'Reading Time (minutes)',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Worked out from the post text each time you save.',
      },
      hooks: {
        // A save may not send `content` (e.g. an API update of one field): fall back to the saved text.
        beforeChange: [
          ({ siblingData, originalDoc }) =>
            readingMinutes(siblingData.content ?? originalDoc?.content),
        ],
      },
    },
    noIndexField,
    {
      // List column only (nothing stored): the post's comment count, linking to its comments.
      name: 'comments',
      type: 'ui',
      admin: {
        components: { Cell: '@/components/admin/CommentsCountCell#CommentsCountCell' },
      },
    },
  ],
}
