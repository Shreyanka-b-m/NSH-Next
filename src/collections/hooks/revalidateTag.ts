import { revalidatePath, revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  Payload,
} from 'payload'

export const bustTag = (tag: string, payload: Payload) => {
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
    bustTag(tag, payload)
    return doc
  }
  const afterDelete: CollectionAfterDeleteHook = ({ doc, req: { payload } }) => {
    bustTag(tag, payload)
    return doc
  }
  return { afterChange, afterDelete }
}

// Clears the cached HTML of one path (or, with 'layout', every page below it). Needed for
// prerendered pages built without a database: they never fetched the tagged data.
export const bustPath = (path: string, payload: Payload, type?: 'layout' | 'page') => {
  try {
    revalidatePath(path, type)
    payload.logger.info(`Revalidated path "${path}"`)
  } catch {
    payload.logger.warn(`Skipped revalidating "${path}" (no Next request context)`)
  }
}

// Global hook that clears a Next.js cache tag whenever the global is saved.
// `allPages` also refreshes every prerendered page, for site-wide data used in the layout.
export const revalidateGlobalTag =
  (tag: string, { allPages = false } = {}): GlobalAfterChangeHook =>
  ({ doc, req: { payload } }) => {
    bustTag(tag, payload)
    if (allPages) bustPath('/', payload, 'layout')
    return doc
  }
