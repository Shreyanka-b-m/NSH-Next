// Forms docs: docs/forms/README.md — record changes in docs/forms/CHANGELOG.md.
'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { getFormById } from '@/lib/forms'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Record<string, string>
  values?: Record<string, string>
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d\s().-]{7,20}$/

// Validates a submission against the form's own field settings from the admin, then saves it
// to Form Submissions (which triggers the form's notification emails).
export async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const formId = Number(formData.get('formId'))
  const form = Number.isInteger(formId) ? await getFormById(formId) : null
  if (!form)
    return { status: 'error', message: 'This form is unavailable. Please refresh and try again.' }

  // Honeypot: real users never see this field, bots tend to fill it.
  if (formData.get('website')) return { status: 'success' }

  const values: Record<string, string> = {}
  const errors: Record<string, string> = {}

  for (const field of form.fields ?? []) {
    if (field.blockType === 'message') continue
    const label = field.label || field.name

    if (field.blockType === 'checkbox') {
      const checked = formData.get(field.name) === 'on'
      values[field.name] = checked ? 'Yes' : 'No'
      if (field.required && !checked) errors[field.name] = `${label} is required.`
      continue
    }

    const value = String(formData.get(field.name) ?? '').trim()
    values[field.name] = value
    const maxLength = field.blockType === 'textarea' ? 5000 : 200

    if (!value) {
      if (field.required) errors[field.name] = `${label} is required.`
    } else if (value.length > maxLength) {
      errors[field.name] = `${label} must be ${maxLength} characters or fewer.`
    } else if (field.blockType === 'email' && !EMAIL_RE.test(value)) {
      errors[field.name] = 'Please enter a valid email address.'
    } else if (field.blockType === 'text' && field.name === 'phone' && !PHONE_RE.test(value)) {
      errors[field.name] = 'Please enter a valid phone number.'
    } else if (field.blockType === 'number' && Number.isNaN(Number(value))) {
      errors[field.name] = `${label} must be a number.`
    } else if (
      field.blockType === 'select' &&
      !field.options?.some((option) => option.value === value)
    ) {
      errors[field.name] = `Please choose a valid ${label.toLowerCase()}.`
    }
  }

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please fix the highlighted fields.', errors, values }
  }

  try {
    const payload = await getPayload({ config })
    // Trusted server write: values are validated and limited to the form's own fields above,
    // so the admin-only create access on Form Submissions is intentionally bypassed.
    await payload.create({
      collection: 'form-submissions',
      data: {
        form: form.id,
        submissionData: Object.entries(values)
          .filter(([, value]) => value !== '')
          .map(([field, value]) => ({ field, value })),
      },
    })
  } catch (error) {
    console.error(`Failed to save submission for form "${form.slug}"`, error)
    return {
      status: 'error',
      message: 'Something went wrong. Please try again or email us directly.',
      values,
    }
  }

  return { status: 'success' }
}
