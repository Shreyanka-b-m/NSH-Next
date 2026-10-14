import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

import { POSTS_TAG } from '../lib/cacheTags'
import { bustTag } from './hooks/revalidateTag'

// The Name is shown on blog posts and makes the author page address (/blog/author/<name>),
// so renaming someone refreshes the blog. Other saves (e.g. password changes) don't.
const revalidateBlogOnRename: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (doc.name !== previousDoc?.name) bustTag(POSTS_TAG, req.payload)
  return doc
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    // Shown in the admin wherever a user is picked or listed, e.g. the blog post Author column.
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  auth: true,
  hooks: {
    afterChange: [revalidateBlogOnRename],
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
      // Checked in the admin form only (no database rule), so older accounts without a name
      // can still log in; they're asked for one the next time they're saved.
      validate: (value: string | null | undefined) =>
        value?.trim() ? true : 'Please enter a name. It is shown as the author on blog posts.',
      admin: {
        description:
          'Shown as the author on blog posts, e.g. "Shreyanka B", and makes their author page address (/blog/author/shreyanka-b). Never shows the email.',
      },
    },
  ],
}
