import type { CollectionConfig } from 'payload'

import { revalidatePostsAfterChange, revalidatePostsAfterDelete } from './hooks/revalidatePosts'

// Blog categories. Each one with published posts becomes a section on /blog, in this order.
export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Blog Category', plural: 'Blog Categories' },
  // Adds drag-and-drop sorting to the list view; /blog shows the sections in that order.
  orderable: true,
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
    description:
      'Each category is a section on the blog page. Drag the rows to change the order of the sections.',
  },
  access: {
    read: () => true,
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
      unique: true,
      admin: {
        description: 'Shown as the section heading, e.g. "Neighborhood & Lifestyle".',
      },
    },
  ],
}
