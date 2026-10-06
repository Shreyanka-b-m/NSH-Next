import { seoPlugin } from '@payloadcms/plugin-seo'

// Adds an "SEO" tab (meta title, description, image) to the collections listed below.
// The "Auto-generate" buttons in that tab fill the fields from the document's own content.
// The search preview is our own Google-style component instead of the plugin's plain one.
export const seo = seoPlugin({
  collections: ['properties'],
  globals: ['site-settings'],
  uploadsCollection: 'media',
  tabbedUI: true,
  // Properties have `name`; Site Settings has `siteName`.
  generateTitle: ({ doc }) =>
    doc?.name ? `${doc.name} | Novel Signature Homes` : doc?.siteName || 'Novel Signature Homes',
  generateDescription: ({ doc }) => doc?.description?.slice(0, 160) ?? '',
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
