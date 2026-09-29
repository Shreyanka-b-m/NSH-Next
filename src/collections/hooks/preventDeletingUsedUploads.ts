import {
  APIError,
  type Block,
  type CollectionBeforeDeleteHook,
  type Field,
  type PayloadRequest,
} from 'payload'

type Target = { slug: string; id: number | string }
type Doc = Record<string, unknown>

const MAX_LISTED = 5

const humanize = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^./, (c) => c.toUpperCase())

const fieldLabel = (field: Field) =>
  'label' in field && typeof field.label === 'string'
    ? field.label
    : 'name' in field
      ? humanize(field.name)
      : ''

const sameId = (value: unknown, id: Target['id']) => {
  const raw = value && typeof value === 'object' ? (value as Doc).id : value
  return raw !== undefined && raw !== null && String(raw) === String(id)
}

// Upload/relationship values: an ID, a list of IDs, or { relationTo, value } for polymorphic fields.
const valueRefers = (relationTo: string | string[], value: unknown, target: Target): boolean => {
  const items = Array.isArray(value) ? value : [value]
  return items.some((item) => {
    if (Array.isArray(relationTo)) {
      const poly = item as { relationTo?: string; value?: unknown } | null
      return poly?.relationTo === target.slug && sameId(poly.value, target.id)
    }
    return relationTo === target.slug && sameId(item, target.id)
  })
}

// Rich text (Lexical) stores embedded uploads/relationships as nodes with { relationTo, value }.
const richTextRefers = (node: unknown, target: Target): boolean => {
  if (!node || typeof node !== 'object') return false
  if (Array.isArray(node)) return node.some((child) => richTextRefers(child, target))
  const obj = node as Doc
  if (obj.relationTo === target.slug && sameId(obj.value, target.id)) return true
  return Object.values(obj).some((child) => richTextRefers(child, target))
}

/** Returns the labels of the fields in `data` that point at `target`. */
const findUsages = (
  fields: Field[],
  data: unknown,
  target: Target,
  blocks: Block[],
  localized: boolean,
): string[] => {
  if (!data || typeof data !== 'object') return []
  const doc = data as Doc

  return fields.flatMap((field): string[] => {
    // With locale 'all', localized fields come back as { en: value, fr: value }.
    const valuesOf = (value: unknown): unknown[] =>
      localized &&
      'localized' in field &&
      field.localized &&
      value &&
      typeof value === 'object' &&
      !Array.isArray(value)
        ? Object.values(value)
        : [value]

    switch (field.type) {
      case 'upload':
      case 'relationship':
        return valuesOf(doc[field.name]).some((v) => valueRefers(field.relationTo, v, target))
          ? [fieldLabel(field)]
          : []
      case 'richText':
        return valuesOf(doc[field.name]).some((v) => richTextRefers(v, target))
          ? [fieldLabel(field)]
          : []
      case 'array':
        return valuesOf(doc[field.name]).flatMap((rows) =>
          Array.isArray(rows)
            ? rows.flatMap((row) => findUsages(field.fields, row, target, blocks, localized))
            : [],
        )
      case 'blocks':
        return valuesOf(doc[field.name]).flatMap((rows) =>
          Array.isArray(rows)
            ? rows.flatMap((row) => {
                const blockType = (row as Doc)?.blockType
                const block =
                  field.blocks.find((b) => b.slug === blockType) ??
                  blocks.find((b) => b.slug === blockType)
                return block ? findUsages(block.fields, row, target, blocks, localized) : []
              })
            : [],
        )
      case 'group':
        return 'name' in field && field.name
          ? valuesOf(doc[field.name]).flatMap((v) =>
              findUsages(field.fields, v, target, blocks, localized),
            )
          : findUsages(field.fields, doc, target, blocks, localized)
      case 'tabs':
        return field.tabs.flatMap((tab) =>
          findUsages(
            tab.fields,
            'name' in tab && tab.name ? doc[tab.name] : doc,
            target,
            blocks,
            localized,
          ),
        )
      case 'row':
      case 'collapsible':
        return findUsages(field.fields, doc, target, blocks, localized)
      default:
        return []
    }
  })
}

