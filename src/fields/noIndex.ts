import type { CheckboxField } from 'payload'

// Sidebar checkbox: adds a `noindex` robots tag to the page and leaves it out of /sitemap.xml.
// The page itself stays live and listed on the website.
export const noIndexField: CheckboxField = {
  name: 'noIndex',
  label: 'Hide from search engines',
  type: 'checkbox',
  defaultValue: false,
  admin: {
    position: 'sidebar',
    description:
      'Google removes this page from search results and the sitemap leaves it out. Visitors can still open it.',
  },
}
