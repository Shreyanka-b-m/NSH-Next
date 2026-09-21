import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidateProperties'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  // Cached property docs embed media data (url, alt, size), so media edits must bust the cache too.
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
