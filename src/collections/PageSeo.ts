import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
} from 'payload'

import { bustPath, revalidateTagHooks } from './hooks/revalidateTag'
import { noIndexField } from '../fields/noIndex'
import { PAGE_SEO_TAG } from '../lib/cacheTags'
import { STATIC_PAGES, getStaticPage } from '../lib/staticPages'

const tagHooks = revalidateTagHooks(PAGE_SEO_TAG)

// Refresh the page itself too: prerendered pages are built without a database, so they
// never fetched the tagged data. Also the old page if the entry was moved to another one.
const afterChange: CollectionAfterChangeHook = (args) => {
  const { doc, previousDoc, req } = args
  for (const key of new Set([doc.page, previousDoc?.page])) {
    const page = getStaticPage(key)
    if (page) bustPath(page.path, req.payload)
  }
  return tagHooks.afterChange(args)
}

const afterDelete: CollectionAfterDeleteHook = (args) => {
  const page = getStaticPage(args.doc.page)
  if (page) bustPath(page.path, args.req.payload)
  return tagHooks.afterDelete(args)
}

// SEO (Google title, description, share image) for the fixed website pages. The SEO plugin
// adds the SEO tab (see src/plugins/seo.ts). Pages without an entry use their built-in defaults
// from src/lib/staticPages.ts.
export const PageSeo: CollectionConfig = {
  slug: 'page-seo',
  labels: { singular: 'Page SEO', plural: 'Page SEO' },
  admin: {
    useAsTitle: 'page',
    defaultColumns: ['page', 'updatedAt'],
    description:
      'Overrides the Site Settings defaults for one page. A page without an entry here uses its built-in defaults.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  },
  fields: [
    {
      name: 'page',
      type: 'select',
      required: true,
      unique: true,
      options: Object.entries(STATIC_PAGES).map(([value, page]) => ({
        label: `${page.label} (${page.path})`,
        value,
      })),
      admin: {
        description: 'Each page can have one entry.',
      },
    },
    noIndexField,
  ],
}
