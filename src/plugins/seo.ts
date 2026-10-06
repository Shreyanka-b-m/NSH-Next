import { seoPlugin } from '@payloadcms/plugin-seo'

import { getStaticPage } from '../lib/staticPages'

const SITE_NAME = 'Novel Signature Homes'

// Adds an "SEO" tab (meta title, description, image) to the collections listed below.
// The "Auto-generate" buttons in that tab fill the fields from the document's own content.
// The search preview is our own Google-style component instead of the plugin's plain one.
export const seo = seoPlugin({
  collections: ['properties', 'page-seo'],
  globals: ['site-settings'],
  uploadsCollection: 'media',
  tabbedUI: true,
  // Properties have `name`, Page SEO entries have `page`, Site Settings has `siteName`.
  generateTitle: ({ doc }) => {
    const name = doc?.name || getStaticPage(doc?.page)?.title
    return name ? `${name} | ${SITE_NAME}` : doc?.siteName || SITE_NAME
  },
  generateDescription: ({ doc }) =>
    doc?.description?.slice(0, 160) ?? getStaticPage(doc?.page)?.description ?? '',
  generateImage: ({ doc }) => doc?.cardImage?.id ?? doc?.cardImage,
  fields: ({ defaultFields }) =>
    defaultFields.map((field) =>
      'name' in field && field.name === 'preview'
        ? {
            ...field,
            admin: { components: { Field: '@/components/admin/SeoPreview#SeoPreview' } },
          }
        : field,
    ),
})
