import type { Post, Property } from '../payload-types'
import { fitWords } from '../utilities/fitWords'
import { richTextToPlain } from '../utilities/richText'

// Text for the SEO tab's "Auto-generate" buttons on properties. Lengths follow the plugin's
// own checklist: titles up to 60 characters, descriptions up to 150.
const TITLE_MAX = 60
const DESCRIPTION_MIN = 100
const DESCRIPTION_MAX = 150

const STATUS_LABELS: Record<Property['status'], string> = {
  'for-sale': 'For sale',
  'sold-out': 'Sold',
  'under-contract': 'Under contract',
}

// Richest title that fits, e.g. "Woodland Heights, 4-Bed Home in Houston | Novel Signature Homes".
export const propertyTitle = (property: Partial<Property>, siteName: string) => {
  const { name, bedrooms, city } = property
  if (!name) return siteName
  // Skip the city when the name already contains it (e.g. "1311 Pine Chase Dr Houston").
  const place = city && !name.toLowerCase().includes(city.toLowerCase()) ? city : undefined

  const candidates = [
    bedrooms && place && `${name}, ${bedrooms}-Bed Home in ${place} | ${siteName}`,
    bedrooms && `${name}, ${bedrooms}-Bed Luxury Home | ${siteName}`,
    place && `${name} in ${place} | ${siteName}`,
    `${name} | ${siteName}`,
  ].filter((title): title is string => Boolean(title))

  return candidates.find((title) => title.length <= TITLE_MAX) ?? fitWords(name, TITLE_MAX)
}

// Facts first, then as many whole sentences as fit, e.g. "For sale: 4-bed, 5-bath luxury home
// in Houston, TX with 5,200 sq ft, listed at $2,450,000. Modern Farmhouse design by …"
export const propertyDescription = (property: Partial<Property>) => {
  const { status, bedrooms, bathrooms, city, state, acArea, price, designTheme, builder } = property

  const specs = [bedrooms && `${bedrooms}-bed`, bathrooms && `${bathrooms}-bath`]
    .filter(Boolean)
    .join(', ')
  const location = [city, state].filter(Boolean).join(', ')
  // acArea is free text; only add "sq ft" when it's a plain number like "5,200".
  const area = acArea && /^[\d.,\s]+$/.test(acArea) ? acArea.trim() : undefined
  const showPrice = price && status === 'for-sale'

  const facts = [
    status && `${STATUS_LABELS[status]}: `,
    specs ? `${specs} luxury home` : status ? 'luxury home' : 'Luxury home',
    location && ` in ${location}`,
    area && ` with ${area} sq ft`,
    showPrice && `, listed at $${price.toLocaleString('en-US')}`,
    '.',
  ]
    .filter(Boolean)
    .join('')

  const sentences = [
    facts,
    designTheme && `${designTheme} design${builder ? ` by ${builder}` : ''}.`,
    !designTheme && builder && `Built by ${builder}.`,
    property.description?.match(/^.*?[.!?](\s|$)/)?.[0].trim(),
  ].filter((sentence): sentence is string => Boolean(sentence))

  let text = sentences[0]
  for (const sentence of sentences.slice(1)) {
    if (`${text} ${sentence}`.length > DESCRIPTION_MAX) break
    text = `${text} ${sentence}`
  }
  // Still short (few details filled in)? Top up with the start of the property description.
  if (
    text.length < DESCRIPTION_MIN &&
    property.description &&
    !text.includes(property.description)
  ) {
    text = `${text} ${property.description.trim()}`
  }
  return fitWords(text, DESCRIPTION_MAX)
}

// Blog post title, e.g. "Westhaven Estates: Houston's Hidden Gem | Novel Signature Homes",
// or just the post title when the site name doesn't fit.
export const postTitle = (post: Partial<Post>, siteName: string) => {
  const title = post.title?.trim()
  if (!title) return siteName
  const withSite = `${title} | ${siteName}`
  return withSite.length <= TITLE_MAX ? withSite : fitWords(title, TITLE_MAX)
}

// The post's excerpt, else the start of its text.
export const postDescription = (post: Partial<Post>) =>
  fitWords((post.excerpt?.trim() || richTextToPlain(post.content)).replace(/\s+/g, ' '), DESCRIPTION_MAX)
