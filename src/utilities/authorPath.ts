import { slugify } from 'payload/shared'

// An author's page address, made from their Name: "Shreyanka B M" → /blog/author/shreyanka-b-m.
// There is no separate author record; renaming a user moves their page.
export const authorSlug = (name: string) => slugify(name) ?? ''

export const authorPath = (name: string) => `/blog/author/${authorSlug(name)}`
