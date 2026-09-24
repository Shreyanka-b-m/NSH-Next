// Forms docs: docs/forms/README.md — record changes in docs/forms/CHANGELOG.md.
import type { Payload, PayloadRequest, RequiredDataFromCollectionSlug } from 'payload'

import { NOTIFICATION_EMAIL } from '../plugins/formBuilder'

type FormData = RequiredDataFromCollectionSlug<'forms'>

// Minimal Lexical rich text: one paragraph per string.
const richText = (...paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      textFormat: 0,
      textStyle: '',
      children: [
        { type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 },
      ],
    })),
  },
})

const nameField = { blockType: 'text', name: 'name', label: 'Name', required: true } as const
const phoneField = { blockType: 'text', name: 'phone', label: 'Phone' } as const
const emailField = { blockType: 'email', name: 'email', label: 'Email', required: true } as const
const messageField = { blockType: 'textarea', name: 'message', label: 'Message', rows: 1 } as const

const baseForm = (title: string): Omit<FormData, 'slug' | 'fields'> => ({
  title,
  submitButtonLabel: 'Submit',
  confirmationType: 'message',
  confirmationMessage: richText(
    'Thank you! Your message has been sent. We will get back to you shortly.',
  ),
  emails: [
    {
      emailTo: NOTIFICATION_EMAIL,
      replyTo: '{{email}}',
      subject: `New ${title} submission from {{name}}`,
      message: richText(`A new ${title} form was submitted on the website:`, '{{*:table}}'),
    },
  ],
})

export const contactForms: FormData[] = [
  {
    ...baseForm('Buy A Home'),
    slug: 'buy-a-home',
    fields: [nameField, phoneField, emailField, messageField],
  },
  {
    ...baseForm('Trade Inquiry'),
    slug: 'trade-inquiry',
    fields: [
      nameField,
      phoneField,
      emailField,
      { blockType: 'text', name: 'businessType', label: 'Type of Business', required: true },
      { ...messageField, label: 'Message (optional)', rows: 8 },
    ],
  },
  {
    ...baseForm('Other Inquiries'),
    slug: 'other-inquiries',
    fields: [nameField, phoneField, emailField, messageField],
  },
]

// Creates the contact forms if they don't exist yet; never overwrites forms edited in the admin.
export async function seedContactForms(payload: Payload, req?: PayloadRequest) {
  for (const data of contactForms) {
    const { totalDocs } = await payload.count({
      collection: 'forms',
      where: { slug: { equals: data.slug } },
      req,
    })
    if (totalDocs > 0) {
      payload.logger.info(`Form "${data.slug}" already exists, skipping`)
      continue
    }
    await payload.create({ collection: 'forms', data, req })
    payload.logger.info(`Created form "${data.slug}"`)
  }
}
