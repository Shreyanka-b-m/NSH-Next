// Business contact details and social profiles. Shown in the Footer and described to search
// engines in the structured data (src/lib/structuredData.ts), so both always match.

export const CONTACT_PHONE = '+1 (606)-707-5050'
export const CONTACT_EMAIL = 'info@novelsignaturehomes.com'

export const CONTACT_ADDRESS = {
  street: '11133 Shady Trail #171',
  city: 'Dallas',
  state: 'TX',
  postalCode: '75229',
  country: 'US',
}

export const formattedAddress = `${CONTACT_ADDRESS.street}, ${CONTACT_ADDRESS.city}, ${CONTACT_ADDRESS.state} ${CONTACT_ADDRESS.postalCode}`

export const SOCIAL_PROFILES = {
  Instagram: 'https://www.instagram.com/novelsignaturehomes/',
  LinkedIn: 'https://www.linkedin.com/company/novel-signature-homes/',
  Facebook: 'https://www.facebook.com/people/Novel-Signature-Homes/61566500864621/',
  YouTube: 'https://www.youtube.com/@NovelSignatureHomes',
  X: 'https://x.com/nsignaturehomes',
}
