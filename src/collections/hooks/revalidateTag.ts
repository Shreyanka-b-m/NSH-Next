import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  Payload,
} from 'payload'

const bust = (tag: string, payload: Payload) => {
  try {
    // { expire: 0 }: editors see their change on the very next request.
    revalidateTag(tag, { expire: 0 })
    payload.logger.info(`Revalidated cache tag "${tag}"`)
  } catch {
    // Hooks also run outside a Next request (scripts, migrations, tests) where revalidateTag throws.
    payload.logger.warn(`Skipped revalidating "${tag}" (no Next request context)`)
  }
}

// Collection hooks that clear a Next.js cache tag whenever a document changes or is deleted.
export const revalidateTagHooks = (tag: string) => {
  const afterChange: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
    bust(tag, payload)
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = ({ doc, req: { payload } }) => {
    bust(tag, payload)
    return doc
  }
  return { afterChange, afterDelete }
}

// Global hook that clears a Next.js cache tag whenever the global is saved.
// `allPages` also refreshes every prerendered page, for site-wide data used in the layout:
// pages built without a database never fetched the tagged data, so the tag alone misses them.
export const revalidateGlobalTag =
  (tag: string, { allPages = false } = {}): GlobalAfterChangeHook =>
  ({ doc, req: { payload } }) => {
    bust(tag, payload)
    if (allPages) {
      try {
        revalidatePath('/', 'layout')
      } catch {
        // Same as bust(): no Next request context outside the app.
      }
    }
    return doc
  }
