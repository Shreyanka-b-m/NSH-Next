import { unstable_cache } from 'next/cache'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { SETTINGS_TAG } from '@/lib/cacheTags'

// Saving Site Settings busts this tag immediately; the TTL is only a safety net.
const getCachedSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'site-settings', depth: 1 })
  },
  ['site-settings'],
  { revalidate: 600, tags: [SETTINGS_TAG] },
)

// The build has no database, so pages prerendered at build time use the code defaults.
// They pick up the saved settings when they regenerate (layout `revalidate`, or on save).
export const getSiteSettings = async () =>
  process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD ? null : getCachedSiteSettings()
