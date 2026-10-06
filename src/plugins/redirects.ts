import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import type { Field } from 'payload'

import { revalidateTagHooks } from '../collections/hooks/revalidateTag'
import { REDIRECTS_TAG } from '../lib/cacheTags'
import { normalizePath } from '../utilities/normalizePath'

const redirectsRevalidate = revalidateTagHooks(REDIRECTS_TAG)

// "From" accepts a full old URL or a path and is saved as a clean path, e.g. "/gallery".
const cleanFromField = (field: Field): Field =>
  field.type === 'text' && field.name === 'from'
    ? {
        ...field,
        admin: {
          description:
            'The old address. Paste a full URL or a path, e.g. https://novelsignaturehomes.com/gallery/ is saved as /gallery.',
        },
        hooks: {
          beforeValidate: [
            ({ value }) =>
              typeof value === 'string' && value.trim() ? normalizePath(value) : value,
          ],
        },
      }
    : field

// Admin → Redirects: send visitors and search engines from old addresses to new ones.
// The website checks this list only when a page would otherwise be "not found"
// (src/lib/redirects.ts), so normal pages never pay for it.
export const redirects = redirectsPlugin({
  collections: ['properties'],
  redirectTypes: ['301', '302'],
  redirectTypeFieldOverride: {
    defaultValue: '301',
    admin: {
      description:
        'Use 301 (permanent) when the old address is gone for good; Google moves its ranking to the new page.',
    },
  },
  overrides: {
    admin: {
      defaultColumns: ['from', 'to.type', 'type', 'updatedAt'],
      description:
        'Old addresses that should open another page. Renaming a property slug adds one here automatically.',
    },
    fields: ({ defaultFields }) => defaultFields.map(cleanFromField),
    hooks: {
      afterChange: [redirectsRevalidate.afterChange],
      afterDelete: [redirectsRevalidate.afterDelete],
    },
  },
})
