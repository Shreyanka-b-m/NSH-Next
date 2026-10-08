import type { CollectionConfig } from 'payload'
import { slugify } from 'payload/shared'

import { revalidatePostsAfterChange, revalidatePostsAfterDelete } from './hooks/revalidatePosts'
import { readingMinutes } from '../utilities/richText'

export const EXCERPT_MAX = 300

// Blog posts, modelled on the Posts collection of Payload's official website template.
// Drafts: "Save Draft" keeps changes private; only published posts appear on the website.
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
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
    afterChange: [revalidatePostsAfterChange],
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
        description: 'Used on the blog cards and at the top of the post.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: EXCERPT_MAX,
      admin: {
        description: `Short summary shown when this is the latest post on the blog page (up to ${EXCERPT_MAX} characters). Leave empty to use the start of the post.`,
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
  ],
}
