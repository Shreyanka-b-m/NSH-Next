import type { GlobalConfig } from 'payload'

import { revalidateGlobalTag } from '../collections/hooks/revalidateTag'
import { SETTINGS_TAG } from '../lib/cacheTags'

export const DEFAULT_SITE_NAME = 'Novel Signature Homes'
export const DEFAULT_DESCRIPTION =
  'Luxury Homes redefined. Explore the epitome of modern living with Novel Signature Homes.'

// Time zones offered for website dates. Add more as { label, value: '<IANA zone name>' }.
export const TIME_ZONES = [
  { label: 'Texas (Central Time)', value: 'America/Chicago' },
  { label: 'India (IST)', value: 'Asia/Kolkata' },
]
export const DEFAULT_TIME_ZONE = 'America/Chicago'

// One editable "Site Settings" page in the admin. The SEO plugin adds an "SEO" tab here
// (see src/plugins/seo.ts) whose values are the defaults for every page on the website.
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description:
      "SEO tab: defaults for the whole site: the home page title, and the description and share image for any page that doesn't set its own.",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateGlobalTag(SETTINGS_TAG, { allPages: true })],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              defaultValue: DEFAULT_SITE_NAME,
              admin: {
                description:
                  'Added to the end of every page title, e.g. "Buy A Home | Novel Signature Homes".',
              },
            },
            {
              name: 'timeZone',
              label: 'Time Zone',
              type: 'select',
              required: true,
              options: TIME_ZONES,
              defaultValue: DEFAULT_TIME_ZONE,
              admin: {
                description:
                  'Dates on the website (blog post dates, comment times) are shown in this time zone. A post published at 9:55 am in India on Oct 9 is still Oct 8 in Texas.',
              },
            },
          ],
        },
      ],
    },
  ],
}
