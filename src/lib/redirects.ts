import { permanentRedirect, redirect } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PROPERTIES_TAG, REDIRECTS_TAG } from '@/lib/cacheTags'
import { normalizePath } from '@/utilities/normalizePath'
import type { Redirect } from '@/payload-types'

type Target = { to: string; permanent: boolean }

const targetOf = (doc: Redirect): string | undefined => {
  if (doc.to?.type === 'custom') return doc.to.url || undefined
  const ref = doc.to?.reference
  if (ref?.relationTo === 'properties' && typeof ref.value === 'object') {
    return `/properties/${ref.value.slug}`
  }
  return undefined
}

// Every redirect as { "/old-path": target }. Small list, cached; it also follows property
// changes because "To" can point at a property whose slug may change.
const getRedirectMap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({ collection: 'redirects', depth: 1, limit: 1000 })
    const map: Record<string, Target> = {}
    for (const doc of docs) {
      const to = targetOf(doc)
      // Skip broken entries and ones that would send a page to itself.
      if (to && normalizePath(to) !== doc.from)
        map[doc.from] = { to, permanent: doc.type === '301' }
    }
    return map
  },
  ['redirect-map'],
  { revalidate: 600, tags: [REDIRECTS_TAG, PROPERTIES_TAG] },
)

// Call right before notFound(): if Admin → Redirects has an entry for this path, go there
// instead (this throws, like notFound). Normal pages never reach this, so they pay nothing.
export async function redirectIfListed(path: string) {
  const target = (await getRedirectMap())[normalizePath(path)]
  if (!target) return
  if (target.permanent) permanentRedirect(target.to)
  redirect(target.to)
}