/** Whether a field schema could hold a reference to `slug` at all (skips scanning unrelated collections). */
const canReference = (fields: Field[], slug: string, blocks: Block[]): boolean =>
  fields.some((field) => {
    if (field.type === 'upload' || field.type === 'relationship') {
      return Array.isArray(field.relationTo)
        ? (field.relationTo as string[]).includes(slug)
        : field.relationTo === slug
    }
    if (field.type === 'richText') return true
    if (field.type === 'blocks') {
      return [...field.blocks, ...blocks].some((block) => canReference(block.fields, slug, blocks))
    }
    if (field.type === 'tabs')
      return field.tabs.some((tab) => canReference(tab.fields, slug, blocks))
    if ('fields' in field) return canReference(field.fields, slug, blocks)
    return false
  })

async function listUsages(req: PayloadRequest, target: Target): Promise<string[]> {
  const { payload } = req
  const blocks = payload.config.blocks || []
  const localized = Boolean(payload.config.localization)
  const locale = localized ? ('all' as const) : undefined
  const usages: string[] = []

  const describe = (type: string, title: unknown, labels: string[]) =>
    `${type} "${String(title)}" (${[...new Set(labels)].join(', ')})`

  for (const collection of payload.config.collections) {
    if (
      collection.slug.startsWith('payload-') ||
      !canReference(collection.fields, target.slug, blocks)
    )
      continue
    const type =
      typeof collection.labels?.singular === 'string' ? collection.labels.singular : collection.slug
    const titleField = collection.admin?.useAsTitle || 'id'

    let page = 1
    let hasNextPage = true
    while (hasNextPage && usages.length <= MAX_LISTED) {
      const res = await payload.find({
        collection: collection.slug,
        depth: 0,
        limit: 100,
        page,
        locale,
        overrideAccess: true,
        pagination: true,
        req,
      })
      for (const doc of res.docs as unknown as Doc[]) {
        if (collection.slug === target.slug && sameId(doc.id, target.id)) continue
        const labels = findUsages(collection.fields, doc, target, blocks, localized)
        if (labels.length > 0) {
          const title = doc[titleField]
          usages.push(
            describe(type, title && typeof title === 'object' ? doc.id : (title ?? doc.id), labels),
          )
        }
      }
      hasNextPage = res.hasNextPage
      page++
    }
  }

  for (const global of payload.config.globals || []) {
    if (!canReference(global.fields, target.slug, blocks)) continue
    const doc = await payload.findGlobal({
      slug: global.slug,
      depth: 0,
      locale,
      overrideAccess: true,
      req,
    })
    const labels = findUsages(global.fields, doc, target, blocks, localized)
    if (labels.length > 0) {
      const type = typeof global.label === 'string' ? global.label : humanize(global.slug)
      usages.push(`${type} settings (${[...new Set(labels)].join(', ')})`)
    }
  }

  return usages
}

/**
 * Blocks deleting a file (e.g. media) that is still used anywhere: upload/relationship fields
 * (optional or required, in arrays, groups, blocks and tabs), rich text and globals.
 *
 * Without this, Payload silently clears optional references, and for required ones the delete
 * fails *after* the file has already been removed from disk, leaving a broken media document.
 * beforeDelete runs before any files are touched, so throwing here stops the delete cleanly.
 */
export const preventDeletingUsedUploads: CollectionBeforeDeleteHook = async ({
  collection,
  id,
  req,
}) => {
  const usages = await listUsages(req, { slug: collection.slug, id })
  if (usages.length === 0) return

  const shown = usages.slice(0, MAX_LISTED).join('; ')
  const more = usages.length > MAX_LISTED ? ` and ${usages.length - MAX_LISTED} more` : ''
  throw new APIError(
    `This file is still used by ${shown}${more}. Remove or replace it there before deleting it.`,
    400,
    undefined,
    true,
  )
}
