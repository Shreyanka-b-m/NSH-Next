import type { CollectionAfterChangeHook } from 'payload'

// When a property's slug changes, its old address redirects (301) to the property, so links
// and Google rankings keep working. Runs in the same transaction as the save (`req`).
export const redirectOnSlugChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (operation !== 'update' || !previousDoc?.slug || previousDoc.slug === doc.slug) return doc

  const { payload } = req
  const from = `/properties/${previousDoc.slug}`
  const data = {
    from,
    to: {
      type: 'reference' as const,
      reference: { relationTo: 'properties' as const, value: doc.id },
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

  // A redirect away from the new address would now hide the property: remove it.
  await payload.delete({
    collection: 'redirects',
    where: { from: { equals: `/properties/${doc.slug}`.toLowerCase() } },
    req,
  })

  return doc
}
