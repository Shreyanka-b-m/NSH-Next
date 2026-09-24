// Forms docs: docs/forms/README.md — record changes in docs/forms/CHANGELOG.md.
'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import type { FormFieldBlock, PublicForm } from '@/lib/forms'
import { submitForm, type FormState } from '@/lib/submitForm'

const initialState: FormState = { status: 'idle' }

const inputClass =
  'w-full bg-[#ebebeb] px-3 py-2 text-sm text-(--color-black) outline-none transition-shadow focus:ring-1 focus:ring-(--color-black) aria-invalid:ring-1 aria-invalid:ring-red-600'

// Renders any form built in the Payload admin (Forms collection) and submits it via submitForm.
export default function FormRenderer({ form }: { form: PublicForm }) {
  const [state, formAction, isPending] = useActionState(submitForm, initialState)
  const router = useRouter()

  const redirectUrl = form.confirmationType === 'redirect' ? form.redirect?.url : null
  useEffect(() => {
    if (state.status === 'success' && redirectUrl) router.push(redirectUrl)
  }, [state.status, redirectUrl, router])

  if (state.status === 'success' && !redirectUrl) {
    return (
      <div role="status" className="mt-6 bg-[#f5f1ec] px-5 py-4 text-(--color-black)">
        {form.confirmationMessage ? (
          <RichText data={form.confirmationMessage} />
        ) : (
          <p>Thank you! Your message has been sent.</p>
        )}
      </div>
    )
  }

  return (
    <form action={formAction} className="mt-6 flex flex-wrap gap-4" noValidate>
      <input type="hidden" name="formId" value={form.id} />

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {form.fields?.map((field, index) => (
        <FormField
          key={field.id ?? index}
          field={field}
          formSlug={form.slug}
          error={'name' in field ? state.errors?.[field.name] : undefined}
          value={'name' in field ? state.values?.[field.name] : undefined}
        />
      ))}

      <div className="flex w-full flex-col items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="mt-1 cursor-pointer bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-black/90 disabled:cursor-wait disabled:opacity-60"
        >
          {isPending ? 'Sending…' : form.submitButtonLabel || 'Submit'}
        </button>

        <div role="status" aria-live="polite">
          {state.status === 'error' && state.message && (
            <span className="block text-center text-sm text-red-600">{state.message}</span>
          )}
        </div>
      </div>
    </form>
  )
}

type FormFieldProps = {
  field: FormFieldBlock
  formSlug: string
  error?: string
  value?: string
}

function FormField({ field, formSlug, error, value }: FormFieldProps) {
  // Width is a percentage set per field in the admin; account for the 1rem flex gap.
  const width = 'width' in field && field.width ? field.width : 100
  const style = { flexBasis: width === 100 ? '100%' : `calc(${width}% - 1rem)` }

  if (field.blockType === 'message') {
    return (
      <div style={style} className="grow">
        {field.message && <RichText data={field.message} />}
      </div>
    )
  }

  const id = `${formSlug}-${field.name}`
  const label = field.label || field.name
  const describedBy = error ? `${id}-error` : undefined
  const common = {
    id,
    name: field.name,
    required: field.required ?? undefined,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  }

  if (field.blockType === 'checkbox') {
    return (
      <div style={style} className="grow">
        <label htmlFor={id} className="flex items-center gap-2 text-sm">
          <input
            {...common}
            type="checkbox"
            defaultChecked={value ? value === 'Yes' : Boolean(field.defaultValue)}
            className="size-4 accent-black"
          />
          {label}
          {field.required && <span className="text-red-600">*</span>}
        </label>
        <FieldError id={describedBy} error={error} />
      </div>
    )
  }

  const defaultValue =
    value ??
    ('defaultValue' in field && field.defaultValue != null ? String(field.defaultValue) : '')

  return (
    <div style={style} className="grow">
      <label htmlFor={id} className="mb-1 block text-sm">
        {label}
        {field.required && <span className="text-red-600">*</span>}
      </label>

      {field.blockType === 'textarea' ? (
        <textarea
          {...common}
          defaultValue={defaultValue}
          rows={field.rows ?? 3}
          className={`${inputClass} resize-y`}
        />
      ) : field.blockType === 'select' ? (
        <select {...common} defaultValue={defaultValue} className={`${inputClass} cursor-pointer`}>
          <option value="">{field.placeholder || 'Select…'}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          defaultValue={defaultValue}
          className={inputClass}
          {...inputTypeFor(field)}
        />
      )}

      <FieldError id={describedBy} error={error} />
    </div>
  )
}

function FieldError({ id, error }: { id?: string; error?: string }) {
  if (!error) return null
  return (
    <span id={id} className="mt-1 block text-xs text-red-600">
      {error}
    </span>
  )
}

// Form Builder has no dedicated phone block, so a text field named "phone" gets a tel input.
function inputTypeFor(field: FormFieldBlock) {
  if (field.blockType === 'email') return { type: 'email', autoComplete: 'email' }
  if (field.blockType === 'number') return { type: 'number' }
  if (field.blockType !== 'text') return { type: 'text' }
  if (field.name === 'phone') return { type: 'tel', autoComplete: 'tel' }
  if (field.name === 'name') return { type: 'text', autoComplete: 'name' }
  return { type: 'text' }
}
