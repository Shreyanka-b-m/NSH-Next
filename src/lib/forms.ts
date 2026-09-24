// Forms docs: docs/forms/README.md — record changes in docs/forms/CHANGELOG.md.
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { FORMS_TAG } from '@/lib/cacheTags'
import type { Form } from '@/payload-types'

// The parts of a form the website needs (never the notification email settings).
export type PublicForm = Pick<
  Form,
  | 'id'
  | 'title'
  | 'slug'
  | 'fields'
  | 'submitButtonLabel'
  | 'confirmationType'
  | 'confirmationMessage'
  | 'redirect'
>

export type FormFieldBlock = NonNullable<Form['fields']>[number]

// Form edits bust this tag immediately; the TTL is only a safety net.
const cacheOptions = { revalidate: 600, tags: [FORMS_TAG] }

const findForm = async (where: { slug: { equals: string } } | { id: { equals: number } }) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'forms',
    where,
    limit: 1,
    depth: 0,
    select: {
      title: true,
      slug: true,
      fields: true,
      submitButtonLabel: true,
      confirmationType: true,
      confirmationMessage: true,
      redirect: true,
    },
  })
  return (docs[0] as PublicForm | undefined) ?? null
}

export const getFormBySlug = unstable_cache(
  async (slug: string) => findForm({ slug: { equals: slug } }),
  ['form-by-slug'],
  cacheOptions,
)

export const getFormById = unstable_cache(
  async (id: number) => findForm({ id: { equals: id } }),
  ['form-by-id'],
  cacheOptions,
)
