import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    // Shown in the admin wherever a user is picked or listed, e.g. the blog post Author column.
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  auth: true,
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
        description: 'Shown as the author on blog posts, e.g. "Shreyanka B". Never shows the email.',
      },
    },
  ],
}
