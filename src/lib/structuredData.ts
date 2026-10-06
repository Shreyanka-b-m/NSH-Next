import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_PROFILES } from '@/lib/contactInfo'
import { SERVER_URL, absoluteUrl } from '@/lib/serverURL'
import type { Media, Property } from '@/payload-types'

// Structured data (schema.org JSON-LD) that tells search engines what the business and each
// listing are. Rendered by <JsonLd>. Check output with https://search.google.com/test/rich-results

const ORGANIZATION_ID = `${SERVER_URL}/#organization`

// On every page (from the frontend layout): the business and the website.
export const siteStructuredData = (siteName: string) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'RealEstateAgent',
      '@id': ORGANIZATION_ID,
      name: siteName,
      url: SERVER_URL,
      logo: `${SERVER_URL}/assets/images/NSH-Logo.svg`,
      image: `${SERVER_URL}/assets/images/NSH-Logo.svg`,
      telephone: CONTACT_PHONE.replace(/[^\d+]/g, ''),
      email: CONTACT_EMAIL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT_ADDRESS.street,
        addressLocality: CONTACT_ADDRESS.city,
        addressRegion: CONTACT_ADDRESS.state,
        postalCode: CONTACT_ADDRESS.postalCode,
        addressCountry: CONTACT_ADDRESS.country,
      },
      sameAs: Object.values(SOCIAL_PROFILES),
    },
    {
      '@type': 'WebSite',
      '@id': `${SERVER_URL}/#website`,
      name: siteName,
      url: SERVER_URL,
      publisher: { '@id': ORGANIZATION_ID },
    },
  ],
})

const AVAILABILITY: Partial<Record<Property['status'], string>> = {
  'for-sale': 'https://schema.org/InStock',
  'sold-out': 'https://schema.org/SoldOut',
}

const imageUrl = (image: number | Media | null | undefined) =>
  typeof image === 'object' && image?.url ? absoluteUrl(image.url) : undefined

// acArea is free text; only a plain number like "5,200" becomes a floor size.
const squareFeet = (acArea?: string | null) =>
  acArea && /^[\d.,\s]+$/.test(acArea) ? Number(acArea.replace(/[^\d.]/g, '')) : undefined

// On each property page: breadcrumbs (shown by Google in results) and the listing details.
export const propertyStructuredData = (property: Property) => {
  const url = `${SERVER_URL}/properties/${property.slug}`
  const images = [
    ...new Set(
      [
        imageUrl(property.cardImage),
        ...(property.gallery ?? []).map((item) => imageUrl(item.image)),
      ].filter(Boolean),
    ),
  ]
  const area = squareFeet(property.acArea)
  const availability = AVAILABILITY[property.status]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SERVER_URL}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Properties',
            item: `${SERVER_URL}/properties`,
          },
          { '@type': 'ListItem', position: 3, name: property.name, item: url },
        ],
      },
      {
        '@type': 'RealEstateListing',
        name: property.name,
        url,
        description: property.meta?.description || property.description || undefined,
        image: images.length ? images : undefined,
        datePosted: property.createdAt,
        dateModified: property.updatedAt,
        provider: { '@id': ORGANIZATION_ID },
        about: {
          '@type': 'SingleFamilyResidence',
          name: property.name,
          numberOfBedrooms: property.bedrooms ?? undefined,
          numberOfBathroomsTotal: property.bathrooms ?? undefined,
          floorSize: area
            ? { '@type': 'QuantitativeValue', value: area, unitCode: 'FTK' }
            : undefined,
          address: {
            '@type': 'PostalAddress',
            streetAddress: property.address ?? undefined,
            addressLocality: property.city ?? undefined,
            addressRegion: property.state ?? undefined,
            addressCountry: 'US',
          },
        },
        offers: property.price
          ? {
              '@type': 'Offer',
              price: property.price,
              priceCurrency: 'USD',
              availability,
            }
          : undefined,
      },
    ],
  }
}
