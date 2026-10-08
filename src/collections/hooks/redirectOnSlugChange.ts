import type { CollectionAfterChangeHook } from 'payload'

type SluggedCollection = 'properties' | 'posts'

// When a document's slug changes, its old address redirects (301) to it, so links and Google
// rankings keep working. Runs in the same transaction as the save (`req`).
// `basePath` is where the collection's pages live, e.g. '/properties' or '/blog'.
export const redirectOnSlugChange =
  (collection: SluggedCollection, basePath: string): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, operation, req }) => {
    if (operation !== 'update' || !previousDoc?.slug || previousDoc.slug === doc.slug) return doc

    const { payload } = req
    const from = `${basePath}/${previousDoc.slug}`
    const data = {
      from,
      to: {
        type: 'reference' as const,
        reference: { relationTo: collection, value: doc.id },
      },
      type: '301' as const,
    }

    const { docs } = await payload.find({
      collection: 'redirects',
      where: { from: { equals: from.toLowerCase() } },
      limit: 1,
      req,
    })
    if (docs[0]) {
      await payload.update({ collection: 'redirects', id: docs[0].id, data, req })
    } else {
      await payload.create({ collection: 'redirects', data, req })
    }

    // A redirect away from the new address would now hide the document: remove it.
    await payload.delete({
      collection: 'redirects',
      where: { from: { equals: `${basePath}/${doc.slug}`.toLowerCase() } },
      req,
    })

    return doc
  }
