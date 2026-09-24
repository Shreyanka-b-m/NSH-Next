// Forms docs: docs/forms/README.md — record changes in docs/forms/CHANGELOG.md.
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import type { Block } from 'payload'

import { revalidateTagHooks } from '../collections/hooks/revalidateTag'
import { FORMS_TAG } from '../lib/cacheTags'

export const NOTIFICATION_EMAIL = 'shreyanka.b@noveloffice.in'

const formsRevalidate = revalidateTagHooks(FORMS_TAG)

// The plugin's textarea block with an extra "rows" setting, so editors control the box height.
const textareaBlock: Block = {
  slug: 'textarea',
  labels: { singular: 'Textarea', plural: 'Textarea Fields' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name (lowercase, no special characters)',
          required: true,
          admin: { width: '50%' },
        },
        { name: 'label', type: 'text', label: 'Label', localized: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          type: 'number',
          label: 'Field Width (percentage)',
          admin: { width: '33%' },
        },
        {
          name: 'rows',
          type: 'number',
          label: 'Rows (height)',
          defaultValue: 3,
          min: 1,
          max: 20,
          admin: { width: '33%' },
        },
        {
          name: 'defaultValue',
          type: 'text',
          label: 'Default Value',
          localized: true,
          admin: { width: '34%' },
        },
      ],
    },
    { name: 'required', type: 'checkbox', label: 'Required' },
  ],
}

export const formBuilder = formBuilderPlugin({
  defaultToEmail: NOTIFICATION_EMAIL,
  fields: {
    text: true,
    email: true,
    textarea: textareaBlock,
    number: true,
    select: true,
    checkbox: true,
    message: true,
    date: false,
    country: false,
    state: false,
    payment: false,
  },
  formOverrides: {
    admin: { defaultColumns: ['title', 'slug', 'updatedAt'] },
    fields: ({ defaultFields }) => [
      ...defaultFields,
      {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true,
        index: true,
        admin: {
          position: 'sidebar',
          description: 'Used by the website to load this form, e.g. "buy-a-home".',
        },
      },
    ],
    hooks: {
      afterChange: [formsRevalidate.afterChange],
      afterDelete: [formsRevalidate.afterDelete],
    },
  },
  formSubmissionOverrides: {
    admin: { defaultColumns: ['form', 'createdAt'] },
    // Submissions come in only through the submitForm server action, which validates them against
    // the form first. The plugin's default lets anyone create them unvalidated via the REST API.
    access: {
      create: ({ req: { user } }) => Boolean(user),
    },
  },
})
