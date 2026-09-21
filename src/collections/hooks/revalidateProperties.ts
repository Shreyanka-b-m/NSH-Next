import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { PROPERTIES_TAG } from '@/lib/cacheTags'

const bust = (payload: { logger: { info: (msg: string) => void; warn: (msg: string) => void } }) => {
  try {
    // { expire: 0 }: editors see their change on the very next request.
    revalidateTag(PROPERTIES_TAG, { expire: 0 })
    payload.logger.info(`Revalidated cache tag "${PROPERTIES_TAG}"`)
  } catch {
    // Hooks also run outside a Next request (scripts, migrations, tests) where revalidateTag throws.
    payload.logger.warn(`Skipped revalidating "${PROPERTIES_TAG}" (no Next request context)`)
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  bust(payload)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req: { payload } }) => {
  bust(payload)
  return doc
}
