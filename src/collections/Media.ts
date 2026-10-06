import type { CollectionConfig } from 'payload'

import { preventDeletingUsedUploads } from './hooks/preventDeletingUsedUploads'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidateProperties'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  // Cached property docs embed media data (url, alt, size), so media edits must bust the cache too.
  hooks: {
    afterChange: [revalidateAfterChange],
    beforeDelete: [preventDeletingUsedUploads],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Describe what the image shows, for Google and screen readers, e.g. "Open-plan kitchen with marble island and pendant lights". Avoid "image" or file names.',
      },
    },
  ],
  upload: true,
}
