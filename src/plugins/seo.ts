import { seoPlugin } from '@payloadcms/plugin-seo'

import { DEFAULT_SITE_NAME } from '../globals/SiteSettings'
import { getStaticPage } from '../lib/staticPages'
import { propertyDescription, propertyTitle } from './seoText'

// Adds an "SEO" tab (meta title, description, image) to the collections listed below.
// The "Auto-generate" buttons in that tab fill the fields from the document's own content.
// The search preview is our own Google-style component instead of the plugin's plain one.
export const seo = seoPlugin({
  collections: ['properties', 'page-seo'],
  globals: ['site-settings'],
  uploadsCollection: 'media',
  tabbedUI: true,
  // Properties have `name`, Page SEO entries have `page`, Site Settings has `siteName`.
  generateTitle: async ({ doc, req }) => {
    if (doc?.siteName) return doc.siteName
    const settings = await req.payload.findGlobal({ slug: 'site-settings', req })
    const siteName = settings.siteName || DEFAULT_SITE_NAME
    if (doc?.name) return propertyTitle(doc, siteName)
    const page = getStaticPage(doc?.page)
    return page?.title ? `${page.title} | ${siteName}` : siteName
  },
  generateDescription: ({ doc }) =>
    doc?.name ? propertyDescription(doc) : (getStaticPage(doc?.page)?.description ?? ''),
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
